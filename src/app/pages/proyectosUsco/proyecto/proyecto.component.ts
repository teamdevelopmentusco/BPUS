import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Solicitud } from 'src/app/models/solicitud.model';

import swal from 'sweetalert2';
import { SubirArchivoService, UsuarioService, SolicitudService } from 'src/app/services/service.index';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['/../proyectosUsco.component.scss']
})
export class ProyectoComponent implements OnInit {
  today = new Date();
  jstoday = '';
  usuarioId: string;
  file: File;
  
  constructor( public _subirArchivosService: SubirArchivoService,
               public _usuarioService: UsuarioService,
               public _solicitudService: SolicitudService,
              ) {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
    this.usuarioId = this._usuarioService.usuario._id;
  }

  ngOnInit() {
  }


  onFilesAdded(file: File) {

    if (!file) {
       return;
     }
    console.log(file);
    this.file = file;
  }

  subirArchivo() {

    this._solicitudService.cargarSolicitudEstudiante((this.usuarioId)).subscribe((solicitudRecienCreada: Solicitud) => {

    this._subirArchivosService.subirArcivo(this.file, 'Proyecto', solicitudRecienCreada.proyecto).then((resp: any) => {
      swal.fire('Archivo subido con exito.', this.usuarioId, 'success');


    }).catch(resp => {
        console.log(resp);
    });
  });
  }

  onFilesRejected(files: File[]) {
    console.log(files);
  }

}
