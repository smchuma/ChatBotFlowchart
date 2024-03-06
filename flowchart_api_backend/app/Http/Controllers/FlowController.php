<?php

namespace App\Http\Controllers;

use App\Models\Flow;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class FlowController extends Controller
{
    //get single flow
    public function show($id){
        $flow = Flow::find($id);

        if (!$flow) {
            return response()->json(['message' => 'Flow not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($flow, Response::HTTP_OK);
    }

    public function index(){
        $flows = Flow::all();

        if (!$flows) {
            return response()->json(['message' => 'They are no flows'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($flows, Response::HTTP_OK);
    }

    //store
    public function store(Request $request) {

        $validateData = $request->validate([
            'name' => 'required | max:255',
        ]);

        $flow = new Flow([
            'name' => $validateData['name'],
            'data' => $request->data
        ]);


        $flow->save();

        return response()->json([
            'message' => 'Flow created',
            'flow_id' => $flow->id
        
        ], Response::HTTP_CREATED);
    }

    //update
    public function update($id, Request $request)
    {
        $flow = Flow::find($id);
    
        if (!$flow) {
            return response()->json(['message' => 'Flow not found'], Response::HTTP_NOT_FOUND);
        }


     // Extracting node ID and label from data JSON
    //  $data = json_decode($request->data, true);
    //  $nodeId = isset($data['nodes'][0]['id']) ? $data['nodes'][0]['id'] : null;
    //  $label = isset($data['nodes'][0]['data']['label']) ? $data['nodes'][0]['data']['label'] : null;
 
    //  // Log the node ID and label
    //  Log::info('Updated flow node:', ['node_id' => $nodeId, 'label' => $label]);




    
        $flow->data = $request->data; 
        $flow->save(); 

  
    
        return response()->json(['message' => 'Flow updated', 'flow' => $flow], Response::HTTP_OK);
    }



    public function destroy($id)
    {
        $flow = Flow::find($id);

        if (!$flow) {
            return response()->json(['message' => 'Flow not found'], Response::HTTP_NOT_FOUND);
        }

        $flow->delete();
        return response()->json(['message' => 'Flow deleted'], Response::HTTP_OK);
    }

}
