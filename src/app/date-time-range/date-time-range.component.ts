import { Component, OnInit, forwardRef } from '@angular/core';
import { DateTimeRange } from './date-time-range';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ValidationErrors, ValidatorFn, Validator, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-date-time-range',
  templateUrl: './date-time-range.component.html',
  styleUrls: ['./date-time-range.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateTimeRangeComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateTimeRangeComponent), multi: true }
  ]
})
export class DateTimeRangeComponent implements OnInit, ControlValueAccessor, Validator {
  public value: DateTimeRange = new DateTimeRange();

  public disabled: boolean;
  public onChanged: any = () => { };
  public onTouched: any = () => { };

  private _from: Date;
  get from(): Date { return this._from; }
  set from(value: Date) {
    this._from = value;
    this.value.from = this.from;
    this.onChanged(this.value);
    this.onTouched();
  }

  private _to: Date;
  get to(): Date { return this._to; }
  set to(value: Date) {
    this._to = value;
    this.value.to = this.to;
    this.onChanged(this.value);
    this.onTouched();
  }

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


  validate(control: AbstractControl): ValidationErrors {
    return this.validatorFunction(control);
  }

  private validatorFunction: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const isStartAfterEnd = this.from > this.to;

    if (isStartAfterEnd) {
      return { 'date-time-range': 'start-after-end' };
    }

    return null;
  };
}
