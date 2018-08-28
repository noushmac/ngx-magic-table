import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[domChange]'
})
export class DomChangeDirective implements OnDestroy {
   private changes: MutationObserver;


  @Output()
  public domChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    // const childelement = this.elementRef.nativeElement.children;
    // for (let index = 0; index < childelement.length; index++) {
    //     const element1 = childelement[index];
    //     for (let index = 0; index < element1.length; index++) {
    //         const element2 = element1[index];
    //         this.changes.observe(element2, {
    //             attributes: true,
    //             childList: true,
    //             characterData: true,
    //           //    subtree: true,
    //           //    attributeOldValue: true,
    //           //    characterDataOldValue: true,
          
    //           });
    //     }
        
    
    // }

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        // mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
         this.domChange.emit( this.elementRef.nativeElement.offsetWidth - this.elementRef.nativeElement.clientWidth);
      }
    );

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true,
      attributeFilter: ['style'],

    //    subtree: true,
    //    attributeOldValue: true,
    //    characterDataOldValue: true,

    });

    // this.changes.observe(childelement, {
    //     attributes: true,
    //     childList: true,
    //     characterData: true,
    //   //    subtree: true,
    //   //    attributeOldValue: true,
    //   //    characterDataOldValue: true,
  
    //   });

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}