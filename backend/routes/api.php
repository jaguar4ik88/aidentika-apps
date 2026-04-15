<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api', 'throttle:60,1'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);

    Route::get('/about', [AboutController::class, 'show']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{slug}', [PostController::class, 'show']);

    Route::post('/contact', ContactController::class)->middleware('throttle:10,1');
});

