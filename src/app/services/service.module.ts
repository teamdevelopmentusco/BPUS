import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  SharedService,
  LoginGuardGuard,
  AdminGuard,
  JefeProgramaGuard,
  SubirArchivoService,
  VerificaTokenGuard,
  AnteProyectoService,
  ArticuloService,
  NotificacionService,
  ProyectoService,
  SolicitudService,
  // Servicios del CRUD
  UsuarioService,
  SedeService,
  FacultadService,
  ProgramaService,
  PaisService,
  DepartamentoService,
  CiudadService
  
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ], providers: [
    SidebarService,
    SharedService,
    LoginGuardGuard,
    AdminGuard,
    JefeProgramaGuard,
    SubirArchivoService,
    ModalUploadService,
    VerificaTokenGuard,
    AnteProyectoService,
    ArticuloService,
    NotificacionService,
    ProyectoService,
    SolicitudService,
    UsuarioService,
    SedeService,
    FacultadService,
    ProgramaService,
    PaisService,
    DepartamentoService,
    CiudadService

  ],
  declarations: []
})
export class ServiceModule { }
