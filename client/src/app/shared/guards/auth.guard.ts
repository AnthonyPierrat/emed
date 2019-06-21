import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(this.authService.isLoggedIn());
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/signin'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }

}