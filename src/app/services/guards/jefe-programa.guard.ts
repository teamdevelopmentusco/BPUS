import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class JefeProgramaGuard implements CanActivate {

  constructor(

    public _usuarioService:UsuarioService,
   
  
    ){}



  canActivate(){
    if (this._usuarioService.usuario.role==='JEFE_DE_PROGRAMA') {
      return true;  
    } else {
      //console.log('BLOQUEADERO POR EL GUARD');
      this._usuarioService.logout();
      
      return false;
    }

  }
}
