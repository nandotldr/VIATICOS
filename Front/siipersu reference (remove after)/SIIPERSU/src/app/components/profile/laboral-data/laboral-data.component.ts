import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LaboralDataModel, PersonalDataModel, PopOverItem } from '../../../interfaces/interfaces';
import { LABORAL_DATA_DICTIONARY } from '../../../dictionaries/profile';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ProfileService } from '../../../services/profile.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { PopConfirmationComponent } from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-laboral-data',
  templateUrl: './laboral-data.component.html',
  styleUrls: ['./laboral-data.component.scss'],
})
export class LaboralDataComponent implements OnInit {

  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  laboralDataForm: FormGroup;
  contractDataForm: FormGroup;

  contractsObjects: any[] = [];
  laboralObject: any = {};

  laboralDataDic: { [key: string]: any };
  canEditLaboralData = false;
  newContract = false;
  laboralData: LaboralDataModel;

  private FILE_URL: string;
  private userType: string;

  private laboralDataFormData: FormData = new FormData;
  private contractFormData: FormData = new FormData;

  @Input() codeUrl: string;
  constructor(private formBuilder: FormBuilder,
    private auth: AuthServiceService,
    private profileService: ProfileService,
    public toastController: ToastController,
    private popoverConf: PopoverController
  ) {
    this.laboralDataForm = this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      curriculum_url: new FormControl(null),
      academy_ascription_dependency: new FormControl('', [Validators.required]),
      ascription_dependency: new FormControl('', [Validators.required]),
      physical_ascription_dependency: new FormControl('', [Validators.required])
    });
    this.contractDataForm = this.formBuilder.group({
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
    this.laboralDataDic = LABORAL_DATA_DICTIONARY;
    // hago esto por si un cp trata de eliminar al maestro, si te fijas en la url es el usuario a ser eliminado
    if (this.auth.userType === 'MT' || this.auth.userType === 'CA') {
      this.codeUrl = this.auth.codeUser;
    }
    this.getLaboralData();
  }

  /**
   * Datos de la api
   */
  async getLaboralData() {

    try {
      this.laboralObject = {};
      this.contractsObjects = [];

      const resp = await this.profileService.getLaboralData(this.codeUrl).toPromise();
      this.userType = this.auth.userType;
      // fill es para rellenar los campos del codigo, es necesario porque el bakend pide el codigo como cadena, pero codeUser es un entero
      let fill = '';
      for (let i = (this.codeUrl + '').length; i < 8; i++) {
        fill += '0';
      }
      this.FILE_URL = `${environment.API}/public/personal/${fill}${this.codeUrl}/`;
      // @ts-ignore
      this.laboralObject = resp.data as LaboralDataModel;

      // si determinado usuario no tiene contratos, creo una propiedad vacia, necesaria para que el formArray funcione correctamente
      if (!resp['data'].contracts) {
        this.contractsObjects = [];
      } else {
        this.contractsObjects = resp['data'].contracts;
      }
      // this.laboralDataForm.patchValue(this.laboralData);
    } catch (error) {
      console.error('Error en laboral data', error);
    }
  }

  /**
   * Borra un contrato
   * @param index - indice a eliminar
   */
  async deleteContract(index) {
    // esto llama a un popover para confirmar la eliminacion del usuario
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: { confirmationPop: this.confirmationPop },
      backdropDismiss: false,
    });
    await popOver.present();
    const { data } = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      const id = this.laboralDataForm.value.contracts[index]['id'];
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        //this.removeContractLocal(index);
      } else {
        const resp = await this.profileService.deleteContract(this.codeUrl, id).toPromise();
        if (resp.ok) {
          this.presentToast('Borrado con exito');
        } else {
          this.presentToast(resp.message);
        }
      }
    }
  }

  handleFileLaboralData(files) {
    if (files.length > 0) {
      this.laboralDataFormData.append('curriculum_file', files[0]);
    }
  }

  updateLaboralData() {
    this.laboralDataFormData.append('academy_ascription_dependency', this.laboralDataForm.value.academy_ascription_dependency);
    this.laboralDataFormData.append('ascription_dependency', this.laboralDataForm.value.ascription_dependency);
    this.laboralDataFormData.append('physical_ascription_dependency', this.laboralDataForm.value.physical_ascription_dependency);
    console.log(this.laboralDataFormData.get('curriculum_file'));
    this.profileService.updateLaboralData(this.auth.codeUser, this.laboralDataFormData)
      .subscribe(async resp => {
        if (resp['ok']) {
          this.presentToast('Modificado correctamente.');
          this.canEditLaboralData = false;
          await this.getLaboralData();
        } else {
          this.presentToast(resp['message']);
        }
      });
    // Limpiar el form data
    this.laboralDataFormData = new FormData;
  }


  handleFileContract(files) {
    if (files.length === 0) return;
    this.contractDataForm.patchValue({
      digitized_url: files[0]
    })

    console.log(this.contractDataForm);
    
  }

  async createContract() {
    this.contractFormData.append('type', this.contractDataForm.value.type);
    if(this.contractDataForm.value.digitized_url)
      this.contractFormData.append('digitized_file', this.contractDataForm.value.digitized_url);
    this.contractFormData.append('educational_contract', this.contractDataForm.value.educational_contract);
    this.contractFormData.append('temporarily', this.contractDataForm.value.temporarily);
    this.contractFormData.append('start_date', new Date(this.contractDataForm.value.start_date).toJSON().slice(0, 10));
    this.contractFormData.append('end_date', new Date(this.contractDataForm.value.end_date).toJSON().slice(0, 10));
    this.contractFormData.append('work_shift', this.contractDataForm.value.work_shift);
    this.contractFormData.append('semanal_work', this.contractDataForm.value.semanal_work);
    this.contractFormData.append('ascription', this.contractDataForm.value.ascription);
    this.contractFormData.append('status', this.contractDataForm.value.status);

    this.profileService.createContract(this.auth.codeUser, this.contractFormData)
      .subscribe(async resp => {
        console.log(resp);

        if (resp['ok']) {
          this.presentToast('Modificado correctamente.');
          this.newContract = false;
          await this.getLaboralData();
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
    this.canEditLaboralData = !this.canEditLaboralData;
    if (this.canEditLaboralData) {
      this.laboralDataForm.patchValue(this.laboralObject);
    } else {
      this.laboralDataFormData = new FormData;
      this.contractFormData = new FormData;
    }
  }

  /**
   * Cambia el modo de edicion
   */
  changeNewContractMode() {
    this.newContract = !this.newContract;
    if (this.newContract) {
    } else {
      this.contractFormData = new FormData;
    }
  }
}
