import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';
import { passwordMatchValidator } from '../shared/password-match.directive';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html'
})
export class CambioClaveComponent implements OnInit {
  passwordForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      newPassword: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      confirmNewPassword: [
        '',
        [Validators.required]
      ]
    }, { validators: passwordMatchValidator });
    console.log(this.passwordForm);
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.passwordForm.get('confirmNewPassword');
  }
  savePassword() {
    if (this.passwordForm.dirty && this.passwordForm.valid) {
      alert('Cambio de clave exitoso');
    }
  }
  ngOnInit() {}
}
