import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email:string;
  recuerdame:boolean=false;

  loginForm: any;

  constructor(private formBuilder: FormBuilder,  public router: Router,
    public _usuarioService:UsuarioService) {


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

  

  ngOnInit() {
   
  }


  ingresar(forma: NgForm){

    if (forma.invalid) {
      return;
    }



    let usuario = new Usuario(null,null,forma.value.password,null,null,null,null,forma.value.numDocumento,null,null,null,null,null,null,null);
    console.log(forma.valid);
    console.log(forma.value);

    this._usuarioService.login(usuario).subscribe(correcto=>this.router.navigate(['/dashboard']));
  
    //this.router.navigate(['/dashboard']);
  }

}
