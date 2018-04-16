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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var auth_service_1 = require("./auth.service");
var user_service_1 = require("./user.service");
var PostService = (function () {
    function PostService(http, userService, authService) {
        this.http = http;
        this.userService = userService;
        this.authService = authService;
        //Base URL of API
        this.baseUrl = "http://mi-linux.wlv.ac.uk/~0714089/api";
        /* PUBLIC BLOG VIEW METHODS
        _____________________________ */
        //Set Headers
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
    }
    /* LOGGED IN BLOG POST METHODS
    ________________________________________ */
    //Get All Posts 
    PostService.prototype.getPosts = function () {
        //get logged in users id
        var id = this.userService.getUser();
        var user_id = id.id;
        var url = this.baseUrl + "/" + user_id + "/posts";
        return this.http.get(url, this.jwt())
            .map(function (response) {
            return response.json().posts;
        });
    };
    //Get A Single Post
    PostService.prototype.getPost = function (id) {
        return this.getPosts()
            .map(function (posts) { return posts.find(function (post) { return post.id == id; }); });
    };
    PostService.prototype.createPost = function (post) {
        var url = this.baseUrl + "/post";
        //get logged in users id
        var id = this.userService.getUser();
        var user_id = id.id;
        console.log('i have posted the user id as: ', user_id);
        return this.http.post(url, post, this.jwt()).map(function (res) { return res.json(); }).catch(function (err) {
            return Observable_1.Observable.throw(err);
        });
    };
    PostService.prototype.updatePost = function (post) {
        var url = this.baseUrl + "/post/" + post.id;
        return this.http.post(url, post, this.jwt()).map(function (res) { return res.json(); }).catch(function (err) {
            return Observable_1.Observable.throw(err);
        });
    };
    PostService.prototype.deletePost = function (id) {
        var url = this.baseUrl + "/delete/post/" + id;
        return this.http
            .post(url, this.jwt())
            .map(function (res) { return res.json(); }).catch(function (err) {
            return Observable_1.Observable.throw(err);
        });
    };
    //UPDATE HEADERS WITH JWT AUTHORIZATION
    PostService.prototype.jwt = function () {
        // create authorization header with jwt token
        var loggedUser = JSON.parse(localStorage.getItem('accessToken'));
        if (loggedUser && loggedUser.token) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    //Get All Posts 
    PostService.prototype.public_getPosts = function () {
        var url = this.baseUrl + "/blog";
        return this.http.get(url, { headers: this.headers })
            .map(function (response) {
            return response.json().post;
        });
    };
    //Get A Single Post
    PostService.prototype.public_getPost = function (id) {
        return this.public_getPosts()
            .map(function (posts) { return posts.find(function (post) { return post.id == id; }); });
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService, auth_service_1.AuthService])
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map