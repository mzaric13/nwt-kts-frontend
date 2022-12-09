import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PagePassengerProfileComponent } from './pages/page-passenger-profile/page-passenger-profile.component'
import { PageAdminProfileComponent } from './pages/page-admin-profile/page-admin-profile.component';

const routes: Routes = [
  {path: 'login', component: PageLoginComponent},
  {path: 'register', component: PageRegisterComponent},
  {path: 'passenger-profile', component: PagePassengerProfileComponent},
  {path: 'admin-profile', component: PageAdminProfileComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }