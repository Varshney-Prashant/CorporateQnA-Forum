import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {

	transform(value: any, args: string) {
		if(!value || !args){
			return value;
		}
		console.log(value)
		console.log(args)
		args=args.toLowerCase();

		return value.filter((item: any)=>{
			return JSON.stringify(item).toLowerCase().includes(args);
		})
	}

}
