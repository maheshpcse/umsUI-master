import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    public getUserLoginAPIUrl: any = `${environment.apiUrl}/login`;
    public getUserSignupAPIUrl: any = `${environment.apiUrl}/signup`;

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    userLogin(data?: any) {
        return this.http.post<any>(this.getUserLoginAPIUrl, data);
    }

    userSignup(data?: any) {
        return this.http.post<any>(this.getUserSignupAPIUrl, data);
    }

    getUserToken() {
        return sessionStorage.getItem('token');
    }

    getUserId() {
        if (this.getUserRole() === 'employee') {
            return sessionStorage.getItem('userId');
        }
    }

    getUserRole() {
        return sessionStorage.getItem('role');
    }

    getUserPayload() {
        const token = this.getUserToken();
        if (token) {
            const userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn(): boolean {
        const userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    isLoggedOut(role?: any) {
        localStorage.clear();
        sessionStorage.clear();
        if (role == 'employee') {
            this.router.navigate(['/login']);
        }
    }
}
