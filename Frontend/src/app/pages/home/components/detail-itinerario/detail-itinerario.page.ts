import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-itinerario',
  templateUrl: './detail-itinerario.page.html',
  styleUrls: ['./detail-itinerario.page.scss'],
})
export class DetailItinerarioPage implements OnInit {

  modificarDisabled: Boolean = true;

  id_informe: number;

  comision = {
    folio: Number,
    nombres: String,
    apellidos: String,
    area_adscripcion: String,
    plaza_laboral: String,
    nss: String,
    status: Number,
  };
  
  informe: {
    folio: Number,
    id_solicitud_comision: String,
    codigo: Number,
    resultados: String,
    observaciones: String,
    fecha_elaboracion: string,
    fecha_aprobacion: string,
    status: Number,
    nombre_aprobacion: String,
    nombre_comision: String,
    objetivo_trabajo: String,
    nombres: String,
    agenda?:
    {
      dia: string,
      hora_inicio: string,
      hora_fin: string,
      actividad: string,
      id_informe_actividades: Number
    }
    itinerario?:
    {
      dia: string,
      origen: string,
      destino: string,
      id: Number,
      id_informe_actividades: Number
    }
    facturas?:
    {
      archivo_url: string,
      id: Number,
      id_informe_actividades: Number
    }
  };

  fgModify: FormGroup;
  constructor(private modalController: ModalController,
              public  alertController: AlertController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController,
              private formBuilder: FormBuilder) {
                this.ionViewWillEnter();
                this.fgModify = this.formBuilder.group({
                  nombres: new FormControl('', []),
                  apellidos: new FormControl('', []),
                  area_adscripcion: new FormControl('', []),
                  plaza_laboral: new FormControl('', []),
                  nss: new FormControl('', [])
                });
  }
  ionViewWillEnter() {
    this.id_informe = this.navParams.get('id_informe');
    this.getItinerario();
  }

  ngOnInit() {
    this.getItinerario();
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  
  async getItinerario() {
    try {
      const resp = await this.auth.getItinerario(this.id_informe);
      // tslint:disable-next-line
      if (resp['ok']) {
        console.log(resp);
        // tslint:disable-next-line
      }
    } catch (error) {
      console.error(error);
    }
  }

  async modifyPrograma(programa){
      console.log(programa);
      programa.id_programa = programa.id;
      programa.id_solicitud_comision = this.informe.folio;
      const resp = await this.auth.modifyPrograma(programa);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
    this.closeModal();
  }

  async deletePrograma(programa){
    programa.id_solicitud_comision = this.informe.folio;
    programa.id_programa = programa.id;
      const resp = await this.auth.deletePrograma(programa);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
    this.getItinerario();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async cancelarSolicitud(comision) {
    comision.status = -1;
    comision.destino = 0;
    const resp = await this.auth.modificarInforme(this.informe).toPromise();
    if (resp['ok']) {
      this.presentToast(resp['mensaje']);
    } else {
      this.presentToast(resp['mensaje']);
    }
  this.closeModal();
  }

  async presentToast(message: string) { 
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Comision Modificada.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Comisión Enviada',
      // subHeader: 'Subtitle',
      message: 'Revisa el estado, cuando sea aceptada por Administrador, crea un viático en esta página.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async enableModificar() {
    console.log("change")
      this.modificarDisabled = false;
  }

}
