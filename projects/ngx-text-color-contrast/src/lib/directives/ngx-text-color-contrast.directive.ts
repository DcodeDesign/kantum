import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngxTextContrast]'
})
export class NgxTextColorContrastDirective implements OnChanges {

  @Input() ngxTextContrast: string | null | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngxTextContrast']) {
      this.updateTextContrast(this.ngxTextContrast);
    }
  }

  private updateTextContrast(color: string | null | undefined): void {
    if (!color) return;

    this.renderer.removeClass(this.el.nativeElement, 'dark-text');
    this.renderer.removeClass(this.el.nativeElement, 'light-text');

    const isLight = this.isLightColor(color);

    const textColor = isLight ? 'dark-text' : 'light-text';

    this.renderer.addClass(this.el.nativeElement, textColor);
  }

  private isLightColor(color: string | null): boolean | null {
    if(!color) return null;

    const rgb = this.hexToRgb(color) || this.rgbStringToRgb(color);
    if (!rgb) return false;

    const { r, g, b } = rgb;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128;
  }

  private hexToRgb(hex: string | null): { r: number, g: number, b: number } | null {
    if(!hex) return null;

    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return null;
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  }

  private rgbStringToRgb(rgb: string | null): { r: number, g: number, b: number } | null {
    if(!rgb) return null;

    const result = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(rgb);
    if (!result) return null;
    const [, r, g, b] = result;
    return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
  }
}
