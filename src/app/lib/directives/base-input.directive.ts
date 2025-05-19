import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBaseInput]',
})
export class BaseInputDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'white';
  }
}
