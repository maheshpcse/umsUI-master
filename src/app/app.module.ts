import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DateChangePipe } from './employees/date-change.pipe';
import { AuthUserService } from './api-serivces/auth-user.service';
import { AuthGuardService } from './api-serivces/auth-guard.service';
import { AuthTokenInterceptorService } from './api-serivces/auth-token-interceptor.service';
import { EmployeeApiService } from './employees/employee-api.service';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { EmployeeInfoComponent } from './employees/employee-info/employee-info.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { EmployeeActionComponent } from './employees/employee-action/employee-action.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        EmployeeInfoComponent,
        DateChangePipe,
        EmployeeFormComponent,
        EmployeeActionComponent,
        LoginComponent,
        SignupComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        CalendarModule,
        ToastrModule.forRoot(),
        AngularMultiSelectModule,
        NgMultiSelectDropDownModule.forRoot(),
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        SweetAlert2Module.forRoot(),
        Ng2SearchPipeModule
    ],
    entryComponents: [
        EmployeeFormComponent,
        EmployeeActionComponent
    ],
    providers: [
        AuthUserService,
        AuthGuardService,
        EmployeeApiService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
