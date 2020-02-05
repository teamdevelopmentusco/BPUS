import { Injectable } from '@angular/core';
import { Ciudad } from '../../models/ciudad.model';

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

export class CiudadService {
  ciudad: Ciudad;
  token: string;
  menu: any[] = [];
  totalCiudades:number=0;

  constructor(
    public http: HttpClient,
    public router: Router
    ) { 

  }

  crearCiudad(ciudad:Ciudad){

    let url=URL_SERVICIOS+'/ciudad';
   
    return this.http.post(url, ciudad)
    .map((resp:any)=>{
      swal.fire('Ciudad creada',ciudad.nombre,'success');
      return resp.usuario;

    }).catch(err =>{
      swal.fire(err.error.mensaje,err.error.errors.message,'error');
      return Observable.throw(err);

    });

  }


  actualizarCiudad(ciudad:Ciudad){

    let url = URL_SERVICIOS+'/ciudad/'+ciudad._id+'?token='+this.token;

    return this.http.put(url, ciudad)
                    .map((resp: any) => {

                      swal.fire('Ciudad actualizada', ciudad.nombre, 'success');
                      return true;
                    }).catch(err =>{
                      swal.fire('Error al actualizar', ciudad.nombre, 'error');
                      return Observable.throw(err);
                    });

  }
  cargarCiudad(desde:number=0){


    let url=URL_SERVICIOS+'/ciudad?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalCiudades=resp.total;
      return resp.ciudades;


    });
  }


  cargarCiudadSinlimite(desde:number=0){


    let url=URL_SERVICIOS+'/ciudad/sinlimite?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalCiudades=resp.total;
      return resp.ciudades;


    });
  }


  cargarCiudadSinlimiteFiltrado(desde:number=0, filtroDepartamento:string="5e37aa2eaa9f8134f0f3c94b"){


    let url=URL_SERVICIOS+'/ciudad/sinlimite/'+filtroDepartamento+'?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalCiudades=resp.total;
      return resp.ciudades;


    });
  }

  
  buscarCiudad(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/ciudad/'+termino;
    return this.http.get(url).map((resp:any)=>resp.ciudad);

  }


  borrarCiudad(id:string){

    let url=URL_SERVICIOS+'/ciudad/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Ciudad borrada','La ciudad ha sido eliminado correctamente','success');
              return true;
        });

  }
}
