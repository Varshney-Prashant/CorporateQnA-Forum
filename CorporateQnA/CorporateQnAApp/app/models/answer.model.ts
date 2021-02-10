export class Answer{
     id: number;
     content: string;
     noOfLikes: number;
     noOfDislikes: number;
     postingTime: Date;
     bestAnswer:boolean;
     questionId: number;
     userId: string;

     constructor(args: any) {
          this.id = args.id;
          this.content = args.content;
          this.noOfLikes = args.noOfLikes;
          this.noOfDislikes = args.noOfDislikes;
          this.postingTime = args.postingTime;
          this.bestAnswer=args.bestAnswer;
          this.questionId = args.questionId;
          this.userId = args.userId;
     }
}