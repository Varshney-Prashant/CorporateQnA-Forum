export class AnswerWithUser {
     answerId: number;
     description: number;
     userFullName: number;
     noOfLikes: number;
     noOfDislikes: number;
     postingTime: Date;
     questionId: number;
     userId: string;
     imageUrl:string;
     bestAnswer:boolean;
     answerTime:string;

     constructor(args: any) {
          this.answerId = args.answerId;
          this.description = args.description;
          this.userFullName = args.userFullName;
          this.noOfLikes = args.noOfLikes;
          this.noOfDislikes = args.noOfDisLikes;
          this.postingTime = args.postingTime;
          this.questionId = args.questionId;
          this.userId = args.userId;
          this.imageUrl=args.imageUrl;
          this.bestAnswer=args.bestAnswer;
          this.answerTime=args.answerTime;
     }
}