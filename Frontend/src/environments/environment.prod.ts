export const environment = {
  production: true,
  //API: 'http://148.202.152.94:9000',
  API: 'http://localhost:9000',

  usuario: {
    login: '/OAuth/login',
    validate: '/OAuth/validate',
    password_recovery: '/OAuth/password_recovery',
    url: '/usuario',
  },
  comision: {
    url: '/solicitud_comision',
    pendientes: '/revisar_solicitud_comision',
    terminar: '/terminar_comision'
  },
  programa_trabajo: {
    url: '/programa_trabajo'
  },
  solicitud_viatico: {
    url: '/solicitud_viatico',
    aceptar_solicitud_viatico: '/aceptar_solicitud_viatico',
    rechazar_solicitud_viatico: '/rechazar_solicitud_viatico',
    revisar_solicitud_viatico: '/rechazar_solicitud_viatico'
  },
  viatico_proyecto: {
    url: '/viatico_proyecto',
    aceptar_viaticoProyecto: '/aceptar_viaticoProyecto',
    rechazar_viaticoProyecto: '/rechazar_viaticoProyecto',
    asignar_recursos: '/asignar_recursos'
  },
  gasto: {
    url: '/gasto',
  },
  informe_actividades: {
    url: '/informe_actividades'
  },
  agenda: {
    url: '/agenda'
  },
  itinerario: {
    url: '/itinerario'
  },
  factura: {
    url: '/factura'
  },
  pais: {
    url: '/pais'
  },
  municipios: {
    url: '/municipios'
  }
};
