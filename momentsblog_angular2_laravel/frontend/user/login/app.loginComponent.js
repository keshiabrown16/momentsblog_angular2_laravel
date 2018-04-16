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
var user_1 = require("../user");
var http_1 = require('@angular/http');
var user_service_1 = require("../../services/user.service");
var auth_service_1 = require("../../services/auth.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(http, userService, authService, router) {
        this.http = http;
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        var user = this.user;
        console.log("login button pressed");
        this.userService.login(user.email, user.password).subscribe(function (response) {
            // redirect user to their profile page if they logged in.
            _this.router.navigate(['/profile']);
            console.log("logged In");
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: '../app/templates/login.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService, auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=app.loginComponent.js.map