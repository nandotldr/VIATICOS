import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformPage } from './inform.page';

const routes: Routes = [
  {
    path: '',
    component: InformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformPageRoutingModule {}
