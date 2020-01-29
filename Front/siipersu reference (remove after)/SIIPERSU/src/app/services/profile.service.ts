import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PersonalDataModel} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API_URL = `${environment.API}/profile`;
  private readonly TOKEN = 'token';

  constructor(private http: HttpClient) {
  }

  getPersonalData(code: string) {
    return this.http.get(`${this.API_URL}/${code}`).pipe(
      map(resp => {
        return resp;
      })
    ).toPromise();
  }

  updatePersonalDataCP(code: string, data: FormData) {
    return this.http.put(`${this.API_URL}/${code}/update`, data);
  }

  updatePersonalData(code: string, data: PersonalDataModel) {
    return this.http.put(`${this.API_URL}/${code}`, {
      personal_email: data.personal_email,
      cellphone: data.cellphone,
      office_phone: data.office_phone,
      extension_office_phone: data.extension_office_phone,
      alias_degree: data.alias_degree
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  getLaboralData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/laboral`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  updateLaboralData(code: string, data: FormData) {
    return this.http.put(`${this.API_URL}/${code}/laboral`, data);
  }

  createContract(code: string, data: FormData) {
    return this.http.post(`${this.API_URL}/${code}/contract`, data);
  }

  updateContract(code: string, data: FormData) {
    return this.http.put(`${this.API_URL}/${code}/contract`, data);
  }

  deleteContract(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/contract`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  createAcademicData(code: string, data: any) {
    return this.http.post(`${this.API_URL}/${code}/academic`, data);
  }

  getAcademicData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/academic`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  updateAcademicData(code: string, data: any) {
    return this.http.put(`${this.API_URL}/${code}/academic`, data);
  }

  deleteAcademic(code: string, id: any) {
    return this.http.delete(`${this.API_URL}/${code}/academic`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  getSkills(code: string) {
    return this.http.get(`${this.API_URL}/${code}/skills`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  deleteLanguage(code: string, id: any) {
    return this.http.delete(`${this.API_URL}/${code}/skills/languages`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  deleteProgram(code: string, id: any) {
    return this.http.delete(`${this.API_URL}/${code}/skills/programs`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  addLanguage(code: string, data: any) {
    console.log('post', data);
    return this.http.post(`${this.API_URL}/${code}/skills/languages`, {
      language: data.language,
      spoken: data.spoken,
      comprehension: data.comprehension,
      reading: data.reading,
      written: data.written,
      personal_data_code: code
    });
  }

  addProgram(code: string, data: any) {
    return this.http.post(`${this.API_URL}/${code}/skills/programs`, {
      program: data.program,
      usage: data.usage,
      personal_data_code: code
    });
  }

  getExpedientData(code: string) {
    return this.http.get(`${environment.API}/expedients/${code}/perfil`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  updateExpedientData(code: string, data: FormData) {
    return this.http.put(`${environment.API}/expedients/${code}`, data);
  }
}
