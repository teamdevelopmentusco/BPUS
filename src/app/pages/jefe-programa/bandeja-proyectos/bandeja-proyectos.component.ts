import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud.model';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-bandeja-proyectos',
  templateUrl: './bandeja-proyectos.component.html',
  styleUrls: ['./bandeja-proyectos.component.css']
})
export class BandejaProyectosComponent implements OnInit {


  desde: number=0;
  solicitudes: Solicitud[]=[];
  cargando:boolean=true;
  constructor( public _SolicitudService: SolicitudService) { 



  }

  ngOnInit() {

    this.cargarSolicitudes();
  }


  cargarSolicitudes(){
    this.cargando=true;
this._SolicitudService.cargarSolicitud(this.desde)
            .subscribe( solicitudes => this.solicitudes=solicitudes );
            this.cargando=false;
  }


  aceptarSolicitud(solicitud:Solicitud){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de aceptar el proyecto titulado:  "+solicitud.tituloProyecto,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, aceptar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(aceptado => {
      
    if (aceptado.value) {
   
      solicitud.estadoSolicitud = "Aprobado";
      this._SolicitudService.actualizarSolicitud(solicitud)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarSolicitudes();


                   });
    } 
    });



    
  }

  rechazarSolicitud(solicitud:Solicitud){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de rechazar el proyecto titulado:  "+solicitud.tituloProyecto,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, rechazar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(aceptado => {
      
    if (aceptado.value) {
   
      solicitud.estadoSolicitud = "Rechazado";
      this._SolicitudService.actualizarSolicitud(solicitud)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarSolicitudes();


                   });
    } 
    });

  }
}
