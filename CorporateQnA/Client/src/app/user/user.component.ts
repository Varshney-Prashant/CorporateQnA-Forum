import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  constructor( public loginService:LoginService) { }

  ngOnInit(): void {

  }

}
