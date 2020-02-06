import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

import swal from 'sweetalert2';
import { SubirArchivoService, UsuarioService } from 'src/app/services/service.index';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['/../proyectosUsco.component.scss']
})
export class ProyectoComponent implements OnInit {
  today = new Date();
  jstoday = '';
  usuarioId:string;
  file:File;
  
  constructor( public _subirArchivosService: SubirArchivoService, public _usuarioService: UsuarioService) {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
    this.usuarioId= this._usuarioService.usuario._id;
  }

  ngOnInit() {
  }


  onFilesAdded(file:File) {


    if (!file) {
       return;
     }
  
     /*if (file.type.indexOf('pdf')<0) {
  
      swal.fire('Solo pdfs','El archivo seleccionado no es un pdf','error');
       return;
     }*/


     
    console.log(file);

    /*
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        // this content string could be used directly as an image source
        // or be uploaded to a webserver via HTTP request.
        console.log(content);

        
      };  
      // use this for basic text files like .txt or .csv
      //reader.readAsText(file);
      // use this for images
      reader.readAsText(file);*/

     this.file = file;

  
   
  }




  subirArchivo(){


    this._subirArchivosService.subirArcivo(this.file, 'Proyecto', this.usuarioId).then((resp: any)=>{

      swal.fire('Archivo subido con exito.', this.usuarioId, 'success');


    }).catch(resp =>{
        console.log(resp);
    });;





  }





    





  /*


  onFilesAdded(files: File[]) {
    console.log(files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        // this content string could be used directly as an image source
        // or be uploaded to a webserver via HTTP request.
        console.log(content);
      };
      // use this for basic text files like .txt or .csv
      reader.readAsText(file);
      // use this for images
      // reader.readAsDataURL(file);
    });
  }


  */



  onFilesRejected(files: File[]) {
    console.log(files);
  }

}
