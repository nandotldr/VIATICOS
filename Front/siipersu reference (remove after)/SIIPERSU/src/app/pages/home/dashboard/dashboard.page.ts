import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardItem, PopOverINewstem, PopOverItem } from '../../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { PopConfirmationComponent } from '../../../components/pop-confirmation/pop-confirmation.component';
import { PopNewComponent } from '../../../components/dashboard/pop-new/pop-new.component';
import { AuthServiceService } from '../../../services/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  news: DashboardItem[] = [];
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  editPop: PopOverINewstem = {
    title_card: 'Editar Noticia'
  };
  addPop: PopOverINewstem = {
    title_card: 'Nueva noticia',
  };
  private readonly COORDINADOR_PERSONAL = 'CP';

  constructor(private dashboard: DashboardService, private popOverConf: PopoverController, private auth: AuthServiceService) {
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    // news es un observable
    this.dashboard.getDashboard().subscribe(data => {
      console.log('data', data);
      this.news = data;
    });
  }

  canAddNews() {
    return this.auth.userType === this.COORDINADOR_PERSONAL;
  }

  async addNew(ev: any) {
    const popOver = await this.popOverConf.create({
      component: PopNewComponent,
      event: ev,
      mode: 'ios',
      componentProps: { newPop: this.addPop },
      backdropDismiss: false,
    });
    await popOver.present();
    const { data } = await popOver.onDidDismiss();
    const canModify = data.canDo;
    if (canModify) {
      let newNew = {
        title: data.news.title,
        description: data.news.information,
        file_url: data.news.file_url,
        date: Date.now()
      };
      this.dashboard.addNew(newNew).subscribe(value => {
        if (value['ok']) {
          newNew.file_url = newNew.file_url.name;
          this.news.push(newNew);
        }
      });
    }
  }

  async modifyNew(index, ev: any) {
    this.editPop.title = this.news[index].title;
    this.editPop.information = this.news[index].description;
    this.editPop.file_url = this.news[index].file_url;
    console.log(this.editPop);
    const popOver = await this.popOverConf.create({
      component: PopNewComponent,
      event: ev,
      mode: 'ios',
      componentProps: { newPop: this.editPop },
      backdropDismiss: false,
    });
    await popOver.present();
    const { data } = await popOver.onDidDismiss();
    const canModify = data.canDo;
    if (canModify) {
      this.news[index].title = data.news.title;
      this.news[index].description = data.news.information;
      if (data.news.file_url)
        this.news[index].file_url = data.news.file_url.name;
      this.news[index].date = Date.now();
      this.dashboard.updateNew(this.news[index]).subscribe(value => {
        console.log(value);
        this.getInfo();
      });
    }
  }

  async deleteNew(index, ev: any) {
    const popOver = await this.popOverConf.create({
      component: PopConfirmationComponent,
      event: ev,
      mode: 'ios',
      componentProps: { confirmationPop: this.confirmationPop },
      backdropDismiss: false,
    });
    await popOver.present();
    const { data } = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      this.dashboard.deleteNew(this.news[index]).subscribe(value => {
        if (value['ok']) {
          this.news.splice(index, 1);
        }
      });
    }
  }

  abrirArchivo(id, name) {
    window.open(`${environment.API}/public/news/${id}/${name}`, '_blank');
  }
}


// TODO: poner un Toast para informar de errores
