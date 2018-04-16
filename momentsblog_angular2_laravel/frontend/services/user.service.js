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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/map');
var auth_service_1 = require("./auth.service");
var UserService = (function () {
    function UserService(http, router, authService) {
        this.http = http;
        this.router = router;
        this.authService = authService;
        //Logged in = not true initially
        this.loggedIn = false;
        //Set Original Headers
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        //Base URL of API
        this.baseUrl = "http://mi-linux.wlv.ac.uk/~0714089/api";
        this.loggedIn = !!localStorage.getItem('accessToken');
    }
    //Log user in if credentials match
    UserService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.baseUrl + '/login/auth', { email: email, password: password }, { headers: this.headers }).map(function (response) {
            // login successful if there's a jwt token in the response
            var jwt = response.json();
            if (jwt && jwt.token) {
                // store user details and jwt token in local storage to 
                //set loggedIn to true - keep user logged in between page refreshes 
                localStorage.setItem("accessToken", JSON.stringify(jwt));
                _this.loggedIn = true;
            }
        }) //Then get the users details using the jwt returned from login
            .flatMap(function (jwt) { return _this.http.get('http://mi-linux.wlv.ac.uk/~0714089/api/auth/user', _this.jwt()); })
            .map(function (res) {
            //Store users details in localstorage
            var user = res.json();
            localStorage.setItem('user', JSON.stringify(user));
        });
    };
    //Authenticate User <---- get user details based on JWT
    UserService.prototype.getUser = function () {
        var authUser = localStorage.getItem('user');
        return authUser ? JSON.parse(localStorage.getItem('user')) : {};
    };
    //Log User Out 
    UserService.prototype.logout = function () {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/home');
    };
    //Set User Logged In
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    //Register User
    UserService.prototype.register = function (user) {
        var url = this.baseUrl + "/register";
        return this.http.post(url, user, { headers: this.headers }).map(function (res) { return res.json(); }).catch(function (err) {
            return Rx_1.Observable.throw(err);
        });
    };
    //Get user by ID
    UserService.prototype.getUserById = function (id) {
        var url = this.baseUrl + "/user/" + id;
        return this.http.get(url, { headers: this.headers }).map(function (res) {
            var user = res.json();
            var un = user.name;
            localStorage.setItem('bpowner', JSON.stringify(un));
        });
    };
    //Update User
    UserService.prototype.updateUser = function (user) {
        var us_er = JSON.parse(localStorage.getItem('user'));
        var u_id = us_er.id;
        var url = this.baseUrl + "/user/" + u_id;
        return this.http.post(url, JSON.stringify(user), this.jwt());
    };
    //Delete User
    UserService.prototype.deleteUser = function (id) {
        var url = this.baseUrl + "/delete/user/" + id;
        return this.http
            .post(url, this.jwt())
            .map(function (res) { return res.json(); }).catch(function (err) {
            return Rx_1.Observable.throw(err);
        });
    };
    //Updated headers with jwt accessToken from local storage - for authenticated user with getAuthedUser()
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('accessToken'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, auth_service_1.AuthService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map