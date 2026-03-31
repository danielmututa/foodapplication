<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Review;
use App\Models\ReviewReaction;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'restaurant_id' => $request->restaurant_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json($review, 201);
    }

    public function react(Request $request, $id)
    {
        $request->validate([
            'is_like' => 'required|boolean',
        ]);

        $reaction = ReviewReaction::updateOrCreate(
            ['review_id' => $id, 'user_id' => $request->user()->id],
            ['is_like' => $request->is_like]
        );

        return response()->json($reaction);
    }
}
