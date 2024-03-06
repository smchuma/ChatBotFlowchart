<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Responses;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function index()
    {
        return Message::all();
    }

    public function store(Request $request)
    {
        $input = strtolower($request->user_message);

        $response = Responses::where('keyword', 'like', '%' . $input . '%')->first();
        
        if ($response) {
            $store = Message::create([
                'user_message' => $input,
                'response' => $response->response 
            ]);
            
            return response()->json($store->response, 200);
        } else {
            return response()->json(['error' => 'No matching response found'], 404);
        }
      
    }
}
