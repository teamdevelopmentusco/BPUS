import { Directive } from '@angular/core';

import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');
    return confirmNewPassword.value === newPassword.value
      ? null
      : { mismatch: true };
  };

@Directive({
  selector: '[appPasswordMismatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidatorDirective,
      multi: true
    }
  ]
})
export class PasswordMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordMatchValidator(control);
  }
}

