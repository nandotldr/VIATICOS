import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-factura',
  templateUrl: './detail-factura.page.html',
  styleUrls: ['./detail-factura.page.scss'],
})
export class DetailFacturaPage implements OnInit {

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
