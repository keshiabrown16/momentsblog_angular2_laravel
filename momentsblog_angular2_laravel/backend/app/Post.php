<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	protected $table = 'posts';
	
    protected $fillable = [
        'post_title', 'post_excerpt', 'post_content', 'img_path', 'user_id',
    ];

    //A Post Belongs To A User
	public function user() 
	{ 
		return $this->belongsTo('App\User'); 
	}

}

