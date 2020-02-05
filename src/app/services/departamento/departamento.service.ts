import { Injectable } from '@angular/core';
import { Departamento } from '../../models/departamento.model';


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
export class DepartamentoService {
  departamento: Departamento;
  token: string;
  menu: any[] = [];
  totalDepartamentos:number=0;

  constructor(
    public http: HttpClient,
    public router: Router
    ) { 

  }

  crearDepartamento(departamento:Departamento){

    let url=URL_SERVICIOS+'/departamento';
   
    return this.http.post(url, departamento)
    .map((resp:any)=>{
      swal.fire('Departamento creada',departamento.nombre,'success');
      return resp.usuario;

    }).catch(err =>{
      swal.fire(err.error.mensaje,err.error.errors.message,'error');
      return Observable.throw(err);

    });

  }


  actualizarDepartamento(departamento:Departamento){

    let url = URL_SERVICIOS+'/departamento/'+departamento._id+'?token='+this.token;

    return this.http.put(url, departamento)
                    .map((resp: any) => {

                      swal.fire('Departamento actualizada', departamento.nombre, 'success');
                      return true;
                    }).catch(err =>{
                      swal.fire('Error al actualizar', departamento.nombre, 'error');
                      return Observable.throw(err);
                    });

  }
  cargarDepartamentos(desde:number=0){  // Limite de 5


    let url=URL_SERVICIOS+'/departamento?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalDepartamentos=resp.total;
      return resp.departamentos;


    });
  }
  
  
  cargarDepartamentosSinLimite(desde:number=0){


    let url=URL_SERVICIOS+'/departamento/sinlimite?desde='+desde;
    return this.http.get(url) .map((resp:any) =>{

      this.totalDepartamentos=resp.total;
      return resp.departamentos;


    });
  }
  cargarDepartamentosSinLimiteFiltrado(desde:number=0,filtroPais:string ="5e372b62b4e295267cd37395"){


    let url=URL_SERVICIOS+'/departamento/sinlimite/'+filtroPais+'?desde='+desde+'?filtroPais='+filtroPais;
    return this.http.get(url) .map((resp:any) =>{

      this.totalDepartamentos=resp.total;
      return resp.departamentos;


    });
  }


  buscarDepartamentos(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/departamento/'+termino;
    return this.http.get(url).map((resp:any)=>resp.departamentos);

  }


  borrarDepartamento(id:string){

    let url=URL_SERVICIOS+'/departamento/'+id+'?token='+this.token;
    return this.http.delete(url)
            .map(resp=>{
            
              swal.fire('Departamento borrada','La departamento ha sido eliminado correctamente','success');
              return true;
        });

  }
}
