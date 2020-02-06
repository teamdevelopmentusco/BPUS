import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-dos',
  templateUrl: './registro-dos.component.html'
})
export class RegistroDosComponent implements OnInit {
  forma: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    public _usuarioService: UsuarioService) {
      this.forma = this.formBuilder.group({
        tipoUsuario: [
          'Estudiante',
          [Validators.required]
        ],
        tipoID: [
          'C.C',
          [Validators.required]
        ],
        numDocumento: [
          '',
          [Validators.required, Validators.pattern("([0-9]){8,10}")]
        ],
        codigoUniversitario: [
          '',
          [Validators.pattern("([0-9]){2,11}")]
        ]
      });
     }

  ngOnInit() {   
  }

  get tipoUsuario() {
    return this.forma.get('tipoUsuario');
  }

  get tipoID() {
    return this.forma.get('tipoID');
  }

  get numDocumento() {
    return this.forma.get('numDocumento');
  }

  get codigoUniversitario() {
    return this.forma.get('codigoUniversitario');
  }

  nextRegistro() {
    if (this.forma.invalid) {

      console.log('Error de forma');
      return;
    }
    let codigoEstudiantil = 'aa';
    if (this.forma.value.codigoUniversitario !== '') {
      codigoEstudiantil = this.forma.value.codigoUniversitario;
    }
    // tslint:disable-next-line: max-line-length
    const usuario = new Usuario(null, null, null, null, null, this.forma.value.tipoUsuario, this.forma.value.tipoID, this.forma.value.numDocumento, null, codigoEstudiantil, null, null, null, null, null, null);

    this.router.navigate(['/registro-tres']);
    this._usuarioService.paginadoRegistro2a3(usuario);
  }

}
