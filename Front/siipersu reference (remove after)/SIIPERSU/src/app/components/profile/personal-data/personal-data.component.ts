import {Component, Input, OnInit} from '@angular/core';
import {PERSONAL_DATA_DICTIONARY} from '../../../dictionaries/profile';
import {environment} from '../../../../environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {ProfileService} from '../../../services/profile.service';
import {ToastController} from '@ionic/angular';
import {PersonalDataModel} from '../../../interfaces/interfaces';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {

  canEditPersonalData = false;
  personalData: PersonalDataModel;
  FILE_URL: string;
  personalDataForm: FormGroup;
  personalDataDic: { [key: string]: any };
  userType: string;

  @Input() codeUrl: string;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private profileService: ProfileService,
              public toastController: ToastController) {
                
    this.personalDataForm = this.formBuilder.group({
      code: new FormControl('',[Validators.required, Validators.maxLength(8)]),
      userType: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      position: new FormControl('',[Validators.required, Validators.maxLength(45)]),
      hire_date: new FormControl('',[Validators.required]),
      names: new FormControl('',[Validators.required, Validators.maxLength(45)]),
      last_name: new FormControl('',[Validators.required, Validators.maxLength(45)]),
      second_last_name: new FormControl('',[Validators.maxLength(45)]),
      picture_url: new FormControl(null,[]),
      alias_degree: new FormControl('',[Validators.required, Validators.maxLength(45)]),
      personal_email: new FormControl('',[Validators.maxLength(45), Validators.email]),
      institutional_email: new FormControl('',[Validators.maxLength(45), Validators.email]),
      home_phone: new FormControl('',[Validators.maxLength(20)]),
      cellphone: new FormControl('',[Validators.maxLength(20)]),
      office_phone: new FormControl('',[Validators.maxLength(20)]),
      extension_office_phone: new FormControl('',[Validators.maxLength(10)]),
      birthday: new FormControl('',[Validators.maxLength(45)]),
      birth_city: new FormControl('',[Validators.maxLength(45)]),
      birth_state: new FormControl('',[Validators.maxLength(45)]),
      birth_country: new FormControl('',[Validators.maxLength(45)]),
      gender: new FormControl('',[Validators.maxLength(1)]),
      marital_status: new FormControl('',[Validators.maxLength(45)]),
      living_state: new FormControl('',[Validators.maxLength(45)]),
      living_country: new FormControl('',[Validators.maxLength(45)]),
      address_colony: new FormControl('',[Validators.maxLength(45)]),
      address_street: new FormControl('',[Validators.maxLength(45)]),
      address_postal_code: new FormControl('',[Validators.maxLength(10)]),
      address_exterior_number: new FormControl('',[Validators.maxLength(45)]),
      address_interior_number: new FormControl('',[Validators.maxLength(45)]),
      curp: new FormControl('',[Validators.maxLength(45)]),
      curp_url: new FormControl(null,[]),
      imss: new FormControl('',[Validators.maxLength(15)]),
      imss_url: new FormControl(null,[]),
      rfc: new FormControl('',[Validators.maxLength(15)]),
      rfc_url: new FormControl(null,[])
    });
  }


  async ngOnInit() {
    this.personalDataDic = PERSONAL_DATA_DICTIONARY;
    // hago esto por si un cp trata de eliminar al maestro, si te fijas en la url es el usuario a ser eliminado
    if (this.auth.userType === 'MT' || this.auth.userType === 'CA') {
      this.codeUrl = this.auth.codeUser;
    }
    this.getPersonalData();
  }

  isInEditionMode() {
    return this.canEditPersonalData;
  }

  /**
   * informacion de la api
   */
  async getPersonalData() {
    try {
      const resp = await this.profileService.getPersonalData(this.codeUrl);
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
        this.personalData = resp.data[0] as PersonalDataModel;
        this.personalDataForm.setValue(this.personalData);
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error in personal data component', error);
    }
  }


  /**
   * Falta de implementar :c
   */
  updateProfile() {
    if (this.auth.userType === 'CP') {
      const formData = new FormData();
      // formData.append('code', this.personalDataForm.value.code);
      if(this.personalDataForm.value.userType)
        formData.append('userType', this.personalDataForm.value.userType);
      if(this.personalDataForm.value.position)
        formData.append('position', this.personalDataForm.value.position);
      if(this.personalDataForm.value.hire_date)
        formData.append('hire_date', new Date(this.personalDataForm.value.hire_date).toJSON().slice(0, 10));
      if(this.personalDataForm.value.names)
        formData.append('names', this.personalDataForm.value.names);
      if(this.personalDataForm.value.last_name)
        formData.append('last_name', this.personalDataForm.value.last_name);
      if(this.personalDataForm.value.second_last_name)
        formData.append('second_last_name', this.personalDataForm.value.second_last_name);
      if(this.personalDataForm.value.picture_url)
        formData.append('picture_url', this.personalDataForm.value.picture_url);
      if(this.personalDataForm.value.alias_degree)
        formData.append('alias_degree', this.personalDataForm.value.alias_degree);
      if(this.personalDataForm.value.personal_email)
        formData.append('personal_email', this.personalDataForm.value.personal_email);
      if(this.personalDataForm.value.institutional_email)
        formData.append('institutional_email', this.personalDataForm.value.institutional_email);
      if(this.personalDataForm.value.home_phone)
        formData.append('home_phone', this.personalDataForm.value.home_phone);
      if(this.personalDataForm.value.cellphone)
        formData.append('cellphone', this.personalDataForm.value.cellphone);
      if(this.personalDataForm.value.office_phone)
        formData.append('office_phone', this.personalDataForm.value.office_phone);
      if(this.personalDataForm.value.extension_office_phone)
        formData.append('extension_office_phone', this.personalDataForm.value.extension_office_phone);
      if(this.personalDataForm.value.birthday)
        formData.append('birthday', new Date(this.personalDataForm.value.birthday).toJSON().slice(0, 10));
      if(this.personalDataForm.value.birth_city)
        formData.append('birth_city', this.personalDataForm.value.birth_city);
      if(this.personalDataForm.value.birth_state)
        formData.append('birth_state', this.personalDataForm.value.birth_state);
      if(this.personalDataForm.value.birth_country)
        formData.append('birth_country', this.personalDataForm.value.birth_country);
      if(this.personalDataForm.value.gender)
        formData.append('gender', this.personalDataForm.value.gender);
      if(this.personalDataForm.value.marital_status)
        formData.append('marital_status', this.personalDataForm.value.marital_status);
      if(this.personalDataForm.value.living_state)
        formData.append('living_state', this.personalDataForm.value.living_state);
      if(this.personalDataForm.value.living_country)
        formData.append('living_country', this.personalDataForm.value.living_country);
      if(this.personalDataForm.value.address_colony)
        formData.append('address_colony', this.personalDataForm.value.address_colony);
      if(this.personalDataForm.value.address_street)
        formData.append('address_street', this.personalDataForm.value.address_street);
      if(this.personalDataForm.value.address_postal_code)
        formData.append('address_postal_code', this.personalDataForm.value.address_postal_code);
      if(this.personalDataForm.value.address_exterior_number)
        formData.append('address_exterior_number', this.personalDataForm.value.address_exterior_number);
      if(this.personalDataForm.value.address_interior_number)
        formData.append('address_interior_number', this.personalDataForm.value.address_interior_number);
      if(this.personalDataForm.value.curp)
        formData.append('curp', this.personalDataForm.value.curp);
      if(this.personalDataForm.value.curp_url)
        formData.append('curp_url', this.personalDataForm.value.curp_url);
      if(this.personalDataForm.value.imss)
        formData.append('imss', this.personalDataForm.value.imss);
      if(this.personalDataForm.value.imss_url)
        formData.append('imss_url', this.personalDataForm.value.imss_url);
      if(this.personalDataForm.value.rfc)
        formData.append('rfc', this.personalDataForm.value.rfc);
      if(this.personalDataForm.value.rfc_url)
        formData.append('rfc_url', this.personalDataForm.value.rfc_url);

      // si el usuario es CP
      this.profileService.updatePersonalDataCP(this.codeUrl, formData).subscribe(resp => {
        // @ts-ignore
        if (resp.ok) {
          this.canEditPersonalData = false;
          this.presentToast('Cambios hechos exitosamente');
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        location.reload();
        
        // thi's.personalDataForm.patchValue({
        //   picture_url: (typeof this.personalDataForm.value.picture_url != 'string') ? this.personalDataForm.value.picture_url.name : null,
        //   curp_url:  (typeof this.personalDataForm.value.curp_url != 'string') ? this.personalDataForm.value.curp_url.name : null,
        //   imss_url:  (typeof this.personalDataForm.value.imss_url != 'string') ? this.personalDataForm.value.imss_url.name : null,
        //   rfc_url:  (typeof this.personalDataForm.value.rfc_url != 'string') ? this.personalDataForm.value.rfc_url.name : null,
        // });'
        
      });
      // si el usuario es MT
    } else {
      const {personal_email, cellphone, office_phone, extension_office_phone, alias_degree} = this.personalDataForm.value;
      const data = {
        personal_email, cellphone, office_phone, extension_office_phone, alias_degree
      };
      this.profileService.updatePersonalData(this.codeUrl, data).subscribe(resp => {
        // @ts-ignore
        if (resp.ok) {
          this.canEditPersonalData = false;
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
   * Pendiente
   * @param files- f
   * @param attrib - a
   */
  submitImage(files, attrib) {
    if (files.length > 0) {
     // this.personalDataForm.patchValue({[attrib]: files[0]});
     this.personalDataForm.patchValue({
      [attrib]: files[0]
     });
    }
  }

  /**
   * Abre el archivo en una nueva pestaña
   * @param link - link a abrir
   */
  openFile(link: string) {
    window.open(this.FILE_URL + link, '_blank').focus();
  }
}
