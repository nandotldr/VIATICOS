import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly API_URL = `${environment.API}/department`;

  constructor(private http: HttpClient) {
  }

  getWorkPlans(code, year, semester, dependency) {
    let params = new HttpParams();
    params = params.append('year', year)
      .append('type', semester)
      .append('academy_ascription_dependency', dependency);
    return this.http.get(`${this.API_URL}/${code}/plans/users`, {
      params
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  getAcademies(code, year) {
    let params = new HttpParams();
    params = params.append('year', year);
    return this.http.get(`${this.API_URL}/${code}/academies`, {
      params
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }


  approvePlan(code, id) {
    return this.http.put(`${this.API_URL}/${code}/plans`, {
      id,
      status: 1
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  disapprovePlan(code, id) {
    return this.http.put(`${this.API_URL}/${code}/plans`, {
      id,
      status: 2
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }
}
