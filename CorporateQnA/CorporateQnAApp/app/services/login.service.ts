import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
	private authUrl="api/authentication"
	user:User=new User({});
	userId:number=0;
	retUrl:string="";

	constructor(private httpClient:HttpClient) { }
	  

  	registerUser(user:User): Observable<boolean> {
    		return this.httpClient.post<boolean>(this.authUrl+'/register', user);
 	}

  	loginUser(user:User): Observable<any>{
    		return this.httpClient.post<any>(this.authUrl+'/login',user);
  	} 
}
