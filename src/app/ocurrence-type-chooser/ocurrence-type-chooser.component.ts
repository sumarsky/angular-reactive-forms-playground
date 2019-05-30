import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { OcurrenceTypes } from './ocurrence-types.enum';

@Component({
  selector: 'app-ocurrence-type-chooser',
  templateUrl: './ocurrence-type-chooser.component.html',
  styleUrls: ['./ocurrence-type-chooser.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => OcurrenceTypeChooserComponent), multi: true }
  ]
})
export class OcurrenceTypeChooserComponent implements OnInit, ControlValueAccessor {
  public value: number;
  public disabled: boolean;

  public onChanged: any = () => { };
  public onTouched: any = () => { };

  public get isDailyActive() { return this.value === OcurrenceTypes.Daily; }
  public get isWeeklyActive() { return this.value === OcurrenceTypes.Weekly; }
  public get isMonthlyActive() { return this.value === OcurrenceTypes.Monthly; }

  constructor() { }
  ngOnInit() { }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onDaily() {
    this.setValueTo(OcurrenceTypes.Daily);
  }
  onWeekly() {
    this.setValueTo(OcurrenceTypes.Weekly);
  }
  onMonthly() {
    this.setValueTo(OcurrenceTypes.Monthly);
  }
  private setValueTo(value: OcurrenceTypes) {
    this.value = value;
    this.onChanged(value);
    this.onTouched();
  }
}
