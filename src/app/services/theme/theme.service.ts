import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures the service is available globally
})
export class ThemeService {
  private darkMode: boolean = false;

  isDarkMode(): boolean {
    return this.darkMode;
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
}
