import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionWithUser } from '../../models';
import { UserInfoView } from '../../models';
import { UserService } from '../../services';
import { Icons } from '../../shared';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

	@ViewChild('Questions', { static: true, read: ViewContainerRef })
	public questionsPlaceholder!: ViewContainerRef;
	questions: QuestionWithUser[] = [];
	icons: Icons = new Icons
	questionSelected: boolean = false;
	user:UserInfoView=new UserInfoView({});
	constructor(public userService: UserService, private resolver: ComponentFactoryResolver,private router:Router) { }

	ngOnInit(): void {
		this.user=this.userService.user;
		this.showQuestionsComponent()
	}

	showQuestionsComponent() {
		import('../../home/home.component').then(({ HomeComponent }) => {
			const componentFactory = this.resolver.resolveComponentFactory(HomeComponent);
			const { instance } = this.questionsPlaceholder.createComponent(componentFactory);
		});
	}

	goBack() {
		this.router.navigate(['user'])
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
