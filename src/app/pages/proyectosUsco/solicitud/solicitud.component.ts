import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService, NotificacionService, SolicitudService } from '../../../services/service.index';
import swal from 'sweetalert2';
import { Solicitud } from 'src/app/models/solicitud.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {
  estudiantes: Usuario[]=[];
  solicitud:Solicitud = new Solicitud('','','','','','','','','','','');
  today = new Date();
  jstoday = '';

  constructor(public _usuarioService: UsuarioService,
     public _notificacionService:NotificacionService,
     public _solicitudService: SolicitudService) {

   // this.usuario = this._usuarioService.usuario;
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '-0500');
  }
  ngOnInit() {
  }

  cargarSolicitudes(){
    this._solicitudService.cargarSolicitudes((0)).subscribe((resp:any)=>{});


  }


  solicitarEstudiantes() {
    swal.fire({
      title: 'Crear Programa Academico',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Ingresar documento:</label>' +
      '<input type="text" id="estudiante" placeholder="Ingrese el documento del estudiante" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' 
    }).then(crear => {
      if (crear.value) {

       
          var estudiante = (document.getElementById('estudiante') as HTMLInputElement).value;

        try {

          this.agregarEstudiante(estudiante);
          var solicitud = new Solicitud('PROYECTO DE GRADO','','','','','','','','',null,null);
          this._solicitudService.crearSolicitud(solicitud).subscribe(resp => {
          console.log(resp);
          this.cargarSolicitudes();
          });

        } catch (error) {
          swal.fire(
            'Error!',
            'El estudiante no es valido',
            'error'
          ); 
        }
        
    


      }
    });
  }

  
  agregarEstudiante(numDocumento:string){
    console.log("CAMBIO DE JEFE DE PROGRAMA");

    this._usuarioService.obtenerJefePrograma(numDocumento)
        .subscribe(estudiantes=> {
          this.estudiantes=estudiantes
        });   

}



  notificar(emisor: Usuario, receptor: Usuario, tipoMensaje:String){

    swal.fire({
      title: '¿Está seguro que desea enviar la solicitud?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Aprobarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {



      this._solicitudService.actualizarSolicitud(this.solicitud).subscribe(()=> this.cargarSolicitudes());
   
      swal.fire('Solicitud Enviada', 'La solicitud ha sido enviada.', 'success');
    }

    });



  }


  
}
