import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController} from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  perfil = {
    codigo: Number,
    nombres: String,
    apellidos: String,
    area_adscripcion: String,
    plaza_laboral: String,
    numero_social: String
  };
  fgModify: FormGroup;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              public  toastController: ToastController,
              private auth: AuthService,
              private navCtrl: NavController)
              {
                this.ionViewWillEnter();
                this.fgModify = this.formBuilder.group({
                  nombres: new FormControl(this.perfil.nombres, []),
                  apellidos: new FormControl(this.perfil.apellidos, []),
                  area_adscripcion: new FormControl(this.perfil.area_adscripcion, []),
                  plaza_laboral: new FormControl(this.perfil.plaza_laboral, []),
                  nss: new FormControl(this.perfil.numero_social, [])
                });
              }

  ionViewWillEnter() {
    this.perfil = this.navParams.get('perfil');
    console.log('PERFIL',this.perfil);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos no Validos',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Usuario Modificado.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async modifyUsuario(){
    if (this.fgModify.valid) {
      console.log(this.fgModify.value);
      const resp = await this.auth.modifyUsuario(this.fgModify.value);
      if (resp) {
        this.presentToastSuccess();
      } else {
        console.log(resp);
        this.presentToast();
      }
    } else {
      this.presentToast();
    }
    this.closeModal();
  }

  ngOnInit() {
  }

}
