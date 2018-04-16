<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/*
----------------------
REGISTER, LOGIN, USER DETAILS & LOGOUT ROUTES
----------------------
*/

//Add CORS middleware to routes
Route::group(['middleware' => ['Cors']], function(){

//register
Route::post('/register', [
	'uses' => 'UserController@Register'
]); 

//login
Route::post('/login/auth', [
	'uses' => 'UserController@Login'
]); 

//get logged in user details by JWT
/*Route::get('/auth/user', [
	'uses' => 'UserController@getAuthenticatedUser'
]);*/

Route::get('/auth/user', array('middleware' => ['jwt.auth'], function() {
    if ( ! $user = \JWTAuth::parseToken()->authenticate() ) {
        return response()->json(['User Not Found'], 404);
    }
    $user = \JWTAuth::parseToken()->authenticate();
    $token = \JWTAuth::getToken();
    //$newToken = \JWTAuth::refresh($token);
    return response()->json(['id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'created_at' => $user->created_at], 200);
}));

//logout
Route::get('/login/destroy', [
	'uses' => 'AuthController@Logout'
]);

/*
----------------------
C.R.U.D USER ROUTES ROUTES
----------------------
*/

//Show All Users
Route::get('/users', [
	'uses' => 'UserController@index'
]);

//Get User By ID
Route::get('/user/{id}', [
	'uses' => 'UserController@show'
]);

//Update A User
Route::post('/user/{id}', [
	'uses' => 'UserController@update'
]);

//Delete A User
Route::post('/delete/user/{id}', [
	'uses' => 'UserController@destroy'
]);

/*
----------------------
C.R.U.D BLOG POST ROUTES
----------------------
*/

//Add Post
Route::post('/post', [
	'uses' => 'PostController@postPost'
]);

//Get All Posts
Route::get('/posts', [
	'uses' => 'PostController@getPost'
]);

//Get All User Posts By User ID
Route::get('{user}/posts', [
	'uses' => 'PostController@getUserPosts'
]);

//Get Single Post By Post ID
Route::get('/post/{id}', [
	'uses' => 'PostController@getSinglePost'
]);

//Update Single Post
Route::post('/post/{id}', [
	'uses' => 'PostController@putPost'
]);

//Delete Single Post
Route::post('delete/post/{id}', [
	'uses' => 'PostController@deletePost'
]);

/*
----------------------
PUBLIC BLOG POST ROUTES
----------------------
*/
//Get All Posts (by all users)
Route::get('/blog', [
	'uses' => 'PostController@p_getPost'
]);

//Get All User Posts By User ID
Route::get('/blog/{user}/posts', [
	'uses' => 'PostController@p_getUserPosts'
]);

//Get Users Single Post By Post ID
Route::get('/blog/post/{id}', [
	'uses' => 'PostController@p_getSinglePost'
]);




});