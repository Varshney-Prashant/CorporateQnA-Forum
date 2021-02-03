export class CategoryViewModel{
     categoryId:number;
     categoryName:string;
     categoryDescription:string;
     totalTags:number;
     weekTags:number;
     monthTags:number;

     constructor(args:any){
          this.categoryId=args.categoryId;
          this.categoryName=args.categoryName;
          this.categoryDescription=args.categoryDescription;
          this.totalTags=args.totalTags;
          this.weekTags=args.weekTags;
          this.monthTags=args.monthTags;
     }
}