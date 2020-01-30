import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserPage } from './create-user.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserPageRoutingModule {}
