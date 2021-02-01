export class CategoryViewModel{
     categoryId:number;
     name:string;
     description:string;
     totalTags:number;
     weekTags:number;
     monthTags:number;

     constructor(args:any){
          this.categoryId=args.id;
          this.name=args.name;
          this.description=args.description;
          this.totalTags=args.totalTags;
          this.weekTags=args.weekTags;
          this.monthTags=args.monthTags;
     }
}