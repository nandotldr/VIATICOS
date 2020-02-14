import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.page.html',
  styleUrls: ['./itinerario.page.scss'],
})
export class ItinerarioPage implements OnInit {

  itinerarioGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private http: HttpClient) {
    this.itinerarioGroup = this.formBuilder.group({
      dia: new FormControl('', Validators.required),
      origen: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  async crearItinerario() {
    console.log(this.itinerarioGroup);
    let { dia, origen, destino } = this.itinerarioGroup.value;
    dia = dia.substring(0, 10);
    try {
      const resp = await this.auth.crearItinerario({
        dia, origen, destino, id_informe_actividades: this.navParams.get('id_informe')
      }).toPromise();
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

}
