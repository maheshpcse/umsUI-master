import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AuthUserService } from 'src/app/api-serivces/auth-user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
		public formBuilder: FormBuilder,
		public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public toastr: ToastrManager,
	) { }

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		this.initiateForm();
	}

	initiateForm() {
		return this.loginForm = new FormGroup({
			userOrEmail: new FormControl('master', [Validators.required, Validators.maxLength(20)]),
			password: new FormControl('1234', [Validators.required, Validators.maxLength(20)]),
		});	
	}

	getFormValues(controlName?: any) {
		return this.loginForm.controls[controlName].value;
	}

	myError(controlName?: string, errorName?: string) {
		return this.loginForm.controls[controlName].hasError(errorName);
	}

	userLogin(form?: any) {
		if (this.setFormValidation(form)) {
			return this.getAlertMessage('error', 'Please fill the required fields.');
		}

		const loginPayload = {
			userOrEmail: this.getFormValues('userOrEmail'),
			password: this.getFormValues('password')
		}

		console.log('Post payload to user login data isss:', loginPayload);

        this.authUserService.userLogin(loginPayload).subscribe(async (response?: any) => {
            console.log('Get user login data response isss:', response);
            if (response && response['success'] == true) {
				this.getAlertMessage('success', response['message']);
				for (const [key, value] of Object.entries(response.data)) {
                    let newValue: any = value;
                    localStorage.setItem(key, newValue);
                    sessionStorage.setItem(key, newValue);
                }
                setTimeout(() => {
                    this.router.navigate(['/employees']);
                }, 1000);
            } else {
                this.getAlertMessage('error', response['message']);
            }
        }, (error?: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
        });
	}

	setFormValidation(form?: any) {
		if (form['invalid']) {
			return true;
		} else {
			return false;
		}
	}

	resetForm(form?: any) {
		form.reset();
		this.initiateForm();
	}

	getAlertMessage(status?: any, message?: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showCloseButton: true
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }

}
