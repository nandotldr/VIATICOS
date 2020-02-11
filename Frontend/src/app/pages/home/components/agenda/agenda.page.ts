import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  agendaGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient) {
    this.agendaGroup = this.formBuilder.group({
      dia: new FormControl('', Validators.required),
      hora_inicio: new FormControl('', Validators.required),
      hora_fin: new FormControl('', Validators.required),
      actividad: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async crearAgenda() {
    console.log(this.agendaGroup);
    // TODO: terminar esto
    let { dia, hora_inicio, hora_fin, actividad } = this.agendaGroup.value;
    dia = dia.substring(0, 10);
    // 2020-02-10T17:04:36.372-06:00"
    hora_inicio = hora_inicio.substring(11, 23);
    hora_fin = hora_fin.substring(11, 23);
    try {
      const resp = await this.auth.createAgenda({ dia, hora_inicio, hora_fin, actividad }).toPromise();
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

}
