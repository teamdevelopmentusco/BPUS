import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('([0-9]){8,10}')]],
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

  showpassword() {
    const password = document.getElementById('password');
    const icon = document.getElementById('showpass');
    if (password.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
      icon.setAttribute('class', 'far fa-eye');
    } else {
      password.setAttribute('type', 'password');
      icon.setAttribute('class', 'far fa-eye-slash');
    }
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.router.navigate(['/inicio']);
    }
  }

  ngOnInit() {
  }

}
