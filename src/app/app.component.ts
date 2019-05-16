import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OcurrenceTypes } from './ocurrence-type-chooser/ocurrence-types.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styles: []
})
export class AppComponent {
  form: FormGroup;

  public get ocurrenceType() { return this.form.controls["ocurrenceType"]; }
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      ocurrenceType: OcurrenceTypes.Daily
    })
  }
}
