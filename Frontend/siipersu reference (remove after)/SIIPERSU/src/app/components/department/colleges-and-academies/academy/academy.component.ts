import {Component, Input, OnChanges} from '@angular/core';
import {AuthServiceService} from '../../../../services/auth-service.service';
import {DepartmentService} from '../../../../services/department.service';
import {AcademyModel} from '../../../../interfaces/interfaces';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss'],
})
export class AcademyComponent implements OnChanges {

  academyList: AcademyModel[];
  academyListCopy: AcademyModel[];
  @Input() year;

  constructor(private auth: AuthServiceService,
              private departmentService: DepartmentService,
              public toastController: ToastController) {
  }

  ngOnChanges() {
    this.getAcademies();
  }

  async getAcademies() {
    try {
      const resp = await this.departmentService.getAcademies(this.auth.codeUser, this.year).toPromise();
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.academyList = resp.data as AcademyModel[];
        this.academyListCopy = [...this.academyList];
        console.log(this.academyList);
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en academy', error);
    }
  }

  /**
   * Esto actualiza el arreglo para solo mostrar los datos introducidos en el evento (la busqueda que dio el usuario)
   * @param event - datos de usuario
   */
  updateFilter(event: Event) {
    // @ts-ignore
    const val = event.target.value.toLowerCase();
    // filter our data

    const filter = this.academyList.filter(value => {
      const data = value.name;
      return data.indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.academyListCopy = filter;
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

  modifyAcademy() {

  }

  removeAcademy() {

  }
}
