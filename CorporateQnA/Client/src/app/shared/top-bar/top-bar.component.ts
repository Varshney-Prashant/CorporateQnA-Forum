import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Icons } from '../icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styles: [
  ]
})
export class TopBarComponent implements OnInit {

  currentDate:Date=new Date();
  icons:Icons=new Icons;
  constructor() { }

  ngOnInit(): void {
  }

}
