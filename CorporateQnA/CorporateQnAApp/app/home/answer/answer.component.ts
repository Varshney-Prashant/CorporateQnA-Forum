import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

import { Answer,AnswerWithUser,Question,QuestionStatus,QuestionWithUser } from '../../models';
import { AnswerService,DateTimeService, QuestionService } from '../../services';
import { Icons } from '../../shared';

@Component({
	selector: 'app-answer',
	templateUrl: './answer.component.html',
})
export class AnswerComponent implements OnInit {

	@Input() questionId: number = 0;
	selectedQuestion: QuestionWithUser = new QuestionWithUser({})
	activeAnswer: Answer = new Answer({});
	activeQuestion:Question=new Question({});
	answers: AnswerWithUser[] = [];
	bestAnswer: boolean = false;
	modalRef!: BsModalRef;
	expand:boolean=false;
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
		private modalService: BsModalService,
		private toastr:ToastrService,
		private questionService:QuestionService
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
		this.getAnswersAndSelectedQuestion();		
	}

	submitAnswer(){
		this.expand=false;
		this.activeAnswer.postingTime=new Date();
		this.activeAnswer.userId=localStorage.getItem('userId')!;
		this.activeAnswer.questionId=this.questionId;
		this.activeAnswer.description=this.answerForm.value['editorContent']['content'][0]['content'][0]['text'];
		this.activeAnswer.bestAnswer=false
		this.answerService.addAnswer(this.activeAnswer).subscribe(
			res=>{		
				this.getAnswersAndSelectedQuestion();		
				this.answerForm.reset();
				this.editor.setContent('');
			}
		)
		this.incrementAnswerCount();
		this.answerService.RefreshList.emit(true);
	}

	incrementAnswerCount(){
		this.answerService.incrementAnswerCount(this.activeAnswer.questionId).subscribe(
			res=>{
				this.selectedQuestion.answersCount=res;				
			}
		);
	}

	expandEditor(){
		this.expand=!this.expand;
	}

	like(answer: AnswerWithUser) {
		answer.noOfLikes = answer.noOfLikes + 1;
		this.activeAnswer=new Answer(answer);
		this.activeAnswer.id = answer.answerId;
		this.answerService.updateAnswer(this.activeAnswer).subscribe();					

	}

	dislike(answer: AnswerWithUser) {
		answer.noOfDislikes = answer.noOfDislikes + 1;
		this.activeAnswer=new Answer(answer);
		this.activeAnswer.id = answer.answerId;
		this.answerService.updateAnswer(this.activeAnswer).subscribe();
	}

	markAsBestAnswer(answerChecked: AnswerWithUser, event: Event) {
		var bestAnswerExists = false;
		this.answers.forEach(answer => {
			if (answer.bestAnswer) {
				event.preventDefault();
				answerChecked.bestAnswer=false
				bestAnswerExists = true;
			}
		});
		if (!bestAnswerExists) {
			answerChecked.bestAnswer = true;
			this.activeAnswer=new Answer(answerChecked);
			this.activeAnswer.id = answerChecked.answerId;
			
			this.answerService.updateAnswer(this.activeAnswer).subscribe(
				res=>{
					console.log(this.selectedQuestion)
					this.activeQuestion=new Question(this.selectedQuestion);
					this.activeQuestion.id=this.selectedQuestion.questionId;
					this.activeQuestion.status=QuestionStatus.resolved;
					this.activeQuestion.answersCount=this.selectedQuestion.answersCount;
					this.questionService.updateQuestion(this.activeQuestion.id, this.activeQuestion).subscribe(
						res=>{
							this.answerService.MarkQuestion.emit(true);
						}
					)
				}
			);
		}
		else {
			this.toastr.warning("Only One Answer Can Be Marked As Best Answer","Warning")
		}

	}

	getAnswersAndSelectedQuestion(){
		this.answerService.getQuestionWithUser(this.questionId).subscribe(
			res => {
				this.selectedQuestion = res;
				this.selectedQuestion.questionTime = this.dateTimeService.dateDiff(new Date(this.selectedQuestion.postingTime), new Date);
			}
		);
		this.answerService.getAnswersWithUser(this.questionId).subscribe(
			res => {
				this.answers = res;				
				this.answers.forEach(answer=>{
					answer.answerTime = this.dateTimeService.dateDiff(new Date(answer.postingTime), new Date);
				})
			}
		)

	}

}
