import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viatico-proyecto',
  templateUrl: './viatico-proyecto.page.html',
  styleUrls: ['./viatico-proyecto.page.scss'],
})
export class ViaticoProyectoPage implements OnInit {
  
  comision: number;
  viatico: any;
  viaticoProyecto: any;
  viatico_proyecto: {
    id_solicitud_viatico: Number,
    numero_proyecto: Number,
    cantidad: Number,
    status: Number,
  }
  fgCreate: FormGroup;
  id_solicitud_viatico: number;


  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.comision = +this.activatedRoute.snapshot.paramMap.get('id_comision');
    this.fgCreate = this.formBuilder.group({
      id_solicitud_viatico: new FormControl(this.id_solicitud_viatico, []),
      numero_proyecto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    await this.getViaticos();
  }

  async saveViaticoProyecto(){
    if (this.fgCreate.valid) {

      const resp = await this.auth.saveViaticoProyecto(this.fgCreate.value).toPromise();
      console.log(resp);
      if (resp['ok']) {
        this.presentToast('Guardado correctamente');


      } else {
        this.presentToast('Error');
      }
    } else {
      this.presentToast('Datos no Validos');
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

  async getViaticos(){
    const resp = await this.auth.getSolicitudViatico(this.comision).toPromise();
    console.log(resp);
    if (resp['ok']) {
      this.viatico = resp['body'];
      this.id_solicitud_viatico = this.viatico.folio;
    } else {
    }
  }

  async alertConfirm() {
    const alert = await this.alertController.create({
      header: 'Enviar Proyecto',
      message: '¿Está seguro de enviar los datos? Una vez enviados no podrán ser modificados',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.saveViaticoProyecto();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }
      ]
    });
    await alert.present();
    // alert.onDidDismiss().then(() => this.get());
  }
}
