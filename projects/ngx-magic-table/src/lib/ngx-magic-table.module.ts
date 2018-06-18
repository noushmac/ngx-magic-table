import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxMagicTableComponent } from './ngx-magic-table/ngx-magic-table.component';
import { NamedTemplateDirective } from './ngx-named-template/ngx-named-template.directive';
import { SortPipe } from './sort/sort.pipe';
import { NgxColumnTemplateComponent } from './ngx-column-template/ngx-column-template.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNumericFilterComponent } from './ngx-numeric-filter/ngx-numeric-filter.component';
import { NgxStringFilterComponent } from './ngx-string-filter/ngx-string-filter.component';
import { NgxEnumFilterComponent } from './ngx-enum-filter/ngx-enum-filter.component';
import { NgxBooleanFilterComponent } from './ngx-boolean-filter/ngx-boolean-filter.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgxPaginationModule,
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  declarations: [NgxMagicTableComponent, NamedTemplateDirective, SortPipe, NgxColumnTemplateComponent, NgxNumericFilterComponent, NgxStringFilterComponent, NgxEnumFilterComponent, NgxBooleanFilterComponent],
  exports: [NgxMagicTableComponent, NgxColumnTemplateComponent, NamedTemplateDirective, NgxStringFilterComponent, NgxNumericFilterComponent, NgxBooleanFilterComponent, NgxEnumFilterComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class NgxMagicTableModule { }
