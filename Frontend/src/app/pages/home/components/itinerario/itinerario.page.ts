import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
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

  crearItinerario() {
    console.log(this.itinerarioGroup);
    // TODO: terminar esto
    this.presentToast('Pendiente por implementar' + JSON.stringify(this.itinerarioGroup.value));
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
