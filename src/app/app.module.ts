import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMagicTableModule } from 'ngx-magic-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormsModule
  ],
  imports: [
    BrowserModule,
    NgxMagicTableModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
