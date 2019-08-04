import { Component, OnInit } from '@angular/core';
import { Facultad } from 'src/app/models/facultad.model';
import { FacultadService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-profesores',
  templateUrl: './Facultad.component.html',
  styles: []
})
export class FacultadComponent implements OnInit {
  desde: number=0;
  facultades: Facultad[]=[];
  cargando:boolean=true;
  constructor(public _facultadService: FacultadService) { }

  ngOnInit() {

    this.cargarFacultades();
  }


  
  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._facultadService.totalFacultades) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarFacultades();
  }


  cargarFacultades(){
    this.cargando=true;
this._facultadService.cargarFacultades(this.desde)
            .subscribe( facultades => this.facultades=facultades );
            this.cargando=false;
  }

  buscarFacultades( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarFacultades();
        return;
    }

    
    
      this._facultadService.buscarFacultades(termino)
                            .subscribe((facultades:Facultad[])=>{
                              this.facultades=facultades;
                              this.cargando=false;
      });

  

  }

  borrarFacultades(facultad:Facultad){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+facultad.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._facultadService.borrarFacultades(facultad._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarFacultades();


                    });
    } 
    });

    

  }


  /*

  agregarUsuario() {
    swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        html:
          '<div class="form-group">' +
          '<label for="correo" class="font-weight-bold">CORREO:</label>' +
          '<input type="text" id="email" placeholder="Digite el correo" class="uscoInputs form-control" maxlength="25" pattern="[^@]([A-Za-z0-9._]+){1,25}" required autofocus>' +
          '</div>' +
          '<div class="form-group">' +
          '<label for="password " class="font-weight-bold">CONTRASEÑA:</label>' +
          '<div class="input-group">' +
          '<input (change)="somethingChanged()" name="password" type="password" id="password" placeholder="Digite la contraseña" class="uscoInputs form-control" maxlength="30" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}$" required>' +
          '</div>',
        focusConfirm: false,
        preConfirm: () => {
          let email = (<HTMLInputElement> document.getElementById("email")).value;
          let password = (<HTMLInputElement> document.getElementById("password")).value;
          if (email === 'aa'){
            swal.insertQueueStep({
              type: 'error',
              title: 'Unable to get your public IP'
            },1)
            swal.getConfirmButton()
          }
        }
      },
      {
        html:
        '<div class="row">' + 
        '<div class="col-sm-5">' +
        '<h6>TIPO DE USUARIO</h6>' +
        '<select formControlName="tipoUsuario" name="tipoUsuario" class="custom-select uscoInputs mb-3">' +
        '<option selected value="Estudiante">Estudiante</option>' +
        '<option value="Docente">Docente</option>' +
        '</select>' +
        '<h6>TIPO DE IDENTIFICACION</h6>' +
        '<select formControlName="tipoID" name="tipoID" class="custom-select uscoInputs mb-3">' +
        '<option selected value="C.C">C.C</option>' +
        '<option value="T.I">T.I</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-sm-7">' + 
        '<div *ngIf="tipoUsuario.value == \'Estudiante\'" class="form-group">' +
        '<label for="code" class="font-weight-bold">CÓDIGO ESTUDIANTIL</label>' +
        '<input formControlName="codigoUniversitario" class="uscoInputs" type="text" name="code" placeholder="Digite su código" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="11" required pattern="([0-9]){11}">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="id" class="font-weight-bold">NÚMERO DE DOCUMENTO</label>' +
        '<input formControlName="numDocumento" class="uscoInputs" type="text" name="id" placeholder="Digite su ID" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){8,10}">' +
        '</div>' +
        '</div>' +
        '</div>'
      },
      {
        html:
          '<div class="row">' +
          '<div class="col-sm-6">' +
          '<div class="form-group">' +
          '<label for="nombre" class="font-weight-bold">NOMBRES</label>' +
          '<input type="text" class="uscoInputs" name="nombre" placeholder="Digite su nombre" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\' maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+){2,50}" required autofocus>' +
          '</div>' +
          '<h6>SEDE UNIVERSITARIA</h6>' +
          '<select formControlName="sedeUniversitaria" name="cars" class="custom-select uscoInputs mb-3">' +
          '<option value="Gárzon">Gárzon</option>' +
          '<option value="La plata">La plata</option>' +
          '<option selected value="Neiva">Neiva</option>' +
          '<option value="Pitalito">Pitalito</option>' +
          '</select>' + 
          '<h6>FACULTAD</h6>' +
          '<select formControlName="facultad" name="cars" class="custom-select uscoInputs mb-3">' +
          '<option selected value="Ingeniería">Ingeniería</option>' +
          '</select>' +
          '<h6>PROGRAMA</h6>' +
          '<select formControlName="programaUniversitario" name="cars" class="custom-select uscoInputs mb-3">' +
          '<option selected value="Ingeniería de software">Ingeniería de software</option>' +
          '</select>' +
          '</div>' +
          '<div class="col-sm-6">' +
          '<div class="form-group">' +
          '<label for="code" class="font-weight-bold">APELLIDOS</label>' +
          '<input class="uscoInputs" type="text" name="code" placeholder="Digite sus apellidos" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\'' +
          'maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+){2,50}" required>' +
          '</div>' +
          '<div class="form-group">' +
          '<label for="id" class="font-weight-bold">TELÉFONO</label>' +
          '<input class="uscoInputs" type="text" name="id" placeholder="Digite su número teléfonico" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){10}" required>' +
          '</div>' +
          '</div>' +
          '</div>'
      }
    ]).then((result) => {
      if (result.value) {
        swal.fire({
          title: 'All done!',
          html:
            'Your answers: <pre><code>' +
              JSON.stringify(result.value) +
            '</code></pre>',
          confirmButtonText: 'Lovely!'
        })
      }
    })
  }

  editarUsuarios(facultad:Facultad){
    swal.fire({
      title: 'Editar usuario',
      showCancelButton: true,
      reverseButtons:	true,
      focusConfirm: false,
      html:
      '<div class="form-group">' +
      '<label for="correo" class="font-weight-bold">CORREO:</label>' +
      '<input type="text" id="email" placeholder="'+usuario.email+'" value="'+usuario.email+'" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="row">' + 
      '<div class="col-sm-5">' +
      '<h6>TIPO DE USUARIO</h6>' +
      '<select name="tipoUsuario" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Estudiante">Estudiante</option>' +
      '<option value="Docente">Docente</option>' +
      '</select>' +
      '<h6>TIPO DE IDENTIFICACION</h6>' +
      '<select formControlName="tipoID" name="tipoID" class="custom-select uscoInputs mb-3">' +
      '<option selected value="C.C">C.C</option>' +
      '<option value="T.I">T.I</option>' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-7">' + 
      '<div *ngIf="tipoUsuario.value == \'Estudiante\'" class="form-group">' +
      '<label for="code" class="font-weight-bold">CÓDIGO ESTUDIANTIL</label>' +
      '<input class="uscoInputs" type="text" value="'+usuario.codigoUniversitario+'" placeholder="'+usuario.codigoUniversitario+'" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="11" required pattern="([0-9]){11}">' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="id" class="font-weight-bold">NÚMERO DE DOCUMENTO</label>' +
      '<input class="uscoInputs" type="text"  value="'+usuario.numDocumento+'" placeholder="'+usuario.numDocumento+'" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){8,10}">' +
      '</div>' +
      '</div>' +
      '</div>'+
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<div class="form-group">' +
      '<label for="nombre" class="font-weight-bold">NOMBRES</label>' +
      '<input type="text" class="uscoInputs" value="'+usuario.nombres+'" placeholder="'+usuario.nombres+'" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\' maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+){2,50}" required autofocus>' +
      '</div>' +
      '<h6>SEDE UNIVERSITARIA</h6>' +
      '<select formControlName="sedeUniversitaria" name="cars" class="custom-select uscoInputs mb-3">' +
      '<option value="Gárzon">Gárzon</option>' +
      '<option value="La plata">La plata</option>' +
      '<option selected value="Neiva">Neiva</option>' +
      '<option value="Pitalito">Pitalito</option>' +
      '</select>' + 
      '<h6>FACULTAD</h6>' +
      '<select formControlName="facultad" name="cars" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Ingeniería">Ingeniería</option>' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-6">' +
      '<div class="form-group">' +
      '<label for="code" class="font-weight-bold">APELLIDOS</label>' +
      '<input class="uscoInputs" type="text" value="'+usuario.apellidos+'" placeholder="'+usuario.apellidos+'" onkeypress=\'return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32\'' +
      'maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ ]+){2,50}$" required>' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="id" class="font-weight-bold">TELÉFONO</label>' +
      '<input class="uscoInputs" type="text" value="'+usuario.telefono+'" placeholder="'+usuario.telefono+'" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\' maxlength="10" required pattern="([0-9]){10}" required>' +
      '</div>' +
      '<h6>PROGRAMA</h6>' +
      '<select formControlName="programaUniversitario" name="cars" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Ingeniería de software">Ingeniería de software</option>' +
      '</select>' +
      '</div>' +
      '</div>'
    })
  }
*/
}
