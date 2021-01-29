export class Question {
     id: number;
     title: string;
     description: string;
     status: string;
     postingTime: Date;
     userId: string;
     categoryId: number;
     answersCount: number;

     constructor(args: any) {
          this.id = args.id;
          this.title = args.title;
          this.description = args.description;
          this.status = args.status;
          this.postingTime = args.postingTime;
          this.userId = args.userId;
          this.categoryId = args.categoryId;
          this.answersCount = args.noOfAnswers;
     }
}
