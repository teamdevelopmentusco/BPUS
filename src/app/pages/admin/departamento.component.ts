import { Component, OnInit } from '@angular/core';


import swal from 'sweetalert2';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento/departamento.service';
import { PaisService } from '../../services/pais/pais.service';
import { Pais } from '../../models/pais.model';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styles: []
})
export class DepartamentoComponent implements OnInit {
  desde: number=0;
  departamentos: Departamento[]=[];
  paises: Pais[]=[];
  cargando:boolean=true;
  forma:any;
  departamentoEditado = null;

  constructor(public _DepartamentoService: DepartamentoService,
    public _PaisService: PaisService,
    private formBuilder: FormBuilder,
     private modalService: NgbModal) { 

      this.forma = this.formBuilder.group({
        nombre: [
          '',
          [Validators.required]
        ],
        pais: [
          '',
          [Validators.required]
        ]
      });

     }

     get nombre() {
      return this.forma.get('nombre');
    }
    get pais() {
      return this.forma.get('pais');
    }
  

  openModal(agregarDepartamento) {
    this.modalService.open(agregarDepartamento);
  }

  openModalEdit(editarDepartamento, departamento) {
    this.modalService.open(editarDepartamento);
    this.departamentoEditado = departamento;
  }


  ngOnInit() {
    this.cargarPaises();
    this.cargarDepartamentos();
  }

  cargarPaises() {
    this.cargando = true;
    this._PaisService.cargarPaises(this.desde).subscribe( paises => this.paises = paises );
    this.cargando = false;
  }

  cargarDepartamentos(){
    this.cargando=true;
this._DepartamentoService.cargarDepartamentos(this.desde)
            .subscribe( departamentos => this.departamentos=departamentos );
            this.cargando=false;
  }
  

  buscarDepartamentos( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarDepartamentos();
        return;
    }

    
    
      this._DepartamentoService.buscarDepartamentos(termino)
                            .subscribe((departamentos:Departamento[])=>{
                              this.departamentos=departamentos;
                              this.cargando=false;
      });

  

  }

  borrarDepartamento(departamento:Departamento){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+departamento.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._DepartamentoService.borrarDepartamento(departamento._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarDepartamentos();


                    });
    } 
    });

    

  }

  addDepartamento() {


    console.log("forma.value.pais:  "+this.forma.value.pais);
    const departamento = new Departamento( this.forma.value.nombre,this.forma.value.pais);

    this._DepartamentoService.crearDepartamento(departamento).subscribe(resp=> {
      this.cargarDepartamentos();
      });
  }
  editDepartamento(departamento: Departamento) {
    departamento.nombre = (document.getElementById('departamentoNombre') as HTMLInputElement).value;
    departamento.paisId = (document.getElementById('pais') as HTMLInputElement).value;

    this._DepartamentoService.actualizarDepartamento(departamento).subscribe(resp => {
    console.log(resp);
    this.cargarDepartamentos();
    });
  }






// Paginado -----------------------

  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._DepartamentoService.totalDepartamentos) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarDepartamentos();
  }
  //----------------------------

}
