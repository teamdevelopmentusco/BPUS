import { Component, OnInit, Input  } from '@angular/core';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">Editar Usuarios</h4>
  <button type="button" class="close" aria-label="Close"  (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
</div>
<div class="modal-body">
  <form [formGroup]="forma" (ngSubmit)="editarUsuarios()">
      <div class="form-group">
          <label for="correo" class="font-weight-bold">CORREO:</label>
          <div class="input-group">
              <input formControlName="email" id="email" type="text" value="{{correo}}" placeholder="{{correo}}" class="uscoInputs form-control" maxlength="25" required autofocus>
          </div>
          <h6 *ngIf="email.invalid && (email.dirty || email.touched)" class="mt-2" style="color:red;">
              <div *ngIf="email.errors.required">
                  El correo es requerido.
              </div>
          </h6>
      </div>
      <div class="row">
          <div class="col-sm-5">
              <h6>TIPO DE USUARIO</h6>
              <select formControlName="tipoUsuario" name="tipoUsuario" class="custom-select uscoInputs mb-3">
                          <option selected value="Estudiante">Estudiante</option>
                          <option value="Docente">Docente</option>
                          <option value="JefePrograma">Jefe de Programa</option>
                      </select>
              <h6>TIPO DE IDENTIFICACION</h6>
              <select formControlName="tipoID" name="tipoID" class="custom-select uscoInputs mb-3">
                  <option selected value="C.C">C.C</option>
                  <option value="T.I">T.I</option>
              </select>
          </div>
          <div class="col-sm-7">
              <div *ngIf="tipoUsuario.value == 'Estudiante'" class="form-group">
                  <label for="code" class="font-weight-bold">CÓDIGO ESTUDIANTIL</label>
                  <input formControlName="codigoUniversitario" class="uscoInputs" type="text" value="{{code}}" placeholder="{{code}}" onkeypress='return (event.charCode >= 48 && event.charCode <= 57)' maxlength="11" required pattern="([0-9]){11}">
                  <h6 *ngIf="codigoUniversitario.invalid && (codigoUniversitario.dirty || codigoUniversitario.touched)" class="mt-2" style="color: red;">
                      <div *ngIf="codigoUniversitario.errors.required">
                          El código universitario es requerido.
                      </div>
                      <div *ngIf="codigoUniversitario.errors.pattern">
                          Deber ser de 11 carácteres solo numéricos.
                      </div>
                  </h6>
              </div>
              <div class="form-group">
                  <label for="id" class="font-weight-bold">NÚMERO DE DOCUMENTO</label>
                  <input formControlName="numDocumento" class="uscoInputs" type="text" value="{{idNumber}}" placeholder="{{idNumber}}" onkeypress='return (event.charCode >= 48 && event.charCode <= 57)' maxlength="10" required pattern="([0-9]){8,10}">
                  <h6 *ngIf="numDocumento.invalid && (numDocumento.dirty || numDocumento.touched)" class="mt-2" style="color:red;">
                      <div *ngIf="numDocumento.errors.required">
                          El número de documento es requerido.
                      </div>
                      <div *ngIf="numDocumento.errors.pattern">
                          El ID es entre 8-10 carácteres solo numéricos.
                      </div>
                  </h6>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-sm-6">
              <div class="form-group">
                  <label for="nombre" class="font-weight-bold">NOMBRES</label>
                  <input formControlName="nombres" type="text" class="uscoInputs" value="{{name}}" placeholder="{{name}}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32'
                      maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+){2,50}" required autofocus>
                  <h6 *ngIf="nombres.invalid && (nombres.dirty || nombres.touched)" class="mt-2" style="color:red;">
                      <div *ngIf="nombres.errors.required">
                          EL nombre es requerido.
                      </div>
                      <div *ngIf="nombres.errors.pattern">
                          El nombre no es valido.
                      </div>
                  </h6>
              </div>
              <h6>SEDE UNIVERSITARIA</h6>
              <select formControlName="sedeUniversitaria" name="sedeUniversitaria" class="custom-select uscoInputs mb-3">                   
                <div *ngIf="sede == 'Gárzon'">
                  <option selected value="Gárzon">Gárzon</option>
                  <option value="La plata">La plata</option>
                  <option value="Neiva">Neiva</option>
                  <option value="Pitalito">Pitalito</option>
                </div>
                <div *ngIf="sede == 'La plata'">
                  <option value="Gárzon">Gárzon</option>
                  <option selected value="">La plata</option>
                  <option value="Neiva">Neiva</option>
                  <option value="Pitalito">Pitalito</option>
                </div>   
                <div *ngIf="sede == 'Neiva'">
                  <option value="Gárzon">Gárzon</option>
                  <option value="La plata">La plata</option>
                  <option selected value="Neiva">Neiva</option>
                  <option value="Pitalito">Pitalito</option>
                </div>   
                <div *ngIf="sede == 'Pitalito'">
                  <option value="Gárzon">Gárzon</option>
                  <option value="La plata">La plata</option>
                  <option value="Neiva">Neiva</option>
                  <option selected value="Pitalito">Pitalito</option>
                </div>       
              </select>
              <h6>FACULTAD</h6>
              <select formControlName="facultad" name="cars" class="custom-select uscoInputs mb-3">
                <option selected value="Ingeniería">Ingeniería</option>          
              </select>
              <h6>PROGRAMA</h6>
              <select formControlName="programaUniversitario" name="cars" class="custom-select uscoInputs mb-3">
                <option selected value="Ingeniería de software">Ingeniería de software</option>
              </select>
          </div>
          <div class="col-sm-6">
              <div class="form-group">
                  <label for="code" class="font-weight-bold">APELLIDOS</label>
                  <input formControlName="apellidos" class="uscoInputs" type="text" value="{{lastname}}" placeholder="{{lastname}}" onkeypress='return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 192 && event.charCode <= 255) || event.charCode ==32'
                      maxlength="50" pattern="([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+){2,50}" required>
                  <h6 *ngIf="apellidos.invalid && (apellidos.dirty || apellidos.touched)" class="mt-2" style="color:red;">
                      <div *ngIf="apellidos.errors.required">
                          Los apellidos son requeridos.
                      </div>
                      <div *ngIf="apellidos.errors.pattern">
                          Los apellidos no son validos.
                      </div>
                  </h6>
              </div>
              <div class="form-group">
                  <label for="id" class="font-weight-bold">TELÉFONO</label>
                  <input formControlName="telefono" class="uscoInputs" type="text" value="{{cellphone}}" placeholder="{{cellphone}}" onkeypress='return (event.charCode >= 48 && event.charCode <= 57)' maxlength="10" required pattern="([0-9]){10}" required>
                  <h6 *ngIf="telefono.invalid && (telefono.dirty || telefono.touched)" class="mt-2" style="color:red;">
                      <div *ngIf="telefono.errors.required">
                          El teléfono es requerido.
                      </div>
                      <div *ngIf="telefono.errors.pattern">
                          El teléfono no es valido.
                      </div>
                  </h6>
              </div>
              <h6>GÉNERO:</h6>
              <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" id="generoRadioM" formControlName="genero" name="genero" value="Masculino">
                  <label class="custom-control-label" for="generoRadioM">Masculino</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" id="generoRadioF" formControlName="genero" name="genero" value="Femenino">
                  <label class="custom-control-label" for="generoRadioF">Femenino</label>
              </div>
          </div>
      </div>
      <div class="txtcenter">
          <a class="mr-5 uscolink" href="javascript: history.back()">VOLVER ATRÁS</a>
          <input type="submit" value="SIGUIENTE" [disabled]="!forma.valid" class="btn uscoButton">
      </div>
  </form>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Save</button>
</div>
  `
})
export class NgbdModalContent {
  @Input() correo;
  @Input() userType;
  @Input() idType;
  @Input() idNumber;
  @Input() code;
  @Input() name;
  @Input() lastname;
  @Input() cellphone;
  @Input() sede;
  @Input() faculty;
  @Input() program;
  @Input() gender;

  forma: any;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
      this.forma = this.formBuilder.group({
        email: [
          '',
          [Validators.required]
        ],
        tipoUsuario: [
          'Estudiante',
          [Validators.required]
        ],
        tipoID: [
          'C.C',
          [Validators.required]
        ],
        numDocumento: [
          '',
          [Validators.required, Validators.pattern("([0-9]){8,10}")]
        ],
        codigoUniversitario: [
          '',
          [Validators.required, Validators.pattern("([0-9]){11}")]
        ],
        nombres: [
          '',
          [Validators.required]
        ],
        apellidos: [
          '',
          [Validators.required]
        ],
        telefono: [
          '',
          [Validators.required, Validators.pattern("([0-9]){10}")]
        ],
        sedeUniversitaria: [
          'Neiva',
          Validators.required,
        ],
        facultad: [
          'Ingeniería',
          Validators.required,
        ],
        programaUniversitario: [
          'Ingenieria de software',
          Validators.required,
        ],
        genero: [
          'Femenino',
          Validators.required
        ]
      });
  }
  get email() {
    return this.forma.get('email');
  }

  get tipoUsuario() {
    return this.forma.get('tipoUsuario');
  }

  get tipoID() {
    return this.forma.get('tipoID');
  }

  get numDocumento() {
    return this.forma.get('numDocumento');
  }

  get codigoUniversitario() {
    return this.forma.get('codigoUniversitario');
  }

  get nombres() {
    return this.forma.get('nombres');
  }

  get apellidos() {
    return this.forma.get('apellidos');
  }

  get telefono() {
    return this.forma.get('telefono');
  }

  get sedeUniversitaria() {
    return this.forma.get('sedeUniversitaria');
  }

  get facultad() {
    return this.forma.get('facultad');
  }

  get programaUniversitario() {
    return this.forma.get('programaUniversitario');
  }

  get genero() {
    return this.forma.get('genero');
  }

}

@Component({
  selector: 'app-tabla-todos',
  templateUrl: './tabla-todos.component.html',
  styles: []
})
export class TablaTodosComponent implements OnInit {
  desde: number=0;
  usuarios: Usuario[]=[];
  cargando:boolean=true;
  forma: any;
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,public _usuarioService: UsuarioService ) {
    this.forma = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern('[^@]([A-Za-z0-9._]+){1,25}')]
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}')]
      ],
      tipoUsuario: [
        'Estudiante',
        [Validators.required]
      ],
      tipoID: [
        'C.C',
        [Validators.required]
      ],
      numDocumento: [
        '',
        [Validators.required, Validators.pattern("([0-9]){8,10}")]
      ],
      codigoUniversitario: [
        '',
        [Validators.required, Validators.pattern("([0-9]){11}")]
      ],
      nombres: [
        '',
        [Validators.required]
      ],
      apellidos: [
        '',
        [Validators.required]
      ],
      telefono: [
        '',
        [Validators.required, Validators.pattern("([0-9]){10}")]
      ],
      sedeUniversitaria: [
        'Neiva',
        Validators.required,
      ],
      facultad: [
        'Ingeniería',
        Validators.required,
      ],
      programaUniversitario: [
        'Ingeniería de software',
        Validators.required,
      ],
      genero: [
        'Femenino',
        Validators.required
      ]
    });
    console.log(this.forma);
  }

  open(content) {
    this.modalService.open(content);
  }

  openEditUser(usuario: Usuario) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.correo = usuario.email;
    modalRef.componentInstance.userType = usuario.tipoUsuario;
    modalRef.componentInstance.code = usuario.codigoUniversitario;
    modalRef.componentInstance.idType = usuario.tipoID;
    modalRef.componentInstance.idNumber = usuario.numDocumento;
    modalRef.componentInstance.name = usuario.nombres;
    modalRef.componentInstance.lastname = usuario.apellidos;
    modalRef.componentInstance.cellphone = usuario.telefono;
    modalRef.componentInstance.sede = usuario.sedeUniversitaria;
    modalRef.componentInstance.faculty = usuario.facultad;
    modalRef.componentInstance.program = usuario.programaUniversitario;
    modalRef.componentInstance.gender = usuario.genero;
  }

  get email() {
    return this.forma.get('email');
  }

  get password() {
    return this.forma.get('password');
  }

  get tipoUsuario() {
    return this.forma.get('tipoUsuario');
  }

  get tipoID() {
    return this.forma.get('tipoID');
  }

  get numDocumento() {
    return this.forma.get('numDocumento');
  }

  get codigoUniversitario() {
    return this.forma.get('codigoUniversitario');
  }

  get nombres() {
    return this.forma.get('nombres');
  }

  get apellidos() {
    return this.forma.get('apellidos');
  }

  get telefono() {
    return this.forma.get('telefono');
  }

  get sedeUniversitaria() {
    return this.forma.get('sedeUniversitaria');
  }

  get facultad() {
    return this.forma.get('facultad');
  }

  get programaUniversitario() {
    return this.forma.get('programaUniversitario');
  }

  get genero() {
    return this.forma.get('genero');
  }

  somethingChanged() {
    if (this.password.invalid && (this.password.dirty || this.password.touched)) {
      const patternWrong = document.getElementById('patternWrong');
      const patternOkay = document.getElementById('patternOkay');
      if (this.password.errors.pattern && !this.password.errors.required) {
        patternWrong.setAttribute('class', '');
        patternOkay.setAttribute('class', 'd-none');
      } else if (this.password.errors.required) {
        patternOkay.setAttribute('class', '');
      }
    }
  }

  showpassword(inputId: string, iconId: string) {
    const passwordd = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (passwordd.getAttribute('type') === 'password') {
      passwordd.setAttribute('type', 'text');
      icon.setAttribute('class', 'far fa-eye');
    } else {
      passwordd.setAttribute('type', 'password');
      icon.setAttribute('class', 'far fa-eye-slash');
    }
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

    const usuario = new Usuario( this.forma.value.nombres,
      this.forma.value.apellidos,
      this.forma.value.password,
      this.forma.value.email+'@usco.edu.co',
      this.forma.value.telefono,
      this.forma.value.tipoUsuario,
      this.forma.value.tipoID,
      this.forma.value.numDocumento,
      this.forma.value.genero,
      this.forma.value.codigoUniversitario,
      this.forma.value.sedeUniversitaria,
      this.forma.value.facultad,
      this.forma.value.programaUniversitario);

    this._usuarioService.crearUsuario(usuario).subscribe(resp=> {
      this.cargarUsuarios();
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
      '<option value="Jefe de programa">Jefe de programa</option>' +
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
      '<label for="rol" class="font-weight-bold">Género</label>' +
      '<select id="genero" name="genero" class="custom-select uscoInputs mb-3">' +
      '<option selected value="Masculino">Masculino</option>' +
      '<option value="Femenino">Femenino</option>' +
      '</select>' +
      '</div>' +
      '</div>'
    }).then(editar => {
      if (editar.value) {
        usuario.email = (document.getElementById('email') as HTMLInputElement).value;
        usuario.tipoID = (document.getElementById('tipoID') as HTMLInputElement).value;
        usuario.numDocumento = (document.getElementById('numId') as HTMLInputElement).value;
        usuario.genero = (document.getElementById('genero') as HTMLInputElement).value;
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
