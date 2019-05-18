import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { CodigoVerificacionComponent } from './login/codigo-verificacion.component';
import { OlvidoClaveComponent } from './login/olvido-clave.component';
import { CambioClaveComponent } from './login/cambio-clave.component';

// Enrutamiento 
import { APP_ROUTES } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    CodigoVerificacionComponent,
    OlvidoClaveComponent,
    CambioClaveComponent,
 
  ],
  imports: [
    BrowserModule,
    SharedModule,
    APP_ROUTES
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
