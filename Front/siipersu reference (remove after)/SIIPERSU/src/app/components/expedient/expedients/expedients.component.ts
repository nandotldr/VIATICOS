import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {ExpedientService} from '../../../services/expedient.service';
import {ToastController} from '@ionic/angular';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-expedients',
  templateUrl: './expedients.component.html',
  styleUrls: ['./expedients.component.scss'],
})
export class ExpedientsComponent implements OnInit {
  expedientsData;
  copyExpedientsData;

  constructor(private auth: AuthServiceService,
              private expedientService: ExpedientService,
              public toastController: ToastController
  ) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getExpedients();
  }

  /**
   * Obtiene los datos de la api
   */
  async getExpedients() {
    try {
      const resp = await this.expedientService.getExpedients(this.auth.codeUser).toPromise();
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.expedientsData = resp.data;

        // procedimiento para llenar los valores a 8 digitos (valor del codigo)
        this.expedientsData.forEach(value => {
          let fill = '';
          for (let i = (value.code + '').length; i < 8; i++) {
            fill += '0';
          }
          value.code = fill + value.code;
        });
        // hago una copia porque necesito filtrar por resultados, entonces voy a estar modificando el arreglo
        this.copyExpedientsData = [...this.expedientsData];

      } else {
        // @ts-ignore
        this.presentToast('Error al cargar los datos');
      }
    } catch (error) {
      console.error('Error en expedients', error);
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

  /**
   * Esto actualiza el arreglo para solo mostrar los datos introducidos en el evento (la busqueda que dio el usuario)
   * @param event - datos de usuario
   */
  updateFilter(event: Event) {
    // @ts-ignore
    const val = event.target.value.toLowerCase();
    // filter our data

    const filter = this.expedientsData.filter(value => {
      const data = value.code + '';
      return data.indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.copyExpedientsData = filter;
  }

  /**
   * Abre un archivo en una nueva pestaña
   * @param link - link a abrir
   */
  openFile(link: string, row: any) {
    // esto reyena los 0 necesarios para completar 8 en la peticion
    let fill = '';
    for (let i = (this.auth.codeUser + '').length; i < 8; i++) {
      fill += '0';
    }
    const FILE_URL = `${environment.API}/public/personal/${fill}${row.code}/`;
    window.open(FILE_URL + link, '_blank').focus();
  }
}
