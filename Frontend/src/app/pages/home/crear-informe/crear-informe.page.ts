import { ItinerarioPage } from './../components/itinerario/itinerario.page';
import { OverlayEventDetail } from '@ionic/core';
import { AgendaPage } from './../components/agenda/agenda.page';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FacturaPage } from '../components/factura/factura.page';

@Component({
  selector: 'app-crear-informe',
  templateUrl: './crear-informe.page.html',
  styleUrls: ['./crear-informe.page.scss'],
})
export class CrearInformePage implements OnInit {
  informeGroup;
  existiaEnBD = false;
  puedeContinuar = false;
  informeCreado = false;
  idInforme: number;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
    ) {
    // console.log('inicio', this.informeGroup.value);
    this.informeGroup = this.formBuilder.group({
      resultados: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
      id_solicitud_comision: new FormControl(+this.activatedRoute.snapshot.paramMap.get('id'))
    });
    this.getInforme();
    console.log('inicio', this.informeGroup.value);
  }

  ngOnInit() {
  }

  async getInforme() {
    try {
      const resp = await this.auth.getInforme(this.informeGroup.value).toPromise();
      // tslint:disable-next-line
      if (resp['ok']) {
        console.log(resp);
        this.puedeContinuar = true;
        this.existiaEnBD = true;
        this.informeGroup = this.formBuilder.group({
          // tslint:disable-next-line
          resultados: new FormControl(resp['body'].resultados, Validators.required),
          // tslint:disable-next-line
          observaciones: new FormControl(resp['body'].observaciones, Validators.required),
          id_solicitud_comision: new FormControl(+this.activatedRoute.snapshot.paramMap.get('id'))
        });
        // tslint:disable-next-line
        this.idInforme = resp['body'].folio;
        console.log('inicio', this.informeGroup);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async enviar(){
    try {
      if (this.informeGroup.valid) {
          const { resultados, observaciones } = this.informeGroup.value;
          const resp = await this.auth.modificarInforme({resultados, observaciones, id_informe: this.idInforme,status: 1}).toPromise();
          console.log(resp);
          // tslint:disable-next-line
          if (resp['ok']) {
            this.puedeContinuar = true;
            // tslint:disable-next-line
            this.presentToast(resp['mensaje']);
          } else {
            // tslint:disable-next-line
            this.presentToast(resp['mensaje']);
          }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async guardar() {
    try {
      if (this.informeGroup.valid) {
        if (this.existiaEnBD) {
          const { resultados, observaciones } = this.informeGroup.value;
          const resp = await this.auth.modificarInforme({resultados, observaciones, id_informe: this.idInforme,status: 0}).toPromise();
          console.log(resp);
          // tslint:disable-next-line
          if (resp['ok']) {
            this.puedeContinuar = true;
            // tslint:disable-next-line
            // this.presentToast(resp['mensaje']);
          } else {
            // tslint:disable-next-line
            this.presentToast(resp['mensaje']);
          }
        } else {
          const resp = await this.auth.crearInforme(this.informeGroup.value).toPromise();
          console.log(resp);
          // tslint:disable-next-line
          if (resp['ok']) {
            this.presentAlertGuardar();
            this.puedeContinuar = true;
          } else {
            // tslint:disable-next-line
            this.presentToast(resp['mensaje']);
          }
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
             id_informe: this.idInforme
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
            id_informe: this.idInforme
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
            id_informe: this.idInforme
           }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async presentAlertGuardar() {
    const alert = await this.alertController.create({
      header: 'Informe Guardado',
      // subHeader: 'Subtitle',
      message: 'Da clic en siguiente para continuar',
      buttons: ['OK']
    });

    await alert.present();
  }

}
