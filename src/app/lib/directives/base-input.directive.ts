import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBaseInput]',
  standalone: true,
})
export class BaseInputDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'white';
  }
}
