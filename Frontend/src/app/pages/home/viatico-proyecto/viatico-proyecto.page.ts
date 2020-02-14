import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viatico-proyecto',
  templateUrl: './viatico-proyecto.page.html',
  styleUrls: ['./viatico-proyecto.page.scss'],
})
export class ViaticoProyectoPage implements OnInit {

  guardado = false;
  comision: number;
  viatico: any;
  viaticoProyecto: any;
  fgCreate: FormGroup;
  id_solicitud_viatico: number;
  

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { 
    this.comision = +this.activatedRoute.snapshot.paramMap.get('id_comision');
    this.fgCreate = this.formBuilder.group({
      id_solicitud_viatico: new FormControl(this.id_solicitud_viatico, [Validators.required]),
      numero_proyecto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    await this.getViaticos();
    this.getViaticosProyecto();
  }

  async saveViaticoProyecto(){
    if (this.fgCreate.valid) {
     
      const resp = await this.auth.saveViaticoProyecto(this.fgCreate.value).toPromise();
      console.log(resp);
      if (resp['ok']) {
        this.presentToast('Guardado correctamente');
        this.guardado = true; 
        
        
      } else {
        this.presentToast('Error');
      }
    } else {
      this.presentToast('Datos no Validos');
    }

  }

  async sendViaticoProyecto(){
    if (confirm("¿Está seguro de enviar los datos? Una vez enviados no podrán ser modificados")) {
      const resp = await this.auth.createViaticoProyecto(this.id_solicitud_viatico,
        this.viaticoProyecto.viatico_proyecto[0].numero_proyecto,
        this.viaticoProyecto.viatico_proyecto[0].cantidad, 1).toPromise();
        console.log(resp);
      if (resp['ok']) {
        this.presentToast('Eviado de forma exitosa');
        this.guardado = true; 
      } else {
        this.presentToast('Error');
      }
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async getViaticos(){
    const resp = await this.auth.getSolicitudViatico(this.comision).toPromise();
    if (resp['ok']) {
      this.viatico = resp['body'];
      this.id_solicitud_viatico = this.viatico.folio;
    } else {
      this.presentToast(resp['mensaje']);
    }
  }

  async getViaticosProyecto(){
    const resp = await this.auth.getViaticoProyecto(this.id_solicitud_viatico).toPromise();
    console.log("viapro", resp);
    
    if (resp['ok']) {
      this.guardado = true;
      this.viaticoProyecto = resp['body'];
     } //else {
    //   this.presentToast(resp['mensaje']);
    // }
  }
}
