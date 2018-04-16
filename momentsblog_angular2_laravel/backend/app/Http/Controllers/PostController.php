<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Post;
use App\User;

class PostController extends Controller
{   

    public function __construct()
    {
       // Apply the jwt.auth middleware to all methods in this controller
       $this->middleware('jwt.auth', ['except' => ['p_getPost', 'p_getSinglePost', 'deletePost']]);
    }

    //Add A New Post
    public function postPost(Request $request)
    {
        $this->validate($request, [
            'post_title' => 'required|max:255',
            'post_excerpt' => 'required|max:255',
            'post_content' => 'required',
            'user_id' => 'required'
        ]);

        $post = new Post;
        $post->post_title = $request->input('post_title');
        $post->post_excerpt = $request->input('post_excerpt');
        $post->post_content = $request->input('post_content');
        $post->img_path = $request->input('img_path');
        $post->user_id = $request->input('user_id');
        $post->save(['user_id' => Auth::id()]);
        return response()->json(['post' => $post], 201);
    }

    //Get All Posts
    public function getPost()
    {
        $post = Post::all();
        $response = [
            'post' => $post
        ];
        return response()->json($response, 200);
    }

    //Get All User Posts
    public function getUserPosts($id)
    {    
        $user = User::find($id);
        $posts = $user->posts()->get();
        $response = [
            'posts' => $posts
        ];
        return response()->json($response, 200);
    }

    //Get Single Post
    public function getSinglePost($id)
    {
        $post = Post::find($id);
        $response = [
            'post' => $post
        ];
        return response()->json($response, 200);
    }

    //Update Post
    public function putPost(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->post_title = $request->input('post_title');
        $post->post_excerpt = $request->input('post_excerpt');
        $post->post_content = $request->input('post_content');
        $post->img_path = $request->input('img_path');
        $post->save();
        return response()->json(['post' => $post], 200);
    }

    //Delete A Post
    public function deletePost($id)
    {
        $post = Post::find($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted'], 200);
    }

    //PUBLIC POST FUNCTIONS
    //NOT PROTECTED BY JWT

    //Get All Posts
    public function p_getPost()
    {
        $post = Post::all();
        $response = [
            'post' => $post
        ];
        return response()->json($response, 200);
    }

    //Get All User Posts
    public function p_getUserPosts($id)
    {    
        //$user = User::find($id);
        $posts = $user->posts()->get();
        $response = [
            'posts' => $posts
        ];
        return response()->json($response, 200);
    }

    //Get Single Post
    public function p_getSinglePost($id)
    {
        $post = Post::find($id);
        $response = [
            'post' => $post
        ];
        return response()->json($response, 200);
    }    




}