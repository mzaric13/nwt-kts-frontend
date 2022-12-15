import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PagePassengerProfileComponent } from './pages/page-passenger-profile/page-passenger-profile.component'
import { PageAdminProfileComponent } from './pages/page-admin-profile/page-admin-profile.component';
import { PageDriverProfileComponent } from './pages/page-driver-profile/page-driver-profile.component';
import { PageAnswerDriverChangesComponent } from './pages/page-answer-driver-changes/page-answer-driver-changes.component';
import { PageChangeBlockedStatusComponent } from './pages/page-change-blocked-status/page-change-blocked-status.component';

const routes: Routes = [
  {path: 'login', component: PageLoginComponent},
  {path: 'register', component: PageRegisterComponent},
  {path: 'passenger-profile', component: PagePassengerProfileComponent},
  {path: 'admin-profile', component: PageAdminProfileComponent},
  {path: 'driver-profile', component: PageDriverProfileComponent},
  {path: 'answer-driver-data-changes', component: PageAnswerDriverChangesComponent},
  {path: 'change-blocked-status', component: PageChangeBlockedStatusComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }