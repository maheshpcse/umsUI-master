import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AuthUserService } from 'src/app/api-serivces/auth-user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

    public signupForm: FormGroup;

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
		return this.signupForm = new FormGroup({
			fullname: new FormControl('testadmin', [Validators.required, Validators.maxLength(20)]),
			username: new FormControl('admin', [Validators.required, Validators.maxLength(20)]),
			email: new FormControl('testadmin123@gmail.com', [Validators.required, Validators.maxLength(100)]),
			password: new FormControl('1234', [Validators.required, Validators.maxLength(20)]),
			address: new FormControl('Banglore, India', [Validators.required, Validators.maxLength(20)]),
			mobile: new FormControl(9876543210, [Validators.required]),
			// profile: new FormControl(null, [Validators.required, Validators.maxLength(100)])
		});
	}

	getFormValues(controlName?: any) {
		return this.signupForm.controls[controlName].value;
	}

	myError(controlName?: string, errorName?: string) {
		return this.signupForm.controls[controlName].hasError(errorName);
	}

	userSignup(form?: any) {
		if (this.setFormValidation(form)) {
			return this.getAlertMessage('error', 'Please fill the required fields.');
		}

		const signupPayload = {
			fullname: this.getFormValues('fullname'),
			username: this.getFormValues('username'),
			email: this.getFormValues('email'),
			password: this.getFormValues('password'),
			address: this.getFormValues('address'),
			mobile: this.getFormValues('mobile').toString(),
			profile: null,
		}

		console.log('Post payload to user signup data isss:', signupPayload);

        this.authUserService.userSignup(signupPayload).subscribe(async (response?: any) => {
            console.log('Get user signup data response isss:', response);
            if (response && response['success'] == true) {
				this.getAlertMessage('success', response['message']);
                setTimeout(() => {
                    this.router.navigate(['/login']);
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
