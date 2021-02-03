import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Category,CategoryViewModel } from '../models';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	private apiUrl = "api/category";
	@Output() RefreshList:EventEmitter<boolean> = new EventEmitter();
	
	constructor(private httpClient: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}
	getCategories(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(this.apiUrl + '/all');
	}

	getCategoryActivities():Observable<CategoryViewModel[]>{
		return this.httpClient.get<CategoryViewModel[]>(this.apiUrl+'/activities');
	}

	addCategory(category:Category):Observable<number>{
		return this.httpClient.post<number>(this.apiUrl+'/add',category, this.httpOptions);
	}

}
