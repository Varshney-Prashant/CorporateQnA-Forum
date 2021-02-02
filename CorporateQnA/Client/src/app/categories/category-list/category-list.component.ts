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
		this.categoryService.getCategoryActivities().subscribe(
			res => {
				this.categories=res;
				this.isDataLoaded=true;
			}
		);

	}

	filterBySearch(searchText:string){
		console.log(searchText)
		this.searchText=searchText;
	}

}
