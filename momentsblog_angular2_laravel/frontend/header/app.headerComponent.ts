import { Component } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { UserService } from "../services/user.service";
import { AuthService }  from '../services/auth.service';

@Component({
	selector: 'header',
	templateUrl: './app/templates/header.html'
})

export class HeaderComponent  {

	constructor(public router: Router, public userService: UserService, public authService: AuthService) {}

	//Variables to hold active nav classes
	isClass1Visible: false;

	isClass2Visible: false;

	isClass3Visible: false;

	isClass4Visible: false;

	isClass5Visible: false;

	ngOnInit() {


	}

}