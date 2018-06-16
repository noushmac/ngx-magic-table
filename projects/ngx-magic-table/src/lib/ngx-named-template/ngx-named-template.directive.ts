import { Directive, Attribute, Inject, TemplateRef } from '@angular/core';

@Directive({

  selector: 'ng-template[name]'
})
export class NamedTemplateDirective  {

  constructor(
      @Attribute('name') public name,
      @Inject(TemplateRef) public template: TemplateRef<any>
  ) {
  }
}