import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getQuestionWithUser(id:number):Observable<QuestionWithUser>{
    return this.httpClient.get<QuestionWithUser>(this.apiUrl+'/questionWithUser/'+id);
  }
  getUserOfQuestion(id:number):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl+'/'+id);
  }

  getAnswersWithUser(id:number):Observable<AnswerWithUser[]>{
    return this.httpClient.get<AnswerWithUser[]>(this.apiAnswerUrl+'/answerWithUser/'+id);

  }
}
