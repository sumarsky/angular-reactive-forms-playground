import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OcurrenceTypes } from './ocurrence-type-chooser/ocurrence-types.enum';
import { DateTimeRange } from './date-time-range/date-time-range';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styles: []
})
export class AppComponent {
  form: FormGroup;
  foo: number;
  public get ocurrenceType() { return this.form.controls["ocurrenceType"]; }
  public get range() { return this.form.controls["range"]; }
  public get timeSpan() { return this.form.controls["timeSpan"]; }
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      ocurrenceType: OcurrenceTypes.Daily,
      range: null,
      timeSpan: new DateTimeRange()// fb.control({ value: {}, disabled: true })
    })
  }
}
