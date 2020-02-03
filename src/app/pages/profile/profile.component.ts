import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {


  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {

   // this.usuario = this._usuarioService.usuario;


    console.log(this.usuario);

    if("5dd4a006952d6b266002a3e2"==this._usuarioService.usuario._id){ console.log("Son iguales");}
   }

  ngOnInit() {


    this.cargarUsuarioPorId(this._usuarioService.usuario._id);
    console.log(this.usuario);
  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const personalTab = document.getElementById('personalTab');
    const academicTab = document.getElementById('academicTab');
    personalTab.setAttribute('class', 'nav-link text-body');
    academicTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  guardar(usuario: Usuario) {

    this.usuario.nombres = usuario.nombres;

    this._usuarioService.actualizarUsuario(this.usuario)
                          .subscribe();
  }

  cargarUsuarioPorId(id:string){
    this._usuarioService.cargarUsuarioPorId(id)
    .subscribe( usuario => this.usuario = usuario);

  }




}


/*

this.cargarUsuarioPorId(this._usuarioService.usuario._id);


  cargarUsuarioPorId(id:string){
    this._usuarioService.cargarUsuarioPorId(id)
    .subscribe( usuario => this.usuario = usuario);

  }

*/