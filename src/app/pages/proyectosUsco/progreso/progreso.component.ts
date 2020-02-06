import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { UsuarioService, SolicitudService } from '../../../services/service.index';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styles: []
})
export class ProgresoComponent implements OnInit {
  today = new Date();
  usuario: Usuario;
  solicitudEstudiante = new Solicitud('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  solicitudEstado = 'Por subir';
  anteproyectoEstado = 'Bloqueado';
  proyectoEstado = 'Bloqueado';
  articuloEstado = 'Bloqueado';
  jstoday = '';
  // tslint:disable-next-line: variable-name
  constructor(public _usuarioService: UsuarioService, public _solicitudService: SolicitudService, ) {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '-0500');
    this.usuario = this._usuarioService.usuario;
    // REVISAR ESTO
   // this._solicitudService.cargarSolicitud(this.usuario.codigoUniversitario).subscribe( solicitud => this.solicitud = solicitud);
    }

  ngOnInit() {
    this.cargarSolicitud();
  }

  cargarSolicitud() {
    this._solicitudService.cargarSolicitudEstudiante((this.usuario._id)).subscribe((solicitud: Solicitud) => {
      this.solicitudEstudiante = solicitud;
      this.solicitudEstado = solicitud.estadoSolicitud;
      if (this.solicitudEstado === 'Aprobado') {
        this.anteproyectoEstado = 'Por subir';
      }
      console.log(this.solicitudEstudiante.estadoSolicitud);
    });
  }


}
