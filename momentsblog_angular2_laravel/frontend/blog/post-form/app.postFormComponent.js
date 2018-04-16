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
var router_1 = require("@angular/router");
var user_service_1 = require('../../services/user.service');
var post_1 = require('../../blog/post');
var post_service_1 = require('../../services/post.service');
var PostFormComponent = (function () {
    function PostFormComponent(postService, userService, router, route) {
        this.postService = postService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.errorMessage = "";
        //Set User
        this.user = this.userService.getUser();
    }
    PostFormComponent.prototype.ngOnInit = function () {
        this.post = new post_1.Post();
        //Get Users ID
        var uid = JSON.parse(this.user.id);
        //the posts user_id = the user ID
        this.post.user_id = Number(uid);
        console.log('The user id on page load is: ', this.post.user_id);
    };
    PostFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.postService.createPost(this.post).subscribe(function (res) {
            // navigate to All Posts page
            _this.router.navigate(['/posts']);
        }, function (err) {
            console.log(err);
            _this.errorMessage = "An error saving the post.";
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', post_1.Post)
    ], PostFormComponent.prototype, "post", void 0);
    PostFormComponent = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: './app/templates/post-form.html',
            providers: [post_service_1.PostService, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService, user_service_1.UserService, router_1.Router, router_1.ActivatedRoute])
    ], PostFormComponent);
    return PostFormComponent;
}());
exports.PostFormComponent = PostFormComponent;
//# sourceMappingURL=app.postFormComponent.js.map