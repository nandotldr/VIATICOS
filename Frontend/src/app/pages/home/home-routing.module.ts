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
        loadChildren: () => import('./create-comision/create-comision.module').then(m => m.CreateComisionPageModule),
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
        loadChildren: () => import('./components/program/program.module').then(m => m.ProgramPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'comision-activa',
        loadChildren: () => import('./components/comision-activa/comision-activa.module').then(m => m.ComisionActivaPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'crear-gasto',
        loadChildren: () => import('./components/crear-gasto/crear-gasto.module').then(m => m.CrearGastoPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'historial-viaticos',
        loadChildren: () => import('./historial-viaticos/historial-viaticos.module').then(m => m.HistorialViaticosPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'viatico-informacion',
        loadChildren: () => import('./components/viatico-informacion/viatico-informacion.module').then(m => m.ViaticoInformacionPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'modificar-perfil',
        loadChildren: () => import('./components/modificar-perfil/modificar-perfil.module').then(m => m.ModificarPerfilPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'revisar-comision',
        loadChildren: () => import('./revisar-comision/revisar-comision.module').then(m => m.RevisarComisionPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'crear-informe/:id',
        loadChildren: () => import('./crear-informe/crear-informe.module').then(m => m.CrearInformePageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'comision-creada',
        loadChildren: () => import('./comision-creada/comision-creada.module').then(m => m.ComisionCreadaPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'agenda',
        loadChildren: () => import('./components/agenda/agenda.module').then(m => m.AgendaPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'itinerario',
        loadChildren: () => import('./components/itinerario/itinerario.module').then(m => m.ItinerarioPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'factura',
        loadChildren: () => import('./components/factura/factura.module').then(m => m.FacturaPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'modificar-comision',
        loadChildren: () => import('./components/modificar-comision/modificar-comision.module').then(m => m.ModificarComisionPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'viatico-proyecto/:id_comision',
        loadChildren: () => import('./viatico-proyecto/viatico-proyecto.module').then(m => m.ViaticoProyectoPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'revisar-informe',
        loadChildren: () => import('./revisar-informe/revisar-informe.module').then( m => m.RevisarInformePageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'informe-activo',
        loadChildren: () => import('./components/informe-activo/informe-activo.module').then( m => m.InformeActivoPageModule)
      },
      {
        path: 'revisar-viatico',
        loadChildren: () => import('./revisar-viatico/revisar-viatico.module').then( m => m.RevisarViaticoPageModule),
        canLoad: [AuthGuardService]
      },
      {
        path: 'revisar-proyecto',
        loadChildren: () => import('./revisar-proyecto/revisar-proyecto.module').then( m => m.RevisarProyectoPageModule),
        canLoad: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
