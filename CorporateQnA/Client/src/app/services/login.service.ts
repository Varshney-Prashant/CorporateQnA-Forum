import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
	private authUrl="https://localhost:44360/api/authentication"
	user:User=new User({});
	userId:number=0;
	retUrl:string="";

	constructor(private httpClient:HttpClient) { }
	  
  	httpOptions = {
    		headers: new HttpHeaders({
	 	'Content-Type': 'application/json'
    		})
	}

  	registerUser(user:User): Observable<boolean> {
    		return this.httpClient.post<boolean>(this.authUrl+'/register', JSON.stringify(user), this.httpOptions);
 	}

  	loginUser(user:User): Observable<any>{
    		return this.httpClient.post<any>(this.authUrl+'/login',JSON.stringify(user),this.httpOptions);
  	} 
}
