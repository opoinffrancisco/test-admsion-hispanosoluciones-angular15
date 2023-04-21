import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'guardar',
    pathMatch: 'full'
  },
  {
    path: 'guardar',
    loadComponent: () => import('./registrar/registrar.component').then( m => m.RegistrarComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
