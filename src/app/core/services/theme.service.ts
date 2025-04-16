import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to hold the current theme state (true for dark, false for light)
  isDarkMode = signal<boolean>(false);

  private readonly THEME_KEY = 'theme';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize theme only in the browser
    if (isPlatformBrowser(this.platformId)) {
        this.initializeTheme();

        // Effect to automatically update body class when signal changes
        effect(() => {
          const isDark = this.isDarkMode();
          console.log('[ThemeService] Dark mode changed to:', isDark);
          if (isDark) {
            this.document.body.classList.add('dark-theme');
            this.document.body.classList.remove('light-theme'); // Ensure light is removed
          } else {
            this.document.body.classList.add('light-theme');
            this.document.body.classList.remove('dark-theme');
          }
        });
    }
  }

  private initializeTheme(): void {
    const storedPreference = localStorage.getItem(this.THEME_KEY);
    let initialValue: boolean;

    if (storedPreference) {
      initialValue = storedPreference === 'dark';
    } else {
      // Check system preference if no stored preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialValue = prefersDark;
      // Store the detected preference initially
      localStorage.setItem(this.THEME_KEY, initialValue ? 'dark' : 'light');
    }
    
    console.log('[ThemeService] Initializing theme. Dark mode:', initialValue);
    this.isDarkMode.set(initialValue);
    // Initial class setting (although effect will also run)
    if (initialValue) {
         this.document.body.classList.add('dark-theme');
         this.document.body.classList.remove('light-theme');
    } else {
         this.document.body.classList.add('light-theme');
          this.document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme(): void {
     if (isPlatformBrowser(this.platformId)) {
        this.isDarkMode.update(value => {
            const newValue = !value;
            localStorage.setItem(this.THEME_KEY, newValue ? 'dark' : 'light');
            console.log('[ThemeService] Toggling theme. New dark mode value:', newValue);
            return newValue;
        });
     } else {
         console.warn('[ThemeService] Cannot toggle theme outside the browser.')
     }
  }
}
