<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;

Route::post('/api/upload', [ImageController::class, 'uploadImage']);
Route::get('/api/profile/image', [ImageController::class, 'getProfileImage']);
Route::post('/api/update/profile/image', [ImageController::class, 'updateProfileImage']);
