import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss','../../../app.component.scss'],
})
export class HistoryPage implements OnInit {

  comisiones = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.getAllComisiones();
    console.log(this.comisiones);
  }

  async getAllComisiones(){
    const resp = await this.auth.getAllComisiones();
    if (resp) {
        this.comisiones = resp;
      } else {
        this.presentToast();
      }
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos no validos.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  itemSelected(comision){

  }

  viaticos(id_comision: number){
    
  }

}
