import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.page.html',
  styleUrls: ['./viatico.page.scss','../../../app.component.scss'],
})
export class ViaticoPage implements OnInit {

  //@Input() comision: string  = '';
  comisionCompleta = '';
  comision: Number;
  viatico: any;
  fgCreate: FormGroup;
  fgGasto: FormGroup;
  token: string;
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute
    ) {
      this.comision = +this.activatedRoute.snapshot.paramMap.get('folio');
      this.fgCreate = this.formBuilder.group({
        id_comision: new FormControl(this.comision, []),
        invitado_nombre: new FormControl('', []),
        comentarios: new FormControl('', [])
      });

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
    this.getComision();
    
    //this.fgCreate.value.id_comision = this.comisionCompleta;
    
  }

  async getComision(){
    const resp = await this.auth.getComision(this.comision);
    if (resp) {
      this.comisionCompleta = resp;
    } else {
      this.presentToast(resp.mensaje);
    }
  }

  async saveViatico(){
    if (this.fgCreate.valid) {
     
      const resp = await this.auth.saveViatico(this.fgCreate.value).toPromise();
      if (resp) {
        this.presentToast('Guardado correctamente');
        this.viatico = resp;
      } else {
        this.presentToast('Error');
      }
    } else {
      this.presentToast('Datos no Validos');
    }
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
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
