export class Category{
     id:number;
     name:string;
     description:string;

     constructor(args:any){
          this.id=args.id;
          this.name=args.name;
          this.description=args.description;
     }
}