import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

	private apiUrl="https://localhost:44360/api/category";
  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<Category[]>{
	return this.httpClient.get<Category[]>(this.apiUrl+'/all');
  }
}
