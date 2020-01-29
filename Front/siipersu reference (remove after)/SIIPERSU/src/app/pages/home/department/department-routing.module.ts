import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentPage } from './department.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentPage
  },
  {
    path: 'inform/:id/:code',
    loadChildren: () => import('./inform/inform.module').then( m => m.InformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentPageRoutingModule {}
