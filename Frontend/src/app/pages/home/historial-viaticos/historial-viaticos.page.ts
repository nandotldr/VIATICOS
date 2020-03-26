import { OverlayEventDetail } from '@ionic/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
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
  idInforme: Number;
  constructor(
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    public alertController: AlertController,
    ) { }

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
  async generarPDF(id_comision: any) {
    try {
      const resp3 = await this.auth.getInforme({id_solicitud_comision: id_comision}).toPromise();
      // tslint:disable-next-line
      if (resp3['ok']) {
        this.idInforme = resp3['body'].folio;
      }
      else{
        return this.presentToast('No jalo')
      }
      const resp = await this.auth.downloadInforme(this.idInforme);
      // tslint:disable-next-line
      if (resp) {
        console.log(resp);
        const url= window.URL.createObjectURL(resp);
        await window.open(url);
        // tslint:disable-next-line
      }
      const resp2 = await this.auth.downloadInformeLegacy(this.idInforme);
      // tslint:disable-next-line
      if (resp2) {
        console.log(resp2);
        const url= window.URL.createObjectURL(resp2);
        await window.open(url);
        // tslint:disable-next-line
      }
    } catch (error) {
      console.error(error);
    }
    
  }
/*
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Header',
      subHeader: 'Subtitle',
      message: 'message',
      buttons: ['OK']
    });
    await alert.present();
  }
 */
}
