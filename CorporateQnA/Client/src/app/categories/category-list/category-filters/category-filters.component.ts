import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Icons } from 'src/app/shared/icons';

@Component({
	selector: 'app-category-filters',
	templateUrl: './category-filters.component.html',
	styles: [
	]
})
export class CategoryFiltersComponent implements OnInit {

	searchText: any = { name: '' };
	showFilter: string = "popular";
	icons:Icons=new Icons
	addCategoryForm!: FormGroup;
	category:Category=new Category({});
	modalRef!: BsModalRef;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};
	@Output() searchFilter =new EventEmitter<string>();
	constructor(private modalService: BsModalService, private categoryService:CategoryService) { }

	ngOnInit(): void {
		this.addCategoryForm = new FormGroup({
			'name': new FormControl(null, Validators.required)!,
			'description': new FormControl(null, Validators.required)!
		})!;
	}

	searchTextFilter() {
		this.searchFilter.emit(this.searchText)
	}

	resetFilters(){
		this.searchText = "";
	}
	openModal(template: TemplateRef<any>) {
		console.log(template)
		this.modalRef = this.modalService.show(template, this.config);
	}
	
	closeModal() {
		this.modalRef.hide();
	}
	filterQuestions(){

	}

	addCategory(){
		this.category.name=this.addCategoryForm.value.name;
		this.category.description=this.addCategoryForm.value.description
		this.categoryService.addCategory(this.category).subscribe();
		this.closeModal();
	}
}
