import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-comision-activa',
  templateUrl: './comision-activa.page.html',
  styleUrls: ['./comision-activa.page.scss'],
})
export class ComisionActivaPage implements OnInit {
  comision = '';
  comi = '';
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private authService: AuthService) {

  }
  ionViewWillEnter() {
    this.comision = this.navParams.get('comision');
    console.log(this.comision);
    this.getComision();
    console.log(this.comi);
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  async getComision() {
    const resp = await this.authService.getComision(this.comision);//.folio);
    if (resp) {
      this.comi = resp;
    } else {
      console.log('no jalo')
    }

  }
  ngOnInit() {

  }

}
