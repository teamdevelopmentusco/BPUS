import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//ProyectosUsco
import { NgxDropzoneModule } from 'ngx-dropzone';

// docentes
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';


import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionComponent } from './informacion/informacion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

//CrudAdmin
import { AdminComponent } from './admin/admin.component';
import { TablaTodosComponent } from './admin/tabla-todos.component';
import { NgbdModalContent } from './admin/tabla-todos.component';
import { ProgramasAcademicosComponent } from './admin/programas-academicos.component';
import { SedesComponent } from './admin/sedes.component';
import { FacultadComponent } from './admin/Facultad.component';

// Proyectos Usco
import { SolicitudComponent } from './proyectosUsco/solicitud/solicitud.component';
import { AnteproyectoComponent } from './proyectosUsco/anteproyecto/anteproyecto.component';
import { ProyectoComponent } from './proyectosUsco/proyecto/proyecto.component';
import { ArticuloComponent } from './proyectosUsco/articulo/articulo.component';
import { ProgresoComponent } from './proyectosUsco/progreso/progreso.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SemilleroUscoComponent } from './semillero-usco/semillero-usco.component';
import { PasantiaUscoComponent } from './pasantia-usco/pasantia-usco.component';

@NgModule({
  declarations: [
   
    DocenteComponent,
    DocenteDosComponent,
    DocenteTresComponent,
    ProfileComponent,
    InformacionComponent,
    NotificacionesComponent,
    //CrudAdmin
    AdminComponent,
    TablaTodosComponent,
    NgbdModalContent,
    ProgramasAcademicosComponent,
    SedesComponent,
    FacultadComponent,
    // Proyectos Usco
    SolicitudComponent,
    AnteproyectoComponent,
    ProyectoComponent,
    ArticuloComponent,
    ProgresoComponent,
    SemilleroUscoComponent,
    PasantiaUscoComponent

  ],
  entryComponents: [
    NgbdModalContent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule
  ]
})
export class PagesModule { }
