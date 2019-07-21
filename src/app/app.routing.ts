import { RegistroComponent } from './registro/registro.component';
import { RegistroDosComponent } from './registro/registro-dos.component';
import { RegistroTresComponent } from './registro/registro-tres.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { CambioClaveComponent } from './login/cambio-clave.component';
import { OlvidoClaveComponent } from './login/olvido-clave.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { SearchComponent } from './search/search.component';
import { SolicitudComponent } from './estudiante/solicitud.component';
import { DocenteComponent } from './docente/docente.component';
import { DocenteDosComponent } from './docente/docente-dos.component';
import { DocenteTresComponent } from './docente/docente-tres.component';
import { EstudianteComponent } from './estudiante/estudiante.component';




const appRoutes: Routes = [ // Se crea el objeto de tipo Routes,
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login' , component: LoginComponent},
    { path: 'cambio-clave' , component: CambioClaveComponent},
    { path: 'olvido-clave' , component: OlvidoClaveComponent},
    { path: 'registro' , component: RegistroComponent},
    { path: 'registro-dos' , component: RegistroDosComponent},
    { path: 'registro-tres' , component: RegistroTresComponent},
    { path: 'search' , component: SearchComponent},
    { path: 'solicitud' , component: SolicitudComponent},
    {path: 'docente', component: DocenteComponent},
    {path: 'docente-dos', component: DocenteDosComponent},
    {path: 'docente-tres', component: DocenteTresComponent},
    {path: 'estudiante', component: EstudianteComponent},


    // loadChildren = primera parte es el path al modulo que quiero cargar y la segunda es el nombre del modulo.

  { path: '**' , component: NopagefoundComponent}, // Los ** es un comodin para cualquier ruta invalida.
  // { path: '', component: PagesComponent, loadChildren: './pages/pages.module#PagesModule'}
];
// Se modulan las rutas para ser importadas en el module principal.
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
