<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * POST /api/contact
     */
    public function __invoke(ContactRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $to = config('mail.from.address');
        $subject = 'New contact request from Aidentika Apps website';

        if ($recipient = config('mail.contact_recipient')) {
            $to = $recipient;
        }

        Mail::raw(
            "Name: {$validated['name']}\nEmail: {$validated['email']}\n\nMessage:\n{$validated['message']}",
            function ($message) use ($to, $subject) {
                $message->to($to)->subject($subject);
            }
        );

        return response()->json([
            'success' => true,
            'message' => 'Ваш запрос успешно отправлен. Мы свяжемся с вами в ближайшее время.',
        ]);
    }
}
