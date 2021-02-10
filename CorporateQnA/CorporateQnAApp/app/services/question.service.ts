import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Question,QuestionActivity,QuestionWithUser } from '../models';


@Injectable({
	providedIn: 'root'
})
export class QuestionService {

	questions: QuestionWithUser[] = [];
	private apiUrl = "api/question";
	constructor(private httpClient: HttpClient) { }

	getQuestions(): Observable<QuestionWithUser[]> {
		var res = this.httpClient.get<QuestionWithUser[]>(this.apiUrl + '/all');
		console.log("reergrtgr");
		return res;
	}

	getQuestionsByCategory(id: number): Observable<Question[]> {
		return this.httpClient.get<Question[]>(this.apiUrl + '/questionsByCategoryId/' + id);
	}

	addQuestion(question: Question): Observable<number> {
		console.log(question);
		return this.httpClient.post<number>(this.apiUrl + '/add', question);
	}

	updateActivity(questionActivity:QuestionActivity):Observable<any>{
		return this.httpClient.put<any>(this.apiUrl+'/updateActivity/'+questionActivity.id,questionActivity);
	}

	addActivity(questionActivity:QuestionActivity):Observable<number>{
		return this.httpClient.post<number>(this.apiUrl+'/addActivity', questionActivity);
	}

	updateQuestion(id:number, question:Question):Observable<any>{
		return this.httpClient.put<any>(this.apiUrl+'/update/'+id, question);
	}
}
