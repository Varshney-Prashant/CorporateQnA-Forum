import { Component, OnInit } from '@angular/core';

import { Icons } from '../icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {

  icons:Icons=new Icons;
  constructor() { }

  ngOnInit(): void {
  }

}
