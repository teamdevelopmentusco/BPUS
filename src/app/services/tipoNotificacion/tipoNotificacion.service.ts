/*
* Proyecto: BPUS
* Componente: tipoNotificacion.service.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: servicios crud de la tipo de notificación
* Última modificación: 06/08/2019
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TipoNotificacion } from 'src/app/models/tipoNotificacion.model';


@Injectable()
export class TipoNotificacionService {

  tipoNotificacion: TipoNotificacion;
  token: string;
  menu: any[] = [];
  totalNotificaciones = 0;

  constructor(public http: HttpClient, public router: Router) { // Inyectar servicios
    console.log('Servicio de tipo de notificación listo.');
    console.log(this.tipoNotificacion);
  }

  crearTipoNotificacion(tipoNotificacion: TipoNotificacion) {
    const url = URL_SERVICIOS + '/tipoNotificacion';
    return this.http.post(url, tipoNotificacion).map((resp: any) => {
      swal.fire('Tipo de notificación creado', 'success');
      return resp.tipoNotificacion;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarTipoNotificacion(tipoNotificacion: TipoNotificacion) {
    const url = URL_SERVICIOS + '/tipoNotificacion/' + tipoNotificacion._id + '?token=' + this.token;
    return this.http.put(url, tipoNotificacion).map((resp: any) => {
      swal.fire('El tipo de notificación ha sido actualizado', 'success');
      return true;
    }).catch(err => {
      // console.log(err.error.mensaje);
      swal.fire('Error al actualizar tipo de notificación', tipoNotificacion._id, 'error');
      return Observable.throw(err);
    });
  }

  cargarTipoNotificaciones(desde: number= 0) {
    const url = URL_SERVICIOS + '/tipoNotificacion?desde=' + desde;
    return this.http.get(url) .map((resp: any) => {
      this.totalNotificaciones = resp.total;
      return resp.tipoNotificacion;
    });
  }

  /*
  ***No creo que vaya a ser usado por el momento***
  buscarTipoNotificacion(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/tipoNotificacion/' + termino;
    return this.http.get(url).map((resp: any) => resp.usuarios);
  }
  */

  borrarTipoNotificaciones(id: string) {
    const url = URL_SERVICIOS + '/tipoNotificacion/' + id + '?token=' + this.token;
    return this.http.delete(url).map(resp => {
      swal.fire('Tipo de notificación borrado', 'El tipo de notificación ha sido eliminado correctamente', 'success');
      return true;
    });
  }

}
