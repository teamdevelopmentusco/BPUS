import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  usuario: Usuario;
  constructor(public _SIDEBAR: SidebarService, public _USUARIOSERVICE: UsuarioService) {
    this.usuario = this._USUARIOSERVICE.usuario;
   }

  ngOnInit() {
   
    this._SIDEBAR.cargarMenu();
  }

}
