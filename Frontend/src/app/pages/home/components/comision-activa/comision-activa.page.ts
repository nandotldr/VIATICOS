import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from "@ionic/angular";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comision-activa',
  templateUrl: './comision-activa.page.html',
  styleUrls: ['./comision-activa.page.scss'],
})
export class ComisionActivaPage implements OnInit {
  comision = '1';
  comi = '';
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private authService: AuthService,
              private navCtrl: NavController) {

  }
  ionViewWillEnter() {
    this.comision = this.navParams.get('comision');
    console.log(this.comision);
    this.getComision(this.comision);
    console.log(this.comi);
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  async getComision(comision_id) {
    const resp = await this.authService.getComision(comision_id);
    console.log(resp);
    if (resp) {
      resp.fecha_inicio = formatDate(resp.fecha_inicio, 'yyyy-MM-dd', 'en');
      resp.fecha_fin = formatDate(resp.fecha_fin, 'yyyy-MM-dd', 'en');
      this.comi = resp;
    } else {
      console.log('no jalo')
    }

  }

  closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {

  }

}
