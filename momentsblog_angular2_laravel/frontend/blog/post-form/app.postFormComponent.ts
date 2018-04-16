import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../user/user';
import { UserService } from '../../services/user.service';
import { Post } from '../../blog/post';
import { PostService } from '../../services/post.service';

@Component({
	selector: '',
	templateUrl: './app/templates/post-form.html',
  providers: [PostService, UserService]
})
export class PostFormComponent implements OnInit {

  errorMessage = "";

  constructor(private postService: PostService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

@Input() post:Post;
  //Set User
  user = this.userService.getUser();
  
  ngOnInit() {
    this.post = new Post();
    //Get Users ID
    let uid = JSON.parse(this.user.id);

    //the posts user_id = the user ID
    this.post.user_id = Number(uid);

    console.log('The user id on page load is: ', this.post.user_id);
  }

  onSubmit() {

      this.postService.createPost(this.post).subscribe(res => {

        // navigate to All Posts page

        this.router.navigate(['/posts']);
      }, err => {

        console.log(err);
        this.errorMessage = "An error saving the post.";
      });


    }


}