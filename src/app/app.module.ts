import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgxMagicTableModule } from 'projects/ngx-magic-table/src/public_api';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    NgxMagicTableModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }


