import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth';
import { UserInfoView } from '../../models';
import { UserService } from '../../services';

import { Icons } from '../icons';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {

	currentDate: Date = new Date();
	icons: Icons = new Icons;
	user:UserInfoView=new UserInfoView({})
	constructor(private router:Router, private userService:UserService, private authService:AuthService) { }

	ngOnInit(): void {
		var userId=localStorage.getItem('userId') !
		if(userId!=null){
			this.userService.getUser(userId).subscribe(
				res=>{
					console.log(res)
					this.user=res;
				}
			)
		}
		
	}

	logOut() {
		this.authService.logoutUser();
		this.router.navigate(['/loginUser'])
	}

}
