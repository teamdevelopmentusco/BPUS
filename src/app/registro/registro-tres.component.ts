import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';// Librearia de alertas visuales.
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
@Component({
  selector: 'app-registro-tres',
  templateUrl: './registro-tres.component.html'
})
export class RegistroTresComponent implements OnInit {
  forma: FormGroup;
  constructor(private router: Router,public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.forma=new FormGroup({

      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      sedeUniversitaria: new FormControl(null, Validators.required),
      facultad: new FormControl(null, Validators.required),
      programaUniversitario: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
     // email: new FormControl(null, [Validators.required,Validators.email]),
     // password: new FormControl(null, Validators.required),
    //  password2: new FormControl(null, Validators.required)

    },/*{validators: this.sonIguales('password','password2')}*/);
  }

  /*sonIguales(campo1:string,campo2:string){
    return( group: FormGroup)=>{
      
      let pass1=group.controls[campo1].value;
      let pass2=group.controls[campo2].value;

      if (pass1===pass2) {
        return null;
      }
      return{
        sonIguales:true
      };
      
    };

  }*/

  registrarUsuario(){

    if (this.forma.invalid) {
      return;
    }
   /* if (!this.forma.value.condiciones) {
      
      swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }*/

    let usuario = new Usuario( this.forma.value.nombres,
        this.forma.value.apellidos,
         localStorage.getItem("password"),
          localStorage.getItem("email"),
           this.forma.value.telefono,
            localStorage.getItem("tipoUsuario"),
            localStorage.getItem("tipoID"),
            localStorage.getItem("numDocumento"),
              localStorage.getItem("codigoUniversitario"),
                this.forma.value.sedeUniversitaria,
                 this.forma.value.facultad,
                  this.forma.value.programaUniversitario);
 
  this._usuarioService.crearUsuario(usuario)
  .subscribe(resp=>this.router.navigate(['/login']));
  
  }


  

}
