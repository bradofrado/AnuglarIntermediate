import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px; }
  `
  ]
})
export class LoginComponent {
  username!: string;
  password!: string;
  mouseoverLogin = false;
	loginInvalid = false;
	
  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    this.authService.loginUser(formValues.username, formValues.password)
			.subscribe(resp => {
				if (!resp) {
					this.loginInvalid = true;
				} else {
					this.router.navigate(['events'])
				}
			});
  }

  cancel() {
    this.router.navigate(['events'])
  }
}