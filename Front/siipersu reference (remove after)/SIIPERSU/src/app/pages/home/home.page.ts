import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from '../../interfaces/interfaces';
import {AppDataService} from '../../services/app-data.service';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menuItems: MenuItem[];
  userType: string;

  constructor(private router: Router, private dataService: AppDataService, private auth: AuthServiceService) {
  }

  async ngOnInit() {
    this.userType = this.auth.userType;
    const value = await this.dataService.getMenu().toPromise();
    this.menuItems = value as MenuItem[];
    this.menuItems[1].redirectTo += `/${this.auth.codeUser}`;

    this.filterMenu(this.menuItems);
  }

  private filterMenu(menuItems: MenuItem[]) {
    if (this.userType === 'MT') {
      menuItems.splice(7, 1); // eliminamos departamento del menu
      menuItems.splice(4, 1); // eliminamos Administracion del menu
      menuItems.splice(3, 1); // eliminamos Expedientes del menu
    } else if (this.userType === 'JP') {
      menuItems.splice(4, 1); // eliminamos Administracion del menu
      menuItems.splice(3, 1); // eliminamos Expedientes del menu
    } else if (this.userType === 'CP') {
      menuItems.splice(7, 1); // eliminamos departamento del menu
    }
  }

  logout() {
    this.auth.logout();
  }
}
