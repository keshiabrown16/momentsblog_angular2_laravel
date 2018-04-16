import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { User } from "../../user/user";
import { UserService } from "../../services/user.service";
import { Post } from "../post";
import { PostService } from '../../services/post.service';

@Component({
	selector: '',
	templateUrl: './app/templates/public_single-post.html',
	providers: [PostService]
})
export class PublicSinglePostComponent implements OnInit {
  error: any;
  navigated = false; // true if navigated here


	id: number;
	post_title: string;
	post_excerpt: string;
	post_content: string;
	img_path: string;
	user_id: string;
	post: Post[];
	keys: String[];
	sub: Subscription;


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
    	private postService: PostService) {}

	//Get The Name of The Person Who Wrote The Blog Posts
	user = JSON.parse(localStorage.getItem('bpowner'));

	ngOnInit() {
    this.sub = this.route.params
      .flatMap(params => {
        this.id = +params['id'];
        return Observable.forkJoin(this.postService.public_getPost(this.id));
      }).subscribe((res: Array<any>) => {
        this.post = res[0];
        this.keys = Object.keys(this.post);
        console.log('user id =: ', res[0].user_id);
        let u_id = res[0].user_id;
        let userdetails = this.userService.getUserById(u_id).subscribe(res => {
        	let user = JSON.parse(localStorage.getItem('bpowner'));
		});

      })

	}

}