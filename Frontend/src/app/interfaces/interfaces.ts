export interface SolicitudViatico {
    invitado?: string;
    comentarios?: string;
    estado: number;
}

export interface AgendaModel {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    actividad: string;
}
