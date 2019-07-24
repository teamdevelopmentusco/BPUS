import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-dos',
  templateUrl: './registro-dos.component.html'
})
export class RegistroDosComponent implements OnInit {
  forma: FormGroup;
  constructor(private router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.forma=new FormGroup({

      tipoUsuario: new FormControl(null, Validators.required),
      tipoID: new FormControl(null, Validators.required),
      numDocumento: new FormControl(null, Validators.required),
      codigoUniversitario: new FormControl(null, Validators.required)

    });
   
  }

  nextRegistro() {
    if (this.forma.invalid) {

      console.log("Error de forma");
      return;
    }
    let usuario = new Usuario(null,null, null, null, null, this.forma.value.tipoUsuario, this.forma.value.tipoID, this.forma.value.numDocumento, this.forma.value.codigoUniversitario, null, null, null, null, null, null);
    
    this.router.navigate(['/registro-tres']);
    this._usuarioService.paginadoRegistro2a3(usuario);
  }

}
