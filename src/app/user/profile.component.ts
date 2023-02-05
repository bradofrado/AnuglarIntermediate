import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
  em {float: right; color: #E05C65; padding-left: 10px; }
  .error input {background-color: #E3C3C5}
  .error ::-webkit-input-placeholder {color: #999}
  .error ::-moz-placeholder {color: #999}
  .error :-moz-placeholder {color: #999}
  .error :-ms-input-placeholder {color: #999}
  `]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private authService: AuthService, 
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) {}
  
  ngOnInit(): void {
      const firstname = new FormControl
        (this.authService.currentUser.firstname, [Validators.required, 
          Validators.pattern('[a-zA-Z].*')]);
      const lastname = new FormControl
        (this.authService.currentUser.lastname, Validators.required);
      this.profileForm = new FormGroup({
      firstname, lastname
      })
  }

  saveProfile(formValue: any) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValue.firstname, formValue.lastname)
				.subscribe(() => {
					this.router.navigate(['events']);
      		this.toastr.success('Profile Saved');
				});
    }
  }

	logout() {
		this.authService.logout()
			.subscribe(() => {
				this.router.navigate(['/user/login'])
			});
	}

  cancel() {
    this.router.navigate(['events'])
  }

  validateName(control: any) {
    return control.valid || control.untouched
  }
}