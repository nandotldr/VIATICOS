import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardItem} from '../interfaces/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API_URL = `${environment.API}/news`;

  // private readonly API_URL = '/assets/data/dashboard.json';

  constructor(private http: HttpClient) {
  }

  getDashboard() {
    return this.http.get<DashboardItem[]>(this.API_URL).pipe(
      map(resp => {
        return resp['data']['news'];
      })
    );
  }

  deleteNew(id) {
    return this.http.delete(`${this.API_URL}`, {
    // @ts-ignore
     'body': {
        'id': id['id']
      }
    });
  }

  updateNew(data: DashboardItem) {
    let fData = new FormData;
    fData.append('id', data.id);
    fData.append('title', data.title);
    fData.append('description', data.description);
    fData.append('file', data.file_url);

    return this.http.put(this.API_URL, fData);
  }

  addNew(data: DashboardItem) {
    let fData = new FormData;
    fData.append('title', data.title);
    fData.append('description', data.description);
    fData.append('file', data.file_url);
    console.log(data);
    

    return this.http.post(this.API_URL, fData);
  }
}
