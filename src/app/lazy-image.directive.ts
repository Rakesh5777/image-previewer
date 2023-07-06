
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[lazyLoadImg]'
})
export class LazyImgDirective {
  @Input('lazyLoadImg') src!: string;

  constructor(public el: ElementRef) { }

  ngAfterViewInit(): void {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px 200px 0px'
    }
    const observer = new IntersectionObserver(([entrys]) => this.loadingCallback(entrys), options);
    observer.observe(this.el.nativeElement);
  }

  public loadingCallback(entrys: IntersectionObserverEntry): void {
    const { isIntersecting, target } = entrys;
    if (isIntersecting) {
      const img = new Image();
      img.src = this.src;
      img.onload = () => {
        target.setAttribute('src', this.src);
      }
    }
  }

}