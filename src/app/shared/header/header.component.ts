import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario:Usuario;
  iniciarSesion:Boolean;
  constructor(public _usuarioService:UsuarioService, public router:Router) {


    
   }

  ngOnInit() {
    
    this.usuario=this._usuarioService.usuario;

    //console.log(this.usuario.nombres );

    if (!(this.usuario===null)) {
      this.iniciarSesion = true;

      console.log("iniciarSesion true");
    }else{
      this.iniciarSesion = false;
      console.log("iniciarSesion false");
    }   
    

  }

}
