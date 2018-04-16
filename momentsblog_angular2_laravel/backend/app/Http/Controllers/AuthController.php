<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AuthController extends Controller
{
  public function Login(){ 
    if(Auth::attempt(Input::only('email','password'))){ 
      return Auth::user(); 
    } else { 
      return 'invalid email/password combo'; 
    } 
  } 
  public Function Logout(){ 
    Auth::logout(); return 'logged out'; 
  } 
}