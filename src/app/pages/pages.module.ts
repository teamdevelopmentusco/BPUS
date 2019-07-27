import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Estudiantes
import { EstudianteComponent } from './estudiante/estudiante.component';
import { SolicitudComponent } from './estudiante/solicitud.component';

// docentes
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';


import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './pages.router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { TablaTodosComponent } from './admin/tabla-todos.component';
import { TablaEstudiantesComponent } from './admin/tabla-estudiantes.component';
import { TablaProfesoresComponent } from './admin/tabla-profesores.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EstudianteComponent,
    SolicitudComponent,
    DocenteComponent,
    DocenteDosComponent,
    DocenteTresComponent,
    ProfileComponent,
    AdminComponent,
    TablaTodosComponent,
    TablaEstudiantesComponent,
    TablaProfesoresComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
  ]
})
export class PagesModule { }
