import {Component, OnInit} from '@angular/core';
import {PlanModel, UserPlanReportModel} from '../../../../interfaces/interfaces';
import {AuthServiceService} from '../../../../services/auth-service.service';
import {DepartmentService} from '../../../../services/department.service';
import {ActivatedRoute} from '@angular/router';
import {PlanAndReportService} from '../../../../services/plan-and-report.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.page.html',
  styleUrls: ['./inform.page.scss'],
})
export class InformPage implements OnInit {
  userData: UserPlanReportModel;
  informData: PlanModel;
  private informId: string;
  private informCode: string;
  adminDataForm: FormGroup;

  constructor(private auth: AuthServiceService,
              private departmentService: DepartmentService,
              private activatedRoute: ActivatedRoute,
              private plansReportsService: PlanAndReportService,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private location: Location
  ) {
  }

  ngOnInit() {
    this.adminDataForm = this.formBuilder.group({
      act_number: new FormControl('', [Validators.required]), // TODO: validators
      celebration_date: new FormControl('', [Validators.required]), // TODO: validators
      status: new FormControl(''), // TODO: validators
      comment: new FormControl('', [Validators.maxLength(125)]) // TODO: validators
    });
  }

  ionViewDidEnter() {
    this.informId = this.activatedRoute.snapshot.paramMap.get('id');
    this.informCode = this.activatedRoute.snapshot.paramMap.get('code');
    this.getUserData();
    this.getInformData();
  }

  async getUserData() {
    try {
      const resp = await this.plansReportsService.getUserInformation(this.informCode).toPromise();
      console.log(resp);
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        // tslint:disable-next-line:triple-equals
        this.userData = resp.data[0];
      }
    } catch (error) {
      console.error('Error en inform', error);
    }
  }

  async getInformData() {
    try {
      const resp = await this.plansReportsService.getPlans(this.informCode).toPromise();
      console.log(resp);
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        // tslint:disable-next-line:triple-equals
        this.informData = resp.data.plans.filter(data => data.id == this.informId)[0];
        this.adminDataForm.value.act_number = this.informData.act_number;
        this.adminDataForm.value.celebration_date = this.informData.celebration_date;
        this.adminDataForm.value.status = this.informData.status;
        this.adminDataForm.value.comment = this.informData.comment;
      }
    } catch (error) {
      console.error('Error en inform', error);
    }
  }

  getCalendar(type: string) {
    switch (type) {
      case 'A':
        return 'A: Enero - Agosto';
      case 'B':
        return 'B: Agosto - Enero';
      case 'AB':
        return this.informData.year;
    }
  }

  getTotalTimeDistribution() {
    return +this.informData.teacher +
      +this.informData.lgac +
      +this.informData.helps +
      +this.informData.tutories +
      +this.informData.management +
      +this.informData.diffusion_hours +
      +this.informData.formation;
  }

  returnLastPage() {
    this.location.back();
  }

  async approveInform() {
    try {
      // @ts-ignore
      const resp = await this.plansReportsService.approvePlan(this.auth.codeUser, this.adminDataForm.value, this.informData.id).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Modificado correctamente');
        this.returnLastPage();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
      console.log(resp);
    } catch (error) {
      console.error('Error en staf-work-plans', error);
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

  async disapproveInform() {
    try {
      let data = {
        ...this.adminDataForm.value
      };
      data.celebration_date = new Date(data.celebration_date).toJSON().slice(0, 10);
      // @ts-ignore
      const resp = await this.plansReportsService.disapprovePlan(this.auth.codeUser, data, this.informData.id)
        .toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Modificado correctamente');
        this.returnLastPage();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
      console.log(resp);
    } catch (error) {
      console.error('Error en staf-work-plans', error);
    }
  }
}
