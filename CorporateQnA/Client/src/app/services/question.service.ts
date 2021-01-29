import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions:Question[]=[];
  private apiUrl ="https://localhost:44360/api/question";
  constructor(private httpClient:HttpClient) { }

  httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}
  getQuestions():Observable<Question[]>{
    var res = this.httpClient.get<Question[]>(this.apiUrl + '/all');
    console.log(res);
	return res;
  }

  getQuestionsByCategory(id:number):Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.apiUrl+'/questionsByCategoryId/'+id);
  }
}
