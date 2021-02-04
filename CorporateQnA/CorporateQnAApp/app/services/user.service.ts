import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { QuestionWithUser,UserInfoView } from '../models';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	@Output() userQuestions:EventEmitter<QuestionWithUser[]> =new EventEmitter<QuestionWithUser[]>();
	@Output() onUsersPage:EventEmitter<boolean>=new EventEmitter<boolean>();
	@Output() backToUsersPage:EventEmitter<boolean>=new EventEmitter<boolean>();
	user:UserInfoView=new UserInfoView({});
	private apiUrl ="api/user";

	constructor(private httpClient:HttpClient) { }

	getUser(id:string):Observable<UserInfoView>{
		return this.httpClient.get<UserInfoView>(this.apiUrl+'/'+id);
	}
	getUsers():Observable<UserInfoView[]>{
		return this.httpClient.get<UserInfoView[]>(this.apiUrl);
	}

	likeUser(id:string):Observable<any>{
		return this.httpClient.get(this.apiUrl+'/like/'+id)
	}

	dislikeUser(id:string):Observable<any>{
		return this.httpClient.get(this.apiUrl+'/dislike/'+id);
	}
	getQuestionsByUserId(id:string):Observable<QuestionWithUser[]>{
		return this.httpClient.get<QuestionWithUser[]>(this.apiUrl+'/byUserId'+id);
	}
}
