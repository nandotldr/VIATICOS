export const environment = {
  production: true,
  API:'http://localhost:9000',
  usuario: 
  {
    login: '/OAuth/login',
    validate: '/OAuth/validate',
    password_recovery: '/OAuth/password_recovery',
    url: '/usuario',
  },
  comision: 
  {
    url: '/solicitud_comision',
    pendientes: '/revisar_solicitud_comision',
    terminar: '/terminar_comision'
  },
  programa_trabajo: 
  {
    url: '/programa_trabajo'
  },
  solicitud_viatico: 
  {
    url: '/solicitud_viatico',
    revisar_sol: '/revisar_solicitud_comision',
    aceptar_sol: '/aceptar_solicitud_viatico',
    rechazar_sol: '/rechazar_solicitud_viatico'
  },
  viatico_proyecto: 
  {
    url: '/viatico_proyecto',
    aceptar_sol: '/aceptar_viaticoProyecto',
    rechazar_sol: '/rechazar_viaticoProyecto',
    asignar_recurso: '/asignar_recursos'
  },
  gastos: 
  {
    url: '/gasto',
  },
  informe_actividades:
  {
    url: '/informe_actividades'
  },
  agenda:
  {
    url:'/agenda'
  }

  




};