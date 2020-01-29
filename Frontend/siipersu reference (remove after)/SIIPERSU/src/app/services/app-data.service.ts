import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.get<MenuItem[]>('assets/data/menu.json');
  }
}
