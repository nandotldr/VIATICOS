import { OverlayEventDetail } from '@ionic/core';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViaticoInformacionPage } from '../components/viatico-informacion/viatico-informacion.page';
import { CrearGastoPage } from '../components/crear-gasto/crear-gasto.page';

@Component({
  selector: 'app-historial-viaticos',
  templateUrl: './historial-viaticos.page.html',
  styleUrls: ['./historial-viaticos.page.scss', '../../../app.component.scss'],
})
export class HistorialViaticosPage implements OnInit {
  viaticos;
  viaticosCopia;
  gastos: any;
  id_viatico: Number;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private http: HttpClient) { }

  async ngOnInit() {
    this.getViaticos();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async openModalInfo(id_viatico) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ViaticoInformacionPage,
          cssClass: 'modal-class',
          componentProps: {
            id_comision: id_viatico
           }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.getViaticos();
        this.presentAlert();
      }
    });

    await modal.present();
  }

  async openModalGastos(id_viatico) {
    console.log(id_viatico);
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: CrearGastoPage,
          cssClass: 'modal-class',
          componentProps: {
            id_viatico: id_viatico,
          }
        });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      this.getGastos();
    });

    await modal.present();
  }

  async getGastos() {
    const resp = await this.auth.getGasto(this.id_viatico).toPromise();
    if (resp['ok']) {
      // this.guardado = true;
      this.gastos = resp['results'];
    }
  }

  async getViaticos() {
    try {
      const resp = await this.auth.getHistorialViaticos().toPromise();
      console.log(resp);

      // tslint:disable-next-line: no-string-literal
      if (resp['ok']) {
        // tslint:disable-next-line: no-string-literal
        this.viaticos = resp['body'];
        this.viaticosCopia = [...this.viaticos];
        console.log('historial-viaticos', this.viaticos);
      } else {
        this.presentToast('Datos no validos');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viático Enviado',
      // subHeader: 'Subtitle',
      message: 'Revisa el estado de tu viático en esta página.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
