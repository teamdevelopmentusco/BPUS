/*
* Proyecto: BPUS
* Componente: /models/solicitud.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo de la solicitud con los atributos
* Última modificación: 23/11/2019
*/

export class Solicitud {

    constructor(
        public solicitanteId: string,
        public fechaSolicitud: string,
        public tituloProyecto: string,
        public lineaInvestigacion: string,
        public codigoEstudiante1: string,
        public fechaAprovacionSolicitud?: string,
        public codigoEstudiante2?: string,
        public codigoEstudiante3?: string,
        public nombreEstudiante1?: string,
        public nombreEstudiante2?: string,
        public nombreEstudiante3?: string,
        public firmaEstudiante2?: string,
        public firmaEstudiante3?: string,
        public pais?: string,
        public departamento?: string,
        public ciudad?: string,
        public duracionProyectoMeses?: string,
        public jefePrograma?: string,
        public palabrasClaves?: string,
        public resumenProyecto?: string,
        public rutaPdf?: string,
        public estadoSolicitud?: string,
        public anteproyecto?: string,
        public proyecto?: string,
        public articulo?: string,
        public _id?: string
    ) {
    }
}
