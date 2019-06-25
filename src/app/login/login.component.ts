import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('([0-9]){1,10}')]],
      password: ['', [Validators.required]]
    });

    console.log(this.loginForm);
  }

  get id() {
    return this.loginForm.get('id');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      alert('Login ok');
    }
  }

  ngOnInit() {
  }

}
