import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: 'input[appFocus]',
})
export class FocusDirective implements OnChanges {
  @Input('appFocus') focused: boolean = false;

  constructor(public element: ElementRef<HTMLInputElement>) {}

  ngOnChanges() {
    if (this.focused) {
      setTimeout(() => {
        this.element.nativeElement.focus();
        this.element.nativeElement.select();
      }, 0);
    }
  }
}
