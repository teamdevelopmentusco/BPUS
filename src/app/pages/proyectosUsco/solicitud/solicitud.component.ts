import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService, NotificacionService, SolicitudService } from '../../../services/service.index';
import swal from 'sweetalert2';
import { Solicitud } from 'src/app/models/solicitud.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion.model';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {
  estudiantes: Usuario[] = [];
  usuario: Usuario;
  solicitud: Solicitud = new Solicitud('','','', '', '', '', '', '', '', '', '', '', '', '' );
  notificacion: Notificacion = new Notificacion('','',null,'','');
  today = new Date();
  jstoday = '';
  solicitudForm: any;
  constructor(private formBuilder: FormBuilder, public _usuarioService: UsuarioService,
              public _notificacionService: NotificacionService,
              public _solicitudService: SolicitudService,  public router: Router) {

    this.usuario = this._usuarioService.usuario;
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '-0500');

    this.solicitudForm = this.formBuilder.group({
      fechaSolicitud: [
        ''],
        titulo: [
        '',
        [Validators.required, Validators.maxLength(60)]
      ],
      lineaInvestigacion: [
        '',
        [Validators.required, Validators.maxLength(60)]
      ],
      codigoEstudiante1: [
        ''
      ],
      codigoEstudiante2: [
        '',
        [ Validators.pattern('([0-9]){8,11}')]
      ],
      codigoEstudiante3: [
        '',
        [ Validators.pattern('([0-9]){8,11}')]
      ],

      nombreEstudiante2: [
        ''
      ],
      nombreEstudiante3: [
        ''
      ],
      firmaEstudiante2: [
        ''
      ],
      firmaEstudiante3: [
        ''
      ],
      pais: [
        '',
        [Validators.required]
      ],
      departamento: [
        '',
        [Validators.required]
      ],
      ciudad: [
        '',
        [Validators.required]
      ],
      duracionProyectoMeses: [
        '',
        [Validators.required, Validators.min(4), Validators.max(12)]
      ],
      tipoProyecto: [
        '',
        [Validators.required]
      ],
      palabrasClaves: [
        '',
        [Validators.required, Validators.maxLength(64)]
      ],
      resumenProyecto: [
        '',
        [Validators.required, Validators.maxLength(3000)]
      ],
    });
  }

  get fechaSolicitud() {
    return this.solicitudForm.get('fechaSolicitud');
  }
  get titulo() {
    return this.solicitudForm.get('titulo');
  }

  get lineaInvestigacion() {
    return this.solicitudForm.get('lineaInvestigacion');
  }

  get duracionProyectoMeses() {
    return this.solicitudForm.get('duracionProyectoMeses');
  }

  get pais() {
    return this.solicitudForm.get('pais');
  }

  get departamento() {
    return this.solicitudForm.get('departamento');
  }

  get ciudad() {
    return this.solicitudForm.get('ciudad');
  }

  get palabrasClaves() {
    return this.solicitudForm.get('palabrasClaves');
  }

  get resumenProyecto() {
    return this.solicitudForm.get('resumenProyecto');
  }

  get tipoProyecto() {
    return this.solicitudForm.get('tipoProyecto');
  }

  ngOnInit() {
  }

  cargarSolicitud() {
    this._solicitudService.cargarSolicitudEstudiante((this.usuario.codigoUniversitario)).subscribe((resp: any) => {});
  }

  countChars() {
    const keywords = (document.getElementById('keyWords') as HTMLInputElement).value;
    const strLength = keywords.length;
    document.getElementById('charNum').innerHTML = strLength + '/64';
  }

  countCharsResumen() {
    const keywords = (document.getElementById('resumen') as HTMLInputElement).value;
    const strLength = keywords.length;
    document.getElementById('charNumResumen').innerHTML = strLength + '/3000';
  }

  espandirTexarea() {
    const textarea = (document.getElementById('resumen') as HTMLInputElement);
    textarea.style.overflow = 'hidden';
    textarea.style.height = textarea.getAttribute('data-min.rows');
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  agregarEstudiante(numDocumento: string){
    console.log("CAMBIO DE JEFE DE PROGRAMA");

    this._usuarioService.obtenerJefePrograma(numDocumento)
        .subscribe(estudiantes => {
          this.estudiantes = estudiantes;
        });

}



  notificar(forma: FormGroup) {

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

      const solicitud = new Solicitud(
        this.jstoday,
        forma.value.titulo,
        forma.value.lineaInvestigacion,
        forma.value.pais,
        forma.value.departamento,
        forma.value.ciudad,
        forma.value.duracionProyectoMeses,
        '5dd50a0c6159e2198c4e39ee',  // Jefe de programa
        forma.value.palabrasClaves,
        forma.value.resumenProyecto,
        this.usuario._id,
        forma.value.nombreEstudiante2,
        forma.value.nombreEstudiante3,
        forma.value.firmaEstudiante2,
        forma.value.firmaEstudiante3,
        null,
        'rutapdf', // ***Arrglar para que aqui se coloque la ruta en que se guardo el pdf de la solicitud***
        'Subido', // estadoSolicitud
        null,
        null,
        null
        );

        var notificacion = new Notificacion(
          this.usuario._id,
          "5dd50a0c6159e2198c4e39ee",
          true,
          "Envió una solicitud a",
          "Solicita la aprobación de",
          
          );


      this._solicitudService.crearSolicitud(solicitud).subscribe(resp => {
      console.log(resp);
      this.cargarSolicitud();


// ---------------------------
      this._notificacionService.crearNotificacion(notificacion).subscribe(resp => {
        console.log(resp);
        
        this.router.navigate(['/search']);
        });
//---------------------------


    
      });
    }

    });



    


   



  }


  
}
