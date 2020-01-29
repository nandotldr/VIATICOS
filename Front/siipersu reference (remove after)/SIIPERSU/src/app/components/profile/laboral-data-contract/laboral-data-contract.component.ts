import {Component, Input, OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {LaboralDataModel, PersonalDataModel, PopOverItem} from '../../../interfaces/interfaces';
import {LABORAL_DATA_DICTIONARY} from '../../../dictionaries/profile';
import {AuthServiceService} from '../../../services/auth-service.service';
import {ProfileService} from '../../../services/profile.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {environment} from '../../../../environments/environment';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-laboral-data-contract',
  templateUrl: './laboral-data-contract.component.html',
  styleUrls: ['./laboral-data-contract.component.scss'],
})
export class LaboralDataContractComponent implements OnInit {

  @Input() contract;

  codeUrl: string;
  userType: string;

  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };

  contractDataForm: FormGroup;

  laboralDataDic: { [key: string]: any };
  editMode = false;

  private FILE_URL: string;

  private contractFormData: FormData = new FormData;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private profileService: ProfileService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.contractDataForm = this.formBuilder.group({
        id: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        educational_contract: new FormControl('', [Validators.required]),
        digitized_url: new FormControl(null),
        temporarily: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        work_shift: new FormControl('', [Validators.required]),
        semanal_work: new FormControl('', [Validators.required]),
        ascription: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
    })
  }

  async ngOnInit() {
    // hago esto por si un cp trata de eliminar al maestro, si te fijas en la url es el usuario a ser eliminado
    this.userType = this.auth.userType;
    this.codeUrl = this.auth.codeUser;
    this.laboralDataDic = LABORAL_DATA_DICTIONARY;
    this.FILE_URL = `${environment.API}/public/personal/${this.codeUrl}/`;
  }

  /**
   * Borra un contrato
   * @param index - indice a eliminar
   */
  async deleteContract() {
    console.log(this.contract);
    
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: {confirmationPop: this.confirmationPop},
      backdropDismiss: false,
    });
    await popOver.present();
    const {data} = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      this.profileService.deleteContract(this.auth.codeUser, this.contract.id)
      .subscribe(async resp => {
        if(resp['ok']) {
          this.presentToast('Eliminado correctamente.');
          this.contract = this.contractDataForm.value;
          this.editMode = false;
          window.location.reload();
        } else {
          this.presentToast(resp['message']);
        }
      });
    }

  }

  handleFileLaboralData( files) {
    if(files.length > 0) {
      this.contractFormData.append('digitized_file', files[0]);
    }
  }

  async updateContract() {
    this.contractFormData.append('id', this.contractDataForm.value.id);
    this.contractFormData.append('type', this.contractDataForm.value.type);
    this.contractFormData.append('educational_contract', this.contractDataForm.value.educational_contract);
    this.contractFormData.append('temporarily', this.contractDataForm.value.temporarily);
    this.contractFormData.append('start_date', new Date(this.contractDataForm.value.start_date).toJSON().slice(0, 10));
    this.contractFormData.append('end_date', new Date(this.contractDataForm.value.end_date).toJSON().slice(0, 10));
    this.contractFormData.append('work_shift', this.contractDataForm.value.work_shift);
    this.contractFormData.append('semanal_work', this.contractDataForm.value.semanal_work);
    this.contractFormData.append('ascription', this.contractDataForm.value.ascription);
    this.contractFormData.append('status', this.contractDataForm.value.status);

    this.profileService.updateContract(this.auth.codeUser, this.contractFormData)
      .subscribe(async resp => {
        console.log(resp);
        
        if(resp['ok']) {
          this.presentToast('Modificado correctamente.');
          this.contract = this.contractDataForm.value;
          this.editMode = false;
          window.location.reload();
        } else {
          this.presentToast(resp['message']);
        }
      });
    // Limpiar el form data
    this.contractFormData = new FormData;
  }

  /**
   * Abre el archivo en una nueva pestaña
   * @param link - link a abrir
   */
  openFile(link: string) {
    window.open(this.FILE_URL + link, '_blanl').focus();
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
   * Cambia el modo de edicion
   */
  changeEditMode() {
    this.editMode = !this.editMode;
    if(this.editMode) {
      this.contractDataForm.patchValue(this.contract);
    } else {
      this.contractFormData = new FormData;
    }
  }
}
