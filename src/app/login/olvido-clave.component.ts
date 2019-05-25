import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'app-olvido-clave',
  templateUrl: './olvido-clave.component.html',
  styleUrls: ['./login.component.css']
})
export class OlvidoClaveComponent implements OnInit {
  emailForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]]
    });

    console.log(this.emailForm);
  }

  get email() {
    return this.emailForm.get('email');
  }

  sendEmail() {
    if (this.emailForm.dirty && this.emailForm.valid) {
      alert(`Link de cambio de clave enviado a : ${this.emailForm.value.email}`);
    }
  }

  ngOnInit() {}
}
