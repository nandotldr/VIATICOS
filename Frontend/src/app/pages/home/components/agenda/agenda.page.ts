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

  crearAgenda() {
    console.log(this.agendaGroup);
    // TODO: terminar esto
    this.presentToast('Pendiente por implementar' + JSON.stringify(this.agendaGroup.value));
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
