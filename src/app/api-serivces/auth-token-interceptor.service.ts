import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenInterceptorService {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('called intercept()');

        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const username = sessionStorage.getItem('username');
        const email = sessionStorage.getItem('email');
        const role = sessionStorage.getItem('role');

        if (!token) {
            return next.handle(request);
        }

        const Request = request.clone({
            headers: request.headers.set('Authorization', [`${token}`, userId,username,email,role]),
            setHeaders: {
                userId,
                username,
                email,
                role
            }
        });

        return next.handle(Request);
    }
}
