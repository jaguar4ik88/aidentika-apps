<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductController extends Controller
{
    /**
     * GET /api/products
     */
    public function index()
    {
        $products = Product::query()
            ->orderByDesc('created_at')
            ->get();

        return JsonResource::collection($products);
    }
}
