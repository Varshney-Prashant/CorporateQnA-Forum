import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from '../../models';
import {LoginService } from '../../services';
import {AuthService} from '../../auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	user:User=new User({});
	form!: FormGroup;
	retUrl:string="";
	userId:number=0;
	mobileNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
	emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

 	constructor(private authService: AuthService, 
    		private router: Router,  public loginService:LoginService, private toastr:ToastrService
	) { }

  ngOnInit(): void {

	this.form=new FormGroup({
		'email': new FormControl(null, [Validators.required, Validators.email]) !,
		'password': new FormControl(null,Validators.required),
	}) !;

  }

 	onSubmit(){
		this.user.emailId=this.form.value.email;
		this.user.password=this.form.value.password;

		this.loginService.loginUser(this.user).subscribe(
			(res:any)=>{
			localStorage.setItem('accessToken',res.token.accessToken);
			localStorage.setItem('userId',res.token.userId);
			this.user.name=res.token.name;
			this.user.id=res.token.userId;
			this.authService.user=this.user
			this.loginService.user=this.user;
			this.toastr.success('LoggedIn', 'succesfully!');
			this.authService.login().subscribe(data => {
				if (this.authService.retUrl!=null) {
				this.router.navigate( [this.authService.retUrl]);
				} else {
				this.router.navigate( ['loginUser']);
				}
			});
			},
			err=>{
			this.toastr.error("Incorrect email or Password","Try Again")
			}
		)
	}

}
