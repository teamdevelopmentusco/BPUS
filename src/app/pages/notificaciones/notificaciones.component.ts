import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { NotificacionService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html'
})

export class NotificacionesComponent {
  notificaciones: Notificacion[] = [];
  notificacionAceptar: Notificacion = new Notificacion('','',null,'','');
  usuarioPorID: Usuario;
  usuario: Usuario;
  cargando = true;
  notifiVacia = false;
  constructor(  public _notificacionService: NotificacionService,  public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

   ngOnInit() {

    this.cargarNotificaciones();

  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const recibidasTab = document.getElementById('recibidasTab');
    const enviadasTab = document.getElementById('enviadasTab');
    recibidasTab.setAttribute('class', 'nav-link text-body');
    enviadasTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  cargarNotificaciones() {
    this.cargando = true;
    this._notificacionService.cargarNotificaciones()
    .subscribe( notificaciones => this.notificaciones = notificaciones);
    
    this.cargando = false;
  }


    obtenerUsuario(id:String){

  this._usuarioService.cargarUsuarioPorId(id).subscribe( usuarioPorId => this.usuarioPorID = usuarioPorId);

 // console.log(this.usuarioPorID);

    return this.usuarioPorID;
  }


  borrarNotificacion(notificacion:Notificacion){

    Swal.fire({
      title: '¿Está seguro que deseas borrar la notificación?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{           
        console.log(resp);
        this.cargarNotificaciones();
      });

    } 

    });   
  }



 // ACEPTAR Y RECHAZAR NOTIFICACIONES CODIGO VIEJO..

  /*
  aceptarNotificacion(notificacion:Notificacion){
    Swal.fire({
      title: '¿Está seguro que desea aprobar el proyecto?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Aprobarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(notificacionAceptada => {
      
    if (notificacionAceptada.value) {


      // Codigo para aceptar solicitud. ----------------------
      var notificacionAceptar = new Notificacion(
        this.usuario._id,
        "5dd4a006952d6b266002a3e2",
        true,
        "Aprobó la solicitud de",
        "te aprobó la solicitud de"
        
        );

   
      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{
          console.log(resp);
          this.cargarNotificaciones();});

        //---------------------------
      this._notificacionService.crearNotificacion(notificacionAceptar).subscribe(resp => {
        console.log(resp);
       
        });
//---------------------------




    }

    });
  }


  rechazarNotificacion(notificacion:Notificacion){

    Swal.fire({
      title: '¿Está seguro que desea rechazar el proyecto?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Rechazar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {


      var notificacionRechazada = new Notificacion(
        this.usuario._id,
        "5dd4a006952d6b266002a3e2",
        true,
        "Aprobó la solicitud de",
        "te aprobó la solicitud de"
        
        );

      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{           
        console.log(resp);
        this.cargarNotificaciones();
      });

         //---------------------------
         this._notificacionService.crearNotificacion(notificacionRechazada).subscribe(resp => {
          console.log(resp);
         
          });
  //---------------------------

    } 

    });   
  }
*/





  
}


