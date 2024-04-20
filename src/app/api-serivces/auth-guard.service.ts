import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from './auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    userId: any = sessionStorage.getItem('userId');
    role: any = sessionStorage.getItem('role');

    constructor(
        private router: Router,
        public authUserService: AuthUserService,
        public toastr: ToastrManager
    ) { }

    canActivate(): boolean {
        if (this.role === 'employee' || this.authUserService.isLoggedIn()) {
            return true;
        } else {
            this.toastr.warningToastr('You are not authenticated or authorized user, Please login or signup.');
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['/login']);
            return false;
        }
    }
}
