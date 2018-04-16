import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: '',
    templateUrl: '../app/templates/login.html'
    //providers: [ UserService ]
})
export class LoginComponent implements OnInit {

    user: User = new User();
    
    constructor(
        private http: Http,
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {

    }


    onLogin() {

        let user = this.user;
        console.log("login button pressed");
        
        this.userService.login(user.email, user.password).subscribe(response => {

          // redirect user to their profile page if they logged in.
          this.router.navigate(['/profile']);
          console.log("logged In");

        }, err => {

          console.log(err);

        })

    }

}