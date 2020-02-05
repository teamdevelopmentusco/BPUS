import { Injectable } from '@angular/core';
import { Pais } from '../../models/pais.model';

// -------- Servicios Restful
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//----------
@Injectable({
  providedIn: 'root'
})
export class PaisService {
  pais: Pais;
  token: string;
  menu: any[] = [];
  totalPaises:number=0;

  constructor(
    public http: HttpClient,
    public router: Router
    ) { 

  }

  crearPais(pais:Pais){

    let url=URL_SERVICIOS+'/pais';
   
    return this.http.post(url, pais)
    .map((resp:any)=>{
      swal.fire('Pais creada',pais.nombre,'success');
      return resp.usuario;

    }).catch(err =>{
      swal.fire(err.error.mensaje,err.error.errors.message,'error');
      return Observable.throw(err);

    });

  }


  actualizarPais(pais:Pais){

    let url = URL_SERVICIOS+'/pais/'+pais._id+'?token='+this.token;

    return this.http.put(url, pais)
                    .map((resp: any) => {

                      swal.fire('Pais actualizada', pais.nombre, 'success');
                      return true;
                    }).catch(err =>{
                      swal.fire('Error al actualizar', pais.nombre, 'error');
                      return Observable.throw(err);
                    });

  }
  cargarPaises(desde:number=0){


    let url=URL_SERVICIOS+'/pais?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalPaises=resp.total;
      return resp.paises;


    });
  }


  cargarPaisesSinlimite(desde:number=0){


    let url=URL_SERVICIOS+'/pais/sinlimite?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalPaises=resp.total;
      return resp.paises;


    });
  }

  buscarPaises(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/pais/'+termino;
    return this.http.get(url).map((resp:any)=>resp.usuarios);

  }


  borrarPaises(id:string){

    let url=URL_SERVICIOS+'/pais/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Pais borrada','La pais ha sido eliminado correctamente','success');
              return true;
        });

  }

}
