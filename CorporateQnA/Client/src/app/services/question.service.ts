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

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}
	getQuestions(): Observable<QuestionWithUser[]> {
		var res = this.httpClient.get<QuestionWithUser[]>(this.apiUrl + '/all');
		console.log(res);
		return res;
	}

	getQuestionsByCategory(id: number): Observable<Question[]> {
		return this.httpClient.get<Question[]>(this.apiUrl + '/questionsByCategoryId/' + id);
	}

	addQuestion(question: Question): Observable<number> {
		return this.httpClient.post<number>(this.apiUrl + '/add', question, this.httpOptions);
	}

	updateActivity(questionActivity:QuestionActivity):Observable<any>{
		return this.httpClient.put<any>(this.apiUrl+'/updateActivity/'+questionActivity.id,questionActivity,this.httpOptions);
	}
}
