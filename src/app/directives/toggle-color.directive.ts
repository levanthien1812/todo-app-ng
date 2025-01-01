import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  input,
} from '@angular/core';
import { STATUS_VALUE } from '../lib/constants/constant';
import { hexToRgb } from '../lib/utils/hex-to-rgb';

@Directive({
  selector: '[appToggleColor]',
  standalone: true,
})
export class ToggleColorDirective {
  currentStatus =
    input.required<(typeof STATUS_VALUE)[keyof typeof STATUS_VALUE]>();

  colorPalletes: Record<
    (typeof STATUS_VALUE)[keyof typeof STATUS_VALUE],
    string[]
  > = {
    [STATUS_VALUE.NOT_STARTED]: [
      '#d1d5db',
      '#9ca3af',
      '#6b7280',
      '#4b5563',
      '#374151',
      '#1f2937',
      '#111827',
    ],
    [STATUS_VALUE.IN_PROGRESS]: [
      '#fde047',
      '#facc15',
      '#eab308',
      '#ca8a04',
      '#a16207',
      '#854d0e',
      '#713f12',
    ],
    [STATUS_VALUE.DONE]: [
      '#86efac',
      '#4ade80',
      '#22c55e',
      '#16a34a',
      '#15803d',
      '#166534',
      '#14532d',
    ],
  };

  constructor(private el: ElementRef) {
    effect(() => {
      if (this.currentStatus()) {
        this.toggleColor();
      }
    });
  }

  @HostListener('click') onClick() {
    this.el.nativeElement.style.userSelect = 'none';
    this.toggleColor();
  }

  private toggleColor() {
    let currentIndex = this.colorPalletes[this.currentStatus()].findIndex(
      (color) => {
        return hexToRgb(color) === this.el.nativeElement.style.color;
      }
    );

    if (
      currentIndex === -1 ||
      currentIndex === this.colorPalletes[this.currentStatus()].length - 1
    )
      currentIndex = 0;

    this.el.nativeElement.style.color =
      this.colorPalletes[this.currentStatus()][currentIndex + 1];
  }
}
