import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})

export class NotificacionesComponent {
title = 'sweetAlert';
showModal() {
  Swal.fire({
    title: '¿Está seguro que desea aprobar el proyecto?',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#40b534',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No, Cancelar!',
    confirmButtonText: 'Si, Aprobarlo!'

  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Aprobado!',
        'El proyecto ha sido aprobado',
        'success'
      );
    }
  });
}

showModal2() {
  Swal.fire({
    title: '¿Está seguro que desea rechazar el proyecto?',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No, Cancelar!',
    confirmButtonText: 'Si, Rechazar!'

  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Rechazado!',
        'El proyecto ha sido rechazado',
        'success'
      );
    }
  });
}
}


