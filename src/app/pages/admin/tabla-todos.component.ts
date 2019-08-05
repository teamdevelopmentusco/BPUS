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
      text: "Esta a punto de borrar a "+usuario.nombres+" "+usuario.apellidos,
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

  agregarUsuario() {
    swal.fire({
      title: 'Crear usuario',
      width: 550,
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="form-group">' +
      '<label for="correo" class="font-weight-bold">CORREO:</label>' +
      '<input type="text" id="email" placeholder="Ingresa el correo" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="correo" class="font-weight-bold">CONTRASEÑA:</label>' +
      '<input type="password" id="password" placeholder="Ingresa la contraseña" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-5">' +
      '<h6>TIPO DE USUARIO</h6>' +
      '<select id="tipoUsuario" name="tipoUsuario" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Estudiante">Estudiante</option>' +
      '<option value="Docente">Docente</option>' +
      '</select>' +
      '<h6>TIPO DE IDENTIFICACION</h6>' +
      '<select id="tipoID" name="tipoID" class="custom-select uscoInputs mb-3">' +
      '<option selected value="C.C">C.C</option>' +
      '<option value="T.I">T.I</option>' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-7">' +
      '<div *ngIf="tipoUsuario.value == \'Estudiante\'" class="form-group">' +
      '<label for="code" class="font-weight-bold">CÓDIGO ESTUDIANTIL</label>' +
      '<input id="code" class="uscoInputs" type="text" placeholder="ingresa el código estudiantil" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="11" required pattern="([0-9]){11}">' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="id" class="font-weight-bold">NÚMERO DE DOCUMENTO</label>' +
      '<input id="numId" class="uscoInputs" type="text" placeholder="inngresa el número de documento" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){8,10}">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<div class="form-group">' +
      '<label for="nombre" class="font-weight-bold">NOMBRES</label>' +
      '<input id="nombres" type="text" class="uscoInputs" placeholder="ingresa los nombres" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\' maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+){2,50}" required>' +
      '</div>' +
      '<label for="sedeUniversitaria" class="font-weight-bold">SEDE UNIVERSITARIA</label>' +
      '<select id="sedeUniversitaria" name="sedeUniversitaria" class="custom-select uscoInputs mb-3">' +
      '<option value="Gárzon">Gárzon</option>' +
      '<option value="La plata">La plata</option>' +
      '<option selected value="Neiva">Neiva</option>' +
      '<option value="Pitalito">Pitalito</option>' +
      '</select>' +
      '<label for="facultad" class="font-weight-bold">FACULTAD</label>' +
      '<select id="facultad" name="facultad" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Ingeniería">Ingeniería</option>' +
      '</select>' +
      '<label for="rol" class="font-weight-bold">ROL</label>' +
      '<select id="rol" name="rol" class="custom-select uscoInputs mb-3">' +
      '<option selected value="USER_ROLE">Usuario</option>' +
      '<option value="ADMIN_ROLE">Administrador</option>' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-6">' +
      '<div class="form-group">' +
      '<label for="code" class="font-weight-bold">APELLIDOS</label>' +
      '<input id="apellidos" class="uscoInputs" type="text" placeholder="ingresa los apellidos" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\'' +
      'maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+){2,50}$" required>' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="id" class="font-weight-bold">TELÉFONO</label>' +
      '<input id="telefono" class="uscoInputs" type="text" placeholder="ingresa el teléfono" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){10}" required>' +
      '</div>' +
      '<label for="id" class="font-weight-bold">PROGRAMA</label>' +
      '<select id="programaUniversitario" name="programaUniversitario" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Ingeniería de software">Ingeniería de software</option>' +
      '</select>' +
      '</div>' +
      '</div>'
    }).then(crear => {
      if (crear.value) {
        const correo = (document.getElementById('email') as HTMLInputElement).value;
        const clave = (document.getElementById('password') as HTMLInputElement).value;
        const tipoID = (document.getElementById('tipoID') as HTMLInputElement).value;
        const numId = (document.getElementById('numId') as HTMLInputElement).value;
        const code = (document.getElementById('code') as HTMLInputElement).value;
        const tipoUsuario = (document.getElementById('tipoUsuario') as HTMLInputElement).value;
        const nombres = (document.getElementById('nombres') as HTMLInputElement).value;
        const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
        const sede = (document.getElementById('sedeUniversitaria') as HTMLInputElement).value;
        const facultad = (document.getElementById('facultad') as HTMLInputElement).value;
        const programa = (document.getElementById('programaUniversitario') as HTMLInputElement).value;
        const rol = (document.getElementById('rol') as HTMLInputElement).value;
        const nuevoUsuario = new Usuario(nombres, apellidos, clave, correo, telefono, tipoUsuario, tipoID, numId, code, sede, facultad, programa, true, rol);

        this._usuarioService.crearUsuario(nuevoUsuario).subscribe(resp => {
        console.log(resp);
        this.cargarUsuarios();
        });
      }
    });
  }

  editarUsuarios(usuario: Usuario ) {
    swal.fire({
      title: 'Editar usuario',
      width: 550,
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="form-group">' +
      '<label for="correo" class="font-weight-bold">CORREO:</label>' +
      '<input type="text" id="email" value="'+usuario.email+'" placeholder="'+usuario.email+'" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-5">' +
      '<h6>TIPO DE USUARIO</h6>' +
      '<select id="tipoUsuario" name="tipoUsuario" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Estudiante">Estudiante</option>' +
      '<option value="Docente">Docente</option>' +
      '</select>' +
      '<h6>TIPO DE IDENTIFICACION</h6>' +
      '<select id="tipoID" name="tipoID" class="custom-select uscoInputs mb-3">' +
      '<option selected value="C.C">C.C</option>' +
      '<option value="T.I">T.I</option>' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-7">' +
      '<div *ngIf="tipoUsuario.value == \'Estudiante\'" class="form-group">' +
      '<label for="code" class="font-weight-bold">CÓDIGO ESTUDIANTIL</label>' +
      '<input id="code" class="uscoInputs" type="text" value="'+usuario.codigoUniversitario+'" placeholder="'+usuario.codigoUniversitario+'" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="11" required pattern="([0-9]){11}">' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="id" class="font-weight-bold">NÚMERO DE DOCUMENTO</label>' +
      '<input id="numId" class="uscoInputs" type="text" value="'+usuario.numDocumento+'" placeholder="'+usuario.numDocumento+'" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){8,10}">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<div class="form-group">' +
      '<label for="nombre" class="font-weight-bold">NOMBRES</label>' +
      '<input id="nombres" type="text" class="uscoInputs" value="'+usuario.nombres+'" placeholder="'+usuario.nombres+'" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\' maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+){2,50}" required>' +
      '</div>' +
      '<label for="sedeUniversitaria" class="font-weight-bold">SEDE UNIVERSITARIA</label>' +
      '<select id="sedeUniversitaria" name="sedeUniversitaria" class="custom-select uscoInputs mb-3">' +
      '<option value="Gárzon">Gárzon</option>' +
      '<option value="La plata">La plata</option>' +
      '<option selected value="Neiva">Neiva</option>' +
      '<option value="Pitalito">Pitalito</option>' +
      '</select>' +
      '<label for="facultad" class="font-weight-bold">FACULTAD</label>' +
      '<select id="facultad" name="facultad" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Ingeniería">Ingeniería</option>' +
      '</select>' +
      '<label for="rol" class="font-weight-bold">ROL</label>' +
      '<select id="rol" name="rol" class="custom-select uscoInputs mb-3">' +
      '<option selected value="USER_ROLE">Usuario</option>' +
      '<option value="ADMIN_ROLE">Administrador</option>' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-6">' +
      '<div class="form-group">' +
      '<label for="code" class="font-weight-bold">APELLIDOS</label>' +
      '<input id="apellidos" class="uscoInputs" type="text" value="'+usuario.apellidos+'" placeholder="'+usuario.apellidos+'" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\'' +
      'maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+){2,50}$" required>' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="id" class="font-weight-bold">TELÉFONO</label>' +
      '<input id="telefono" class="uscoInputs" type="text" value="'+usuario.telefono+'" placeholder="'+usuario.telefono+'" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){10}" required>' +
      '</div>' +
      '<label for="id" class="font-weight-bold">PROGRAMA</label>' +
      '<select id="programaUniversitario" name="programaUniversitario" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Ingeniería de software">Ingeniería de software</option>' +
      '</select>' +
      '</div>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        usuario.email = (document.getElementById('email') as HTMLInputElement).value;
        usuario.tipoID = (document.getElementById('tipoID') as HTMLInputElement).value;
        usuario.numDocumento = (document.getElementById('numId') as HTMLInputElement).value;
        usuario.codigoUniversitario = (document.getElementById('code') as HTMLInputElement).value;
        usuario.tipoUsuario = (document.getElementById('tipoUsuario') as HTMLInputElement).value;
        usuario.nombres = (document.getElementById('nombres') as HTMLInputElement).value;
        usuario.apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
        usuario.telefono = (document.getElementById('telefono') as HTMLInputElement).value;
        usuario.sedeUniversitaria = (document.getElementById('sedeUniversitaria') as HTMLInputElement).value;
        usuario.facultad = (document.getElementById('facultad') as HTMLInputElement).value;
        usuario.programaUniversitario = (document.getElementById('programaUniversitario') as HTMLInputElement).value;
        usuario.role = (document.getElementById('rol') as HTMLInputElement).value;

        this._usuarioService.actualizarUsuario(usuario).subscribe(resp => {
        console.log(resp);
        this.cargarUsuarios();
        });
      }
    });
  }

}
