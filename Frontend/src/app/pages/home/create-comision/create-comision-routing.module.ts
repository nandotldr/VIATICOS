import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComisionPage } from './create-comision.page';

const routes: Routes = [
  {
    path: '',
    component: CreateComisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateComisionPageRoutingModule {}
