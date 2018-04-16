import { Component } from '@angular/core';

import {User} from "./user/user";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {PostService} from "./services/post.service";
import {Post} from "./blog/post";

import { HeaderComponent } from './header/app.headerComponent';
import { FooterComponent } from './footer/app.footerComponent';

@Component({
  selector: 'my-app',
  templateUrl: './app/main.html'
})

export class AppComponent { }