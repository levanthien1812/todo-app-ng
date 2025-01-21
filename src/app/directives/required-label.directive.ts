import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRequiredLabel]',
  standalone: true,
})
export class RequiredLabelDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const asterisk = this.renderer.createElement('span');
    const text = this.renderer.createText('*');
    this.renderer.appendChild(asterisk, text);

    this.renderer.setStyle(asterisk, 'color', 'red');
    this.renderer.setStyle(asterisk, 'margin-left', '2px');
    this.renderer.setStyle(asterisk, 'font-size', '17px');
    this.renderer.setStyle(asterisk, 'font-weight', 'bold');

    this.renderer.appendChild(this.el.nativeElement, asterisk);
  }
}
