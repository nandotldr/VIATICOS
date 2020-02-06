import { ToastController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-gasto',
  templateUrl: './crear-gasto.page.html',
  styleUrls: ['./crear-gasto.page.scss'],
})
export class CrearGastoPage implements OnInit {

  fgGasto: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toast: ToastController,
    private modalController: ModalController
  ) { 
    this.fgGasto = this.formBuilder.group({
      id_solicitud_viatico: new FormControl('', [Validators.required]),
      dia: new FormControl('', [Validators.required]),
      alimentacion: new FormControl('', [Validators.required]),
      hospedaje: new FormControl('', [Validators.required]),
      transporteLocal: new FormControl('', [Validators.required]),
      transporteForaneo: new FormControl('', [Validators.required]),
      combustible: new FormControl('', [Validators.required]),
      otros: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  async createGasto(){
   
    const resp = await this.auth.createGasto(this.fgGasto.value);
    if(resp.ok){
      this.presentToast('Gastos creados');
    }
    else{
      this.presentToast(resp.mensaje);
    }   
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
