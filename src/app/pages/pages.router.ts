import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard, VerificaTokenGuard, JefeProgramaGuard,AdminGuard } from '../services/service.index';

import { SolicitudComponent } from './proyectosUsco/solicitud/solicitud.component';
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';
import { ProfileComponent } from './profile/profile.component';
import { TablaTodosComponent } from './admin/tabla-todos.component';

import { InformacionComponent } from './informacion/informacion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { AnteproyectoComponent } from './proyectosUsco/anteproyecto/anteproyecto.component';
import { ProyectoComponent } from './proyectosUsco/proyecto/proyecto.component';
import { ArticuloComponent } from './proyectosUsco/articulo/articulo.component';
import { ProgresoComponent } from './proyectosUsco/progreso/progreso.component';
import { SemilleroUscoComponent } from './semillero-usco/semillero-usco.component';
import { PasantiaUscoComponent } from './pasantia-usco/pasantia-usco.component';
import { BandejaProyectosComponent } from './jefe-programa/bandeja-proyectos/bandeja-proyectos.component';

// ADMIN --------------------
import { AdminComponent } from './admin/admin.component';
import { ProgramasAcademicosComponent } from './admin/programas-academicos.component';
import { SedesComponent } from './admin/sedes.component';
import { FacultadComponent } from './admin/Facultad.component';
import { JefeProgramaComponent } from './jefe-programa/jefe-programa.component';
import { PaisComponent } from './admin/pais.component';
import { DepartamentoComponent } from './admin/departamento.component';
import { CiudadComponent } from './admin/ciudad.component';


const pagesRouter: Routes = [
    {
        path: 'informacion' ,
         component: InformacionComponent,
         canActivate: [VerificaTokenGuard],
         data: {titulo: 'informacion'}

        },
    { path: 'solicitud' , component: SolicitudComponent},
    { path: 'anteproyecto' , component: AnteproyectoComponent},
    { path: 'proyecto' , component: ProyectoComponent},
    { path: 'articulo' , component: ArticuloComponent},
    { path: 'progreso' , component: ProgresoComponent},
    { path: 'perfil' , component: ProfileComponent},
    { path: 'notificaciones' , component: NotificacionesComponent},


     { path: 'semillero' , component: SemilleroUscoComponent},
     { path: 'pasantia' , component: PasantiaUscoComponent},

    {
        path: 'admin' ,
        component: AdminComponent,
       canActivate:[AdminGuard,VerificaTokenGuard],
       
        children: [
          { path: 'usuarios', component: TablaTodosComponent},
          { path: 'programas' , component: ProgramasAcademicosComponent},
          { path: 'sedeUniversitaria' , component: SedesComponent},
          { path: 'facultad' , component: FacultadComponent},
          { path: 'pais' , component: PaisComponent},
          { path: 'departamento' , component: DepartamentoComponent},
          { path: 'ciudad' , component: CiudadComponent},
          { path: '' , redirectTo: 'usuarios', pathMatch: 'full'}
        ]
      },{
        path: 'jefeprograma' ,
        component: JefeProgramaComponent,
       canActivate:[JefeProgramaGuard,VerificaTokenGuard],
       
        children: [
          { path: 'bandejaProyectos', component: BandejaProyectosComponent}, // Agregar paginas.
          { path: '' , redirectTo: 'bandejaProyectos', pathMatch: 'full'}
        ]
      },
    { path: 'docente' , component: DocenteComponent},
    { path: 'docente2' , component: DocenteDosComponent},
    { path: 'docente3' , component: DocenteTresComponent},
    { path: '' , redirectTo: '/search', pathMatch: 'full'} // Cualquier ruta vacia lo redirecciona al dashboard.

];


export const PAGES_ROUTES = RouterModule.forChild(pagesRouter);