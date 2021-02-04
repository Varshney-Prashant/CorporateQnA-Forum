import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoView } from '../models';
import { UserService } from '../services';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

	searchText: string="";
	users:UserInfoView[]=[];
	showDetails:boolean=false;
	constructor(private userService:UserService, private router:Router, private route:ActivatedRoute) { }

	ngOnInit(): void {
		this.userService.getUsers().subscribe(
			res=>{
				this.users=res;
			}
		)
		this.userService.onUsersPage.emit(true)		

		this.userService.backToUsersPage.subscribe(
			(res: any)=>{
				if(res){
					this.showDetails=false;
				}
			}
		)
	}
	
	showUser(currentUser:UserInfoView){
		this.showDetails=true;
		this.userService.user=currentUser;
		this.router.navigate(['user/user-details',currentUser.id]);
	}

}
