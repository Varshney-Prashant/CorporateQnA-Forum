import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

import { Category, QuestionStatus, Question, QuestionWithUser, QuestionActivity } from '../../models';
import { CategoryService, DateTimeService, QuestionService } from '../../services';
import { Icons } from '../../shared';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {

	questions: QuestionWithUser[] = [];
	currentDate!: Date;
	selectedQuestion: Question = new Question({});
	question: Question = new Question({});
	questionSelected: boolean = false;
	allQuestions: QuestionWithUser[] = [];
	questionActivity: QuestionActivity = new QuestionActivity({})
	categories: Category[] = [];
	categoryId: number = 0;
	searchText: string = ""
	showFilter: string = "all";
	sortByFilter: string = "all";
	icons: Icons = new Icons;
	addQuestionForm!: FormGroup;
	modalRef!: BsModalRef;
	addModal!: TemplateRef<any>;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};
	editor: Editor = new Editor;
	toolbar: Toolbar = [
		['bold', 'italic', 'underline'],
		['ordered_list', 'bullet_list'],
		['blockquote', 'link']
	];
	html = '';

	@Output() filteredQuestions = new EventEmitter<QuestionWithUser[]>();
	@Output() searchFilter = new EventEmitter<string>();

	constructor(private questionService: QuestionService,
		private categoryService: CategoryService,
		private modalService: BsModalService,
		private dateTimeService: DateTimeService,
		private toastr: ToastrService) { }

	ngOnInit(): void {
		this.editor = new Editor({
			content: ``,
			enabled: true,
			history: true,
			keyboardShortcuts: true
		});

		this.addQuestionForm = new FormGroup({
			'question': new FormControl(null, Validators.required)!,
			'description': new FormControl(null, [Validators.required, Validators.email])!,
			'Id': new FormControl(null, Validators.required),
		})!;

		this.getQuestions();

		this.categoryService.getCategories().subscribe(
			res => {
				this.categories = res;
			}
		)
	}

	getQuestions() {
		this.questionService.getQuestions().subscribe(
			res => {
				this.questionService.questions = res;
				this.questions = res;
				this.allQuestions = res;
				this.questions.forEach(question => {
					question.questionTime = this.dateTimeService.dateDiff(new Date(question.postingTime), new Date);
				})
				this.allQuestions = this.questions;
				this.filteredQuestions.emit(this.questions)
			}
		)
	}

	addQuestion() {
		this.question.title = this.addQuestionForm.value.question
		this.question.description = this.html;
		this.question.status = QuestionStatus.unResolved;
		this.question.postingTime = new Date();
		this.question.userId = localStorage.getItem('userId')!;
		this.question.categoryId = this.addQuestionForm.value.Id;
		this.question.answersCount = 0;
		this.questionService.addQuestion(this.question).subscribe(
			res => {
				this.questionActivity.questionId = res;
				this.questionService.addActivity(this.questionActivity).subscribe();
				this.toastr.success("Question Added", "Successfully")
				this.getQuestions();
				this.addQuestionForm.reset();
				this.editor.setContent('');
			}
		)
		this.closeModal();
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}

	closeModal() {
		this.addQuestionForm.reset();
		this.modalRef.hide();
	}

	resetFilters() {
		this.categoryId = 0;
		this.showFilter = "all";
		this.sortByFilter = "all";
		this.searchText = "";
		this.questions = this.allQuestions;
		this.searchFilter.emit(this.searchText);
		this.getQuestions();
	}

	searchTextFilter() {
		this.searchFilter.emit(this.searchText);
	}

	filterByCategory = (id: number, questions: QuestionWithUser[]) => {
		questions = questions.filter(
			question => {
				return question.categoryId == id;
			}
		)
		return questions;
	}

	filterByUserId = (id: string, questions: QuestionWithUser[]) => {
		questions = questions.filter(
			question => {
				console.log(question.userId == id)
				return question.userId == id;
			}
		)
		return questions;
	}

	filterByStatus = (s: QuestionStatus, questions: QuestionWithUser[]) => {
		questions = questions.filter(
			question => {
				return question.status == s
			}

		)
		return questions;
	}

	filterByNoOfDays = (noOfDays: number, questions: QuestionWithUser[]) => {
		questions = questions.filter(
			question => {
				var diff = Math.abs((new Date).getTime() - (new Date(question.postingTime)).getTime());
				var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
				console.log(diffDays <= noOfDays)
				return diffDays <= noOfDays;
			}

		)
		return questions;
	}


	filterQuestions() {
		this.questions = this.allQuestions;
		if (this.categoryId != 0)
			this.questions = this.filterByCategory(this.categoryId, this.questions)
		else
			this.questions = this.allQuestions;
		if(this.showFilter=="all" && this.sortByFilter=="all" && this.categoryId==0){
			this.questions=this.allQuestions;
		}
		else if (this.showFilter == "myQuestions" || this.showFilter == "myParticipation") {
			this.questions = this.filterByUserId(localStorage.getItem('userId')!, this.questions)
		}
		else if (this.showFilter == "hot") {
			this.questions=this.questions.sort((a, b) =>{ return  b.upVotes - a.upVotes })
		}
		else if (this.showFilter == "solved") {
			this.questions = this.filterByStatus(QuestionStatus.resolved, this.questions);
		}
		else if (this.showFilter == "unsolved") {
			this.questions = this.filterByStatus(QuestionStatus.unResolved, this.questions);
		}
		if (this.sortByFilter == "recent") {
			this.questions.sort((a, b) => a.postingTime > b.postingTime ? -1 : a.postingTime < b.postingTime ? 1 : 0)
		}
		else if (this.sortByFilter == "last10Days") {
			this.questions = this.filterByNoOfDays(10, this.questions)
		}
		else if (this.sortByFilter == "last30Days") {
			this.questions = this.filterByNoOfDays(30, this.questions)
		}

		this.filteredQuestions.emit(this.questions);
	}
}
