import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'app/services';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styles: [
  ]
})
export class TopNavBarComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }
  onUserPage:boolean=false;
  ngOnInit(): void {
  }

  ngDoCheck(){
    this.onUserPage=this.router.url.indexOf('user-details') == -1;
  }

}
