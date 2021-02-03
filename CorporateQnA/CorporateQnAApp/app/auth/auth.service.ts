import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { User } from '../models';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private isLoggedIn: boolean = false;
	user: User=new User({});
	isAdmin: boolean = false;
	retUrl = "";

	constructor() { }

	login() {
		if (localStorage.getItem('accessToken') != null) {
			this.isLoggedIn = true;
		}
		return of(this.isLoggedIn);
	}

	isUserLoggedIn(): boolean {
		return this.isLoggedIn;
	}

	logoutUser(): void {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userId');
		this.isLoggedIn = false;
	}
}
