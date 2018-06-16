import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMagicTableModule } from 'ngx-magic-table';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMagicTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
