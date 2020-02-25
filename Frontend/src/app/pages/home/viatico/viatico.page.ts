import { CrearGastoPage } from './../components/crear-gasto/crear-gasto.page';
import { HttpClient } from '@angular/common/http';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OverlayEventDetail } from '@ionic/core';


@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.page.html',
  styleUrls: ['./viatico.page.scss', '../../../app.component.scss'],
})
export class ViaticoPage implements OnInit {

  //@Input() comision: string  = '';
  comisionCompleta = '';
  comision: Number;
  viatico: any;
  gastos: any;
  id_viatico: Number;
  fgCreate: FormGroup;
  fgEnviar: FormGroup;
  token: string;
  guardado = false;
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    public  alertController: AlertController
  ) {
    this.comision = +this.activatedRoute.snapshot.paramMap.get('folio');
    this.fgCreate = this.formBuilder.group({
      id_comision: new FormControl(this.comision, [Validators.required]),
      invitado_nombre: new FormControl('', []),
      comentarios: new FormControl('', [Validators.required])
    });

    this.fgEnviar = this.formBuilder.group({
      status: new FormControl(1, [])
    });
  }

  ngOnInit() {
    this.getComision();
    this.getViaticos();
  }

  async getComision() {
    const resp = await this.auth.getComision(this.comision);
    if (resp) {
      this.comisionCompleta = resp;
    } else {
      this.presentToast(resp.mensaje);
    }
  }


  async getViaticos() {
    const resp = await this.auth.getSolicitudViatico(this.comision).toPromise();
    if (resp['ok']) {
      this.guardado = true;
      this.viatico = resp['body'];
      this.id_viatico = this.viatico.id_comision;
      this.getGastos();
      console.log(this.id_viatico);
    } else {
      this.presentToast(resp['mensaje']);
    }
  }

  async getGastos() {
    const resp = await this.auth.getGasto(this.id_viatico).toPromise();
    if (resp['ok']) {
      this.guardado = true;
      this.gastos = resp['results'];
    }
  }

  async saveViatico() {
    if (this.fgCreate.valid) {

      const resp = await this.auth.saveViatico(this.fgCreate.value).toPromise();
      if (resp['ok']) {
        this.presentToast('Guardado correctamente');
        this.presentAlert();
        this.viatico = resp['body'];
        this.id_viatico = this.viatico.id_viatico;
        this.guardado = true;
        this.getViaticos();
      } else {
        this.presentToast(resp['mensaje']);
      }
    } else {
      this.presentToast('Datos no Validos');
    }
  }

  async sendViatico() {
    //Llamada a la API
    if (confirm('¿Está seguro de enviar los datos? Una vez enviados no podrán ser modificados')) {
      const resp = await this.auth.sendViatico(this.id_viatico, this.viatico.nombre_invitado, this.viatico.comentarios, 1).toPromise();
      if (resp['ok']) {
        this.presentToast('Su viatico ha sido enviado.');

      }
      else {
        console.log(resp);

      }
    }

  }

  async revisarViatico(){
    const resp = await this.auth.modifyViatico(this.viatico);
    if (resp) {
      this.presentToast(resp);
    } else {
      this.presentToast(resp);
    }

}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async openModal() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: CrearGastoPage,
        cssClass: 'modal-class',
        componentProps: {
          id_viatico: this.id_viatico,
        }
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result: ', detail.data);
      }
      this.getGastos();
    });

    await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viático Creado',
      // subHeader: 'Subtitle',
      message: 'Añade tus gastos por día con en botón "Crear Gasto".',
      buttons: ['OK']
    });

    await alert.present();
  }

}
