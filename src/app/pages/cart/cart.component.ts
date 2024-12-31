import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart/cart.service';

import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-cart',
  standalone: false,

  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, 
private http: HttpClient

  ) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  // Calculate the total price of cart order
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  // Clear all items in cart
  onClearCart(): void {
    this.cartService.clearCart();
  }

  // Clear only some selected items in cart
  onRemoveItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  // Remove quantity of item in cart
  onDecreaseQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  // Add quantity of item in cart
  onIncreaseQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

 // Checkout from cart
 onProceedToCheckout(): void {
  this.http.post('http://localhost:4242/checkout', 
    { items: this.cart.items }
  ).subscribe(async(response: any) => {
    const stripe = await loadStripe('pk_test_51OAwryIOYB2F1mRYMMwBmGVoyUvLF3erR59lApLp4TnNIvHeSpTBzXIIjL1oNO7JNZuYFQEkdcIZdFmuNk0X1TjL00JAFpqFWT');
    stripe?.redirectToCheckout({
      sessionId: response.id,
    });
  });
  console.log('Proceed to checkout');
}

}
