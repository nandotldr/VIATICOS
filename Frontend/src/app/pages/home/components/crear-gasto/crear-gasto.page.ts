import { ToastController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-gasto',
  templateUrl: './crear-gasto.page.html',
  styleUrls: ['./crear-gasto.page.scss'],
})
export class CrearGastoPage implements OnInit {

  idViatico: Number;
  fgGasto: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toast: ToastController,
    private modalController: ModalController,
    private navParams: NavParams
  ) { 

    this.idViatico = this.navParams.get('id_viatico');

    this.fgGasto = this.formBuilder.group({
      id_solicitud_viatico: new FormControl(this.idViatico, [Validators.required]),
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
    this.idViatico = this.navParams.get('id_viatico');
    console.log('ID DEL VIATICO', this.idViatico);
    
  }

  async createGasto(){
    console.log('Formulario', this.fgGasto.value);
    if(this.fgGasto.valid){
      const resp = await this.auth.createGasto(this.fgGasto.value).toPromise();
      if(resp){
        this.presentToast('Gastos creados');
        // PUT en Viatico para cambiar el status
        this.closeModal();
      }
      else{
        this.presentToast('Error');
      }  
    }else{
      this.presentToast("Error");
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
