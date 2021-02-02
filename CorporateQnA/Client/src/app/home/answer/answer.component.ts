import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';

import { Answer,AnswerWithUser,QuestionWithUser } from '../../models';
import { AnswerService,DateTimeService } from '../../services';
import { Icons } from '../../shared';

@Component({
	selector: 'app-answer',
	templateUrl: './answer.component.html',
})
export class AnswerComponent implements OnInit {

	@Input() questionId: number = 0;
	selectedQuestion: QuestionWithUser = new QuestionWithUser({})
	activeAnswer: Answer = new Answer({});
	answers: AnswerWithUser[] = [];
	bestAnswer: boolean = false;
	modalRef!: BsModalRef;
	icons: Icons = new Icons;
	editor: Editor = new Editor;
	answerForm!: FormGroup;
	toolbar: Toolbar = [
		['bold', 'italic', 'underline'],
		['ordered_list', 'bullet_list'],
		['blockquote', 'link']
	];
	html = 'Enter Your Answer Here';
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};
	loggedUserId: string = "";

	constructor(
		public answerService: AnswerService, 
		private dateTimeService: DateTimeService, 
		private modalService: BsModalService
	) { }

	ngOnInit(): void {
		this.editor = new Editor({
			content: ``,
			enabled: true,
			history: true,
			keyboardShortcuts: true
		});
		this.loggedUserId = localStorage.getItem('userId')!;

		this.answerForm = new FormGroup({
			'editorContent': new FormControl(null, Validators.required)!
		})!;
		
	}

	ngOnChanges(){
		this.getAnswers();		
	}

	submitAnswer(){
		this.activeAnswer.postingTime=new Date();
		this.activeAnswer.userId=localStorage.getItem('userId')!;
		this.activeAnswer.questionId=this.questionId;
		this.activeAnswer.description=this.answerForm.value['editorContent']['content'][0]['content'][0]['text'];
		this.answerService.addAnswer(this.activeAnswer).subscribe(
			res=>{		
				this.getAnswers();		
          		this.answerForm.reset();
			}
		)
		this.incrementAnswerCount();
	}

	incrementAnswerCount(){
		this.answerService.incrementAnswerCount(this.activeAnswer.questionId).subscribe(
			res=>{
				this.selectedQuestion.answersCount=res;
				
			}
		);
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}
	closeModal() {
		this.modalRef.hide();
	}

	like(answer: AnswerWithUser) {
		answer.noOfLikes = answer.noOfLikes + 1;
		this.activeAnswer=new Answer(answer);
		this.activeAnswer.id = answer.answerId;
		this.answerService.updateAnswer(this.activeAnswer).subscribe()

	}

	dislike(answer: AnswerWithUser) {
		answer.noOfDislikes = answer.noOfDislikes + 1;
		this.activeAnswer=new Answer(answer);
		this.activeAnswer.id = answer.answerId;
		this.answerService.updateAnswer(this.activeAnswer).subscribe()
	}

	markAsBestAnswer(answerChecked: AnswerWithUser, event: Event) {
		event.preventDefault();
		var bestAnswerExists = false;
		this.answers.forEach(answer => {
			if (answer.bestAnswer) {
				bestAnswerExists = true;
			}
		});
		// for (let answer of this.answers) {
		// 	if (answer.bestAnswer) {
		// 		bestAnswerExists = true;
		// 		break;
		// 	}
		// }
		if (!bestAnswerExists) {
			answerChecked.bestAnswer = !answerChecked.bestAnswer;
			this.activeAnswer=new Answer(answerChecked);
			this.activeAnswer.id = answerChecked.answerId;
			this.answerService.updateAnswer(this.activeAnswer).subscribe();
		}
		else {
			answerChecked.bestAnswer = false
			alert("Only One Best Answer Can be Marked")
		}

	}

	getAnswers(){
		this.answerService.getQuestionWithUser(this.questionId).subscribe(
			res => {
				this.selectedQuestion = res;
				this.selectedQuestion.questionTime = this.dateTimeService.dateDiff(new Date(this.selectedQuestion.postingTime), new Date);
			}
		);
		this.answerService.getAnswersWithUser(this.questionId).subscribe(
			res => {
				this.answers = res;
				for (var i = 0; i < res.length; i++) {
					this.answers[i].answerTime = this.dateTimeService.dateDiff(new Date(this.answers[i].postingTime), new Date);
				}
			}
		)

	}

}
