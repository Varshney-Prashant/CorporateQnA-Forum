import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoView } from '../models';
import { UserService } from '../services';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

	searchText: string="";
	users:UserInfoView[]=[];
	constructor(private userService:UserService, private router:Router) { }

	ngOnInit(): void {
		this.userService.getUsers().subscribe(
			res=>{
				this.users=res;
			}
		)

	}
	
	showUser(currentUser:UserInfoView){
		this.userService.user=currentUser;
		this.router.navigate(['/user-details',currentUser.id]);
	}

}
