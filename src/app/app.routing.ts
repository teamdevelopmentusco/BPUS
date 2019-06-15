import { RegistroUnoComponent } from './registro-uno/registro-uno.component';
import { RegistroDosComponent } from './registro-dos/registro-dos.component';
import { RegistroTresComponent } from './registro-tres/registro-tres.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { CambioClaveComponent } from './login/cambio-clave.component';
import { CodigoVerificacionComponent } from './login/codigo-verificacion.component';
import { OlvidoClaveComponent } from './login/olvido-clave.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';



const appRoutes: Routes = [ // Se crea el objeto de tipo Routes,
    { path: '' , component: LoginComponent},
    { path: 'cambioclave' , component: CambioClaveComponent},
    { path: 'codigoverificacion' , component: CodigoVerificacionComponent},
    { path: 'olvidoclave' , component: OlvidoClaveComponent},
    { path: 'registrouno' , component: RegistroUnoComponent},
    { path: 'registrodos' , component: RegistroDosComponent},
    { path: 'registrotres' , component: RegistroTresComponent},
    // loadChildren = primera parte es el path al modulo que quiero cargar y la segunda es el nombre del modulo.

  { path: '**' , component: NopagefoundComponent},// Los ** es un comodin para cualquier ruta invalida.
    { path:'',component:PagesComponent, loadChildren: './pages/pages.module#PagesModule'}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true}); // Se modulan las rutas para ser importadas en el module principal.
