import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OcurrenceTypeChooserComponent } from './ocurrence-type-chooser/ocurrence-type-chooser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangeComponent } from './date-range/date-range.component';
import { DateTimeRangeComponent } from './date-time-range/date-time-range.component';

@NgModule({
  declarations: [
    AppComponent,
    OcurrenceTypeChooserComponent,
    DateRangeComponent,
    DateTimeRangeComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [OcurrenceTypeChooserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
