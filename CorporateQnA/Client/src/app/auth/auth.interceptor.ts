import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {tap} from "rxjs/operators"

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

	constructor(private router:Router) {}
	  
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		if(localStorage.getItem('accessToken')!=null){
			const clonedRequest=req.clone({
			headers:req.headers.set('Authorization','Bearer '+localStorage.getItem('accessToken'))
			});
			return next.handle(clonedRequest).pipe(
				tap(
					success=>{},
					err=>{
						if(err.status == 401){
							localStorage.removeItem('accessToken');
							localStorage.removeItem('userId')
							this.router.navigateByUrl('/loginUser/login');
						}
					}
				)
			)
		}
		return next.handle(req.clone());
	}
}