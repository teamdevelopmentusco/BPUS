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
  notificacionesRecibidas: Notificacion[] = [];
  notificacionesEnviadas: Notificacion[] = [];
  usuarioPorID: Usuario;
  usuario: Usuario;
  cargando = true;
  notifiVacia = false;
  constructor(  public _notificacionService: NotificacionService,  public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

   ngOnInit() {

    this.cargarNotificaciones();
    if (this.notificaciones.length === 0) {
      this.notifiVacia = true;
    }
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


  }

  
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
    .then(borrar => {
      
    if (borrar.value) {
   
      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{
          console.log(resp);
          this.cargarNotificaciones();});
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
   

      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{           
        console.log(resp);
        this.cargarNotificaciones();
      });

    } 

    });   
  }


  
}


