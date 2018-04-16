//App Module
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/app.headerComponent';
import { FooterComponent} from './footer/app.footerComponent';
import { HomeComponent } from './home/app.homeComponent';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { LoginComponent } from './user/login/app.loginComponent';
import { RegisterComponent } from './user/register/app.registerComponent';
import { ProfileComponent } from './user/profile/app.profileComponent';
//private blog posts
import { AllPostsComponent } from './blog/all-posts/app.allPostsComponent';
import { SinglePostComponent } from './blog/single-post/app.singlepostComponent';
//Public Blog Posts
import { PublicSinglePostComponent } from './blog/single-post/app.public_singlepostComponent';
import { PublicAllPostsComponent } from './blog/all-posts/app.public_AllPostsComponent';
//Create a post
import { PostFormComponent } from './blog/post-form/app.postFormComponent';


const routes = 
				[
					{ path: '', redirectTo: 'home', pathMatch: 'full' },

					//Path to home
					{ path: 'home', component: HomeComponent },

					//Path to login page
					{ path: 'login', component: LoginComponent },

					//Path to register page
					{ path: 'register', component: RegisterComponent },

					//Path to users profile page
					{ path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard] },

					//Path to display all posts
					{ path: 'posts', component: AllPostsComponent, canActivate: [ AuthGuard] },

					//Path to display a post by it's ID
					{ path: 'post/:id', component: SinglePostComponent, canActivate: [ AuthGuard] },

					//Path to create a new post
					{ path: 'post-new', component: PostFormComponent, canActivate: [ AuthGuard] },

          //Path to list of the every user in db posts (public)
          //{ path: ':blog/posts', component: PublicAllPostsComponent },

          //Path to list of the users posts (public)
          { path: 'blog', component: PublicAllPostsComponent },

          //Path to display a single post by the posts id (public)
          { path: 'blogpost/:id', component: PublicSinglePostComponent  },
					
				];

@NgModule({
  imports:      [ 
  					BrowserModule,
  					FormsModule,
  					ReactiveFormsModule,
    				HttpModule,
    				RouterModule.forRoot(routes), 
  				],
  declarations: [ 
  					AppComponent,
  					HeaderComponent,
  					FooterComponent,
  					HomeComponent,
  					LoginComponent,
  					RegisterComponent,
  					ProfileComponent,
  					AllPostsComponent,
  					PostFormComponent,
  					SinglePostComponent,
            PublicAllPostsComponent,
            PublicSinglePostComponent
  				],
  providers:  [ 
            AuthGuard,
            AuthService,
            UserService,
            //PostService,
          ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
