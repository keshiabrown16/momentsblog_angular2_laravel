import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { User } from "../../user/user";
import { UserService } from "../../services/user.service";
import { Post } from "../post";
import { PostService } from '../../services/post.service';

@Component({
	selector: '',
	templateUrl: './app/templates/single-post.html',
	providers: [PostService, UserService]
})
export class SinglePostComponent implements OnInit {
  error: any;
  errorMessage = "";

	id: number;
	post_title: string;
	post_excerpt: string;
	post_content: string;
	img_path: string;
	
	keys: String[];
	sub: Subscription;


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
    	private postService: PostService) {}

	@Input() post:Post;
	
	//Set User
	user = this.userService.getUser();

	ngOnInit() {
	this.post = new Post();

    this.sub = this.route.params
      .flatMap(params => {
        this.id = +params['id'];
        return Observable.forkJoin(this.postService.getPost(this.id));
      }).subscribe((res: Array<any>) => {
        this.post = res[0];
        this.keys = Object.keys(this.post);
        console.log(this.post);
      });
	}

	onUpdatePost() {
	    
	      this.postService.updatePost(this.post).subscribe(res => {

	        this.router.navigate(['/post', this.id]);

	        console.log('Post ID:' + this.id + ' Updated')

	      }, err => {

	        console.log('error is', err); 
	        this.errorMessage = "An error updating the post.";
	      });

	}

	onDeletePost() {
		this.sub = this.route.params
	      .flatMap(params => {
	        this.id = +params['id'];
	        return Observable.forkJoin(this.postService.deletePost(this.id));
	    	}).subscribe((res: Array<any>) => {
	      });

	    this.router.navigateByUrl('/profile');
	}
	
}