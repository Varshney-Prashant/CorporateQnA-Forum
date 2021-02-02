import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styles: [
  ]
})
export class TopNavBarComponent implements OnInit {

  constructor(private router:Router) { }
  onUserPage:boolean=false;
  ngOnInit(): void {
  }

  ngDoCheck(){
    this.onUserPage=this.router.url.indexOf('user-details') == -1;
  }

}
