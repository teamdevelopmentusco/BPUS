<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];
=======
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component'

const routes: Routes = [
  {path: '', component: PagesComponent},
  {path: 'login', component: LoginComponent}
  ];
>>>>>>> Arreglo de header y footer, creacion componente login y configuracion de rutas (/,/login)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
