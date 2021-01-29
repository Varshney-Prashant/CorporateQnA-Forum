import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { Question } from '../models/question.model';
import { CategoryService } from '../services/category.service';
import { QuestionService } from '../services/question.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [
	]
})
export class HomeComponent implements OnInit {

	questions: Question[] = [];
	currentDate!: Date;
	selectedQuestion: Question = new Question({});
	questionSelected: boolean = false;
	allQuestions: Question[] = [];
	categories: Category[] = [];
	categoryId: number = 0;
	searchText: any = { title: '' };
	showFilter: string = "all";
	sortByFilter: string = "all";

	constructor(private questionService: QuestionService, private router: Router, private categoryService: CategoryService) { }

	ngOnInit(): void {
		this.currentDate = new Date();
		this.questionService.getQuestions().subscribe(
			res => {
				console.log(res);
				this.questions = res;
				this.allQuestions = res;
				console.log(this.questions);
			}
		)
		this.categoryService.getCategories().subscribe(
			res => {
				this.categories = res;
			}
		)
	}

	selected(question: Question) {
		this.selectedQuestion = question;
		this.questionSelected = true;
		console.log(question)
		this.router.navigate(['home/answer', question.id])
	}

	resetFilters(){
		this.showFilter="all";
		this.sortByFilter="all";
		this.searchText="";
		this.questions=this.allQuestions;
	}

	categorySelected() {
		console.log(this.categoryId)
		this.questions = this.allQuestions;
		if (this.categoryId != 0) {
			const categoryQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				console.log(this.questions[i].categoryId)
				if (this.questions[i].categoryId == this.categoryId) {
					console.log(this.categoryId)
					categoryQuestions.push(this.questions[i]);
				}
			}
			console.log(categoryQuestions)
			this.questions = categoryQuestions;
			console.log(this.questions)
		}
		else {
			this.questions = this.allQuestions;
		}

	}

	showFilterSelected() {
		if (this.sortByFilter == "all") {
			this.questions = this.allQuestions;
		}

		if (this.showFilter == "all") {
			this.questions = this.allQuestions;
		}
		else if (this.showFilter == "myQuestions" || this.showFilter == "myParticipation") {
			//getQuestions of that user
		}
		else if (this.showFilter == "hot") {
			//get hot questions
		}
		else if (this.showFilter == "solved") {
			const solvedQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				if (this.questions[i].status === "Resolved") {
					solvedQuestions.push(this.questions[i]);
				}
			}
			this.questions = solvedQuestions;
		}
		else if (this.showFilter == "unsolved") {
			const unsolvedQuestions = [];
			for (var i = 0; i < this.questions.length; i++) {
				if (this.questions[i].status === "UnResolved") {
					unsolvedQuestions.push(this.questions[i]);
				}
			}
			this.questions = unsolvedQuestions;
		}
	}

	sortBySelected() {
		if (this.showFilter == "all") {
			this.questions = this.allQuestions;
		}
		if (this.sortByFilter == "all") {
			this.questions = this.allQuestions;
		}
		else if (this.sortByFilter == "recent") {
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
	}
}
