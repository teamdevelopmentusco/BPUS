import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud.model';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService, NotificacionService, SolicitudService } from '../../../services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-bandeja-proyectos',
  templateUrl: './bandeja-proyectos.component.html',
  styleUrls: ['./bandeja-proyectos.component.css']
})
export class BandejaProyectosComponent implements OnInit {


  desde = 0;
  solicitudes: Solicitud[] = [];
  cargando = true;
  usuario: Usuario;
  constructor( public _SolicitudService: SolicitudService,
               public _usuarioService: UsuarioService,
               public _notificacionService: NotificacionService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {

    this.cargarSolicitudes();
  }


  cargarSolicitudes(){
    this.cargando = true;
    this._SolicitudService.cargarSolicitud(this.desde).subscribe( solicitudes => this.solicitudes = solicitudes );
    this.cargando = false;
  }


  aceptarSolicitud(solicitud: Solicitud) {

    swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta a punto de aceptar el proyecto titulado:  ' + solicitud.tituloProyecto,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, aceptar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(aceptado => {
    if (aceptado.value) {

      solicitud.estadoSolicitud = 'Aprobado';
      this._SolicitudService.actualizarSolicitud(solicitud).subscribe(resp => {
        console.log(resp);
        this.cargarSolicitudes();
      });
      const notificacionEmisor = new Notificacion(
        this.usuario._id,
        solicitud.estudiante1,
        true,
        'Aprobó la solicitud de',
        'te aprobó la solicitud de'
        );
      const notificacionReceptor = new Notificacion(
        this.usuario._id,
        solicitud.estudiante1,
        false,
        'Aprobó la solicitud de',
        'te aprobó la solicitud de'
        );
      this._notificacionService.crearNotificacion(notificacionEmisor).subscribe(resp => {console.log(resp); });
      this._notificacionService.crearNotificacion(notificacionReceptor).subscribe(resp => {console.log(resp); });
      if (solicitud.estudiante2 !== null ) {
        const notificacionToestudiante2Emisor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante2,
          true,
          'Envió una solicitud a',
          'Solicita la aprobación de'
          );
        const notificacionToestudiante2Receptor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante2,
          false,
          'Envió una solicitud a',
          'Solicita la aprobación de'
          );
        this._notificacionService.crearNotificacion(notificacionToestudiante2Emisor).subscribe(resp => {console.log(resp); });
        this._notificacionService.crearNotificacion(notificacionToestudiante2Receptor).subscribe(resp => {console.log(resp); });
      }
      if (solicitud.estudiante3 !== null ) {
        const notificacionToestudiante3Emisor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante3,
          true,
          'Envió una solicitud a',
          'Solicita la aprobación de'
          );
        const notificacionToestudiante3Receptor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante3,
          false,
          'Envió una solicitud a',
          'Solicita la aprobación de'
          );
        this._notificacionService.crearNotificacion(notificacionToestudiante3Emisor).subscribe(resp => {console.log(resp); });
        this._notificacionService.crearNotificacion(notificacionToestudiante3Receptor).subscribe(resp => {console.log(resp); });
      }
    }
    });
  }

  rechazarSolicitud(solicitud: Solicitud) {
    swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta a punto de rechazar el proyecto titulado:  ' + solicitud.tituloProyecto,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, rechazar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(aceptado => {

    if (aceptado.value) {
      solicitud.estadoSolicitud = 'Rechazado';
      this._SolicitudService.actualizarSolicitud(solicitud).subscribe(resp => {
      console.log(resp);
      this.cargarSolicitudes();
    });
      const notificacionEmisor = new Notificacion(
        this.usuario._id,
        solicitud.estudiante1,
        true,
        'Rechazó la solicitud',
        'te rechazó la solicitud de'
      );
      const notificacionReceptor = new Notificacion(
        this.usuario._id,
        solicitud.estudiante1,
        false,
        'Rechazó la solicitud',
        'te rechazó la solicitud de'
      );
      this._notificacionService.crearNotificacion(notificacionEmisor).subscribe(resp => {console.log(resp); });
      this._notificacionService.crearNotificacion(notificacionReceptor).subscribe(resp => {console.log(resp); });
      if (solicitud.estudiante2 !== null ) {
        const notificacionToestudiante2Emisor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante2,
          true,
          'Rechazó la solicitud',
          'te rechazó la solicitud de'
        );
        const notificacionToestudiante2Receptor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante2,
          false,
          'Rechazó la solicitud',
          'te rechazó la solicitud de'
        );
        this._notificacionService.crearNotificacion(notificacionToestudiante2Emisor).subscribe(resp => {console.log(resp); });
        this._notificacionService.crearNotificacion(notificacionToestudiante2Receptor).subscribe(resp => {console.log(resp); });
      }
      if (solicitud.estudiante3 !== null ) {
        const notificacionToestudiante3Emisor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante3,
          true,
          'Rechazó la solicitud',
          'te rechazó la solicitud de'
        );
        const notificacionToestudiante3Receptor = new Notificacion(
          this.usuario._id,
          solicitud.estudiante3,
          false,
          'Rechazó la solicitud',
          'te rechazó la solicitud de'
        );
        this._notificacionService.crearNotificacion(notificacionToestudiante3Emisor).subscribe(resp => {console.log(resp); });
        this._notificacionService.crearNotificacion(notificacionToestudiante3Receptor).subscribe(resp => {console.log(resp); });
      }
    }
    });
  }
}
