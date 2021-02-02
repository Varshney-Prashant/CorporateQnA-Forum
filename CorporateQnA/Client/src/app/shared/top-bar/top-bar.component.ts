import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth';
import { UserInfoView } from 'src/app/models';
import { UserService } from 'src/app/services';

import { Icons } from '../icons';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styles: [
	]
})
export class TopBarComponent implements OnInit {

	currentDate: Date = new Date();
	icons: Icons = new Icons;
	user:UserInfoView=new UserInfoView({})
	constructor(private router:Router, private userService:UserService, private authService:AuthService) { }

	ngOnInit(): void {
		var userId=localStorage.getItem('userId') !
		this.userService.getUser(userId).subscribe(
			res=>{
				this.user=res;
			}
		)
	}

	logOut() {
		this.authService.logoutUser();
		this.router.navigate(['/loginUser'])
	}

}
