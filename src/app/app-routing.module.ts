import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  { path: '',  redirectTo: 'home',pathMatch:'full'},

  {
    path: 'home',
    component: HomeComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
