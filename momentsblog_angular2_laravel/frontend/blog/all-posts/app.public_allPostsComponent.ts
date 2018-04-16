import { Component, OnInit } from '@angular/core';
import { Post } from "../post";
import { PostService } from "../../services/post.service";

@Component({
	selector: '',
	templateUrl: './app/templates/public_all-posts.html',
	providers: [PostService]
})

export class PublicAllPostsComponent  {

  blogPosts: any;

  constructor(private postService: PostService) { }


  ngOnInit() {
    //Display user's posts OnInit
    this.postService.public_getPosts().subscribe( res => 
      this.blogPosts = res
      
    );
  }

}