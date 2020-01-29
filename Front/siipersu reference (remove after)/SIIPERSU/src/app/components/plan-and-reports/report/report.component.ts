import {Component, Input, OnChanges} from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {PlanAndReportService} from '../../../services/plan-and-report.service';
import {PlanModel, UserPlanReportModel} from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnChanges {

  @Input() year;
  @Input() semester;
  userInfoForm: UserPlanReportModel = {
    names: '',
    last_name: '',
    second_last_name: '',
    code: '',
    academy_ascription_dependency: '',
  };
  plansForm: FormGroup;
  STATUS = ['Por revisar', 'Aceptado', 'Rechazado'];

  constructor(private auth: AuthServiceService,
              private reportsService: PlanAndReportService,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
  ) {
  }

  ngOnChanges() {
    this.plansForm = this.getPlansTemplate();
    this.getUserData();
    this.getFormData();
  }

  /**
   * Obtiene los datos de la api (user)
   */
  async getUserData() {
    try {
      const resp = await this.reportsService.getUserInformation(this.auth.codeUser).toPromise();
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.userInfoForm = resp.data[0] as UserPlanReportModel;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Obtiene los datos de la api (Plans)
   */
  async getFormData() {
    try {
      let resp = await this.reportsService.getPlans(this.auth.codeUser).toPromise();
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        resp = resp.data.plans.filter(obj => {
          console.log(obj.year, this.year, obj.type, this.semester);
          // tslint:disable-next-line:triple-equals
          return obj.year == this.year && obj.type === this.semester;
        });
        // @ts-ignore
        if (resp.length > 0) {
          this.plansForm.setValue(resp[0] as PlanModel);
        }
        // this.userInfoForm = resp.data[0] as UserPlanReportModel;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Este metodo crea el formGroup que sera utilizado en este componente
   * @returns FormGroup - informacion necesaria
   */
  private getPlansTemplate() {
    return this.formBuilder.group({
      id: new FormControl(''),
      type: new FormControl(''),
      act_number: new FormControl(''),
      celebration_date: new FormControl(''),
      personal_code: new FormControl(''),
      program: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      year: new FormControl(''),
      subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      docent_formation: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      support_activities: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      group_number: new FormControl('', [Validators.required]),
      line_number: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      project_name: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      actual_year_progress: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      expected_year_progress: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      activities_description: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      student_tutorship: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      student_help: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      student_formation: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      participation: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      academic_management: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      collective_management: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      collective_knowledge: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      personal_management: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      diffusion: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      post_formation: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      additional_comment: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required]),
      lgac: new FormControl('', [Validators.required]),
      helps: new FormControl('', [Validators.required]),
      tutories: new FormControl('', [Validators.required]),
      management: new FormControl('', [Validators.required]),
      diffusion_hours: new FormControl(''),
      formation: new FormControl('', [Validators.required, Validators.maxLength(125)]),
      status: new FormControl(''),
      comment: new FormControl(''),
    });
  }

  /**
   * esto manda el documento a la api, tiene 2 etapas, si el documento es nuevo manda metodo post, si es documento
   * extraido de la api (get) manda un put
   */
  async saveDocument() {
    try {
      this.plansForm.value.type = this.semester;
      this.plansForm.value.year = this.year;
      // si el plan fue obtenido por la api (get)
      if (this.plansForm.value.id !== '') {
        const resp = await this.reportsService.updatePlan(this.auth.codeUser, this.plansForm.value).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Modificado con exito');
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        // si el documento fue creado por el usuario
      } else {
        const resp = await this.reportsService.addPlan(this.auth.codeUser, this.plansForm.value).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Creado con exito');
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Toast que maneja los mensajes al usuario
   * @param message - Mensaje a ser mostrado
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  getTotalTimeDistribution() {
    console.log(this.plansForm);
    return +this.plansForm.value.teacher +
      +this.plansForm.value.lgac +
      +this.plansForm.value.helps +
      +this.plansForm.value.tutories +
      +this.plansForm.value.management +
      +this.plansForm.value.diffusion_hours +
      +this.plansForm.value.formation;
  }
}
