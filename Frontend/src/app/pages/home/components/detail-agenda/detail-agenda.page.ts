import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detail-agenda',
  templateUrl: './detail-agenda.page.html',
  styleUrls: ['./detail-agenda.page.scss'],
})
export class DetailAgendaPage implements OnInit {

  idInforme;
  agendas: any;

  constructor(
      private modalController: ModalController,
      private auth: AuthService,
      private navParams: NavParams,
      private toastController: ToastController
  ) { this.ionViewWillEnter(); }

  ionViewWillEnter() {
    this.idInforme = this.navParams.get('id_informe');
    this.getAgenda(this.idInforme);
  }

  async getAgenda(idInforme) {
    try {
      const resp = await this.auth.getAgenda(idInforme);
      if (resp['ok']) {
        this.agendas = resp['body'];
        console.log(this.agendas);
      }
      console.log('respuesta', resp);
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
  }
/*
  async modifyAgenda(agenda){
    console.log(agenda);
    // agenda.id_programa = programa.id;
    // agenda.id_solicitud_comision = this.comi.folio;
    // const resp = await this.auth.modifyAgenda(agenda);
    if (resp) {
      this.presentToast(resp);
    } else {
      this.presentToast(resp);
    }
    this.closeModal();
  }

  async deleteAgenda(agenda){
    // agenda.id_solicitud_comision = this.comi.folio;
    // agenda.id_programa = programa.id;
    // const resp = await this.auth.deleteAgenda(agenda);
    if (resp) {
      this.presentToast(resp);
    } else {
      this.presentToast(resp);
    }
    this.getAgenda(this.agendas);
  }
*/
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

  closeModal() {
    this.modalController.dismiss();
  }

}
