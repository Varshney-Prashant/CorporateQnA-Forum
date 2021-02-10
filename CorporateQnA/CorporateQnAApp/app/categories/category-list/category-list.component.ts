import { Component, OnInit } from '@angular/core';

import { CategoryViewModel } from '../../models';
import { CategoryService } from '../../services';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {

	categories: CategoryViewModel[] = [];
	isDataLoaded:boolean=false;
	searchText: string="";

	constructor(public categoryService: CategoryService) { }

	ngOnInit(): void {
		this.getCategories();

		this.categoryService.RefreshList.subscribe(
			(value: any)=>{
			  this.getCategories();
			}
		   )

	}

	getCategories(){
		this.categoryService.getCategoryActivities().subscribe(
			res => {
				this.categories=res;
				console.log(res)
				this.isDataLoaded=true;
			}
		);
	}

	filterBySearch(searchText:string){
		this.searchText=searchText;
	}


}
