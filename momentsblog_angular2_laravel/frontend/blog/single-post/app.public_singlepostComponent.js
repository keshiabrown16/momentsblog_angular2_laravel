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
var post_service_1 = require('../../services/post.service');
var PublicSinglePostComponent = (function () {
    function PublicSinglePostComponent(router, route, userService, postService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.postService = postService;
        this.navigated = false; // true if navigated here
        //Get The Name of The Person Who Wrote The Blog Posts
        this.user = JSON.parse(localStorage.getItem('bpowner'));
    }
    PublicSinglePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params
            .flatMap(function (params) {
            _this.id = +params['id'];
            return Rx_1.Observable.forkJoin(_this.postService.public_getPost(_this.id));
        }).subscribe(function (res) {
            _this.post = res[0];
            _this.keys = Object.keys(_this.post);
            console.log('user id =: ', res[0].user_id);
            var u_id = res[0].user_id;
            var userdetails = _this.userService.getUserById(u_id).subscribe(function (res) {
                var user = JSON.parse(localStorage.getItem('bpowner'));
            });
        });
    };
    PublicSinglePostComponent = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: './app/templates/public_single-post.html',
            providers: [post_service_1.PostService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService, post_service_1.PostService])
    ], PublicSinglePostComponent);
    return PublicSinglePostComponent;
}());
exports.PublicSinglePostComponent = PublicSinglePostComponent;
//# sourceMappingURL=app.public_singlepostComponent.js.map