<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\User;

class UserController extends Controller
{   

    public function __construct()
    {
       // Apply the jwt.auth middleware to all methods in this controller
       // except for the Login & Register method.
       $this->middleware('jwt.auth', ['except' => ['Login', 'Register', 'show', 'destroy']]);
    }


    //Get All Users
    public function index($id = null)
    {
        $user = User::all();
        $response = [
            'user' => $user
        ];
        return response()->json($response, 200);
    }

    //Login User
    public function Login(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }

    //Get User Details by JWT
    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    //Register user
    public function Register(Request $request) 
    {   

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|max:255',
            'password' => 'required|min:8|max:12'
        ]);

        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->save();
        //$user = User::all();
        return response()->json($user);
    }

    //Show user by ID
    public function show($id) {
        return User::find($id);
    }

    //Update user
    public function update(Request $request, $id) 
    {
    $user = User::find($id);
    
    if (!$user) {
        return response()->json(['message' => 'Sorry, user cannot be found'], 404);
    }
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if ( ! $request->input('password') == '')
        {
            $user->password = bcrypt($request->input('password'));
        }
        $user->save();
        return response()->json(['message' => 'user updated']);
    }

    //Delete user
    public function destroy(Request $request, $id) 
    {
        $user = User::find($id);
        if($user->delete()){
            return response()->json(['result' => 'success']);
        }
    }
}