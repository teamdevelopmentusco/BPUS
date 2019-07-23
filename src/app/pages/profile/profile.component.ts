import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  usuario:Usuario;
  imagenSubir:File;
  imagenTemp:string;

  constructor(
    public _usuarioService: UsuarioService
  ) {

    this.usuario= this._usuarioService.usuario;
   }

  ngOnInit() {
  }


  guardar(usuario:Usuario){

    this.usuario.nombres=usuario.nombres;

    this._usuarioService.actualizarUsuario(this.usuario)
                          .subscribe();
  }


  

}
