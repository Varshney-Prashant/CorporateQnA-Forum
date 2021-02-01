import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Editor, Toolbar } from 'ngx-editor';
import { Answer } from 'src/app/models/answer.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { AnswerWithUser } from '../../models/answerWithUser.model';
import { Question } from '../../models/question.model';
import { QuestionWithUser } from '../../models/questionWithUser.model';
import { AnswerService } from '../../services/answer.service';
import { Icons } from '../../shared/icons';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styles: [
  ]
})
export class AnswerComponent implements OnInit {

  questionId:number=0;
  selectedQuestion:QuestionWithUser=new QuestionWithUser({})
  activeAnswer:Answer=new Answer({});
  answers:AnswerWithUser[]=[];
  bestAnswer:boolean=false;
  modalRef!: BsModalRef;
	icons:Icons=new Icons;
	editor: Editor=new Editor;
  toolbar: Toolbar = [
    ['bold', 'italic','underline'],
    ['ordered_list', 'bullet_list'],
    ['blockquote','link']
  ];
  html='Enter Your Answer Here';
  config = {
	backdrop: false,
	keybodard: true,
	animated: true,
	class: 'modal-lg'
};
loggedUserId:string="";
  
  constructor(private route:ActivatedRoute, public answerService:AnswerService,private dateTimeService:DateTimeService,private modalService: BsModalService ) { }

  ngOnInit(): void {
	this.editor = new Editor({
		content:``,
		enabled:true,
		history:true,
		keyboardShortcuts:true
	   });
	   this.loggedUserId=localStorage.getItem('userId') !;
	   console.log(this.loggedUserId)
	// this.editor = new Editor();
    this.route.params.subscribe(
		(param: Params) =>{
			this.questionId=+param['id'];
			console.log(this.questionId);
			this.answerService.getQuestionWithUser(this.questionId).subscribe(
				res=>{
					this.selectedQuestion=res;
					this.selectedQuestion.questionTime=this.dateTimeService.dateDiff(new Date(this.selectedQuestion.postingTime), new Date);	
				}
			);
			this.answerService.getAnswersWithUser(this.questionId).subscribe(
				res=>{
					console.log(res);
					this.answers=res;
					for(var i=0;i<res.length;i++){
						this.answers[i].answerTime=this.dateTimeService.dateDiff(new Date(this.answers[i].postingTime), new Date);
					}
				}
			)
      	}
     );  
  }

  openModal(template: TemplateRef<any>) {
	console.log(template)
	this.modalRef = this.modalService.show(template, this.config);
}
closeModal() {
	this.modalRef.hide();
}

  like(answer:AnswerWithUser){
	  answer.noOfLikes=answer.noOfLikes+1;
	console.log(answer.answerId);
	this.activeAnswer.id=answer.answerId;
	this.activeAnswer.description=answer.description;
	this.activeAnswer.noOfLikes=answer.noOfLikes;
	this.activeAnswer.noOfDislikes=answer.noOfDislikes;
	this.activeAnswer.postingTime=answer.postingTime;
	this.activeAnswer.bestAnswer=answer.bestAnswer;
	this.activeAnswer.questionId=answer.questionId;
	this.activeAnswer.userId=answer.userId;
	console.log(this.activeAnswer)
	this.answerService.updateAnswer(this.activeAnswer).subscribe()

  }

  dislike(answer:AnswerWithUser){
	  answer.noOfDislikes=answer.noOfDislikes+1;
	this.activeAnswer.id=answer.answerId;
	this.activeAnswer.description=answer.description;
	this.activeAnswer.noOfLikes=answer.noOfLikes;
	this.activeAnswer.noOfDislikes=answer.noOfDislikes+1;
	this.activeAnswer.postingTime=answer.postingTime;
	this.activeAnswer.bestAnswer=answer.bestAnswer;
	this.activeAnswer.questionId=answer.questionId;
	this.activeAnswer.userId=answer.userId;
	this.answerService.updateAnswer(this.activeAnswer).subscribe()
  }

  markAsBestAnswer(answerChecked:AnswerWithUser, event:Event){
	  event.preventDefault();
	  var bestAnswerExists=false;
	  for(let answer of this.answers){
		  if(answer.bestAnswer){
			  bestAnswerExists=true;
			  break;
		  }
	  }
	  if(!bestAnswerExists){
		answerChecked.bestAnswer=!answerChecked.bestAnswer;
	  	console.log(answerChecked.bestAnswer)
		this.activeAnswer.id=answerChecked.answerId;
		this.activeAnswer.description=answerChecked.description;
		this.activeAnswer.noOfLikes=answerChecked.noOfLikes;
		this.activeAnswer.noOfDislikes=answerChecked.noOfDislikes+1;
		this.activeAnswer.postingTime=answerChecked.postingTime;
		this.activeAnswer.bestAnswer=answerChecked.bestAnswer;
		this.activeAnswer.questionId=answerChecked.questionId;
		this.activeAnswer.userId=answerChecked.userId;
		this.answerService.updateAnswer(this.activeAnswer).subscribe();
	}
	else{
		answerChecked.bestAnswer=false
		alert("Only One Best Answer Can be Marked")
	}
	  
  }

}
