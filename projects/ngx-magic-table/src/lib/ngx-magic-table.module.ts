import { NgModule, NO_ERRORS_SCHEMA, Directive, Component, ModuleWithProviders } from '@angular/core';
import { NgxMagicTableComponent} from './ngx-magic-table/ngx-magic-table.component';
import { DirectionDirective} from './ngx-magic-table/ngx-direction-column.directive';
import { DomChangeDirective} from './ngx-magic-table/ngx-magic-table-change.directive';
import { NamedTemplateDirective } from './ngx-named-template/ngx-named-template.directive';
import { SortPipe } from './sort/sort.pipe';
import { ReverseArray } from './pipe/reverse-array';
import { NgxColumnTemplateComponent } from './ngx-column-template/ngx-column-template.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgxNumericFilterComponent } from './ngx-numeric-filter/ngx-numeric-filter.component';
import { NgxStringFilterComponent } from './ngx-string-filter/ngx-string-filter.component';
import { NgxEnumFilterComponent } from './ngx-enum-filter/ngx-enum-filter.component';
import { NgxBooleanFilterComponent } from './ngx-boolean-filter/ngx-boolean-filter.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxMultiselectDropdownComponent } from './ngx-multiselect-dropdown/ngx-multiselect-dropdown.component';
import { ListFilterPipe } from './ngx-multiselect-dropdown/list-filter.pipe';
import { ClickOutsideDirective } from './ngx-multiselect-dropdown/click-outside.directive';
// import { NgxMultiselectDropdownComponent } from './ngx-multiselect-dropdown/ngx-multiselect-dropdown.component';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  declarations: [NgxMagicTableComponent,
    NamedTemplateDirective,
    SortPipe,
    ReverseArray,
    NgxColumnTemplateComponent,
    NgxNumericFilterComponent,
    NgxStringFilterComponent,
    NgxEnumFilterComponent,
    DirectionDirective,
    DomChangeDirective,
    NgxBooleanFilterComponent,
    NgxMultiselectDropdownComponent,
    ClickOutsideDirective,
    ListFilterPipe],

  exports: [NgxMagicTableComponent,
    NgxColumnTemplateComponent,
    NamedTemplateDirective,
    NgxStringFilterComponent,
    DirectionDirective,
    DomChangeDirective,
    NgxNumericFilterComponent,
    NgxBooleanFilterComponent,
    NgxMultiselectDropdownComponent,
    NgxEnumFilterComponent],

  schemas: [ NO_ERRORS_SCHEMA ]
})
export class NgxMagicTableModule { }

// export class NgxMultiselectDropdownComponent {
//   static forRoot(): ModuleWithProviders {
//     return {
//       ngModule: NgxMultiselectDropdownComponent
//     };
//   }
// }
