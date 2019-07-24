import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  constructor(private router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.forma=new FormGroup({

      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordComprobar: new FormControl(null, Validators.required)
     

    }/*,{validators: this.sonIguales('password','passwordComprobar')}*/);
   
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

  nextRegistro() {


    /*if (this.forma.invalid) {
      return;
    }
   */
    let usuario = new Usuario(null,null, this.forma.value.password, this.forma.value.email, null, null, null, null, null, null, null, null, null, null, null);
    
    this.router.navigate(['/registro-dos']);
    this._usuarioService.paginadoRegistro1a2(usuario);
    
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
