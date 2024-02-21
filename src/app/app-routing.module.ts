import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UnosComponent } from './components/unos/unos.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'unos/:id',component:UnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
