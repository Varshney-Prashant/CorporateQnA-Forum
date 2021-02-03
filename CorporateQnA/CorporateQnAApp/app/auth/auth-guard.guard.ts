import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

	constructor(private router:Router,public toastr:ToastrService, private authService:AuthService ) {}
	  
  	canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if (localStorage.getItem('accessToken')==null) {
			this.toastr.warning('Please Login to continue', 'warning!');
			this.authService.retUrl=state.url;
			console.log(state.url)
			this.router.navigate(['loginUser']);
			return false;
		} 
		return true;
	}
  
}
