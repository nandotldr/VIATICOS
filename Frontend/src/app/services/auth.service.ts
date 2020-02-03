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

  async getAllComisiones() {
    return await this.http.get(`${this.API_URL}/solicitud_comision`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  async getUsuario(id_usuario: string) {
    return await this.http.get(`${this.API_URL}/usuario/?id=${id_usuario}`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }

  async createComision(comision: { 
    name: Number,
    programa: string,
    evento: string,
    objetivo_trabajo: string,
    tipo_comision: Number,
    destino_com: Number,
    fecha_inicio: string,
    fecha_fin: string,
    justificacion: string,
    invitacion_evento: any,
    programa_evento: any,
  }) {
    return await this.http.post(`${this.API_URL}/solicitud_comision`,{
      fecha_inicio: comision.fecha_inicio,
      fecha_fin: comision.fecha_fin,
      tipo_comision: comision.tipo_comision,
      id_destino: comision.destino_com,
      nombre_comision: comision.name,
      objetivo_trabajo: comision.fecha_fin,
      justificacion: comision.fecha_fin,
      status: 1
    }).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return {ok: response['ok'],mensaje: response['mensaje']};
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
        console.log(token);
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
        if (response['ok']) {
          this.codeUser = response['body']['code'];
          this.userType = response['body']['userType'];
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
}
