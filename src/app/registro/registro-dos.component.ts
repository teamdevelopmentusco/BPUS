import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-dos',
  templateUrl: './registro-dos.component.html'
})
export class RegistroDosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextRegistro() {
    this.router.navigate(['/registro-tres']);
  }

}
