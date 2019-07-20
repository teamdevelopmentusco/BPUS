import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
// login
import { LoginComponent } from './login/login.component';
import { OlvidoClaveComponent } from './login/olvido-clave.component';
import { CambioClaveComponent } from './login/cambio-clave.component';
// registro
import { RegistroComponent } from './registro/registro.component';
import { RegistroDosComponent } from './registro/registro-dos.component';
import { RegistroTresComponent } from './registro/registro-tres.component';

// Enrutamiento
import { APP_ROUTES } from './app.routing';
import { SearchComponent } from './search/search.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { SolicitudComponent } from './estudiante/solicitud.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    OlvidoClaveComponent,
    CambioClaveComponent,
    RegistroComponent,
    RegistroDosComponent,
    RegistroTresComponent,
    SearchComponent,
    EstudianteComponent,
    SolicitudComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
