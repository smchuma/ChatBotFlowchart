<?php

use App\Http\Controllers\FlowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Flow;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/flow', [FlowController::class, 'index']);
Route::post('/flow', [FlowController::class, 'store']);
Route::get('/flow/{id}', [FlowController::class, 'show']);
Route::patch('/flow/{id}', [FlowController::class, 'update']);
Route::delete('/flow/{id}', [FlowController::class, 'destroy']);
