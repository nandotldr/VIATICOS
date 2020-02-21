import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modificar-comision',
  templateUrl: './modificar-comision.page.html',
  styleUrls: ['./modificar-comision.page.scss'],
})
export class ModificarComisionPage implements OnInit {

  comision = {
    folio: Number,
    nombres: String,
    apellidos: String,
    area_adscripcion: String,
    plaza_laboral: String,
    nss: String,
    status: Number,
  };
  
  comi: {
    folio: Number,
    area_adscripcion: String,
    tipo_comision: Number,
    nombre_comision: String,
    destino: String,
    fecha_solicitud: String,
    fecha_inicio: string,
    fecha_fin: string,
    status: Number,
    justificacion: String,
    objetivo_trabajo: String,
    programa_evento: String,
    invitacion_evento: String,
    fecha_revisado: String,
    fecha_aceptado: String,
    nombre_revisado: String,
    nombre_aceptado: String,
    programa_trabajo?:
    {
      dia: string,
      lugar_estancia: string,
      tareas_realizar: string,
      id: Number,
      id_solicitud_comision: Number
    }
  };

  fgModify: FormGroup;
  constructor(private modalController: ModalController,
              public  alertController: AlertController,
              private navParams: NavParams,
              private auth: AuthService,
              private navCtrl: NavController,
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
    this.comision = this.navParams.get('comision');
    this.getComision(this.comision);
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  
  async getComision(comision_id) {
    const resp = await this.auth.getComision(comision_id);
    console.log(resp);
    if (resp) {
      resp.fecha_inicio = formatDate(resp.fecha_inicio, 'yyyy-MM-dd', 'en');
      resp.fecha_fin = formatDate(resp.fecha_fin, 'yyyy-MM-dd', 'en');
      this.comi = resp;
    } else {
      console.log('no jalo')
    }

  }

  async modifyComision(){
      const resp = await this.auth.modifyComision(this.comi);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
    this.closeModal();
  }

  async modifyPrograma(programa){
      console.log(programa);
      programa.id_programa = programa.id;
      programa.id_solicitud_comision = this.comi.folio;
      const resp = await this.auth.modifyPrograma(programa);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
    this.closeModal();
  }

  async deletePrograma(programa){
    programa.id_solicitud_comision = this.comi.folio;
    programa.id_programa = programa.id;
      const resp = await this.auth.deletePrograma(programa);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
    this.getComision(this.comision);
  }

  closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {

  }

  async enviarSolicitud(comision) {
    comision.status =1;
    comision.destino = 0;
    const resp = await this.auth.modifyComision(this.comi);
    if (resp) {
      this.presentToast(resp);
      this.presentAlert();
    } else {
      this.presentToast(resp);
    }
  this.closeModal();
  }

  async cancelarSolicitud(comision) {
    comision.status = -1;
    comision.destino = 0;
    const resp = await this.auth.modifyComision(this.comi);
    if (resp) {
      this.presentToast(resp);
    } else {
      this.presentToast(resp);
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

}
