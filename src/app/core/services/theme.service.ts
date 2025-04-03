import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _isDark = new BehaviorSubject<boolean>(false);
  readonly isDark$ = this._isDark.asObservable(); // Expose as read-only observable

  // Store key for localStorage
  private static readonly THEME_STORAGE_KEY = 'isDarkMode';

  constructor(
    rendererFactory: RendererFactory2,
    // Inject PLATFORM_ID to check if running in browser
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // Renderer is only useful in browser context
    if (isPlatformBrowser(this.platformId)) {
      this.renderer = rendererFactory.createRenderer(null, null);
      this.loadInitialTheme();
    } else {
      // Provide a dummy renderer or handle server-side rendering case
      this.renderer = {
        addClass: () => {},
        removeClass: () => {},
      } as unknown as Renderer2; // Type assertion for dummy
      console.warn(
        'ThemeService: Running outside browser context. Theme persistence disabled.'
      );
    }
  }

  private loadInitialTheme() {
    // Only access localStorage and window if in browser
    if (!isPlatformBrowser(this.platformId)) return;

    let initialValue = false;
    try {
      const storedPreference = localStorage.getItem(
        ThemeService.THEME_STORAGE_KEY
      );
      if (storedPreference !== null) {
        initialValue = storedPreference === 'true';
      } else {
        // Check system preference only if no stored preference exists
        initialValue =
          window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      }
    } catch (e) {
      console.error(
        'ThemeService: Error accessing localStorage or matchMedia.',
        e
      );
      // Fallback to default (false/light)
      initialValue = false;
    }

    this.setTheme(initialValue);
  }

  setTheme(isDark: boolean) {
    // Only update if the value actually changes
    if (this._isDark.value === isDark) return;

    this._isDark.next(isDark);

    // Only interact with DOM and localStorage in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(ThemeService.THEME_STORAGE_KEY, String(isDark));
      } catch (e) {
        console.error('ThemeService: Error writing to localStorage.', e);
      }

      // Safely access document.body
      const body = document?.body;
      if (body) {
        if (isDark) {
          this.renderer.addClass(body, 'dark-theme');
          this.renderer.removeClass(body, 'light-theme'); // Explicitly remove light
        } else {
          this.renderer.addClass(body, 'light-theme');
          this.renderer.removeClass(body, 'dark-theme'); // Explicitly remove dark
        }
      }
    }
  }

  toggleTheme() {
    this.setTheme(!this._isDark.value);
  }

  // Added methods from ToolbarComponent that were removed
  enableDarkTheme(): void {
    this.setTheme(true);
  }

  enableLightTheme(): void {
    this.setTheme(false);
  }
}
