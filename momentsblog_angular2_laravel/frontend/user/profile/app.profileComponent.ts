import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../user";
import { UserService } from "../../services/user.service";
import { Post } from "../../blog/post";
import { PostService } from "../../services/post.service";

@Component({
	selector: 'profile',
	templateUrl: '../app/templates/profile.html',
	providers: [UserService, PostService]
})
export class ProfileComponent implements OnInit  {

errorMessage = "";
blogPosts: any;


	constructor(private userService: UserService, 
				private router: Router, 
				private postService: PostService) 
	{ }

//Hide update form
isVisible = false;

  //Set User
  user = this.userService.getUser();

	ngOnInit() {
	    //Display user's posts OnInit
	    this.postService.getPosts().subscribe( res => 
	      this.blogPosts = res
	    );
	}

	onShow() {
		//show update form
		this.isVisible = true;
	}

	onHide() {
		//show update form
		this.isVisible = false;
	}

	onUpdateUser() {
		let user = this.user;
        this.userService.updateUser(this.user)
            .subscribe(
                data => {
                	console.log('User updated!');
                },
                error => {
                	this.errorMessage = error.body;
        });

      //Store users updated details in localstorage
      let updated_user = this.user
      localStorage.setItem('user', JSON.stringify(updated_user));
      //Remove update form from dom
      this.isVisible = false;
	}

	onDeleteUser() {
		//Get current user
		let user = JSON.parse(localStorage.getItem('user'));
		//Get ID of current user
    	let u_id = user.id;
    	//Update user by id
		this.userService.deleteUser(u_id).subscribe(
          result => console.log(result),
          error => this.errorMessage = <any>error
    	);

		this.userService.logout();    	
	}

}