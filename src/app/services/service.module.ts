import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  SharedService,
  UsuarioService,
  SedeService,
  FacultadService,
  ProgramaService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  VerificaTokenGuard,
  AnteProyectoService,
  ArticuloService,
  NotificacionService,
  ProyectoService,
  SolicitudService,
  TipoNotificacionService

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
    UsuarioService,
    SedeService,
    FacultadService,
    ProgramaService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    VerificaTokenGuard,
    AnteProyectoService,
    ArticuloService,
    NotificacionService,
    ProyectoService,
    SolicitudService,
    TipoNotificacionService
  ],
  declarations: []
})
export class ServiceModule { }
