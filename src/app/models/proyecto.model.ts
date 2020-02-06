/*
* Proyecto: BPUS
* Componente: proyecto.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo del proyecto con los atributos
* Última modificación: 06/08/2019
*/

export class Proyecto {

    constructor(
        public rutaProyecto: string,
        public estado?: string,
        public motivoRechazo?:string,
        public _id?: string
    ) {
    }
}
