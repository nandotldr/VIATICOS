import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {AuthGuardService} from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'profile/:id',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        canLoad: [AuthGuardService],
      },
      {
        path: 'curriculum',
        loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumPageModule),
        canLoad: [AuthGuardService],
      },
      {
        path: 'expedients',
        loadChildren: () => import('./expedients/expedients.module').then(m => m.ExpedientsPageModule),
        canLoad: [AuthGuardService],
      },
      {
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationPageModule),
        canLoad: [AuthGuardService],
      },
      {
        path: 'plan-and-reports',
        loadChildren: () => import('./plan-and-reports/plan-and-reports.module').then( m => m.PlanAndReportsPageModule),
        canLoad: [AuthGuardService],
      },
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then( m => m.DepartmentPageModule),
        canLoad: [AuthGuardService],
      },
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {
}
