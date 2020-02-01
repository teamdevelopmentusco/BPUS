/*
* Proyecto: BPUS
* Componente: /models/solicitud.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo de la solicitud con los atributos
* Última modificación: 23/11/2019
*/

export class Solicitud {

    constructor(
        public fechaSolicitud: string,
        public tituloProyecto: string,
        public lineaInvestigacion: string,
        public pais: string,
        public departamento: string,
        public ciudad: string,
        public duracionProyectoMeses: string,
        public jefePrograma: string,
        public palabrasClaves: string,
        public resumenProyecto: string,
        public estudiante1: string,
        public estudiante2?: string,
        public estudiante3?: string,
        public EstudianteFirma2?: string,
        public EstudianteFirma3?: string,
        public fechaAprovacionSolicitud?: string,
        public solicitudRutaPDF?: string,
        public estadoSolicitud?: string,
        public anteproyecto?: string,
        public proyecto?: string,
        public articulo?: string,
        public _id?: string
    ) {
    }
}
