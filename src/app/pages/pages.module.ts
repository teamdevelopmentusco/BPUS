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

@NgModule({
  declarations: [
    
    DashboardComponent,
    EstudianteComponent,
    SolicitudComponent,
    DocenteComponent,
    DocenteDosComponent,
    DocenteTresComponent,
    ProfileComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule
  ]
})
export class PagesModule { }
