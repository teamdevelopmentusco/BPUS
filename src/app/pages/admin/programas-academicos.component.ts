import { Component, OnInit } from '@angular/core';
import { Programa } from 'src/app/models/programa.model';
import { ProgramaService } from 'src/app/services/service.index';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-estudiantes',
  templateUrl: './programas-academicos.component.html',
  styles: []
})
export class ProgramasAcademicosComponent implements OnInit {
  desde: number=0;
  programas: Programa[]=[];
  jefePrograma: Usuario=new Usuario('','','','','','','','','','','','','');
  cargando:boolean=true;
  constructor(public _programaService: ProgramaService, public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.cargarProgramas();
   
    this.cambioJefePrograma(this.jefePrograma.numDocumento);
  }


  
  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._programaService.totalProgramas) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarProgramas();
  }

  cambioJefePrograma(numDocumento:string){
    console.log("CAMBIO DE JEFE DE PROGRAMA");

    this._usuarioService.obtenerJefePrograma(numDocumento)
        .subscribe(jefePrograma=> {
          this.jefePrograma=jefePrograma
        });   
   
          
}


  cargarProgramas(){
    this.cargando=true;
this._programaService.cargarProgramas(this.desde)
            .subscribe( programas => this.programas=programas );
            this.cargando=false;
  }

 



  buscarProgramas( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarProgramas();
        return;
    }

    
    
      this._programaService.buscarProgramas(termino)
                            .subscribe((programas:Programa[])=>{
                              this.programas=programas;
                              this.cargando=false;
      });

  

  }

  borrarProgramas(programa:Programa){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+programa.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._programaService.borrarProgramas(programa._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarProgramas();


                    });
    } 
    });

    

  }

  agregarPrograma() {
    swal.fire({
      title: 'Crear Programa Academico',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Registro SNIES:</label>' +
      '<input type="text" id="programaRegistroSNIES" placeholder="Ingrese el Registro SNIES" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE DEL PROGRAMA:</label>' +
      '<input type="text" id="programaNombre" placeholder="Ingrese la ciudad" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Número de creditos:</label>' +
      '<input type="text" id="programaNumCreditos" placeholder="Ingrese la dirección" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Nivel académico:</label>' +
      '<input type="text" id="programaNivelAcademico" placeholder="Ingrese el correo" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Titulo otorgado:</label>' +
      '<input type="text" id="programaTituloOrtorgado" placeholder="Ingrese el correo" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Modalidad de formación:</label>' +
      '<input type="text" id="programaModalFor" placeholder="Ingrese el correo" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'+
      '<div class="form-group text-left">' +
      '<label for="jefePrograma" class="font-weight-bold">Jefe de programa</label>' +
      '<input type="text" id="jefePrograma" placeholder="Ingrese la c.c del jefe de programa" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'
    }).then(crear => {
      if (crear.value) {
        var registroSNIES = (document.getElementById('programaRegistroSNIES') as HTMLInputElement).value;
        var nombre = (document.getElementById('programaNombre') as HTMLInputElement).value;
        var numCreditos = (document.getElementById('programaNumCreditos') as HTMLInputElement).value;
        var nivelAcademico = (document.getElementById('programaNivelAcademico') as HTMLInputElement).value;
        var tituloOtorgado = (document.getElementById('programaTituloOrtorgado') as HTMLInputElement).value;
        var modalidadFormacion = (document.getElementById('programaModalFor') as HTMLInputElement).value;


        var jefePrograma = (document.getElementById('jefePrograma') as HTMLInputElement).value;

        try {
          this.cambioJefePrograma(jefePrograma);
          var programa = new Programa(registroSNIES, nombre, numCreditos, nivelAcademico, tituloOtorgado, modalidadFormacion, this.jefePrograma.nombres+ this.jefePrograma.apellidos);
        
          this._programaService.crearPrograma(programa).subscribe(resp => {
          console.log(resp);
          this.cargarProgramas();
          });
        } catch (error) {
          swal.fire(
            'INVALIDO!',
            'El jefe de programa es invalido',
            'error'
          );       
        }
       
        
      }
    });
  }

  editarPrograma(programa: Programa) {
    swal.fire({
      title: 'Editar Programa',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Registro SNIES:</label>' +
      '<input type="text" id="programaRegistroSNIES" value="'+programa.SNIES+'" placeholder="'+programa.SNIES+'" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE DEL PROGRAMA:</label>' +
      '<input type="text" id="programaNombre" value="'+programa.nombre+'" placeholder="'+programa.nombre+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Número de creditos:</label>' +
      '<input type="text" id="programaNumCreditos" value="'+programa.numCreditos+'" placeholder="'+programa.numCreditos+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Nivel académico:</label>' +
      '<input type="text" id="programaNivelAcademico" value="'+programa.nivelAcademico+'" placeholder="'+programa.nivelAcademico+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Titulo otorgado:</label>' +
      '<input type="text" id="programaTituloOrtorgado" value="'+programa.tituloOtogado+'" placeholder="'+programa.tituloOtogado+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">Modalidad de formación:</label>' +
      '<input type="text" id="programaModalFor" value="'+programa.modalidadFormacion+'" placeholder="'+programa.modalidadFormacion+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'+
      '<div class="form-group text-left">' +
      '<label for="jefePrograma" class="font-weight-bold">Jefe de programa</label>' +
      '<input type="text" id="jefePrograma"value="'+programa.jefePrograma+'" placeholder="Ingrese la c.c del jefe de programa" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        programa.SNIES = (document.getElementById('programaRegistroSNIES') as HTMLInputElement).value;
        programa.nombre = (document.getElementById('programaNombre') as HTMLInputElement).value;
        programa.numCreditos = (document.getElementById('programaNumCreditos') as HTMLInputElement).value;
        programa.nivelAcademico = (document.getElementById('programaNivelAcademico') as HTMLInputElement).value;
        programa.tituloOtogado = (document.getElementById('programaTituloOrtorgado') as HTMLInputElement).value;
        programa.modalidadFormacion = (document.getElementById('programaModalFor') as HTMLInputElement).value;
        programa.jefePrograma = (document.getElementById('jefePrograma') as HTMLInputElement).value;


      


        try {
          this.jefePrograma=null;
          this.cambioJefePrograma(programa.jefePrograma);

          programa.jefePrograma= this.jefePrograma.nombres+ this.jefePrograma.apellidos;
       
          this._programaService.actualizarPrograma(programa).subscribe(resp => {
            console.log(resp);
            this.cargarProgramas();
            });
        } catch (error) {
        swal.fire(
          'INVALIDO!',
          'El jefe de programa es invalido',
          'error'
        );       
      }


      }



    });
  }
}
