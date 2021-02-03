import { Component, Input, OnInit } from '@angular/core';

import { UserInfoView, User } from '../../models';
import { UserService } from '../../services';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {
	@Input() user!: UserInfoView;
	currentUser:User=new User({});
	constructor(private userService:UserService) { }

	ngOnInit(): void {
	}

	likeUser(){
		this.user.noOfLikes=this.user.noOfLikes+1;
		console.log(this.user.id)
		this.userService.likeUser(this.user.id).subscribe();
	}

	dislikeUser(){
		this.user.noOfDislikes=this.user.noOfDislikes+1;
		this.userService.dislikeUser(this.user.id).subscribe();
	}

}
