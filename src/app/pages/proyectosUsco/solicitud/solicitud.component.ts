import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService, NotificacionService, SolicitudService } from '../../../services/service.index';
import swal from 'sweetalert2';
import { Solicitud } from 'src/app/models/solicitud.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion.model';
import { CiudadService } from '../../../services/ciudad/ciudad.service';
import { DepartamentoService } from '../../../services/departamento/departamento.service';
import { Departamento } from '../../../models/departamento.model';
import { Ciudad } from '../../../models/ciudad.model';
import { PaisService } from '../../../services/pais/pais.service';
import { Pais } from '../../../models/pais.model';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {
  desde = 0;
  cargando = true;
  // estudiantes: Usuario[] = [];
  estudiante2 = 'Nombre completo del Estudiante';
  estudiante3 = 'Nombre completo del Estudiante';

  // ids estudiantes
  estudiante2id = '';
  estudiante3id = '';

  // estudiantePrueba = new Usuario('', '', '', '', '', '', '', '', '', '', '', '', '');
  ciudades: Ciudad[] = [];
  departamentos: Departamento[] = [];
  paises: Pais[] = [];
  usuario: Usuario;
 // solicitud: Solicitud = new Solicitud('','','', '', '', '', '', '', '', '', '', '', '', '' );
  notificacion: Notificacion = new Notificacion('', '', null, '', '');
  today = new Date();
  jstoday = '';
  solicitudForm: any;
  constructor(
      public _CiudadService: CiudadService,
      public _DepartamentoService: DepartamentoService,
      public _PaisService: PaisService,
      private formBuilder: FormBuilder,
      public _usuarioService: UsuarioService,
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

  get codigoEstudiante2() {
    return this.solicitudForm.get('codigoEstudiante2');
  }

  get codigoEstudiante3() {
    return this.solicitudForm.get('codigoEstudiante3');
  }

  ngOnInit() {
    this.cargarPaisesSinlimite();
    this.cargarDepartamentosSinlimiteFiltrado();
    this.cargarCiudadesSinlimiteFiltrado();

    this.cargarUsuarioPorId(this._usuarioService.usuario._id);
  }

  cargarSolicitud() {
    this._solicitudService.cargarSolicitudEstudiante((this.usuario.codigoUniversitario)).subscribe((resp: any) => {});
  }

  //------------------------------------------------ Cargar localidades sin limite

  cargarDepartamentosSinlimite() {

    this.cargando = true;
    this._DepartamentoService.cargarDepartamentosSinLimite(this.desde).subscribe( departamentos => this.departamentos = departamentos );
    this.cargando = false;
  }
  cargarPaisesSinlimite() {
    
    this.cargando = true;
    this._PaisService.cargarPaisesSinlimite(this.desde).subscribe( paises => this.paises = paises );
    this.cargando = false;
  }


//------------------------------------------------------------------------
 //------------------------------------------------------------------------- 

 cargarCiudadesSinlimiteFiltrado() {

  const departamentoId = (document.getElementById('departamento') as HTMLInputElement).value;
  console.log(departamentoId);

  this.cargando = true;
  this._CiudadService.cargarCiudadSinlimiteFiltrado(this.desde, departamentoId).subscribe( ciudades => this.ciudades = ciudades );
  this.cargando = false;
}

cargarDepartamentosSinlimiteFiltrado() {
  var paisId=(document.getElementById('pais') as HTMLInputElement).value;
  this.cargando = true;
  this._DepartamentoService.cargarDepartamentosSinLimiteFiltrado(this.desde,paisId).subscribe( departamentos => this.departamentos = departamentos );
  this.cargando = false;
}


//------------------------------------------------------------------------

// Busqueda ------------------------------------
  buscarEstudiante(idInput: string) {

    this.cargando = true;
    const termino = (document.getElementById(idInput) as HTMLInputElement).value;
    if (termino.length !== 11 && idInput === 'codigoEstudiante2') {
        this.estudiante2 = 'Nombre completo del Estudiante';
        this.estudiante2id = '';
        // return;
    } else if (termino.length !== 11 && idInput === 'codigoEstudiante3') {
        this.estudiante3 = 'Nombre completo del Estudiante';
        this.estudiante3id = '';
        // return;
  } else if (termino.length === 11 && termino !== this.usuario.codigoUniversitario) {
        this._usuarioService.cargarUsuarioPorCodigoEstudiantil(termino).subscribe((estudiante: Usuario) => {
          if (idInput === 'codigoEstudiante2') {
            this.estudiante2 = estudiante.nombres + ' ' + estudiante.apellidos;
            this.estudiante2id = estudiante._id;
            if (this.estudiante2 === this.estudiante3) {
              this.estudiante2 = 'Nombre completo del Estudiante';
              this.estudiante2id = '';
            }
          } else if (idInput === 'codigoEstudiante3') {
            this.estudiante3 = estudiante.nombres + ' ' + estudiante.apellidos;
            this.estudiante3id = estudiante._id;
            if (this.estudiante3 === this.estudiante2) {
              this.estudiante3 = 'Nombre completo del Estudiante';
              this.estudiante3id = '';
            }
          }
          this.cargando = false;
          });
    }
  }
 // ------------------------------------

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
/*
  agregarEstudiante(numDocumento: string){
    console.log("CAMBIO DE JEFE DE PROGRAMA");

    this._usuarioService.obtenerJefePrograma(numDocumento)
        .subscribe(estudiantes => {
          this.estudiantes = estudiantes;
        });

}
*/


  notificar(forma: FormGroup) {

    console.log('id2: ' + this.estudiante2id);
    console.log('estudiante2: ' + this.estudiante2);
    console.log('id3: ' + this.estudiante3id);
    console.log('estudiante3: ' + this.estudiante3);

    swal.fire({
      title: '¿Está seguro que desea enviar la solicitud?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Aprobarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(opcionNotificacion => {

    if (opcionNotificacion.value) {

      let firmaEstudiante2 = 'Sin asignar';
      let firmaEstudiante3 = 'Sin asignar';

      if (this.estudiante2id === '' ) {
        this.estudiante2id = null;
      } else {
        firmaEstudiante2 = 'Pendiente';
      }
      if (this.estudiante3id === '') {
        this.estudiante3id = null;
      } else {
        firmaEstudiante3 = 'Pendiente';
      }

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
        this.estudiante2id,
        this.estudiante3id,
        firmaEstudiante2,
        firmaEstudiante3,
        null,
        'rutapdf', // ***Arrglar para que aqui se coloque la ruta en que se guardo el pdf de la solicitud***
        'Subido', // estadoSolicitud
        null,
        null,
        null
        );

      this._solicitudService.crearSolicitud(solicitud).subscribe(resp => {
        console.log(resp);
      });

      this._solicitudService.cargarSolicitudEstudiante((this.usuario._id)).subscribe((solicitudRecienCreada: Solicitud) => {
        const notificacionEmisor = new Notificacion(
          this.usuario._id,
          '5dd50a0c6159e2198c4e39ee',
          true,
          'Envió una solicitud a',
          'Solicita la aprobación de',
          solicitudRecienCreada._id
          );
        const notificacionReceptor = new Notificacion(
          this.usuario._id,
          '5dd50a0c6159e2198c4e39ee',
          false,
          'Envió una solicitud a',
          'Solicita la aprobación de',
          solicitudRecienCreada._id
          );
        if (this.estudiante2id !== '' ) {
          const notificacionToestudiante2Emisor = new Notificacion(
            this.usuario._id,
            this.estudiante2id,
            true,
            'Envió una solicitud a',
            'Solicita la aprobación de',
            solicitudRecienCreada._id
            );
          const notificacionToestudiante2Receptor = new Notificacion(
            this.usuario._id,
            this.estudiante2id,
            false,
            'Envió una solicitud a',
            'Solicita la aprobación de',
            solicitudRecienCreada._id
            );
          this._notificacionService.crearNotificacion(notificacionToestudiante2Emisor).subscribe(resp => {console.log(resp); });
          this._notificacionService.crearNotificacion(notificacionToestudiante2Receptor).subscribe(resp => {console.log(resp); });
        }
        if (this.estudiante3id !== '' ) {
          const notificacionToestudiante3Emisor = new Notificacion(
            this.usuario._id,
            this.estudiante3id,
            true,
            'Envió una solicitud a',
            'Solicita la aprobación de',
            solicitudRecienCreada._id
            );
          const notificacionToestudiante3Receptor = new Notificacion(
            this.usuario._id,
            this.estudiante3id,
            false,
            'Envió una solicitud a',
            'Solicita la aprobación de',
            solicitudRecienCreada._id
            );
          this._notificacionService.crearNotificacion(notificacionToestudiante3Emisor).subscribe(resp => {console.log(resp); });
          this._notificacionService.crearNotificacion(notificacionToestudiante3Receptor).subscribe(resp => {console.log(resp); });
        }
        this._notificacionService.crearNotificacion(notificacionEmisor).subscribe(resp => {console.log(resp); });
        this._notificacionService.crearNotificacion(notificacionReceptor).subscribe(resp => {console.log(resp); });
      });
      this.router.navigate(['/search']);
    }
    });
  }


  cargarUsuarioPorId(id: string) {
    this._usuarioService.cargarUsuarioPorId(id)
    .subscribe( usuario => this.usuario = usuario);

  }


  
}
