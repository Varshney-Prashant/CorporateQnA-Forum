import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryViewModel } from '../models/categoryViewModel';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	private apiUrl = "https://localhost:44360/api/category";
	constructor(private httpClient: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}
	getCategories(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(this.apiUrl + '/all');
	}

	getCategoryActivities():Observable<any>{
		return this.httpClient.get<any>(this.apiUrl+'/activities/');
	}

	addCategory(category:Category):Observable<number>{
		return this.httpClient.post<number>(this.apiUrl+'/add',category, this.httpOptions);
	}

}
