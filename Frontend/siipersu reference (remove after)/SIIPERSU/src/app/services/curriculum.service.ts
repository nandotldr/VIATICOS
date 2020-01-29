import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {
  ProfessionalExperiencesModel,
  AcademicSubjectsModel,
  JobPositionModel,
  ProductsModel, FileModel, ProfessionalAssociationsModel, AwardModel, AchievementModel
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private readonly API_URL = `${environment.API}/curriculum`;
  private readonly TOKEN = 'token';

  constructor(private http: HttpClient) {
  }

  getJobPositions(code: string) {
    return this.http.get(`${this.API_URL}/${code}/positions`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  deleteJob(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/positions`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  addJob(code: string, formData: JobPositionModel) {
    return this.http.post(`${this.API_URL}/${code}/positions`, {
      position: formData.position,
      institution: formData.institution,
      period: formData.period,
      personal_code: code
    });
  }

  updateJob(code: string, formData: JobPositionModel) {
    return this.http.put(`${this.API_URL}/${code}/positions`, {
      id: formData.id,
      position: formData.position,
      institution: formData.institution,
      period: formData.period,
      personal_code: code
    });
  }

  getSubjectsData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/subjects`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addSubject(code: string, formData: AcademicSubjectsModel) {
    return this.http.post(`${this.API_URL}/${code}/subjects`, {
      subject: formData.subject,
      number_sections: formData.number_sections,
      period: formData.period,
      personal_code: code
    });
  }

  updateSubject(code: string, formData: AcademicSubjectsModel) {
    console.log('code', code, 'data', formData);
    return this.http.put(`${this.API_URL}/${code}/subjects`, {
      id: formData.id,
      subject: formData.subject,
      number_sections: formData.number_sections,
      period: formData.period,
      personal_code: code
    });
  }

  deleteSubject(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/subjects`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  getExperiencesData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/experiences`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addExperience(code: string, formData: ProfessionalExperiencesModel) {
    return this.http.post(`${this.API_URL}/${code}/experiences`, {
      position: formData.position,
      company: formData.company,
      period: formData.period,
      personal_code: code
    });
  }

  updateExperience(code: string, formData: ProfessionalExperiencesModel) {
    console.log('code', code, 'data', formData);
    return this.http.put(`${this.API_URL}/${code}/experiences`, {
      id: formData.id,
      position: formData.position,
      company: formData.company,
      period: formData.period,
      personal_code: code
    });
  }

  deleteExperience(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/experiences`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  getProductsData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/products`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addProduct(code: string, formData: ProductsModel) {
    return this.http.post(`${this.API_URL}/${code}/products`, {
      books: formData.books,
      class_notes: formData.class_notes,
      didactic_material: formData.didactic_material,
      practice_manual: formData.practice_manual,
      articles: formData.articles,
      congress_memories: formData.congress_memories,
      patents: formData.patents,
      outreach_articles: formData.outreach_articles,
      forum_participations: formData.forum_participations,
      industry_services: formData.industry_services,
      industry_agreements: formData.industry_agreements,
      personal_code: code
    });
  }

  updateProduct(code: string, formData: ProductsModel) {
    return this.http.put(`${this.API_URL}/${code}/products`, {
      id: formData.id,
      books: formData.books,
      class_notes: formData.class_notes,
      didactic_material: formData.didactic_material,
      practice_manual: formData.practice_manual,
      articles: formData.articles,
      congress_memories: formData.congress_memories,
      patents: formData.patents,
      outreach_articles: formData.outreach_articles,
      forum_participations: formData.forum_participations,
      industry_services: formData.industry_services,
      industry_agreements: formData.industry_agreements,
      personal_code: code
    });
  }

  deleteProduct(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/products`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  getFilesData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/files`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addFile(code: string, formData: FileModel) {
    return this.http.post(`${this.API_URL}/${code}/files`, {
      record: formData.record,
      personal_code: code,
    });
  }

  updateFile(code: string, formData: FileModel) {
    console.log('code', code, 'data', formData);
    return this.http.put(`${this.API_URL}/${code}/files`, {
      id: formData.id,
      record: formData.record,
      personal_code: code,
    });
  }

  deleteFile(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/files`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  getAssociationsData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/associations`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addAssociation(code: string, formData: ProfessionalAssociationsModel) {
    return this.http.post(`${this.API_URL}/${code}/associations`, {
      association_name: formData.association_name,
      membership_type: formData.membership_type,
      period: formData.period,
      personal_code: code
    });
  }

  updateAssociation(code: string, formData: ProfessionalAssociationsModel) {
    console.log('code', code, 'data', formData);
    return this.http.put(`${this.API_URL}/${code}/associations`, {
      id: formData.id,
      association_name: formData.association_name,
      membership_type: formData.membership_type,
      period: formData.period,
      personal_code: code
    });
  }

  deleteAssociation(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/associations`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }


  getAwardsData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/awards`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addAward(code: string, formData: AwardModel) {
    return this.http.post(`${this.API_URL}/${code}/awards`, {
      award: formData.award,
      personal_code: code,
    });
  }

  updateAward(code: string, formData: AwardModel) {
    console.log('code', code, 'data', formData);
    return this.http.put(`${this.API_URL}/${code}/awards`, {
      id: formData.id,
      award: formData.award,
      personal_code: code,
    });
  }

  deleteAward(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/awards`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }

  getAchievementsData(code: string) {
    return this.http.get(`${this.API_URL}/${code}/achievements`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addAchievement(code: string, formData: AchievementModel) {
    return this.http.post(`${this.API_URL}/${code}/achievements`, {
      achievement: formData.achievement,
      personal_code: code,
    });
  }

  updateAchievement(code: string, formData: AchievementModel) {
    console.log('code', code, 'data', formData);
    return this.http.put(`${this.API_URL}/${code}/achievements`, {
      id: formData.id,
      achievement: formData.achievement,
      personal_code: code,
    });
  }

  deleteAchievement(code, id) {
    return this.http.delete(`${this.API_URL}/${code}/achievements`, {
      // @ts-ignore
      'body': {
        'id': id
      }
    });
  }
}
