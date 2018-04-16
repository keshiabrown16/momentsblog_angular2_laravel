import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { AuthService } from "./auth.service";
import { User } from "../user/user";

@Injectable()
export class UserService {

  //Logged in = not true initially
  loggedIn: boolean = false;

  //Set Original Headers
  headers = new Headers({
    'Content-Type': 'application/json',
  });

  //Base URL of API
  baseUrl = "http://mi-linux.wlv.ac.uk/~0714089/api";

  constructor
  (
    private http: Http, 
    public router: Router,
    private authService: AuthService
  ) 

  //logged in = true if accessToken is not null or undefined 
  {this.loggedIn = !!localStorage.getItem('accessToken')}

  //Log user in if credentials match
  login(email: string, password: string) {
    return this.http.post(
      this.baseUrl + '/login/auth', 
      { email:email, password: password }, 
      {headers: this.headers}
    ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        let jwt = response.json();
        if (jwt && jwt.token) {
            // store user details and jwt token in local storage to 
            //set loggedIn to true - keep user logged in between page refreshes 
            localStorage.setItem("accessToken", JSON.stringify(jwt)); 
            this.loggedIn = true;              
        }
      })//Then get the users details using the jwt returned from login
    .flatMap((jwt) => this.http.get('http://mi-linux.wlv.ac.uk/~0714089/api/auth/user', this.jwt()))
          .map((res: Response) => {
            //Store users details in localstorage
            let user = res.json()
              localStorage.setItem('user', JSON.stringify(user));
            }
          )
  }


  //Authenticate User <---- get user details based on JWT
  getUser(){
    const authUser = localStorage.getItem('user')
    return authUser?JSON.parse(localStorage.getItem('user')) : {}
  }

  //Log User Out 
  logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/home');
  }

  //Set User Logged In
  isLoggedIn() {
    return this.loggedIn;
  }

  //Register User
  register(user: User): Observable<any>{
    let url = this.baseUrl + "/register";

    return this.http.post(url, user, {headers: this.headers}).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    });
  }

  //Get user by ID
  getUserById(id: string){
    let url = this.baseUrl + "/user/" + id;
    return this.http.get(url, {headers: this.headers}).map((res: Response) => {
              let user = res.json();
              let un = user.name;
              localStorage.setItem('bpowner', JSON.stringify(un));
            }
          )
  }

  //Update User
  updateUser(user: User) {
    let us_er = JSON.parse(localStorage.getItem('user'));
    let u_id = us_er.id;
    let url = this.baseUrl + "/user/" + u_id
    return this.http.post(url, JSON.stringify(user), this.jwt());
  }

  //Delete User
  deleteUser(id: number): Observable<any> {
    let url = this.baseUrl + "/delete/user/" + id;
    return this.http
        .post(url, this.jwt())
        .map(res => res.json()).catch(err => {
          return Observable.throw(err);
        });
  }

  //Updated headers with jwt accessToken from local storage - for authenticated user with getAuthedUser()
  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('accessToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers(
              { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
  }


}