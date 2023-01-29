import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedAccountComponent } from './pages/activated-account/activated-account.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PageForgottenPasswordComponent } from './pages/page-forgotten-password/page-forgotten-password.component';
import { PageHomeUnregisteredComponent } from './pages/page-home-unregistered/page-home-unregistered.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/home-guest', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home-guest', component: PageHomeUnregisteredComponent },
      { path: 'forgotten-password', component: PageForgottenPasswordComponent },
      { path: 'activated-account/:id', component: ActivatedAccountComponent },
      { path: 'reset-password/:email', component: PageResetPasswordComponent },
    ]
  },
  { 
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      }
    ]
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
