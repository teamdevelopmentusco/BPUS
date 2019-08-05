import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {
  usuario: Usuario;
  today = new Date();
  jstoday = '';

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '-0500');
  }
  ngOnInit() {
  }
}
