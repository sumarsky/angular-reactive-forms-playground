import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn, ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: DateRangeComponent, multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateRangeComponent), multi: true, },
  ]
})
export class DateRangeComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  public form: FormGroup;

  public disabled: boolean;
  public onChanged: any = () => { };
  public onTouched: any = () => { };
  public onValidatorChange: any = () => { };

  get dateFrom() { return this.form.controls["dateFrom"] }
  get dateTo() { return this.form.controls["dateTo"] }

  private unsubscribe = new Subject();
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      dateFrom: null,
      dateTo: null
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
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.validatorFunction(control)
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }

  private validatorFunction: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const dateFrom = control.get('dateFrom');
    const dateTo = control.get('dateTo');

    return dateFrom && dateTo &&
      dateFrom.value > dateTo.value
      ? { 'start-date-after-end-date': true }
      : null;
  };
}