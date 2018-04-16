import { Injectable } from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


   @Injectable()
    export class AuthGuard implements CanActivate {

      constructor(private authService: AuthService, private router: Router) {}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        //If user is not logged in - return to login page
        if (!this.authService.loggedIn()) {
          this.router.navigateByUrl('/login');
          return false;
        }
        //else if the user is logged in, continue
        return this.authService.loggedIn();
      }
    }
 