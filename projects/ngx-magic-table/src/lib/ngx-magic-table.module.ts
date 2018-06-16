import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxMagicTableComponent } from './ngx-magic-table/ngx-magic-table.component';
import { NamedTemplateDirective } from './ngx-named-template/ngx-named-template.directive';
import { SortPipe } from './sort/sort.pipe';
import { NgxColumnTemplateComponent } from './ngx-column-template/ngx-column-template.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    NgxPaginationModule,
    BrowserModule
  ],
  declarations: [NgxMagicTableComponent, NamedTemplateDirective, SortPipe, NgxColumnTemplateComponent],
  exports: [NgxMagicTableComponent, NgxColumnTemplateComponent, NamedTemplateDirective],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class NgxMagicTableModule { }
