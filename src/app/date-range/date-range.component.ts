import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateRangeComponent), multi: true, },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateRangeComponent), multi: true }
  ]
})
export class DateRangeComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  public form: FormGroup;

  public isDisabled: boolean;
  public onChanged: any = () => { };
  public onTouched: any = () => { };

  get dateFrom() { return this.form.controls["dateFrom"] }
  get dateTo() { return this.form.controls["dateTo"] }

  private unsubscribe = new Subject();
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      dateFrom: [null, this.isDisabled],
      dateTo: [null, this.isDisabled]
    });
  }
  ngOnInit() { }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.form.setValue(obj, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;

    if (isDisabled) {
      this.dateFrom.disable();
      this.dateTo.disable();
    } else {
      this.dateFrom.enable();
      this.dateTo.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.validatorFunction(control);
  }

  private validatorFunction: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const isStartAfterEnd = this.dateFrom.value && this.dateTo.value &&
      new Date(this.dateFrom.value) > new Date(this.dateTo.value);

    if (isStartAfterEnd) {
      return { 'date-range': 'start-date-after-end-date' };
    }

    return null;
  };
}