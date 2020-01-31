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

  async validateToken() {
    return await this.http.post(`${this.API_URL}/validate`, null).pipe(
      map(response => {
        if (response['ok']) {
          this.codeUser = response['data']['code'];
          this.userType = response['data']['userType'];
        }
        return response['ok'];
      })
    ).toPromise();
  }

  private saveCredentials(code: string, token: any) {
    localStorage.setItem(this.TOKEN, token);
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
