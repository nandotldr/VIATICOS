import { OverlayEventDetail } from '@ionic/core';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViaticoInformacionPage } from '../components/viatico-informacion/viatico-informacion.page';

@Component({
  selector: 'app-historial-viaticos',
  templateUrl: './historial-viaticos.page.html',
  styleUrls: ['./historial-viaticos.page.scss'],
})
export class HistorialViaticosPage implements OnInit {
  viaticos;
  viaticosCopia;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient) { }

  async ngOnInit() {
    try {
      const resp = await this.auth.getHistorialViaticos().toPromise();
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async openModal(idViatico) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ViaticoInformacionPage,
          cssClass: 'modal-class',
          componentProps: {
            id_viatico: idViatico
           }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();

  }

}
