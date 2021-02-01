export class Answer{
     id: number;
     description: number;
     noOfLikes: number;
     noOfDislikes: number;
     postingTime: Date;
     bestAnswer:boolean;
     questionId: number;
     userId: string;

     constructor(args: any) {
          this.id = args.id;
          this.description = args.description;
          this.noOfLikes = args.noOfLikes;
          this.noOfDislikes = args.noOfDisLikes;
          this.postingTime = args.postingTime;
          this.bestAnswer=args.bestAnswer;
          this.questionId = args.questionId;
          this.userId = args.userId;
     }
}