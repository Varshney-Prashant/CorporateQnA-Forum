import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Category, CategoryViewModel } from '../../../models';
import { CategoryService } from '../../../services';
import { Icons } from '../../../shared';

@Component({
	selector: 'app-category-filters',
	templateUrl: './category-filters.component.html'
})
export class CategoryFiltersComponent implements OnInit {

	searchText: string="";
	showFilter: string = "popular";
	icons:Icons=new Icons
	addCategoryForm!: FormGroup;
	category:Category=new Category({});
	categories:CategoryViewModel[]=[]
	modalRef!: BsModalRef;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};
	@Output() searchFilter =new EventEmitter<string>();

	constructor(private modalService: BsModalService, private categoryService:CategoryService, private toastr:ToastrService) { }

	ngOnInit(): void {
		this.initializeForm();
	}

	initializeForm(){
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
		this.searchFilter.emit(this.searchText)
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}
	
	closeModal() {
		this.modalRef.hide();
	}

	addCategory(){
		this.category.name=this.addCategoryForm.value.name;
		this.category.description=this.addCategoryForm.value.description
		this.categoryService.addCategory(this.category).subscribe(
			res=>{
				this.toastr.success("Category Added", "Succesfully");
				this.categoryService.RefreshList.emit(true);
			}
		);
		this.closeModal();
	}
}
