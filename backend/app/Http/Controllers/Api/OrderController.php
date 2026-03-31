<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    public function index(Request $request)
    {
        return Order::with(['restaurant', 'items.item'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'total_amount' => 'required|numeric',
            'items' => 'required|array',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'delivery_address' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($request) {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'restaurant_id' => $request->restaurant_id,
                'total_amount' => $request->total_amount,
                'delivery_address' => $request->delivery_address,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item['menu_item_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            return $order->load('items.item');
        });
    }

    public function merchantOrders(Request $request, $restaurantId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        if ($restaurant->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return Order::with(['user', 'items.item'])
            ->where('restaurant_id', $restaurantId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
