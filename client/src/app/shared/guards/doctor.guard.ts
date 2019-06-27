import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Types } from '../enums/type.enum';

@Injectable({
    providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

    private user: any;

    constructor(private authService: AuthService, private router: Router) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            if (this.user._type === Types.DOCTOR) {
                return true;
            }
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