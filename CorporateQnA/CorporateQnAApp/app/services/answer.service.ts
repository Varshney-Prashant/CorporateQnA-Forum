import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Answer, AnswerWithUser, QuestionWithUser, User } from '../models';


@Injectable({
	providedIn: 'root'
})
export class AnswerService {

	private apiUrl = "api/question";
	private apiAnswerUrl = "api/answer";
	@Output() RefreshList:EventEmitter<boolean> = new EventEmitter();
	@Output() MarkQuestion:EventEmitter<boolean> = new EventEmitter();

	constructor(private httpClient: HttpClient) { }

	getQuestionWithUser(id: number): Observable<QuestionWithUser> {
		return this.httpClient.get<QuestionWithUser>(this.apiUrl + '/questionWithUser/' + id);
	}
	getUserOfQuestion(id: number): Observable<User> {
		return this.httpClient.get<User>(this.apiUrl + '/' + id);
	}

	getAnswersWithUser(id: number): Observable<AnswerWithUser[]> {
		console.log(id)
		return this.httpClient.get<AnswerWithUser[]>(this.apiAnswerUrl + '/answerWithUser/' + id);

	}

	updateAnswer(answer: Answer): Observable<void> {
		return this.httpClient.put<void>(this.apiAnswerUrl + '/update/' + answer.id, answer);
	}

	addAnswer(answer:Answer):Observable<number>{
		return this.httpClient.post<number>(this.apiAnswerUrl+'/add', answer);
	}

	incrementAnswerCount(id:number):Observable<number>{
		return this.httpClient.get<number>(this.apiUrl+'/answerCount/'+id);
	}
}
