export class UserInfoView {
     id: string;
     fullName: string;
     designation: string;
     company: string;
     imageUrl: string;
     noOfLikes: number;
     noOfDislikes: number;
     questionsAsked: number;
     questionsAnswered: number;
     questionsSolved: number;

     constructor(args: any) {
          this.id = args.id;
          this.fullName = args.name;
          this.designation = args.designation;
          this.company = args.company;
          this.imageUrl = args.imageUrl;
          this.noOfLikes = args.noOfLikes;
          this.noOfDislikes = args.noOfDislikes;
          this.questionsAsked = args.questionsAsked;
          this.questionsAnswered = args.questionsAnswered;
          this.questionsSolved = args.questionsSolved;
     }
}