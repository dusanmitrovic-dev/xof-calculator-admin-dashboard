import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _isDark = new BehaviorSubject<boolean>(false);
  isDark$ = this._isDark.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadInitialTheme();
  }

  private loadInitialTheme() {
    const storedPreference = localStorage.getItem('isDarkMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialValue = storedPreference !== null ? storedPreference === 'true' : prefersDark;
    this.setTheme(initialValue);
  }

  setTheme(isDark: boolean) {
    this._isDark.next(isDark);
    localStorage.setItem('isDarkMode', String(isDark));
    if (isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  toggleTheme() {
    this.setTheme(!this._isDark.value);
  }
}