import { Component, OnInit } from '@angular/core';
import { User } from "../../user/user";
import { UserService } from "../../services/user.service";
import { Post } from "../post";
import { PostService } from "../../services/post.service";

@Component({
	selector: 'posts',
	templateUrl: './app/templates/all-posts.html',
	providers: [PostService, UserService]
})
export class AllPostsComponent  {

  blogPosts: any;

  constructor(private postService: PostService, private userService: UserService) { }

  //Set User
  user = this.userService.getUser();

  ngOnInit() {
    //Display user's posts OnInit
    this.postService.getPosts().subscribe( res => 
      this.blogPosts = res
    );
  }

}