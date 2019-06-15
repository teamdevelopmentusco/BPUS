import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { CodigoVerificacionComponent } from './login/codigo-verificacion.component';
import { OlvidoClaveComponent } from './login/olvido-clave.component';
import { CambioClaveComponent } from './login/cambio-clave.component';

// Enrutamiento
import { APP_ROUTES } from './app.routing';
import { RegistroUnoComponent } from './registro-uno/registro-uno.component';
import { RegistroDosComponent } from './registro-dos/registro-dos.component';
import { RegistroTresComponent } from './registro-tres/registro-tres.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    CodigoVerificacionComponent,
    OlvidoClaveComponent,
    CambioClaveComponent,
    RegistroUnoComponent,
    RegistroDosComponent,
    RegistroTresComponent,
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
