import { DOCUMENT } from '@angular/common';
import { Injectable, inject, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgxMaterialThemesService {
  private document = inject(DOCUMENT);
  private renderer: Renderer2;
  private readonly themeKey = 'user-theme-preference';
  private readonly darkThemeClass = 'dark-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
    this.observeSystemThemePreference();
  }

  toggleTheme(): void {
    const isDarkMode = this.isDarkMode();
    const newTheme = isDarkMode ? 'light' : 'dark';
    this.applyTheme(newTheme === 'dark');
    localStorage.setItem(this.themeKey, newTheme);
  }

  isDarkMode(): boolean {
    return this.document.body.classList.contains(this.darkThemeClass);
  }

  private initializeTheme(): void {
    const userPreference = this.getUserPreference();
    const systemPrefersDark = this.getSystemThemePreference();
    const useDarkTheme = userPreference ? userPreference === 'dark' : systemPrefersDark;
    this.applyTheme(useDarkTheme);
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(this.document.body, this.darkThemeClass);
    } else {
      this.renderer.removeClass(this.document.body, this.darkThemeClass);
    }
  }

  private getUserPreference(): string | null {
    return localStorage.getItem(this.themeKey);
  }

  private getSystemThemePreference(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private observeSystemThemePreference(): void {
    if (!window.matchMedia) return;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const userPreference = this.getUserPreference();
      if (!userPreference) {
        this.applyTheme(event.matches);
      }
    });
  }
}
