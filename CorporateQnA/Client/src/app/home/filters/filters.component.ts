import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';

import { Category, QuestionStatus, Question, QuestionWithUser } from '../../models';
import { CategoryService, DateTimeService, QuestionService } from '../../services';
import { Icons } from '../../shared';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styles: [
	]
})
export class FiltersComponent implements OnInit {

	questions: QuestionWithUser[] = [];
	currentDate!: Date;
	selectedQuestion: Question = new Question({});
	question: Question = new Question({});
	questionSelected: boolean = false;
	allQuestions: QuestionWithUser[] = [];
	categories: Category[] = [];
	categoryId: number = 0;
	searchText:string=""
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
	html = 'Enter Your Answer Here';

	@Output() filteredQuestions = new EventEmitter<QuestionWithUser[]>();
	@Output() searchFilter = new EventEmitter<string>();
	constructor(private questionService: QuestionService,
		private categoryService: CategoryService,
		private modalService: BsModalService,
		private dateTimeService: DateTimeService) { }

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
		this.questionService.getQuestions().subscribe(
			res => {

				console.log(res);
				this.questionService.questions = res;
				this.questions = res;
				this.allQuestions = res;
				for (var i = 0; i < res.length; i++) {
					this.questions[i].questionTime = this.dateTimeService.dateDiff(new Date(this.questions[i].postingTime), new Date);
				}
				this.allQuestions = this.questions;
			}
		)

		this.categoryService.getCategories().subscribe(
			res => {
				this.categories = res;
			}
		)
	}

	addQuestion() {
		this.question.title = this.addQuestionForm.value.question
		this.question.description = this.addQuestionForm.value['description']['content'][0]['content'][0]['text'];
		this.question.status = QuestionStatus.unResolved;
		this.question.postingTime = new Date();
		this.question.userId = localStorage.getItem('userId')!;
		this.question.categoryId = this.addQuestionForm.value.Id;
		this.question.answersCount = 0;
		console.log(this.question.postingTime)
		this.questionService.addQuestion(this.question).subscribe(
			res => {
				console.log(res);
			}
		)
		this.closeModal();
	}

	openModal(template: TemplateRef<any>) {
		console.log(template)
		this.modalRef = this.modalService.show(template, this.config);
	}

	closeModal() {
		this.modalRef.hide();
	}
	resetFilters() {
		console.log("erreferf");
		this.categoryId = 0;
		this.showFilter = "all";
		this.sortByFilter = "all";
		this.searchText = "";
		this.questions = this.allQuestions;
		this.searchFilter.emit(this.searchText);
		this.filteredQuestions.emit(this.questions);
	}

	searchTextFilter() {
		this.searchFilter.emit(this.searchText);
	}

	filterByCategory(id: number, questions: QuestionWithUser[]) {
		questions = questions.filter(
			question => {
				return question.categoryId == id;
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
		if (this.showFilter == "myQuestions" || this.showFilter == "myParticipation") {
			//getQuestions of that user
		}
		else if (this.showFilter == "hot") {
			//get hot questions
		}
		else if (this.showFilter == "solved") {
			const solvedQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				if (this.questions[i].status === QuestionStatus.resolved) {
					solvedQuestions.push(this.questions[i]);
				}
			}
			this.questions = solvedQuestions;
		}
		else if (this.showFilter == "unsolved") {
			const unsolvedQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				if (this.questions[i].status === QuestionStatus.unResolved) {
					unsolvedQuestions.push(this.questions[i]);
				}
			}
			this.questions = unsolvedQuestions;
		}
		if (this.sortByFilter == "recent") {
			this.questions.sort((a, b) => a.postingTime < b.postingTime ? -1 : a.postingTime > b.postingTime ? 1 : 0)
		}
		else if (this.sortByFilter == "last10Days") {
			const last10DaysQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				var diff = Math.abs((new Date).getTime() - (new Date(this.questions[i].postingTime)).getTime());
				var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
				console.log(diffDays);
				if (diffDays <= 10) {
					last10DaysQuestions.push(this.questions[i]);
				}
			}
			this.questions = last10DaysQuestions;
		}
		else if (this.sortByFilter == "last30Days") {
			const last30DaysQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				var diff = Math.abs((new Date).getTime() - (new Date(this.questions[i].postingTime)).getTime());
				var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
				if (diffDays <= 30) {
					last30DaysQuestions.push(this.questions[i]);
				}
			}
			this.questions = last30DaysQuestions;
		}

		this.filteredQuestions.emit(this.questions);
	}
}
