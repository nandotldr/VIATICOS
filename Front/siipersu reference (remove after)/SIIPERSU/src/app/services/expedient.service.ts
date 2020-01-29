import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpedientService {
  private readonly API_URL = `${environment.API}/expedients`;
  private readonly TOKEN = 'token';

  constructor(private http: HttpClient) {
  }

  getExpedients(code) {
    return this.http.get(`${this.API_URL}/${code}`).pipe(
      map(resp => {
        return resp;
      })
    );
  }
}
