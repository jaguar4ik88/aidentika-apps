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
                'headline' => 'AI-Driven Product Studio',
                'subheadline' => 'Мы помогаем компаниям запускать мобильные и SaaS-продукты с использованием AI.',
                'content' => "Aidentika Apps — продуктовая студия, которая проектирует API-first архитектуру, мобильные клиенты и админ-панели для масштабируемых AI и SaaS решений.",
            ]);
        }

        return new JsonResource($about);
    }
}
