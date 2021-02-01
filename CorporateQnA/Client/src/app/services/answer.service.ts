import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.model';
import { AnswerWithUser } from '../models/answerWithUser.model';
import { Question } from '../models/question.model';
import { QuestionWithUser } from '../models/questionWithUser.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiUrl="https://localhost:44360/api/question";
  private apiAnswerUrl="https://localhost:44360/api/answer";
  constructor(private httpClient:HttpClient) { }

  httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}
  getQuestionWithUser(id:number):Observable<QuestionWithUser>{
    return this.httpClient.get<QuestionWithUser>(this.apiUrl+'/questionWithUser/'+id);
  }
  getUserOfQuestion(id:number):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl+'/'+id);
  }

  getAnswersWithUser(id:number):Observable<AnswerWithUser[]>{
    console.log(id)
    return this.httpClient.get<AnswerWithUser[]>(this.apiAnswerUrl+'/answerWithUser/'+id);

  }

  updateAnswer(answer:Answer):Observable<void>{
    return this.httpClient.put<void>(this.apiAnswerUrl+'/update/'+answer.id,answer,this.httpOptions);
  }
}
