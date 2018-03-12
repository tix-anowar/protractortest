import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import "hammerjs";

import { AppComponent } from './app.component';
import { HtmlReportComponent } from './test-report/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HtmlReportComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
