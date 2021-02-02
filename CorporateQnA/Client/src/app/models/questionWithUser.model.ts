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
     imageUrl: string;
     questionTime: string;
     viewCount: number;
     upVotes: number;
     activityId: number;

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
          this.imageUrl = args.imageUrl;
          this.questionTime = args.questionTime;
          this.viewCount = args.viewCount;
          this.upVotes = args.upVotes;
          this.activityId = args.activityId;
     }
}