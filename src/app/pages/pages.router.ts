import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard, VerificaTokenGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';




import { SolicitudComponent } from './proyectosUsco/solicitud/solicitud.component';
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { TablaTodosComponent } from './admin/tabla-todos.component';
import { ProgramasAcademicosComponent } from './admin/programas-academicos.component';
import { SedesComponent } from './admin/sedes.component';
import { FacultadComponent } from './admin/Facultad.component';
import { InformacionComponent } from './informacion/informacion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { SearchComponent } from '../search/search.component';
import { AnteproyectoComponent } from './proyectosUsco/anteproyecto/anteproyecto.component';
import { ProyectoComponent } from './proyectosUsco/proyecto/proyecto.component';
import { ArticuloComponent } from './proyectosUsco/articulo/articulo.component';


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
    { path: 'perfil' , component: ProfileComponent},
    { path: 'notificaciones' , component: NotificacionesComponent},
    {
        path: 'admin' ,
        component: AdminComponent,
       canActivate:[AdminGuard,VerificaTokenGuard],
       
        children: [
          { path: 'usuarios', component: TablaTodosComponent},
          { path: 'programas' , component: ProgramasAcademicosComponent},
          { path: 'sedeUniversitaria' , component: SedesComponent},
          { path: 'facultad' , component: FacultadComponent},
          { path: '' , redirectTo: 'usuarios', pathMatch: 'full'}
        ]
      },
    { path: 'docente' , component: DocenteComponent},
    { path: 'docente2' , component: DocenteDosComponent},
    { path: 'docente3' , component: DocenteTresComponent},
    { path: '' , redirectTo: '/search', pathMatch: 'full'} // Cualquier ruta vacia lo redirecciona al dashboard.

];


export const PAGES_ROUTES = RouterModule.forChild(pagesRouter);