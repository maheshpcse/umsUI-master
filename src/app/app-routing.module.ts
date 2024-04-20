import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './api-serivces/auth-guard.service';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { EmployeeInfoComponent } from './employees/employee-info/employee-info.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'employees',
		canActivate: [AuthGuardService],
		component: EmployeeInfoComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
