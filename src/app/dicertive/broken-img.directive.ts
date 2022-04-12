import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[brokenImg]'
})
export class BrokenImgDirective {

  @Input() brokenImg!: string;

  constructor(private eRef: ElementRef) { }

  @HostListener('error')
  loadBrokenImag(){
    const element: HTMLImageElement = <HTMLImageElement> this.eRef.nativeElement;
    element.src = this.brokenImg || "./assets/images/notFound.jpeg"
  }

}
