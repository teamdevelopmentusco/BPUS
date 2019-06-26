import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';
import { passwordMatchValidator } from '../shared/password-match.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html'
})
export class CambioClaveComponent implements OnInit {
  passwordForm: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
      this.router.navigate(['/inicio']);
    }
  }

  showpassword(inputId: string, iconId: string) {
    const password = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (password.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
      icon.setAttribute('class', 'far fa-eye');
    } else {
      password.setAttribute('type', 'password');
      icon.setAttribute('class', 'far fa-eye-slash');
    }
  }

  ngOnInit() {}
}
