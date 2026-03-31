<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class MenuItemController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'menu_category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048', 
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $data['image'] = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
        }

        return MenuItem::create($data);
    }

    public function uploadImage(Request $request, $id)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $item = MenuItem::findOrFail($id);
        
        if ($request->hasFile('image')) {
            $item->image = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
            $item->save();
        }

        return $item;
    }
}
