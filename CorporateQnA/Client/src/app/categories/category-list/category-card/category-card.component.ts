import { Component, Input, OnInit } from '@angular/core';
import { CategoryViewModel } from 'src/app/models/categoryViewModel';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styles: [
  ]
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: CategoryViewModel;
  constructor() { }

  ngOnInit(): void {
  }

}
