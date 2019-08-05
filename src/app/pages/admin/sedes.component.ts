import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { SedeService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-profesores',
  templateUrl: './sedes.component.html',
  styles: []
})
export class SedesComponent implements OnInit {
  desde: number=0;
  sedes: Sede[]=[];
  cargando:boolean=true;
  constructor(public _SedeService: SedeService) { }

  ngOnInit() {

    this.cargarSedes();
  }


  
  cambiarDesde(valor:number){


    let desde = this.desde+valor;
    


    if (desde>=this._SedeService.totalSedes) { // Total
      return;
    }
    if (desde<0) {
      return;
    }

    this.desde+=valor;
    this.cargarSedes();
  }


  cargarSedes(){
    this.cargando=true;
this._SedeService.cargarSedes(this.desde)
            .subscribe( sedes => this.sedes=sedes );
            this.cargando=false;
  }

  buscarSedes( termino:string){
    
    this.cargando=true;

    if(termino.length<=0){
        this.cargarSedes();
        return;
    }

    
    
      this._SedeService.buscarSedes(termino)
                            .subscribe((sedes:Sede[])=>{
                              this.sedes=sedes;
                              this.cargando=false;
      });

  

  }

  borrarSedes(sede:Sede){

   

    swal.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a "+sede.nombre,
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {
   

      this._SedeService.borrarSedes(sede._id)
                    .subscribe(resp=>{
                      
                      console.log(resp);
                      this.cargarSedes();


                    });
    } 
    });

    

  }

  agregarSede() {
    swal.fire({
      title: 'Crear Sede',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE:</label>' +
      '<input type="text" id="sedeNombre" placeholder="Ingrese el nombre" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CIUDAD:</label>' +
      '<input type="text" id="sedeCiudad" placeholder="Ingrese la ciudad" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">DIRECCIÓN:</label>' +
      '<input type="text" id="sedeDireccion" placeholder="Ingrese la dirección" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CORREO:</label>' +
      '<input type="email" id="sedeEmail" placeholder="Ingrese el correo" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'
    }).then(crear => {
      if (crear.value) {
        const nombre = (document.getElementById('sedeNombre') as HTMLInputElement).value;
        const ciudad = (document.getElementById('sedeCiudad') as HTMLInputElement).value;
        const direccion = (document.getElementById('sedeDireccion') as HTMLInputElement).value;
        const email = (document.getElementById('sedeEmail') as HTMLInputElement).value;
        const sede = new Sede(nombre, ciudad, direccion, email);

        this._SedeService.crearSede(sede).subscribe(resp => {
        console.log(resp);
        this.cargarSedes();
        });
      }
    });
  }

  editarSede(sede: Sede) {
    swal.fire({
      title: 'Editar Sede',
      showCancelButton: true,
      focusConfirm: false,
      html:
      '<div class="mt-3 form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">NOMBRE:</label>' +
      '<input type="text" id="sedeNombre" value="'+sede.nombre+'" placeholder="'+sede.nombre+'" class="uscoInputs form-control" maxlength="25" required autofocus>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CIUDAD:</label>' +
      '<input type="text" id="sedeCiudad" value="'+sede.ciudad+'" placeholder="'+sede.ciudad+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">DIRECCIÓN:</label>' +
      '<input type="text" id="sedeDireccion" value="'+sede.direccion+'" placeholder="'+sede.direccion+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>' +
      '<div class="form-group text-left">' +
      '<label for="correo" class="font-weight-bold text-uppercase">CORREO:</label>' +
      '<input type="email" id="sedeEmail" value="'+sede.email+'" placeholder="'+sede.email+'" class="uscoInputs form-control" maxlength="25" required>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        sede.nombre = (document.getElementById('sedeNombre') as HTMLInputElement).value;
        sede.ciudad = (document.getElementById('sedeCiudad') as HTMLInputElement).value;
        sede.direccion = (document.getElementById('sedeDireccion') as HTMLInputElement).value;
        sede.email = (document.getElementById('sedeEmail') as HTMLInputElement).value;

        this._SedeService.actualizarSede(sede).subscribe(resp => {
        console.log(resp);
        this.cargarSedes();
        });
      }
    });
  }

}
