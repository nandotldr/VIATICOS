import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {PlanAndReportService} from '../../../services/plan-and-report.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-annual-work-plans',
  templateUrl: './annual-work-plans.component.html',
  styleUrls: ['./annual-work-plans.component.scss'],
})
export class AnnualWorkPlansComponent implements OnInit {
  selectedYear: number;
  canShowCards = false;
  canShowPlans = false;
  canLoadPage = false;
  selectedSemester: string;
  academyAdscriptionDependency: string;

  constructor(private auth: AuthServiceService,
              private reportService: PlanAndReportService,
              public toastController: ToastController) {
  }

  ngOnInit() {
    this.getAcademyAdscription();
  }

  /**
   * Este metodo regresa un arreglo [] de años desde el año 2000 al actual en orden descendente.
   * si el mes del año actual supera a octubre entonces regresara el año actual mas 1
   * @return list of years[] since 2000
   */
  getYears() {
    const year2000 = 2000;
    const actualYear = new Date();
    // creation of the array
    const years = new Array((actualYear.getFullYear() + 1) - year2000);
    // if actualYear.month > october we add another year
    if (actualYear.getMonth() > 9) { // 9 = october... 0 = january
      years.push(0); // we dont care about the value yet
    }
    // filling of array
    for (let i = 0; i < years.length; i++) {
      years[i] = 2000 + i;
    }
    years.reverse();
    return years;
  }

  /**
   * Este metodo regresa un booleano dependiendo de si el semestre es visible o no
   * los primeros 4 meses mostrara plan anual, los siguientes 4 el informe A, el resto del año el informe B
   * @param semester - selected semester
   */
  canShowSemester(semester) {
    if (this.selectedYear < (new Date()).getFullYear()) {
      return true;
    }
    switch (semester) {
      case 'A':
        return (new Date()).getMonth() > 4;
      case 'B':
        return (new Date()).getMonth() > 8;
    }
  }

  async getAcademyAdscription() {
    try {
      const resp = await this.reportService.getUserInformation(this.auth.codeUser).toPromise();
      console.log(resp);
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.academyAdscriptionDependency = resp.data[0].academy_ascription_dependency;
        this.canLoadPage = true;
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en annual work plan', error);
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
}
