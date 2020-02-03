import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais/pais.service';
import { Pais } from '../../models/pais.model';


import swal from 'sweetalert2';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styles: []
})
export class PaisComponent implements OnInit {
  desde: number=0;
  paises: Pais[]=[];
  cargando:boolean=true;
  forma:any;
  constructor(public _PaisService: PaisService,
    private formBuilder: FormBuilder,
     private modalService: NgbModal) { 

      this.forma = this.formBuilder.group({
        nombre: [
          '',
          [Validators.required]
        ]
      });

     }

     get nombre() {
      return this.forma.get('nombre');
    }
  

  openModal(agregarPais) {
    this.modalService.open(agregarPais);
  }
  ngOnInit() {
    this.cargarPaises();
  }

  cargarPaises(){
    this.cargando=true;
this._PaisService.cargarPaises(this.desde)
            .subscribe( paises => this.paises=paises );
            this.cargando=false;
  }

  buscarPaises( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarPaises();
        return;
    }

    
    
      this._PaisService.buscarPaises(termino)
                            .subscribe((paises:Pais[])=>{
                              this.paises=paises;
                              this.cargando=false;
      });

  

  }

  borrarPais(pais:Pais){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+pais.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._PaisService.borrarPaises(pais._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarPaises();


                    });
    } 
    });

    

  }

  addPais() {
    const pais = new Pais( this.forma.value.nombre);

    this._PaisService.crearPais(pais).subscribe(resp=> {
      this.cargarPaises();
      });
  }

  editarPais(pais: Pais) {
    swal.fire({
      title: 'Editar Pais',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE:</label>' +
      '<input type="text" id="paisNombre" value="'+pais.nombre+'" placeholder="'+pais.nombre+'" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        pais.nombre = (document.getElementById('paisNombre') as HTMLInputElement).value;

        this._PaisService.actualizarPais(pais).subscribe(resp => {
        console.log(resp);
        this.cargarPaises();
        });
      }
    });
  }


   // Paginado -----------------------

   cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._PaisService.totalPaises) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarPaises();
  }
  //----------------------------

}
