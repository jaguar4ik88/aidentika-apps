<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutController extends Controller
{
    /**
     * GET /api/about
     */
    public function show()
    {
        $about = About::query()->latest('id')->first();

        if (! $about) {
            $about = new About([
                'headline' => 'AI‑driven продуктова студія',
                'subheadline' => 'Допомагаємо компаніям запускати мобільні та SaaS‑продукти з використанням AI.',
                'content' => 'Aidentika Apps — продуктова студія, що проєктує API‑first архітектуру, мобільні клієнти та адмін‑панелі для масштабованих AI та SaaS рішень.',
            ]);
        }

        return new JsonResource($about);
    }
}
