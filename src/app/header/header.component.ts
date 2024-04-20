import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../api-serivces/auth-user.service';
declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public role: any = sessionStorage.getItem('role');

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService
    ) { }

    ngOnInit() {
    }

    userLogout() {
        $('#logoutConfirmModal').modal('hide');
        this.authUserService.isLoggedOut(this.role);
        this.role = '';
    }

}
