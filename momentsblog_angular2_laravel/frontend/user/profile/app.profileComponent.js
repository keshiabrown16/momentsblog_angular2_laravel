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
var user_service_1 = require("../../services/user.service");
var post_service_1 = require("../../services/post.service");
var ProfileComponent = (function () {
    function ProfileComponent(userService, router, postService) {
        this.userService = userService;
        this.router = router;
        this.postService = postService;
        this.errorMessage = "";
        //Hide update form
        this.isVisible = false;
        //Set User
        this.user = this.userService.getUser();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Display user's posts OnInit
        this.postService.getPosts().subscribe(function (res) {
            return _this.blogPosts = res;
        });
    };
    ProfileComponent.prototype.onShow = function () {
        //show update form
        this.isVisible = true;
    };
    ProfileComponent.prototype.onHide = function () {
        //show update form
        this.isVisible = false;
    };
    ProfileComponent.prototype.onUpdateUser = function () {
        var _this = this;
        var user = this.user;
        this.userService.updateUser(this.user)
            .subscribe(function (data) {
            console.log('User updated!');
        }, function (error) {
            _this.errorMessage = error.body;
        });
        //Store users updated details in localstorage
        var updated_user = this.user;
        localStorage.setItem('user', JSON.stringify(updated_user));
        //Remove update form from dom
        this.isVisible = false;
    };
    ProfileComponent.prototype.onDeleteUser = function () {
        var _this = this;
        //Get current user
        var user = JSON.parse(localStorage.getItem('user'));
        //Get ID of current user
        var u_id = user.id;
        //Update user by id
        this.userService.deleteUser(u_id).subscribe(function (result) { return console.log(result); }, function (error) { return _this.errorMessage = error; });
        this.userService.logout();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: '../app/templates/profile.html',
            providers: [user_service_1.UserService, post_service_1.PostService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, post_service_1.PostService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=app.profileComponent.js.map