import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {ExpedientService} from '../../../services/expedient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-expedients-page',
  templateUrl: './expedients.page.html',
  styleUrls: ['./expedients.page.scss'],
})
export class ExpedientsPage implements OnInit {
  codeUser: string;

  constructor(private router: Router, private auth: AuthServiceService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.codeUser = this.auth.userType;
    // no permitir el acceso a esta pagina, redireccionar a home
    if (this.auth.userType === 'MT' || this.auth.userType === 'CA') {
      this.router.navigateByUrl('/home');
    }
  }


}
