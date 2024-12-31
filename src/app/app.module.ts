import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Ensure this is imported
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductHeaderComponent } from './pages/home/components/product-header/product-header.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { ProductCardComponent } from './pages/home/components/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';

import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartService } from './services/cart/cart.service';

import { ThemeService } from './services/theme/theme.service';
import { ThemeToggleComponent } from './components/header/theme-toggle/theme-toggle.component';
import { StoreService } from './services/store/store.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductHeaderComponent,
    FiltersComponent,
    ProductCardComponent,
    CartComponent,
    ProductDetailsComponent,
    ThemeToggleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, // Ensure these are listed
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(), // Provide HttpClient
    CartService,
    ThemeService,
    StoreService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
