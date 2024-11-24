import { Injectable, Inject, OnDestroy, Optional } from '@angular/core';
import {BehaviorSubject, fromEvent, debounceTime, map, distinctUntilChanged, Subscription, Observable} from 'rxjs';
import { BREAKPOINTS } from './breakpoint.token';
import { ResizeObserver } from '@juggle/resize-observer';

interface Breakpoint {
  width: number;
  cols: number;
}

@Injectable({
  providedIn: 'root',
})
export class NgxResponsiveColumnsService implements OnDestroy {
  private readonly breakpoints: Breakpoint[];
  private readonly breakpointSubject = new BehaviorSubject<number>(3); // Default column count
  readonly breakpoint$ = this.breakpointSubject.asObservable();
  private resizeSubscription: Subscription | null = null;
  private resizeObserver: ResizeObserver | undefined;

  constructor(@Optional() @Inject(BREAKPOINTS) customBreakpoints?: Breakpoint[]) {
    this.breakpoints = customBreakpoints || [
      { width: 1200, cols: 6 },
      { width: 1024, cols: 4 },
      { width: 768, cols: 2 },
      { width: 400, cols: 1 },
      { width: 0, cols: 1 },
    ];

    this.subscribeToBreakpointChanges();
  }

  public subscribeToBreakpointChanges(){
    this.breakpointObserver().subscribe((cols) => this.breakpointSubject.next(cols));
  }

  public breakpointObserver(): Observable<number> {
    this.resizeObserver = new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        this.updateBreakpoint(entry.contentRect.width);
      }
    });
    this.resizeObserver.observe(document.body);

    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        map((event: Event) => (event.target as Window).innerWidth),
        map((width) => this.getBreakpointCols(width)),
        distinctUntilChanged()
      )
  }

  private getBreakpointCols(width: number): number {
    return this.breakpoints.find((b) => width >= b.width)?.cols ?? 1;
  }

  private updateBreakpoint(width: number): void {
    const cols = this.getBreakpointCols(width);
    if (this.breakpointSubject.value !== cols) {
      this.breakpointSubject.next(cols);
    }
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe();
    this.resizeObserver?.disconnect();
  }
}
