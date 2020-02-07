import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  facturaGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient) {
    this.facturaGroup = this.formBuilder.group({
      archivo_url: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  crearFactura() {
    console.log(this.facturaGroup);
    // TODO: terminar esto
    this.presentToast('Pendiente por implementar' + JSON.stringify(this.facturaGroup.value));
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
