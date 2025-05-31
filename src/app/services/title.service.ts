import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  readonly #titleService = inject(Title);
  readonly #document = inject(DOCUMENT);

  constructor() { }

  setTitle(newTitle: string) {
    this.#titleService.setTitle(newTitle);
  }

  setFavicon(base64Image: string) {
    const link: HTMLLinkElement = this.#document.querySelector('link[rel*="icon"]') || this.#document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'data:image/x-icon;base64,' + base64Image;
    this.#document.getElementsByTagName('head')[0].appendChild(link);
  }
}
