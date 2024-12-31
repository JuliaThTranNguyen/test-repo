import { Component, OnInit,Output, EventEmitter, OnDestroy } from '@angular/core';
import { StoreService } from '../../../../services/store/store.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../models/category.model';


@Component({
  selector: 'app-filters',
  standalone: false,
  
  templateUrl: './filters.component.html',

})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubcription: Subscription | undefined;
  categories: Category[] | undefined;
  constructor( private storeService: StoreService){}

  ngOnInit(): void {
    this.categoriesSubcription = this.storeService
      .getAllCategories()
      .subscribe((response: Category[]) => {
        this.categories = response;
       // console.log('Fetched categories: from filter', this.categories);  // Log the API response
      });

      
  }
  
  

onShowCategories(category: string): void {
    this.showCategory.emit(category);
    console.log('show selected category', category);
  }

  ngOnDestroy(): void {
      if (this.categoriesSubcription) {
        this.categoriesSubcription.unsubscribe();
      }
  }
}
