<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ReviewController;

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/google-login', [AuthController::class, 'googleLogin']);

// Public Restaurant Routes
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Order Routes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/restaurants/{restaurantId}/orders', [OrderController::class, 'merchantOrders']);

    // Merchant Restaurant Management
    Route::get('/my-restaurant', [RestaurantController::class, 'myRestaurant']);
    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::post('/restaurants/upload-image', [RestaurantController::class, 'uploadImage']);
    
    // Profile
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::post('/reviews/{id}/react', [ReviewController::class, 'react']);

    // Menu Item Management
    Route::post('/menu-items', [MenuItemController::class, 'store']);
    Route::post('/menu-items/{id}/upload-image', [MenuItemController::class, 'uploadImage']);
    Route::put('/restaurants/{id}/location', [RestaurantController::class, 'updateLocation']);
});


