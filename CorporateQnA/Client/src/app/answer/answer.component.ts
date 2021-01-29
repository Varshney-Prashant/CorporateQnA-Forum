import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AnswerWithUser } from '../models/answerWithUser.model';
import { Question } from '../models/question.model';
import { QuestionWithUser } from '../models/questionWithUser.model';
import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styles: [
  ]
})
export class AnswerComponent implements OnInit {

  questionId:number=0;
  selectedQuestion:QuestionWithUser=new QuestionWithUser({})
  answers:AnswerWithUser[]=[];

//   editor: Editor = new Editor;
//   toolbar: Toolbar = [
//     ['bold', 'italic'],
//     ['underline', 'strike'],
//     ['code', 'blockquote'],
//     ['ordered_list', 'bullet_list'],
//     [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
//     ['link', 'image'],
//     ['text_color', 'background_color'],
//     ['align_left', 'align_center', 'align_right', 'align_justify'],
//   ];
//   html: '' = "";
  
  constructor(private route:ActivatedRoute, public answerService:AnswerService,private ngZone: NgZone ) { }

  ngOnInit(): void {

	// this.editor = new Editor();
    this.route.params.subscribe(
		(param: Params) =>{
			this.questionId=+param['id'];
			console.log(this.questionId);
			this.answerService.getQuestionWithUser(this.questionId).subscribe(
				res=>{
					console.log(res)
					this.selectedQuestion=res;	
				}
			);
			this.answerService.getAnswersWithUser(this.questionId).subscribe(
				res=>{
					this.answers=res;
				}
			)
      	}
     );
	
    
    
  }

}
