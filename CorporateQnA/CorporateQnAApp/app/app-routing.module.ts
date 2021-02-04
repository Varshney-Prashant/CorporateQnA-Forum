import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './auth';
import { CategoryListComponent } from './categories';
import { AnswerComponent, HomeComponent } from './home';
import { LoginComponent, RegistrationComponent, UserComponent } from './user';
import { UserDetailsComponent,UserListComponent } from './user-list';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: 'loginUser', component: UserComponent,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'login' },
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegistrationComponent }
		]
	},
	{ path:'user',component:UserListComponent , children:[
		{ path:'user-details/:id',component:UserDetailsComponent }
	]},
	
	{
		path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard],
		children: [
			{ path: 'answer/:id', component: AnswerComponent }
		]
	},
	{ path: 'category', component: CategoryListComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
