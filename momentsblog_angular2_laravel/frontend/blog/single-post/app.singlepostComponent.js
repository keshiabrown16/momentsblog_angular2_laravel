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
var Rx_1 = require('rxjs/Rx');
var user_service_1 = require("../../services/user.service");
var post_1 = require("../post");
var post_service_1 = require('../../services/post.service');
var SinglePostComponent = (function () {
    function SinglePostComponent(router, route, userService, postService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.postService = postService;
        this.errorMessage = "";
        //Set User
        this.user = this.userService.getUser();
    }
    SinglePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.post = new post_1.Post();
        this.sub = this.route.params
            .flatMap(function (params) {
            _this.id = +params['id'];
            return Rx_1.Observable.forkJoin(_this.postService.getPost(_this.id));
        }).subscribe(function (res) {
            _this.post = res[0];
            _this.keys = Object.keys(_this.post);
            console.log(_this.post);
        });
    };
    SinglePostComponent.prototype.onUpdatePost = function () {
        var _this = this;
        this.postService.updatePost(this.post).subscribe(function (res) {
            _this.router.navigate(['/post', _this.id]);
            console.log('Post ID:' + _this.id + ' Updated');
        }, function (err) {
            console.log('error is', err);
            _this.errorMessage = "An error updating the post.";
        });
    };
    SinglePostComponent.prototype.onDeletePost = function () {
        var _this = this;
        this.sub = this.route.params
            .flatMap(function (params) {
            _this.id = +params['id'];
            return Rx_1.Observable.forkJoin(_this.postService.deletePost(_this.id));
        }).subscribe(function (res) {
        });
        this.router.navigateByUrl('/profile');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', post_1.Post)
    ], SinglePostComponent.prototype, "post", void 0);
    SinglePostComponent = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: './app/templates/single-post.html',
            providers: [post_service_1.PostService, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService, post_service_1.PostService])
    ], SinglePostComponent);
    return SinglePostComponent;
}());
exports.SinglePostComponent = SinglePostComponent;
//# sourceMappingURL=app.singlepostComponent.js.map