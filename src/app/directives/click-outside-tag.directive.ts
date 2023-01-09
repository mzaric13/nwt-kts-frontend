import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutsideTag]',
})
export class ClickOutsideTagDirective {
  @Output() public clickOutside = new EventEmitter();

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    if (targetElement.id === 'tagInput') {
      return;
    }
    const isClickedInside: boolean =
      this._elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
