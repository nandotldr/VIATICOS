export interface InformeModel {
    id_solicitud_comision?: number;
    resultados?: string;
    observaciones: number;
}

export interface AgendaModel {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    actividad: string;
    id: number;
}

export interface ItinerarioModel {
    dia: string;
    origen: string;
    destino: string;
    id_informe_actividades?: number;
}

export interface FacturaModel {
    archivo_url: string;
    id_informe_actividades?: number;
}
