export class User {
	id: string;
	name: string;
	emailId: string;
	password: string;
     designation:string;
     company:string;
     imageUrl:string;

	constructor(args: any) {
		this.id = args.id;
		this.name = args.name;
		this.emailId = args.emailId;
          this.password = args.password;
          this.designation=args.designation;
          this.company=args.company;
          this.imageUrl=args.imageUrl;
	}
}