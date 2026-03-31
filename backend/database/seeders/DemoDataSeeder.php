<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class DemoDataSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Demo Merchant
        $merchant = User::create([
            'name' => 'Pizza Palace Owner',
            'email' => 'merchant@foodapp.com',
            'password' => Hash::make('password'),
            'role' => 'restaurant',
        ]);

        // Demo Client
        $client = User::create([
            'name' => 'John Doe',
            'email' => 'client@foodapp.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        // Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Pizza Palace',
            'description' => 'The best pizza in town with fresh ingredients.',
            'address' => '123 Pizza St',
            'city' => 'Foodville',
            'image' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
            'rating' => 4.8,
            'owner_id' => $merchant->id,
        ]);

        // Categories
        $pizzas = MenuCategory::create([
            'name' => 'Pizzas',
            'restaurant_id' => $restaurant->id,
        ]);

        $drinks = MenuCategory::create([
            'name' => 'Drinks',
            'restaurant_id' => $restaurant->id,
        ]);

        // Items
        MenuItem::create([
            'name' => 'Margherita',
            'description' => 'Classic tomato and mozzarella.',
            'price' => 12.99,
            'image' => 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
            'category_id' => $pizzas->id,
        ]);

        MenuItem::create([
            'name' => 'Pepperoni',
            'description' => 'Loaded with spicy pepperoni.',
            'price' => 14.99,
            'image' => 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
            'category_id' => $pizzas->id,
        ]);

        MenuItem::create([
            'name' => 'Coca Cola',
            'description' => 'Chilled 500ml bottle.',
            'price' => 2.50,
            'category_id' => $drinks->id,
        ]);
    }
}
