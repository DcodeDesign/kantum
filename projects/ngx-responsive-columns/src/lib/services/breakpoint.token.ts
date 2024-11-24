import { InjectionToken } from '@angular/core';

export interface Breakpoint {
  width: number;
  cols: number;
}

export const BREAKPOINTS = new InjectionToken<Breakpoint[]>('BREAKPOINTS', {
  providedIn: 'root', // Optionnel : rendu accessible globalement.
  factory: () => [
    { width: 1536, cols: 8 },
    { width: 1280, cols: 6 },
    { width: 1024, cols: 4 },
    { width: 768, cols: 3 },
    { width: 640, cols: 2 },
    { width: 480, cols: 1 },
    { width: 0, cols: 1 },
  ],
});
