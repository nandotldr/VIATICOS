import { Injectable } from '@angular/core';
import {CreateUserModel} from '../interfaces/interfaces';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private readonly API_URL = `${environment.API}/administration`;
  constructor(private http: HttpClient) { }

  addUser(code, userData: CreateUserModel) {
    return this.http.post(`${this.API_URL}/${code}/user`, {
      code: userData.code,
      password: userData.password,
      gender: userData.gender,
      names: userData.names,
      last_name: userData.last_name,
      second_last_name: userData.second_last_name,
      ascription_dependency: userData.ascription_dependency,
    });
  }

  deleteUser(code: string, deleteCode: string) {
    return this.http.delete(`${this.API_URL}/${code}/user`, {
      // @ts-ignore
      'body': {
        'code': deleteCode
      }
    });
  }
}
