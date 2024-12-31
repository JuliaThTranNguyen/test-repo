import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle', 
  standalone: false,// Required for Angular to recognize it as a component
  templateUrl: './theme-toggle.component.html', // Template is linked here
  styleUrls: ['./theme-toggle.component.scss'], // Optional: Add if styles are defined
})
export class ThemeToggleComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
