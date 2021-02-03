import { Component, Input, OnInit } from '@angular/core';

import { CategoryViewModel } from '../../../models';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: CategoryViewModel;
  constructor() { }

  ngOnInit(): void {
  }

}
