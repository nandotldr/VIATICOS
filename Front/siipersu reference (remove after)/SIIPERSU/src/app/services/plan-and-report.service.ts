import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanAndReportService {

  private readonly API_URL = `${environment.API}/plansReports`;

  constructor(private http: HttpClient) {
  }

  getUserInformation(code) {
    return this.http.get(`${this.API_URL}/${code}/info`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  getPlans(code) {
    return this.http.get(`${this.API_URL}/${code}/plans`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  addPlan(code, formData) {
    return this.http.post(`${this.API_URL}/${code}/plans`, {
      type: formData.type,
      program: formData.program,
      year: formData.year,
      subject: formData.subject,
      docent_formation: formData.docent_formation,
      support_activities: formData.support_activities,
      group_number: formData.group_number,
      line_number: formData.line_number,
      project_name: formData.project_name,
      actual_year_progress: formData.actual_year_progress,
      expected_year_progress: formData.expected_year_progress,
      activities_description: formData.activities_description,
      student_tutorship: formData.student_tutorship,
      student_help: formData.student_help,
      student_formation: formData.student_formation,
      participation: formData.participation,
      academic_management: formData.academic_management,
      collective_management: formData.collective_management,
      collective_knowledge: formData.collective_knowledge,
      personal_management: formData.personal_management,
      diffusion: formData.diffusion,
      post_formation: formData.post_formation,
      additional_comment: formData.additional_comment,
      teacher: formData.teacher,
      lgac: formData.lgac,
      helps: formData.helps,
      tutories: formData.tutories,
      management: formData.management,
      diffusion_hours: formData.diffusion_hours,
      formation: formData.formation
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  updatePlan(code, formData) {
    return this.http.put(`${this.API_URL}/${code}/plans`, {
      id: formData.id,
      type: formData.type,
      program: formData.program,
      year: formData.year,
      subject: formData.subject,
      docent_formation: formData.docent_formation,
      support_activities: formData.support_activities,
      group_number: formData.group_number,
      line_number: formData.line_number,
      project_name: formData.project_name,
      actual_year_progress: formData.actual_year_progress,
      expected_year_progress: formData.expected_year_progress,
      activities_description: formData.activities_description,
      student_tutorship: formData.student_tutorship,
      student_help: formData.student_help,
      student_formation: formData.student_formation,
      participation: formData.participation,
      academic_management: formData.academic_management,
      collective_management: formData.collective_management,
      collective_knowledge: formData.collective_knowledge,
      personal_management: formData.personal_management,
      diffusion: formData.diffusion,
      post_formation: formData.post_formation,
      additional_comment: formData.additional_comment,
      teacher: formData.teacher,
      lgac: formData.lgac,
      helps: formData.helps,
      tutories: formData.tutories,
      management: formData.management,
      diffusion_hours: formData.diffusion_hours,
      formation: formData.formation,
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  approvePlan(code, data, id) {
    return this.http.put(`${this.API_URL}/${code}/plans`, {
      id: id,
      status: 1,
      comment: data.comment,
      act_number: data.act_number,
      celebration_date: data.celebration_date,
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  disapprovePlan(code, data, id) {
    return this.http.put(`${this.API_URL}/${code}/plans`, {
      id: id,
      status: 2,
      comment: data.comment,
      act_number: data.act_number,
      celebration_date: data.celebration_date,
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }
}
