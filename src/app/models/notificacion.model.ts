/*
* Proyecto: BPUS
* Componente: notificacion.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo de la notificación con los atributos
* Última modificación: 06/08/2019
*/

export class Notificacion {

    constructor(
        public emisor: string,
        public receptor: string,
        public esEmisor: boolean,
        public tipoNotificacionEmisor: string,
        public tipoNotificacionReceptor: string,
        public _id?: string
    ) {
    }
}

/*
// 1
emisor: string,       ==            id
receptor: string,
tipo: bool,       true = emitida, false = recibida.
mensaje: string,
_id?: string

// 2
emisor: string,       ==            id
receptor: string,
tipo: bool,       true = emitida, false = recibida.
mensaje: string,
_id?: string



if id==emisor && tipo==true   // Emitida.

if id==receptor && tipo==false   // Recibida

*/