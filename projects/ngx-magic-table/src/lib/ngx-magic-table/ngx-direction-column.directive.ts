import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import {OrderDirection} from './../models/enum';


@Directive({
    selector: '[setDirection]'
})
export class DirectionDirective {
    constructor(private renderer: Renderer2, private el: ElementRef) { }
    _direction: number;
    @Input('setDirection')
    set direction(direction: number) {
        this._direction = direction;
        this.renderer.removeClass(this.el.nativeElement, 'fa-arrow-down');
        this.renderer.removeClass(this.el.nativeElement, 'fa-arrow-up');
        if (this._direction != null) {
            if (this._direction === OrderDirection.Descending) {
                this.renderer.addClass(this.el.nativeElement, 'fa-arrow-up');
            }
            if (this._direction === OrderDirection.Ascending) {
                this.renderer.addClass(this.el.nativeElement, 'fa-arrow-down');
            }
        }
    }
}
