import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Post } from "../blog/post";
import { AuthService } from "./auth.service";
import { User } from "../user/user";
import { UserService } from "./user.service";

@Injectable()
export class PostService {

  //Base URL of API
  baseUrl = "http://mi-linux.wlv.ac.uk/~0714089/api";


  constructor(private http: Http, 
              private userService: UserService, 
              private authService: AuthService) {}

  /* LOGGED IN BLOG POST METHODS
  ________________________________________ */

  //Get All Posts 
  getPosts(): Observable<Post[]> {
    //get logged in users id
    let id = this.userService.getUser();
    let user_id = id.id;

    let url = this.baseUrl + "/" + user_id + "/posts";
    return this.http.get(url, this.jwt())
    .map(
      (response: Response) => {
        return response.json().posts;
      }
    );
  }

  //Get A Single Post
  getPost(id: number): Observable<Post> {
    return this.getPosts()
      .map(posts => posts.find(post => post.id == id));
  }

  createPost(post: Post): Observable<any> {
  
    let url = this.baseUrl + "/post";

    //get logged in users id
    let id = this.userService.getUser();
    let user_id = id.id;
    console.log('i have posted the user id as: ', user_id);

    return this.http.post(url, post, this.jwt()).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    })
  }

  updatePost(post: Post): Observable<any> {
    let url = this.baseUrl + "/post/" + post.id
    return this.http.post(url, post, this.jwt()).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    })
  }

  deletePost(id: number): Observable<any> {
    let url = this.baseUrl + "/delete/post/" + id;
    return this.http
        .post(url, this.jwt())
        .map(res => res.json()).catch(err => {
          return Observable.throw(err);
        });
  }

  //UPDATE HEADERS WITH JWT AUTHORIZATION
  
  private jwt() {
      // create authorization header with jwt token
      let loggedUser = JSON.parse(localStorage.getItem('accessToken'));
      if (loggedUser && loggedUser.token) {
          let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedUser.token });
          return new RequestOptions({ headers: headers });
      }
  }


  /* PUBLIC BLOG VIEW METHODS
  _____________________________ */

  //Set Headers
  headers = new Headers({
    'Content-Type': 'application/json',
  });

  //Get All Posts 
  public_getPosts(): Observable<Post[]> {

    let url = this.baseUrl + "/blog";
    return this.http.get(url, {headers:this.headers})
    .map(
      (response: Response) => {
        return response.json().post;
      }
    );
  }

  //Get A Single Post
  public_getPost(id: number): Observable<Post> {
    return this.public_getPosts()
      .map(posts => posts.find(post => post.id == id));
  }


}