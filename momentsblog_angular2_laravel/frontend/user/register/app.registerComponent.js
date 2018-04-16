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
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var RegisterComponent = (function () {
    function RegisterComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.user = new user_1.User();
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegister = function () {
        var _this = this;
        this.userService.register(this.user).subscribe(function (res) {
            //log new user details to console <----- testing only, remove this
            console.log("An account has been created with information: ", res);
            //redirect user to login page if registration was succesfull
            _this.router.navigate(['/login']);
        }, function (err) {
            console.log(err);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: '../app/templates/register.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=app.registerComponent.js.map