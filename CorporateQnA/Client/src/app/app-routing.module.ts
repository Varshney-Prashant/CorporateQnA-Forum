import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AnswerComponent } from './home/answer/answer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent, RegistrationComponent, UserComponent } from './user';

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
