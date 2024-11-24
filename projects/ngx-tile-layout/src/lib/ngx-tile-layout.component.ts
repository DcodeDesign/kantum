import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'ngx-tile-layout',
  templateUrl: './ngx-tile-layout.component.html',
  styleUrls: ['./ngx-tile-layout.component.scss']
})
export class NgxTileLayoutComponent implements AfterViewInit, OnChanges {
  @Input() columnCount = 3;
  @Input() gutter = 10;
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() items: any[] | undefined = [];

  @ViewChild('tileLayoutContainer', { static: true }) tileLayoutContainer!: ElementRef;

  private columnHeights: number[] = [];
  protected columnWidth = 0;
  private resizeTimeoutId!: number | null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.recalculateLayout();
  }

  ngOnChanges(): void {
    this.debounceRecalculateLayout();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.debounce(() => this.recalculateLayout(), 300);
  }

  private debounce(func: () => void, delay: number): void {
    if (this.resizeTimeoutId) {
      clearTimeout(this.resizeTimeoutId);
    }
    this.resizeTimeoutId = window.setTimeout(func, delay);
  }

  private recalculateLayout(): void {
    if (!this.ensureMasonryContainer()) return;

    const container = this.tileLayoutContainer.nativeElement;
    const containerWidth = container.offsetWidth;

    if (!this.columnCount || !containerWidth) return;

    this.columnWidth = (containerWidth - (this.columnCount - 1) * this.gutter) / this.columnCount;
    this.columnHeights = Array(this.columnCount).fill(0);

    const items = Array.from(container.children) as HTMLElement[];

    if (!items.length) return;

    let maxHeight = 0;
    items.forEach((item) => {
      this.styleItem(item);
      maxHeight = Math.max(maxHeight, this.columnHeights[this.getShortestColumnIndex()]);
    });

    this.renderer.setStyle(container, 'height', `${maxHeight}px`);
  }

  debounceRecalculateLayout(delay: number = 300): void {
    this.debounce(() => this.recalculateLayout(), delay);
  }

  private styleItem(item: HTMLElement): void {
    const columnIndex = this.getShortestColumnIndex();
    const left = columnIndex * (this.columnWidth + this.gutter);
    const top = this.columnHeights[columnIndex];

    this.renderer.setStyle(item, 'position', 'absolute');
    this.renderer.setStyle(item, 'left', `${left}px`);
    this.renderer.setStyle(item, 'top', `${top}px`);
    this.renderer.setStyle(item, 'width', `${this.columnWidth}px`);
    this.renderer.setStyle(item, 'opacity', '1');

    this.columnHeights[columnIndex] += item.offsetHeight + this.gutter;
  }

  private ensureMasonryContainer(): boolean {
    if (!this.tileLayoutContainer?.nativeElement) {
      console.warn('Masonry container not found.');
      return false;
    }
    return true;
  }

  private getShortestColumnIndex(): number {
    return this.columnHeights.indexOf(Math.min(...this.columnHeights));
  }

  trackById(index: number, item: { id: string }): string {
    return item.id;
  }
}
