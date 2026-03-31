<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Restaurant;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $restaurant = Restaurant::where('owner_id', $request->user()->id)->first();
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($restaurant->image) {
                $oldPath = str_replace('/storage/', '', $restaurant->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('restaurants', 'public');
            $restaurant->image = Storage::url($path);
            $restaurant->save();
        }

        return $restaurant;
    }

    public function index()
    {
        return Restaurant::with('owner')->get();
    }

    public function myRestaurant(Request $request)
    {
        $restaurant = Restaurant::where('owner_id', $request->user()->id)->first();
        if (!$restaurant) {
            return response()->json(['message' => 'No restaurant found for this user'], 404);
        }
        return $restaurant->load(['categories.items', 'owner', 'reviews.user', 'reviews.reactions']);
    }

    public function show($id)
    {
        return Restaurant::with(['categories.items', 'owner', 'reviews.user', 'reviews.reactions'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'image' => 'nullable|image|max:2048', 
        ]);

        $imageUrl = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'; // Default
        
        if ($request->hasFile('image')) {
            $imageUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
        }

        $restaurant = Restaurant::create([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'city' => $request->city,
            'image' => $imageUrl,
            'rating' => 4.5,
            'owner_id' => $request->user()->id,
        ]);

        return response()->json($restaurant, 201);
    }

    public function uploadImage(Request $request, $id)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $restaurant = Restaurant::findOrFail($id);
        
        if ($request->hasFile('image')) {
            $restaurant->image = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
            $restaurant->save();
        }

        return $restaurant;
    }

    public function updateLocation(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        
        // Ensure the user owns the restaurant
        if ($restaurant->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $restaurant->update([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return response()->json($restaurant->load(['categories.items', 'owner', 'reviews.user', 'reviews.reactions']));
    }
}
