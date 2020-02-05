import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud.model';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
@Component({
  selector: 'app-bandeja-proyectos',
  templateUrl: './bandeja-proyectos.component.html',
  styleUrls: ['./bandeja-proyectos.component.css']
})
export class BandejaProyectosComponent implements OnInit {


  desde: number=0;
  solicitudes: Solicitud[]=[];
  cargando:boolean=true;
  constructor( public _SolicitudService: SolicitudService) { 



  }

  ngOnInit() {

    this.cargarSolicitudes();
  }


  cargarSolicitudes(){
    this.cargando=true;
this._SolicitudService.cargarSolicitud(this.desde)
            .subscribe( solicitudes => this.solicitudes=solicitudes );
            this.cargando=false;
  }

}
