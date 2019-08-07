/*
* Proyecto: BPUS
* Componente: tipoNotificacion.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo del tipo de notificacion con los atributos
* Última modificación: 06/08/2019
*/

export class TipoNotificacion {

    constructor(
        public nombre: string,
        public mensaje: string,
        public _id?: string
    ) {
    }
}
