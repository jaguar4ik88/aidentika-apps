<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'status',
        'short_description',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}
