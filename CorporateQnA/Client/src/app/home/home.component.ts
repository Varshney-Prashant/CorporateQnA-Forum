import { Component, DoCheck, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';

import { Category,Question,QuestionActivity,QuestionWithUser } from '../models';
import { CategoryService,DateTimeService,QuestionService,UserService } from '../services';
import { Icons } from '../shared';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [
	]
})
export class HomeComponent implements OnInit,DoCheck {

	questions: QuestionWithUser[] = [];
	currentDate!: Date;
	selectedQuestion: QuestionWithUser = new QuestionWithUser({});
	questionActivity:QuestionActivity=new QuestionActivity({});
	question: Question = new Question({});
	questionSelected: boolean = false;
	allQuestions: QuestionWithUser[] = [];
	categories: Category[] = [];
	categoryId: number = 0;
	searchText: string="";
	showFilter: string = "all";
	sortByFilter: string = "all";
	icons: Icons = new Icons;
	addQuestionForm!: FormGroup;
	modalRef!: BsModalRef;
	addModal!: TemplateRef<any>;
	currentQuestionId: number = 0;
	showFilters:boolean=false;
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
		private router: Router, 
		private categoryService: CategoryService, 
		private modalService: BsModalService, 
		public dateTimeService: DateTimeService, 
		private userService: UserService,
		private route:ActivatedRoute) { }

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

		this.currentDate = new Date();
		this.questionService.getQuestions().subscribe(
			res => {
				console.log(res);
				this.questionService.questions = res;
				this.questions = res;
				this.allQuestions = res;
				for (var i = 0; i < res.length; i++) {
					console.log(new Date() + " " + this.questions[i].postingTime)
					this.questions[i].questionTime = this.dateTimeService.dateDiff(new Date(this.questions[i].postingTime), new Date());
				}
				this.allQuestions = this.questions;
				this.route.params.subscribe(
					(param: Params) => {
						let userId=param['id'];
						console.log(userId)
						if(userId)
							this.filterByUser(userId);
		
					}
				);
			}
		)
		

		this.categoryService.getCategories().subscribe(
			res => {
				this.categories = res;
			}
		)
	}

	ngDoCheck(){
		this.showFilters = this.router.url.indexOf('user-details') == -1;
	}

	filterByUser(id:string){
		this.questions=this.questions.filter(
			question=>{
				console.log(id)
				return question.userId==id;
			}
		)
	}
	getFilteredQuestions(filteredQuestions: QuestionWithUser[]) {
		this.questionSelected = false;
		this.router.navigate(['home'])
		this.questions = filteredQuestions;
	}

	filterBySearch(searchText: string) {
		console.log(searchText)
		this.searchText = searchText;
	}

	selected(question: QuestionWithUser) {
		this.selectedQuestion = question;
		this.questionSelected = true;
		this.currentQuestionId = question.questionId
		question.viewCount=question.viewCount+1;
		this.questionActivity.id=question.activityId;
		this.questionActivity.questionId=question.questionId;
		this.questionActivity.viewCount=question.viewCount;
		this.questionActivity.upVotes=question.upVotes;

		this.questionService.updateActivity(this.questionActivity).subscribe();
	}

	upVote(question:QuestionWithUser, event:Event){
		event.stopPropagation();

		question.upVotes=question.upVotes+1;
		this.questionActivity.id=question.activityId;
		this.questionActivity.questionId=question.questionId;
		this.questionActivity.viewCount=question.viewCount;
		this.questionActivity.upVotes=question.upVotes;
		this.questionService.updateActivity(this.questionActivity).subscribe();
	}
}
