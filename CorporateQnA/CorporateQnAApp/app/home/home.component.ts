import { Component, DoCheck, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';

import { Category, Question, QuestionActivity, QuestionWithUser } from '../models';
import { AnswerService, CategoryService, DateTimeService, QuestionService, UserService } from '../services';
import { Icons } from '../shared';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, DoCheck {

	questions: QuestionWithUser[] = [];
	selectedQuestion: QuestionWithUser = new QuestionWithUser({});
	questionActivity: QuestionActivity = new QuestionActivity({});
	question: Question = new Question({});
	questionSelected: boolean = false;
	allQuestions: QuestionWithUser[] = [];
	categories: Category[] = [];
	categoryId: number = 0;
	searchText: string = "";
	showFilter: string = "all";
	sortByFilter: string = "all";
	icons: Icons = new Icons;
	addQuestionForm!: FormGroup;
	modalRef!: BsModalRef;
	addModal!: TemplateRef<any>;
	currentQuestionId: number = 0;
	showFilters: boolean = false;
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


	constructor(private questionService: QuestionService,
		private answerService:AnswerService,
		private router: Router,
		private categoryService: CategoryService,
		public dateTimeService: DateTimeService,
		private route: ActivatedRoute) { }

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
		this.answerService.RefreshList.subscribe(
			(value: any)=>{
				this.getQuestions();
			   }
		)
		this.answerService.MarkQuestion.subscribe(
			(value: any)=>{
				this.getQuestions();
			   }
		)

		this.categoryService.getCategories().subscribe(
			res => {
				this.categories = res;
			}
		)
	}

	ngDoCheck() {
		this.showFilters = this.router.url.indexOf('user-details') == -1;
	}

	InitializeForm() {
			//check
	}

	getQuestions() {
		//check
		this.questionService.getQuestions().subscribe(
			res => {
				console.log(res)
				this.questionService.questions = res;
				this.questions = res;
				this.allQuestions = res;
				this.questions.forEach((question) => {
					question.questionTime = this.dateTimeService.dateDiff(new Date(question.postingTime), new Date);
				})

				this.allQuestions = this.questions;
				this.route.params.subscribe(
					(param: Params) => {
						let userId = param['id'];
						if (userId)
							this.filterByUser(userId);
					}
				);
			}
		)
	}

	filterByUser(id: string) {
		this.questions = this.questions.filter(
			question => {
				console.log(id)
				return question.userId == id;
			}
		)
	}
	getFilteredQuestions(filteredQuestions: QuestionWithUser[]) {
		this.questionSelected = false;
		this.router.navigate(['home'])
		this.questions = filteredQuestions;
	}

	filterBySearch(searchText: string) {
		this.searchText = searchText;
	}

	selected(question: QuestionWithUser) {
		this.selectedQuestion = question;
		this.questionSelected = true;
		this.currentQuestionId = question.questionId
		question.viewCount = question.viewCount + 1;
		// this.questionActivity = new QuestionActivity(this.question)
		this.questionActivity.id = question.activityId;
		this.questionActivity.questionId=question.questionId;
		this.questionActivity.viewCount=question.viewCount;
		this.questionActivity.upVotes=question.upVotes;

		this.questionService.updateActivity(this.questionActivity).subscribe();
	}

	upVote(question: QuestionWithUser, event: Event) {
		event.stopPropagation();

		question.upVotes = question.upVotes + 1;
		this.questionActivity.id = question.activityId;
		// this.questionActivity = new QuestionActivity(this.question)
		this.questionActivity.questionId=question.questionId;
		this.questionActivity.viewCount=question.viewCount;
		this.questionActivity.upVotes=question.upVotes;
		this.questionService.updateActivity(this.questionActivity).subscribe();
	}
}
