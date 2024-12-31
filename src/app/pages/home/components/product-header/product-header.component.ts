import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-header',
  standalone: false,
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss',
})
export class ProductHeaderComponent implements OnInit {
  @Output() updatedLayout = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>(); // New Output Event
  sort = 'desc';

  constructor() {}

  ngOnInit(): void {}

  onSortByPrice(sortValue: string): void {
    this.sortChanged.emit(sortValue);
    this.sort = sortValue;
    //console.log('received sort change:', sortValue); // Debug log
    
  }
  

  // Emit layout change
  onUpdatedLayout(colsNum: number): void {
    this.updatedLayout.emit(colsNum);
  }
}
