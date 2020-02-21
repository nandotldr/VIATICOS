import { AgendaModel, InformeModel, ItinerarioModel, FacturaModel } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.API}`;
  private readonly TOKEN = 'token';
  public codeUser: string;
  public userType: string;

  constructor(private http: HttpClient, private nav: NavController) {
  }

  async isLoggedIn() {
    // logica para obtener el token en el localStorage, si existe y no esta expirado entonces proceder
    try {
      const resp = await this.validateToken();
      console.log('esta logeado?', resp);
      return resp;
    } catch (err) {
      console.log('error', err);
      return false;
    }
  }

  async login(user: { code: string, password: string }) {
    return await this.http.post(`${this.API_URL}/login`, {
      codigo: +user.code,
      nip: user.password
    }).pipe(
      tap(token => {
        console.log(token);
        if (token['ok']) {
          this.saveCredentials(user.code, token['token']);
        }
      }),
      map(response => {
        return response['ok'];
      })
    ).toPromise();
  }

  // historial viaticos
  getHistorialViaticos() {
    return this.http.get(`${this.API_URL}/solicitud_viatico`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getSolicitudViatico(idViatico) {
    return this.http.get(`${this.API_URL}/solicitud_viatico/${idViatico}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getInforme(informe: InformeModel) {
    return this.http.get(`${this.API_URL}/informe_actividades/${informe.id_solicitud_comision}`, {
    }).pipe(
      map(response => response)
    );
  }

  modificarInforme(informe) {
    console.log('informe', informe);
    return this.http.put(`${this.API_URL}/informe_actividades`, {
      id_informe: informe.id_informe,
      resultados: informe.resultados,
      observaciones: informe.observaciones,
      // status: 1
    }).pipe(
      map(response => response)
    );
  }

  crearInforme(informe: InformeModel) {
    return this.http.post(`${this.API_URL}/informe_actividades`, {
      resultados: informe.resultados,
      observaciones: informe.observaciones,
      id_solicitud_comision: informe.id_solicitud_comision,
      status: 0
    }).pipe(
      map(response => response)
    );
  }

  crearItinerario(itinerario: ItinerarioModel) {
    return this.http.post(`${this.API_URL}/itinerario`, {
      dia: itinerario.dia,
      origen: itinerario.origen,
      destino: itinerario.destino,
      id_informe_actividades: itinerario.id_informe_actividades
    }).pipe(
      map(response => response)
    );
  }

  createAgenda(agenda: AgendaModel) {
    return this.http.post(`${this.API_URL}/agenda`, {
      dia: agenda.dia,
      hora_inicio: agenda.hora_inicio,
      hora_fin: agenda.hora_fin,
      actividad: agenda.actividad,
      id_informe_actividades: agenda.id
    }).pipe(
      map(response => response)
    );
  }

  createFactura(factura: FacturaModel) {
    return this.http.post(`${this.API_URL}/factura`, {
      archivo_url: factura.archivo_url,
      id_informe_actividades: factura.id_informe_actividades
    }).pipe(
      map(response => response)
    );
  }
  // termina historial viaticos

   getAllComisiones() {
    return this.http.get(`${this.API_URL}/solicitud_comision`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  getUsuario(id_usuario: string) {
    return this.http.get(`${this.API_URL}/usuario/?id=${id_usuario}`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  modifyUsuario(
      usuario: {
        nombres: string,
        apellidos: string,
        area_adscripcion: string,
        plaza_laboral: string,
        nss: string
      }
  ){
    return this.http.put(`${this.API_URL}/usuario`, {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      area_adscripcion: usuario.area_adscripcion,
      plaza_laboral: usuario.plaza_laboral,
      numero_social: usuario.nss
    }).pipe(
        tap(resp => {
          console.log(resp);
          if (resp['ok']) {
            return resp['body'];
          }
        }),
        map(response => {
          return response['ok'];
        })
    ).toPromise();
  }

  getComision(id_comision: any){
    return this.http.get(`${this.API_URL}/solicitud_comision/${id_comision}`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  getRevisarComision(){
    return this.http.get(`${this.API_URL}/revisar_solicitud_comision`).pipe(
        map(response => {
          if(response['ok']){
            console.log(response);
            return response['body'];
          } else {
            return response['ok'];
          }
        })
    ).toPromise();
  }

  getProgramaComision(id_comision: any){
    return this.http.get(`${this.API_URL}/programa_trabajo/${id_comision}`).pipe(
        map(response => {
          if(response['ok']){
            console.log(response);
            return response['body'];
          } else {
            return response['ok'];
          }
        })
    ).toPromise();
  }
  
  async createComision(comision: {
    tipo_comision: Number,
    destino_com: Number,
    area_adscripcion: string,
    name: string,
    evento: string,
    objetivo_trabajo: string,
    justificacion: string,
    fecha_inicio: string,
    fecha_fin: string,
  }) {
    return await this.http.post(`${this.API_URL}/solicitud_comision`,{
      tipo_comision: comision.tipo_comision,
      id_destino: comision.destino_com,
      nombre_comision: comision.name,
      evento: comision.evento,
      objetivo_trabajo: comision.objetivo_trabajo,
      justificacion: comision.justificacion,
      fecha_inicio: comision.fecha_fin.split('T')[0],
      fecha_fin: comision.fecha_fin.split('T')[0],
      status: 0
    }).pipe(
      map(response => {
        if(response['ok']){
          return response;
        }else{
          return response;
        }
      })
    ).toPromise();
  }

  createPrograma(programa: { 
    dia: string,
    lugar_estancia: string,
    tareas_realizar: string,
    id_comision: Number
  }) {
    return  this.http.post(`${this.API_URL}/programa_trabajo`,{
      dia: formatDate(programa.dia, 'yyyy-MM-dd', 'en'),
      lugar_estancia: programa.lugar_estancia,
      tareas_realizar: programa.tareas_realizar,
      id_solicitud_comision: programa.id_comision
    }).pipe( 
      map(response => {
        console.log(response);
        if(response['ok']){
          return response;
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  async createUser(user: { programa_evento
    code: Number,
    name: string,
    lastname: string,
    nip: string,
    area_adscripcion: string,
    plaza_laboral: string,
    numero_social:  Number,
    date: string
  }) {
    return await this.http.post(`${this.API_URL}/usuario`, {
      codigo: user.code,
      nombres: user.name,
      apellidos: user.lastname,
      tipo_usuario: "P",
      nip: user.nip,
      area_adscripcion: user.area_adscripcion,
      plaza_laboral: user.plaza_laboral,
      fecha_creacion: user.date,
      numero_social: user.numero_social
    }).pipe(
      tap(token => {
        if (token['ok']) {
          this.saveCredentials(user.code.toString(), token['token']);
        }
      }),
      map(response => {
        return response['ok'];
      })
    ).toPromise();

  }

  async validateToken() {
    return await this.http.post(`${this.API_URL}/validate`, null).pipe(
      map(response => {
        console.log('Validar token:', response);
        if (response['ok']) {
          this.codeUser = response['body'][0]['codigo'];
          this.userType = response['body'][0]['tipo_usuario'];
        }
        return response['ok'];
      })
    ).toPromise();
  }

  private saveCredentials(code: string, token: any) {
    localStorage.setItem(this.TOKEN, token);
    localStorage.setItem('id_usuario', code);
  }

  restorePassword(data) {
    return this.http.put(`${this.API_URL}/password_recovery`, {
      codigo: data.code,
      nombres: data.name,
      apellidos: data.lastname,
      numero_social: data.imss,
      nueva_contrasena: data.newpassword
    }).pipe(
      map(response => {
        return response;
      })
    );
  }

  changePassword(value) {
    return this.http.post(`${this.API_URL}/changePassword`, {
      password: value.password,
      changeToken: value.token
    }).pipe(
      map(response => {
        return response;
      })
    );
  }

  logout() {
    console.log('Cerrar Sesión');
    this.codeUser = null;
    this.userType = null;
    localStorage.clear();
    window.location.reload();
    this.nav.navigateRoot('/login', { animated: true });
  }

  saveViatico(viatico: { 
    id_comision: Number,
    invitado_nombre: string,
    comentarios: string,
    status: Number
  }) {
    console.log(viatico);
    return this.http.post(`${this.API_URL}/solicitud_viatico`,{
      id: +viatico.id_comision,
      invitado: viatico.invitado_nombre,
      comentarios: viatico.comentarios,
      estado: 0
    })/*.pipe(
      map(response => {
        console.log('respuesta',response);
        if(response['ok']){
          return response['body'];
        }else{
          return {ok: response['ok'], mensaje: response['mensaje']};
        }
      })*/
    ;
  }


  sendViatico(
    id_comision: Number,
    invitado_nombre: string,
    _comentarios: string,
    status: Number
  ) {
    return this.http.put(`${this.API_URL}/solicitud_viatico`,{
      id_viatico: +id_comision,
      invitado: invitado_nombre,
      comentarios: _comentarios,
      status: 1
    });
  }

  createGasto(gasto: { 
    id_solicitud_viatico: Number,
    dia: string,
    alimentacion: Number,
    hospedaje: Number,
    transporteLocal: Number,
    transporteForaneo: Number,
    combustible: Number,
    otros: Number
  }) {
    return this.http.post(`${this.API_URL}/gasto`,{
      id_solicitud_viatico: gasto.id_solicitud_viatico,
      dia: gasto.dia,
      alimentacion: gasto.alimentacion,
      hospedaje: gasto.hospedaje,
      transportelocal: gasto.transporteLocal,
      transporteforaneo: gasto.transporteForaneo,
      combustible: gasto.combustible,
      otros: gasto.otros
    })/*.pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return {ok: response['ok'],mensaje: response['mensaje']};
        }
      })
    ).toPromise()*/;
  }

  getGasto(idViatico: any){
    return this.http.get(`${this.API_URL}/gasto/${idViatico}`).pipe(
      map(response => {
        return response;
      }));
  }

  modifyComision(
      comision: {
        folio: Number,
        area_adscripcion: String,
        tipo_comision: Number,
        nombre_comision: String,
        destino: String,
        fecha_solicitud: String,
        fecha_inicio: string,
        fecha_fin: string,
        status: Number,
        justificacion: String,
        objetivo_trabajo: String,
        programa_evento: String,
        invitacion_evento: String,
        fecha_revisado: String,
        fecha_aceptado: String,
        nombre_revisado: String,
        nombre_aceptado: String,
        programa_trabajo?: 
        {
          dia: string,
          lugar_estancia: string,
          tareas_realizar: string,
          id: Number,
          id_solicitud_comision: Number
        }
      }
  ){
    return this.http.put(`${this.API_URL}/solicitud_comision`, {
      id: comision.folio, 
      fecha_inicio: formatDate(comision.fecha_inicio, 'yyyy-MM-dd', 'en'),
      fecha_fin: formatDate(comision.fecha_fin, 'yyyy-MM-dd', 'en'),
      tipo_comision: comision.tipo_comision,
      nombre_comision:  comision.nombre_comision,
      objetivo_trabajo: comision.objetivo_trabajo,
      justificacion: comision.justificacion,
      status: comision.status
    }).pipe(
        tap(resp => {
          if (resp['ok']) {
            return resp['mensaje'];
          }
        }),
        map(response => {
          return response['mensaje'];
        })
    ).toPromise();
  }

  modifyPrograma(
    programa: { 
      dia: string,
      lugar_estancia: string,
      tareas_realizar: string,
      id_solicitud_comision: Number,
      id_programa: Number
    }
){
  return this.http.put(`${this.API_URL}/programa_trabajo`, {
    dia: formatDate(programa.dia, 'yyyy-MM-dd', 'en'),
    lugar_estancia: programa.lugar_estancia,
    tareas_realizar: programa.tareas_realizar,
    id_solicitud_comision: programa.id_solicitud_comision,
    id_programa: programa.id_programa
  }).pipe(
      tap(resp => {
        console.log(resp);
        if (resp['ok']) {
          return resp['mensaje'];
        }
      }),
      map(response => {
        return response['mensaje'];
      })
  ).toPromise();
}

deletePrograma(
  programa: { 
    dia: string,
    lugar_estancia: string,
    tareas_realizar: string,
    id_programa: Number,
    id_solicitud_comision: Number
  }
){
return this.http.request('delete',`${this.API_URL}/programa_trabajo/`,{body: programa }).pipe(
    tap(resp => {
      console.log(resp);
      if (resp['ok']) {
        return resp['mensaje'];
      }
    }),
    map(response => {
      return response['mensaje'];
    })
).toPromise();
}

  getDestinos(tipo_comision: Number, id: Number) {
    return this.http.post(`${this.API_URL}/ver_destino`,{
      tipo_comision: tipo_comision,
      id: id
    }).pipe(
        map(response => {
          if(response['ok']){
            return response;
          } else {
            return response;
          }
        })
    ).toPromise();
  }

  revisarSolicitud(
      comision: {
          id: Number,
          status: Number,
          comentario_rechazo: string
      }
      ){
      return this.http.put(`${this.API_URL}/revisar_solicitud_comision`,{
          id_comision: comision.id,
          status: comision.status,
          comentario_rechazo: comision.comentario_rechazo
      }).pipe(
          map(response => {
              console.log(response);
              if(response['ok']){
                  return response['body'];
              } else {
                  return response['ok'];
              }
          })
      ).toPromise();
  }

  saveViaticoProyecto(viatico_proyecto: { 
    numero_proyecto: Number,
    cantidad: Number,
    id_solicitud_viatico: Number,
    status: Number,
  }) {
    return this.http.post(`${this.API_URL}/viatico_proyecto`,{ 
      numero_proyecto: viatico_proyecto.numero_proyecto,
      cantidad: viatico_proyecto.cantidad,
      id_solicitud_viatico: viatico_proyecto.id_solicitud_viatico,
      status: 0
    });
  }

  createViaticoProyecto(
    id_solicitud_viatico: Number,
    numero_proyecto: Number,
    cantidad: Number,
    status: Number,
  ) {
    return this.http.put(`${this.API_URL}/viatico_proyecto`,{ 
      numero_proyecto: numero_proyecto,
      cantidad: cantidad,
      id_solicitud_viatico: id_solicitud_viatico,
      status: status
    });
  }

  getViaticoProyecto(idViatico: any){
    return this.http.get(`${this.API_URL}/viatico_proyecto/${idViatico}`).pipe(
      map(response => {
        return response;
      }));
  }

  getRevisarInforme(){
      return this.http.get(`${this.API_URL}/revisar_informe`).pipe(
          map(response => {
              if(response['ok']){
                  console.log(response);
                  return response['body'];
              } else {
                  return response['ok'];
              }
          })
      ).toPromise();
  }

    revisarInforme(
        informe: {
            id: Number,
            status: Number,
            comentario_rechazo: string
        }
    ){
        return this.http.put(`${this.API_URL}/revisar_informe`,{
            id: informe.id,
            status: informe.status,
            comentario_rechazo: informe.comentario_rechazo
        }).pipe(
            map(response => {
                console.log(response);
                if(response['ok']){
                    return response['body'];
                } else {
                    return response['ok'];
                }
            })
        ).toPromise();
    }
}


