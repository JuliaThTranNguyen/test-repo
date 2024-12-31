import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from '../../services/cart/cart.service';
import { StoreService } from '../../services/store/store.service';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 2: 355, 3: 350 };

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = []; // Array to store the products
  pagedProducts: Product[] = []; // Subset of products for the current page
  cols = 3;
  sort = 'desc';
  rowHeight: number = ROWS_HEIGHT[this.cols];
  pageSize: number = 12; // Default page size
  totalItems: number = 0; // Total number of products
  currentPage: number = 0; // Current page index
  category: string | undefined;
  productsSubcription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    // this.totalItems = this.products.length;
    // this.updatePagedProducts();
  }

  // fetchProducts(): void {
  //   this.productsSubcription = this.storeService.getAllProducts(this.pageSize, this.sort).subscribe(
  //     (data) => {
  //       console.log('Fetched products:', data); // Log the API response
  //       this.products = data;  // Assign fetched products to the products array
  //       this.totalItems = this.products.length;  // Set the total number of products
  //       this.updatePagedProducts();  // Update the paged products list
  //     },
  //     (error) => {
  //       console.error('Error fetching products:', error);  // Handle errors
  //     }
  //   );
  // }

  private sortProducts(): void {
    if (this.sort === 'asc') {
      this.products.sort((a, b) => a.price - b.price); // Ascending order
    } else if (this.sort === 'desc') {
      this.products.sort((a, b) => b.price - a.price); // Descending order
    }
   // console.log('Sorted products:', this.products); // Debug log sorted products
  }

  fetchProducts(): void {
    this.productsSubcription = this.storeService
      .getAllProducts(this.pageSize, this.sort, this.category)
      .subscribe({
        next: (data) => {
          //console.log('Fetched products:', data); // Log the API response
          this.products = data;  // Assign fetched products to the products array
  
          this.sortProducts(); // Add sorting by price desc -asc here
         // this.onShowCategory(this.category);
          this.totalItems = this.products.length;  // Set the total number of products
          this.updatePagedProducts();
  
          // Loop through each product to clean up image URLs
          this.products.forEach((product) => {
            try {
              // Check if the images are stored as a stringified array
              if (typeof product.images === 'string') {
                // Parse the stringified array into a real array
                let parsedImages = JSON.parse(product.images);
  
                // Clean each URL: Remove quotes and square brackets
                product.images = parsedImages.map((url: string) => {
                  return url.replace(/["\[\]]/g, ''); // Remove quotes and square brackets
                });
              } else if (Array.isArray(product.images)) {
                // If images are already an array, clean up each URL
                product.images = product.images.map((url: string) => {
                  return url.replace(/["\[\]]/g, ''); // Remove quotes and square brackets
                });
              } else {
                console.error('Product images are not in a valid format:', product.images);
                product.images = [];  // Fallback if images are not in expected format
              }
            } catch (error) {
              console.error('Failed to parse image array:', product.images);
              product.images = [];  // Fallback if error occurs
            }
          });
        },
        error: (error) => {
          console.error('Error fetching products:', error);  // Handle errors
        }
      });
  }  

  onSortChanged(newSort: string): void {
    //console.log('Received sort change:', newSort); // Debug log
    this.sort = newSort;
    this.fetchProducts();
  }

  // Method to update the layout of products list
  onUpdatedLayout(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  // Method to show the category
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.fetchProducts();
  }

  // Method to handle adding products to the cart
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.images[0],
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
    //console.log('Product image to cart:', product);
  }

  // Handle pagination page change
  onPageChange(event: PageEvent): void {
    //console.log('Page Event:', event);
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  updatePagedProducts(): void {
    console.log('Current page:', this.currentPage, 'Page size:', this.pageSize); // Debug log
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
    //console.log('Paged products:', this.pagedProducts); // Debug log
  }

  ngOnDestroy(): void {
    if (this.productsSubcription) {
      this.productsSubcription.unsubscribe();
    }
  }
}
