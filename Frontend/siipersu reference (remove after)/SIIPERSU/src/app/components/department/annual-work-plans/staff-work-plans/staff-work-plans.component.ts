import {Component, Input, OnChanges} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {DepartmentService} from '../../../../services/department.service';
import {AuthServiceService} from '../../../../services/auth-service.service';
import {PlanAndReportService} from '../../../../services/plan-and-report.service';

@Component({
  selector: 'app-staff-work-plans',
  templateUrl: './staff-work-plans.component.html',
  styleUrls: ['./staff-work-plans.component.scss'],
})
export class StaffWorkPlansComponent implements OnChanges {

  planList;
  planListCopy;
  readonly DEFAULT = 0;
  readonly APPROVED = 1;
  readonly REJECTED = 2;
  readonly statusDic = {
    0: 'Ingresado',
    1: 'Aprovado',
    2: 'Rechazado',
  };

  @Input() year;
  @Input() semester;
  @Input() dependency;

  constructor(private departmentService: DepartmentService,
              private plansReportsService: PlanAndReportService,
              private auth: AuthServiceService,
              public toastController: ToastController) {
  }

  ngOnChanges() {
    this.getPlanList();
  }

  /**
   * Esto actualiza el arreglo para solo mostrar los datos introducidos en el evento (la busqueda que dio el usuario)
   * @param event - datos de usuario
   */
  updateFilter(event: Event) {
    // @ts-ignore
    const val = event.target.value.toLowerCase();
    // filter our data

    const filter = this.planList.filter(value => {
      const data = value.code + '';
      return data.indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.planListCopy = filter;
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

  async getPlanList() {
    try {
      const resp = await this.departmentService.getWorkPlans(this.auth.codeUser, this.year, this.semester, this.dependency).toPromise();
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.planList = resp.data;

        // procedimiento para llenar los valores a 8 digitos (valor del codigo)
        this.planList.forEach(value => {
          let fill = '';
          for (let i = (value.code + '').length; i < 8; i++) {
            fill += '0';
          }
          value.code = fill + value.code;
        });
        // hago una copia porque necesito filtrar por resultados, entonces voy a estar modificando el arreglo
        this.planListCopy = [...this.planList];

      } else {
        // @ts-ignore
        this.presentToast('Error al cargar los datos');
      }
    } catch (error) {
      console.error('Error en expedients', error);
    }
  }

  async approveInform(index) {
    try {
      // @ts-ignore
      const resp = await this.departmentService.approvePlan(this.planListCopy[index].code, this.planListCopy[index].id).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.planListCopy[index].status = this.APPROVED;
        this.presentToast('Modificado correctamente');
        this.ngOnChanges();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
      console.log(resp);
    } catch (error) {
      console.error('Error en staf-work-plans', error);
    }
  }

  async disapproveInform(index) {
    try {
      // @ts-ignore
      const resp = await this.departmentService.disapprovePlan(this.planListCopy[index].code, this.planListCopy[index].id).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.planListCopy[index].status = this.APPROVED;
        this.presentToast('Modificado correctamente');
        this.ngOnChanges();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
      console.log(resp);
    } catch (error) {
      console.error('Error en staf-work-plans', error);
    }
  }

  printInform() {

  }

  /**
   * return the id, code of the user selected
   * @param rowIndex - Index of the selected user
   */
  getUrlLink(rowIndex: number) {
    return `${this.planListCopy[rowIndex].id}/${this.planListCopy[rowIndex].code}`;
  }
}
