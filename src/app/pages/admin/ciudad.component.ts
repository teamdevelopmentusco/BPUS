import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento/departamento.service';
import { Ciudad } from '../../models/ciudad.model';
import { CiudadService } from '../../services/ciudad/ciudad.service';
@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styles: []
})
export class CiudadComponent implements OnInit {
  desde: number=0;
  ciudades: Ciudad[]=[];
  departamentos: Departamento[]=[];
  cargando:boolean=true;
  forma:any;
  ciudadEditada = null;

  constructor(public _CiudadService: CiudadService,
    public _DepartamentoService: DepartamentoService,
    private formBuilder: FormBuilder,
     private modalService: NgbModal) { 

      this.forma = this.formBuilder.group({
        nombre: [
          '',
          [Validators.required]
        ],
        departamento: [
          '',
          [Validators.required]
        ]
      });

     }

     get nombre() {
      return this.forma.get('nombre');
    }
    get departamento() {
      return this.forma.get('departamento');
    }
  

  openModal(agregarDepartamento) {
    this.modalService.open(agregarDepartamento);
  }

  openModalEdit(editarCiudad, ciudad) {
    this.modalService.open(editarCiudad);
    this.ciudadEditada = ciudad;
  }


  ngOnInit() {
    this.cargarDepartamentos();
    this.cargarCiudades();
  }

  cargarDepartamentos() {
    this.cargando = true;
    this._DepartamentoService.cargarDepartamentos(this.desde).subscribe( departamentos => this.departamentos = departamentos );
    this.cargando = false;
  }

  cargarCiudades(){
    this.cargando=true;
this._CiudadService.cargarCiudad(this.desde)
            .subscribe( ciudades => this.ciudades=ciudades );
            this.cargando=false;
  }

  buscarCiudades( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarCiudades();
        return;
    } 
    
      this._CiudadService.buscarCiudad(termino)
                            .subscribe((ciudad:Ciudad[])=>{
                              this.ciudades=ciudad;
                              this.cargando=false;
      });
  }

  borrarCiudad(ciudad:Ciudad){

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+ciudad.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
  
      this._CiudadService.borrarCiudad(ciudad._id)
                    .subscribe(resp=>{

                      console.log(resp);
                      this.cargarCiudades();

                    });
    } 
    });
    

  }

  addCiudad() {

    console.log("forma.value.pais:  "+this.forma.value.pais);
    const ciudad = new Ciudad( this.forma.value.nombre,this.forma.value.departamento);

    this._CiudadService.crearCiudad(ciudad).subscribe(resp=> {
      this.cargarCiudades();
      });

  }
  editCiudad(ciudad: Ciudad) {
    ciudad.nombre = (document.getElementById('ciudadNombre') as HTMLInputElement).value;
    ciudad.departamentoId = (document.getElementById('departamento') as HTMLInputElement).value;

    this._CiudadService.actualizarCiudad(ciudad).subscribe(resp => {
    console.log(resp);
    this.cargarCiudades();
    });
  }
}
