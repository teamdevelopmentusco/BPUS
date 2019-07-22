import { Routes, RouterModule } from '@angular/router';

//Guards
import { LoginGuardGuard, VerificaTokenGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';




import { SolicitudComponent } from './estudiante/solicitud.component';
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { DashboardComponent } from './dashboard/dashboard.component';






const pagesRouter: Routes =[
   
    { 
        path: 'dashboard' ,
         component: DashboardComponent,
         canActivate:[VerificaTokenGuard],
         data:{titulo:'Dashboard'}

        },
         
            { path: '' , redirectTo: '/dashboard', pathMatch: 'full'} // Cualquier ruta vacia lo redirecciona al dashboard.

        /* ]
         },*/


];


export const PAGES_ROUTES = RouterModule.forChild(pagesRouter);