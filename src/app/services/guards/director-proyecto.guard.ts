import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable()
export class DirectorProyectoGuard implements  CanActivate{

  constructor(

    public _usuarioService:UsuarioService,
   
  
    ){}



  canActivate(){
    if (this._usuarioService.usuario.tipoUsuario==='Director de proyecto') {
      return true;  
    } else {
      //console.log('BLOQUEADERO POR EL GUARD');
      this._usuarioService.logout();
      
      return false;
    }

  }
}
