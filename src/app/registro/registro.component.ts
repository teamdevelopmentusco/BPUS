import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextRegistro() {
    this.router.navigate(['/registro-dos']);
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
}
