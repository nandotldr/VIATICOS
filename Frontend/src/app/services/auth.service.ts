import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
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
        codigo: number,
        nombres: string,
        apellidos: string,
        area_adscripcion: string,
        plaza_laboral: string,
        nss: string
      }
  ){
    return this.http.put(`${this.API_URL}/usuario`, {
      codigo: usuario.codigo,
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

  async getComision(id_comision: any){
    return await this.http.get(`${this.API_URL}/solicitud_comision/${id_comision}`).pipe(
      map(response => {
        if(response['ok']){
          console.log(response);
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  async createComision(comision: { 
    tipo_comision: Number,
    destino_com: Number,
    name: string,
    evento: string,
    objetivo_trabajo: string,
    justificacion: string,
    fecha_inicio: string,
    fecha_fin: string,
  }) {
    return await this.http.post(`${this.API_URL}/solicitud_comision`,{
      tipo_comision: comision.tipo_comision,
      destino_com: comision.destino_com,
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
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  async createPrograma(programa: { 
    dia: string,
    lugar_estancia: string,
    tareas_realizar: string,
    id_comision: Number
  }) {
    return await this.http.post(`${this.API_URL}/solicitud_comision`,{
      dia: programa.dia,
      lugar_estancia: programa.lugar_estancia,
      tareas_realizar: programa.tareas_realizar,
      id_comision: programa.id_comision
    }).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
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
          this.codeUser = response['body']['codigo'];
          this.userType = response['body']['tipo_usuario'];
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
    return this.http.post(`${this.API_URL}/restorePassword`, {
      code: data.code,
      rfc: data.rfc,
      imss: data.imss,
      birthday: data.birthday
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
    this.codeUser = '';
    this.userType = '';
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
}


