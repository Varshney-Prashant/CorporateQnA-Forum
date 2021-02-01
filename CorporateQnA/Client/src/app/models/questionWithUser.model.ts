import { QuestionStatus } from "./enums/question.status.enum";

export class QuestionWithUser {
     questionId: number;
     title: string;
     description: string;
     status: QuestionStatus;
     postingTime: Date;
     answersCount: number;
     userFullName: string;
     categoryId: number;
     userId: string;
     imageUrl:string;
     questionTime:string;

     constructor(args: any) {
          this.questionId = args.id;
          this.title = args.title;
          this.description = args.description;
          this.status = args.status;
          this.postingTime = args.postingTime;
          this.answersCount = args.noOfAnswers;
          this.userId = args.userId;
          this.categoryId = args.categoryId;
          this.userFullName = args.userFullName;
          this.imageUrl=args.imageUrl;
          this.questionTime=args.questionTime;
     }
}