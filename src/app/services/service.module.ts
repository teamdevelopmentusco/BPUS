import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import{
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  VerificaTokenGuard

} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],providers:[
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
