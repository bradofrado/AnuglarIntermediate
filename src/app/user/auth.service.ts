import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { IUser } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: IUser;

	constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
		const loginInfo = { username: username, password: password}
		const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

		return this.http.post('/api/login', loginInfo, options)
			.pipe(tap((data: any) => {
				this.currentUser = <IUser>data['user'];
			}))
			.pipe(catchError(err => {
				return of(false)
			}))
    
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

	checkAuthenticationStatus() {
		const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
		this.http.get('/api/currentIdentity', options)
			// .pipe(tap(data => {
			// 	if (data instanceof Object) {
			// 		this.currentUser = <IUser>data;
			// 	}
			// }))
	}

  updateCurrentUser(firstname: string, lastname: string) {
		this.currentUser.firstname = firstname;
		this.currentUser.lastname = lastname;

		const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

		return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
  }

	logout() {
		//this.currentUser = undefined;

		const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
		return this.http.post('/api/logout', {}, options);
	}
}