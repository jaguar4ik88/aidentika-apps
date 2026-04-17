<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * POST /api/contact
     */
    public function __invoke(ContactRequest $request): JsonResponse
    {
        $lang = strtolower((string) $request->header('Accept-Language', 'uk'));
        App::setLocale(str_starts_with($lang, 'en') ? 'en' : 'uk');

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
            'message' => __('contact.success'),
        ]);
    }
}
