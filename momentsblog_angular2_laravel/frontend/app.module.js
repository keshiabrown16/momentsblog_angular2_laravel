"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var auth_guard_1 = require('./guards/auth.guard');
var app_component_1 = require('./app.component');
var app_headerComponent_1 = require('./header/app.headerComponent');
var app_footerComponent_1 = require('./footer/app.footerComponent');
var app_homeComponent_1 = require('./home/app.homeComponent');
var auth_service_1 = require('./services/auth.service');
var user_service_1 = require('./services/user.service');
var app_loginComponent_1 = require('./user/login/app.loginComponent');
var app_registerComponent_1 = require('./user/register/app.registerComponent');
var app_profileComponent_1 = require('./user/profile/app.profileComponent');
//private blog posts
var app_allPostsComponent_1 = require('./blog/all-posts/app.allPostsComponent');
var app_singlepostComponent_1 = require('./blog/single-post/app.singlepostComponent');
//Public Blog Posts
var app_public_singlepostComponent_1 = require('./blog/single-post/app.public_singlepostComponent');
var app_public_AllPostsComponent_1 = require('./blog/all-posts/app.public_AllPostsComponent');
//Create a post
var app_postFormComponent_1 = require('./blog/post-form/app.postFormComponent');
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    //Path to home
    { path: 'home', component: app_homeComponent_1.HomeComponent },
    //Path to login page
    { path: 'login', component: app_loginComponent_1.LoginComponent },
    //Path to register page
    { path: 'register', component: app_registerComponent_1.RegisterComponent },
    //Path to users profile page
    { path: 'profile', component: app_profileComponent_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    //Path to display all posts
    { path: 'posts', component: app_allPostsComponent_1.AllPostsComponent, canActivate: [auth_guard_1.AuthGuard] },
    //Path to display a post by it's ID
    { path: 'post/:id', component: app_singlepostComponent_1.SinglePostComponent, canActivate: [auth_guard_1.AuthGuard] },
    //Path to create a new post
    { path: 'post-new', component: app_postFormComponent_1.PostFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    //Path to list of the every user in db posts (public)
    //{ path: ':blog/posts', component: PublicAllPostsComponent },
    //Path to list of the users posts (public)
    { path: 'blog', component: app_public_AllPostsComponent_1.PublicAllPostsComponent },
    //Path to display a single post by the posts id (public)
    { path: 'blogpost/:id', component: app_public_singlepostComponent_1.PublicSinglePostComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(routes),
            ],
            declarations: [
                app_component_1.AppComponent,
                app_headerComponent_1.HeaderComponent,
                app_footerComponent_1.FooterComponent,
                app_homeComponent_1.HomeComponent,
                app_loginComponent_1.LoginComponent,
                app_registerComponent_1.RegisterComponent,
                app_profileComponent_1.ProfileComponent,
                app_allPostsComponent_1.AllPostsComponent,
                app_postFormComponent_1.PostFormComponent,
                app_singlepostComponent_1.SinglePostComponent,
                app_public_AllPostsComponent_1.PublicAllPostsComponent,
                app_public_singlepostComponent_1.PublicSinglePostComponent
            ],
            providers: [
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService,
                user_service_1.UserService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map