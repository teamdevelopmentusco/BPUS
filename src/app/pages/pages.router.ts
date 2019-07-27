import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard, VerificaTokenGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';




import { SolicitudComponent } from './estudiante/solicitud.component';
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { TablaTodosComponent } from './admin/tabla-todos.component';
import { TablaEstudiantesComponent } from './admin/tabla-estudiantes.component';
import { TablaProfesoresComponent } from './admin/tabla-profesores.component';






const pagesRouter: Routes = [
    {
        path: 'dashboard' ,
         component: DashboardComponent,
         canActivate: [VerificaTokenGuard],
         data: {titulo: 'Dashboard'}

        },
    { path: 'solicitud' , component: SolicitudComponent},
    {
        path: 'admin' ,
        component: AdminComponent,
        children: [
          { path: 'tablaTodos' , component: TablaTodosComponent},
          { path: 'tablaEstudiantes' , component: TablaEstudiantesComponent},
          { path: 'tablaProfesores' , component: TablaProfesoresComponent},
          { path: '' , redirectTo: 'tablaTodos', pathMatch: 'full'}
        ]
      },
    { path: 'docente' , component: DocenteComponent},
    { path: 'docente2' , component: DocenteDosComponent},
    { path: 'docente3' , component: DocenteTresComponent},
    { path: 'estudiante' , component: EstudianteComponent},
    { path: 'perfil' , component: ProfileComponent},
            { path: '' , redirectTo: '/dashboard', pathMatch: 'full'} // Cualquier ruta vacia lo redirecciona al dashboard.

        /* ]
         },*/


];


export const PAGES_ROUTES = RouterModule.forChild(pagesRouter);