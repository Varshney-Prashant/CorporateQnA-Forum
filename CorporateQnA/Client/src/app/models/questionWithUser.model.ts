export class QuestionWithUser {
     questionId: number;
     title: string;
     description: string;
     status: string;
     postingTime: Date;
     answersCount: number;
     userFullName: string;
     categoryId: string;
     userId: string;

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
     }
}