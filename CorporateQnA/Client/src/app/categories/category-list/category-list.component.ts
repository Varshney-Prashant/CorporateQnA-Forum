import { Component, OnInit } from '@angular/core';
import { CategoryViewModel } from 'src/app/models/categoryViewModel';
import { CategoryService } from 'src/app/services/category.service';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styles: [
	]
})
export class CategoryListComponent implements OnInit {

	categories: CategoryViewModel[] = [];
	searchText: any = { name: '' };
	constructor(private categoryService: CategoryService) { }

	ngOnInit(): void {
		console.log("erferf")
		this.categoryService.getCategoryActivities().subscribe(
			res => {
				for(var i=0;i<res.length;){
					var prevCategoryId=res[i].categoryId;
					var category=new CategoryViewModel({});
					category.categoryId=res[i].categoryId;
					category.description=res[i].categoryDescription;
					category.name=res[i].categoryName;
					category.monthTags=0;
					category.weekTags=0;
					category.totalTags=0;
					while(prevCategoryId==res[i].categoryId){
						if(i<res.length){
							if(res[i].dayDiff<=30 && res[i].dayDiff>7){
								category.monthTags++;
							}
							else if(res[i].dayDiff<=7 && res[i].dayDiff>0){
								category.weekTags++;
							}
							if(res[i].dayDiff!=0){
								category.totalTags++;
							}
							i++;
							if(i>=res.length){
								break;
							}
						}						
					}
					this.categories.push(category);
				}
				console.log(this.categories)
			}
		)

	}

	filterBySearch(searchText:string){
		console.log(searchText)
		this.searchText=searchText;
	}

}
