<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Resources\Json\JsonResource;

class PostController extends Controller
{
    /**
     * GET /api/posts
     */
    public function index()
    {
        $posts = Post::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->with('categories')
            ->get();

        return JsonResource::collection($posts);
    }

    /**
     * GET /api/posts/{slug}
     */
    public function show(string $slug)
    {
        $post = Post::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->with('categories')
            ->firstOrFail();

        return new JsonResource($post);
    }
}
