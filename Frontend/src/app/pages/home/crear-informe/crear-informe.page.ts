import { ItinerarioPage } from './../components/itinerario/itinerario.page';
import { OverlayEventDetail } from '@ionic/core';
import { AgendaPage } from './../components/agenda/agenda.page';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FacturaPage } from '../components/factura/factura.page';

@Component({
  selector: 'app-crear-informe',
  templateUrl: './crear-informe.page.html',
  styleUrls: ['./crear-informe.page.scss'],
})
export class CrearInformePage implements OnInit {
  informeGroup;
  puedeContinuar = false;
  infomeCreado = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient) {
    this.informeGroup = this.formBuilder.group({
      invitado: new FormControl(''),
      comentarios: new FormControl(''),
      status: new FormControl('')
    });
  }

  ngOnInit() {
  }

  async guardar() {
    try {
      console.log(this.informeGroup);
      if (this.informeGroup.valid) {
        const resp = await this.auth.crearSolicitudViatico(this.informeGroup.value).toPromise();
        console.log(resp);
        if (resp.ok) {
          this.puedeContinuar = true;
        } else {
          this.presentToast(resp.mensaje);
        }
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

  async crearAgenda() {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: AgendaPage,
          cssClass: 'modal-class',
          componentProps: {
            // id_viatico: idViatico
           }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async crearFactura() {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: FacturaPage,
          cssClass: 'modal-class',
          componentProps: {
            // id_viatico: idViatico
           }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async crearItinerario() {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ItinerarioPage,
          cssClass: 'modal-class',
          componentProps: {
            // id_viatico: idViatico
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
