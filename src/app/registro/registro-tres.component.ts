import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-tres',
  templateUrl: './registro-tres.component.html'
})
export class RegistroTresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Registrar() {
    this.router.navigate(['/inicio']);
  }

}
