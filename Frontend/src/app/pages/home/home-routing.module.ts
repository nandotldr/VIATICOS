import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'profile'
      },
      {
        path: 'create-comision',
        loadChildren: () => import('./create-comision/create-comision.module').then( m => m.CreateComisionPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'viatico/:folio',
        loadChildren: () => import('./viatico/viatico.module').then(m => m.ViaticoPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'program',
        loadChildren: () => import('./components/program/program.module').then(m => m.ProgramPageModule)
      },
      {
        path: 'comision-activa',
        loadChildren: () => import('./components/comision-activa/comision-activa.module').then(m => m.ComisionActivaPageModule)
      },
      {
        path: 'crear-gasto/',
        loadChildren: () => import('./components/crear-gasto/crear-gasto.module').then( m => m.CrearGastoPageModule)
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
