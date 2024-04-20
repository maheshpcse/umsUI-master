import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EmployeeApiService {

	public employeeAPIUrl: any = 'https://ml.thelightbulb.ai/api/employees';

	public getEmployeeAPIUrl: any = `${environment.apiUrl}/get_employees_data`;
	public addEmployeeAPIUrl: any = `${environment.apiUrl}/add_employee_data`;
	public updateEmployeeAPIUrl: any = `${environment.apiUrl}/update_employee_data`;
	public updateEmployeeStatusAPIUrl: any = `${environment.apiUrl}/update_employee_status`;
	public deleteEmployeeAPIUrl: any = `${environment.apiUrl}/delete_employee_data`;

	constructor(
		private http: HttpClient
	) { }

	// getAllEmployeesData(data?: any) {
    //     return this.http.get<any>(this.employeeAPIUrl, data);
    // }

	// getAllEmployeesData(data?: any) {
    //     return this.http.post<any>(this.getEmployeeAPIUrl, data);
    // }

	// addorUpdateEmployeeData(data?: any, id?: any, action?: any) {
	// 	if (action == 'add') {
	// 		return this.http.post<any>(this.employeeAPIUrl, data);
	// 	} else {
	// 		return this.http.put<any>(this.employeeAPIUrl + `/${id}`, data);
	// 	}
	// }

	// deleteEmployeeData(id?: any) {
	// 	return this.http.delete<any>(this.employeeAPIUrl + `/${id}`);
	// }

	getAllEmployeesData(data?: any) {
        return this.http.post<any>(this.getEmployeeAPIUrl, data);
    }

	addorUpdateEmployeeData(data?: any, id?: any, action?: any) {
		if (action == 'add') {
			return this.http.post<any>(this.addEmployeeAPIUrl, data);
		} else {
			return this.http.put<any>(this.updateEmployeeAPIUrl + `/${id}`, data);
		}
	}

	updateEmployeeStatus(id?: any, data?: any) {
		return this.http.put<any>(this.updateEmployeeStatusAPIUrl + `/${id}`, data);
	}

	deleteEmployeeData(id?: any) {
		return this.http.delete<any>(this.deleteEmployeeAPIUrl + `/${id}`);
	}
}
