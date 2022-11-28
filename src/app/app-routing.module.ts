import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageRegisterComponent } from './components/page-register/page-register.component';

const routes: Routes = [
  {path: 'login', component: PageLoginComponent},
  {path: 'register', component: PageRegisterComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }