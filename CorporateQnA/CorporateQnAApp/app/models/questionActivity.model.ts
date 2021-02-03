export class QuestionActivity{
     id:number;
     questionId:number;
     viewCount:number;
     upVotes:number;

     constructor(args:any){
          this.id=args.id;
          this.questionId=args.questionId;
          this.viewCount=args.viewCount;
          this.upVotes=args.upVotes;
     }
}