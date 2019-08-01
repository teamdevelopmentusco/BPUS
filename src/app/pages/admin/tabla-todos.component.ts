import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-todos',
  templateUrl: './tabla-todos.component.html',
  styles: []
})
export class TablaTodosComponent implements OnInit {
  desde: number=0;
  usuarios: Usuario[]=[];
  cargando:boolean=true;
  
  constructor(  public _usuarioService: UsuarioService) {


   }

  ngOnInit() {

    this.cargarUsuarios();
  }


  
  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._usuarioService.totalUsuarios) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarUsuarios();
  }


  cargarUsuarios(){
    this.cargando=true;
this._usuarioService.cargarUsuarios(this.desde)
            .subscribe( usuarios => this.usuarios=usuarios );
            this.cargando=false;
  }

  buscarUsuarios( termino:string){
    this.cargando=true;
    if(termino.length<=0){
        this.cargarUsuarios();
        return;
    }

    

      this._usuarioService.buscarUsuarios(termino)
                            .subscribe((usuarios:Usuario[])=>{
                              this.usuarios=usuarios;
                              this.cargando=false;
      });

  }

  borrarUsuarios(usuario:Usuario){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+usuario.nombres,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._usuarioService.borrarUsuario(usuario._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarUsuarios();


                    });
    } 
    });

    

  }


}
