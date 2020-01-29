import {Component, Input, OnInit} from '@angular/core';
import {ExpedientModel} from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {ProfileService} from '../../../services/profile.service';
import {ToastController} from '@ionic/angular';
import {EXPEDIENT_DATA_DICTIONARY} from '../../../dictionaries/profile';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-expedient',
  templateUrl: './expedient.component.html',
  styleUrls: ['./expedient.component.scss'],
})
export class ExpedientComponent implements OnInit {

  canEditExpedientData = false;
  expedientData: ExpedientModel;
  FILE_URL: string;
  private expedientDataForm: FormGroup;
  expedientDataDic: { [key: string]: any };
  userType: string;

  @Input() codeUrl;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private profileService: ProfileService,
              public toastController: ToastController) {

    this.expedientDataForm = this.formBuilder.group({
      curp_url: new FormControl(null),
      rfc_url: new FormControl(null),
      imss_url: new FormControl(null),
      unique_file_url: new FormControl(null),
      identification_url: new FormControl(null),
      birth_certificate_url: new FormControl(null),
      address_proof_url: new FormControl(null),
      nomination_url: new FormControl(null),
      academy_ascription_dependency: new FormControl(null),
      curriculum_url: new FormControl(null)
    });
  }


  async ngOnInit() {
    this.expedientDataDic = EXPEDIENT_DATA_DICTIONARY;
    // hago esto por si un cp trata de eliminar al maestro, si te fijas en la url es el usuario a ser eliminado
    if (this.auth.userType === 'MT' || this.auth.userType === 'CA') {
      this.codeUrl = this.auth.codeUser;
    }
    this.getExpedientData();
  }

  /**
   * Datos de la api
   */
  async getExpedientData() {
    try {
      const resp = await this.profileService.getExpedientData(this.codeUrl).toPromise();
      this.userType = this.auth.userType;
      // fill es para rellenar los campos del codigo, es necesario por que el bakend pide el codigo como cadena, pero codeUser es un entero
      let fill = '';
      for (let i = (this.codeUrl + '').length; i < 8; i++) {
        fill += '0';
      }
      this.FILE_URL = `${environment.API}/public/personal/${fill}${this.codeUrl}/`;
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.expedientData = resp.data[0] as ExpedientModel;
        this.expedientDataForm.setValue(this.expedientData);
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error in personal data component', error);
    }
  }


  /**
   * hace un update de la informacion
   */
  updateProfile() {
    if (this.auth.userType === 'CP') {
      const formData = new FormData();
      formData.append('code', this.codeUrl);

      if(this.expedientDataForm.value.curp_url)
        formData.append('curp_file', this.expedientDataForm.value.curp_url);
        
      if(this.expedientDataForm.value.rfc_url)
        formData.append('rfc_file', this.expedientDataForm.value.rfc_url);
        
      if(this.expedientDataForm.value.imss_url)
        formData.append('imss_file', this.expedientDataForm.value.imss_url);
        
      if(this.expedientDataForm.value.unique_file_url)
        formData.append('unique_file_file', this.expedientDataForm.value.unique_file_url);
        
      if(this.expedientDataForm.value.identification_url)
        formData.append('identification_file', this.expedientDataForm.value.identification_url);
        
      if(this.expedientDataForm.value.birth_certificate_url)
        formData.append('birth_certificate_file', this.expedientDataForm.value.birth_certificate_url);
        
      if(this.expedientDataForm.value.address_proof_url)
        formData.append('address_proof_file', this.expedientDataForm.value.address_proof_url);
        
      if(this.expedientDataForm.value.nomination_url)
        formData.append('nomination_file', this.expedientDataForm.value.nomination_url);

      this.profileService.updateExpedientData(this.auth.codeUser, formData).subscribe(resp => {
        console.log(resp);
        
        // @ts-ignore
        if (resp.ok) {
          this.canEditExpedientData = false;
          this.getExpedientData();
          this.presentToast('Cambios hechos exitosamente');
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
      });
    }
  }

  /**
   * Toast que maneja los mensajes al usuario
   * @param message - Mensaje a ser mostrado
   */
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Falta por implementar :c
   * @param files
   * @param attrib
   */
  handleFile(files, attrib) {
    if (files.length == 0) return;
    this.expedientDataForm.patchValue({
      [attrib]: files[0]
    });
  }

  /**
   * Abre el archivo en una nueva pestaña
   * @param link - link a abrir
   */
  openFile(link: string) {
    window.open(this.FILE_URL + link, '_blank').focus();
  }
}
