import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  facturaGroup: FormGroup;
  archivo: File;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private navParams: NavParams,
    ) {
    this.facturaGroup = this.formBuilder.group({
      archivo_url: new FormControl('',),
      archivo:  new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async crearFactura() {
    const { archivo_url } = this.facturaGroup.value;
    try {
      const resp = await this.auth.uploadFactura({
        file: this.archivo, id: this.navParams.get('id_informe')
      });
      console.log(resp);
      this.presentToast(resp['mensaje']);
    } catch (error) {
      console.error(error);
    }
    this.modalController.dismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  getFactura(event){
    this.archivo = event.target.files[0];
    console.log(this.archivo);
  }

  async closeModal() {
    this.modalController.dismiss();
  }

}
