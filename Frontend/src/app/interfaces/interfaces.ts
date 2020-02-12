export interface InformeModel {
    id_solicitud_comision?: string;
    resultados?: string;
    observaciones: number;
}

export interface AgendaModel {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    actividad: string;
}
