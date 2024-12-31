import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';

import { CartService } from './services/cart/cart.service';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(
    private cartService: CartService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });

       // On init, check if dark theme is already applied
   if (this.themeService.isDarkMode()) {
    document.documentElement.classList.add('dark-theme');
  }

  }


}

