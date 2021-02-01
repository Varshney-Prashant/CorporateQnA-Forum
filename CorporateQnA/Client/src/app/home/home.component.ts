import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';
import { Category } from '../models/category.model';
import { CategoryViewModel } from '../models/categoryViewModel';
import { QuestionStatus } from '../models/enums/question.status.enum';
import { Question } from '../models/question.model';
import { QuestionWithUser } from '../models/questionWithUser.model';
import { CategoryService } from '../services/category.service';
import { DateTimeService } from '../services/date-time.service';
import { QuestionService } from '../services/question.service';
import { Icons } from '../shared/icons';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [
	]
})
export class HomeComponent implements OnInit {

	questions: QuestionWithUser[] = [];
	currentDate!: Date;
	selectedQuestion: QuestionWithUser = new QuestionWithUser({});
	question:Question=new Question({});
	questionSelected: boolean = false;
	allQuestions: QuestionWithUser[] = [];
	categories: Category[] = [];
	categoryId: number = 0;
	searchText: any = { title: '' };
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


	constructor(private questionService: QuestionService, private router: Router, private categoryService: CategoryService, private modalService: BsModalService, public dateTimeService:DateTimeService) { }

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
				this.questionService.questions=res;
				this.questions = res;
				this.allQuestions = res;
				for(var i=0;i<res.length;i++){
					console.log(new Date()+" "+this.questions[i].postingTime)
					this.questions[i].questionTime=this.dateTimeService.dateDiff(new Date(this.questions[i].postingTime), new Date());
				}
				this.allQuestions=this.questions;
			}
		)
		this.categoryService.getCategories().subscribe(
			res => {
				this.categories = res;
			}
		)
	}

	getFilteredQuestions(filteredQuestions:QuestionWithUser[]){
		this.questionSelected = false;
		this.router.navigate(['home'])
		this.questions=filteredQuestions;
	}

	filterBySearch(searchText:string){
		console.log(searchText)
		this.searchText=searchText;
	}

	// addQuestion() {
	// 	this.question.title=this.addQuestionForm.value.question
	// 	this.question.description=this.addQuestionForm.value['description']['content'][0]['content'][0]['text'];
	// 	this.question.status=QuestionStatus.unResolved;
	// 	this.question.postingTime=new Date;
	// 	this.question.userId="3a81cc47-40c6-4735-8d48-eaf4885bb546";
	// 	this.question.categoryId=this.addQuestionForm.value.Id;
	// 	this.question.answersCount=0;
	// 	this.questionService.addQuestion(this.question).subscribe(
	// 		res=>{
	// 			console.log(res);
	// 		}
	// 	)
		
	// }
	// openModal(template: TemplateRef<any>) {
	// 	console.log(template)
	// 	this.modalRef = this.modalService.show(template, this.config);
	// }

	// closeModal() {
	// 	this.modalRef.hide();
	// }

	selected(question: QuestionWithUser) {
		this.selectedQuestion = question;
		this.questionSelected = true;
		console.log(question)
		this.router.navigate(['home/answer', question.questionId])
	}

	// resetFilters() {
	// 	this.showFilter = "all";
	// 	this.sortByFilter = "all";
	// 	this.searchText = "";
	// 	this.questions = this.allQuestions;
	// }

	// filterQuestions() {
	// 	this.questions = this.allQuestions;
	// 	if (this.categoryId != 0) {
	// 		const categoryQuestions = [];
	// 		for (var i = 0; i < this.questions.length; i++) {
	// 			console.log(this.questions[i].categoryId)
	// 			if (this.questions[i].categoryId == this.categoryId) {
	// 				console.log(this.categoryId)
	// 				categoryQuestions.push(this.questions[i]);
	// 			}
	// 		}
	// 		console.log(categoryQuestions)
	// 		this.questions = categoryQuestions;
	// 		console.log(this.questions)
	// 	}
	// 	else {
	// 		this.questions = this.allQuestions;
	// 	}
	// 	if (this.showFilter == "myQuestions" || this.showFilter == "myParticipation") {
	// 		//getQuestions of that user
	// 	}
	// 	else if (this.showFilter == "hot") {
	// 		//get hot questions
	// 	}
	// 	else if (this.showFilter == "solved") {
	// 		const solvedQuestions = [];
	// 		for (var i = 0; i < this.questions.length; i++) {
	// 			if (this.questions[i].status === QuestionStatus.resolved) {
	// 				solvedQuestions.push(this.questions[i]);
	// 			}
	// 		}
	// 		this.questions = solvedQuestions;
	// 	}
	// 	else if (this.showFilter == "unsolved") {
	// 		const unsolvedQuestions = [];
	// 		for (var i = 0; i < this.questions.length; i++) {
	// 			if (this.questions[i].status === QuestionStatus.unResolved) {
	// 				unsolvedQuestions.push(this.questions[i]);
	// 			}
	// 		}
	// 		this.questions = unsolvedQuestions;
	// 	}
	// 	if (this.sortByFilter == "recent") {
	// 		this.questions.sort((a, b) => a.postingTime < b.postingTime ? -1 : a.postingTime > b.postingTime ? 1 : 0)
	// 	}
	// 	else if (this.sortByFilter == "last10Days") {
	// 		const last10DaysQuestions = [];
	// 		for (var i = 0; i < this.questions.length; i++) {
	// 			var diff = Math.abs((new Date).getTime() - (new Date(this.questions[i].postingTime)).getTime());
	// 			var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	// 			console.log(diffDays);
	// 			if (diffDays <= 10) {
	// 				last10DaysQuestions.push(this.questions[i]);
	// 			}
	// 		}
	// 		this.questions = last10DaysQuestions;
	// 	}
	// 	else if (this.sortByFilter == "last30Days") {
	// 		const last30DaysQuestions = [];
	// 		for (var i = 0; i < this.questions.length; i++) {
	// 			var diff = Math.abs((new Date).getTime() - (new Date(this.questions[i].postingTime)).getTime());
	// 			var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	// 			if (diffDays <= 30) {
	// 				last30DaysQuestions.push(this.questions[i]);
	// 			}
	// 		}
	// 		this.questions = last30DaysQuestions;
	// 	}
	// }
}
