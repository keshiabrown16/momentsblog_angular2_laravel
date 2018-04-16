import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
	selector: '',
	templateUrl: '../app/templates/register.html'
})
export class RegisterComponent implements OnInit {


  user: User = new User();


  constructor(
  		private userService: UserService, 
  		private router: Router) { }

  ngOnInit() {

  }


  onRegister(){


    this.userService.register(this.user).subscribe(res => {

      //log new user details to console <----- testing only, remove this
      console.log("An account has been created with information: ", res);

      //redirect user to login page if registration was succesfull
      this.router.navigate(['/login']);

    }, err => {

      console.log(err);
    });

  }
}