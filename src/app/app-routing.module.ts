import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HistogramaComponent } from './pages/histograma/histograma.component';
import { AuthGuardService } from './auth-guard.service';
import { Top5Component } from './pages/top5/top5.component';


const routes: Routes = [
  {path:'inicio',component:InicioComponent},
  { path: 'histograma', component: HistogramaComponent, canActivate: [AuthGuardService] },
  {path:'top5',component: Top5Component, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
