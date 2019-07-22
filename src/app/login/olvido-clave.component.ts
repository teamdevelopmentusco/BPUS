import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido-clave',
  templateUrl: './olvido-clave.component.html'
})
export class OlvidoClaveComponent implements OnInit {
  emailForm: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^@]([A-Za-z0-9._]+){1,25}')]]
    });

    console.log(this.emailForm);
  }

  get email() {
    return this.emailForm.get('email');
  }

  sendEmail() {
    if (this.emailForm.dirty && this.emailForm.valid) {
      this.router.navigate(['/cambio-clave']);
    }
  }

  ngOnInit() {}
}
