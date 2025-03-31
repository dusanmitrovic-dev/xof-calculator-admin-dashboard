import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private darkThemeClass = 'dark-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableDarkTheme(): void {
    this.renderer.addClass(document.body, this.darkThemeClass);
  }

  enableLightTheme(): void {
    this.renderer.removeClass(document.body, this.darkThemeClass);
  }
}
