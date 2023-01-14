import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PagePassengerProfileComponent } from './pages/page-passenger-profile/page-passenger-profile.component';
import { PageAdminProfileComponent } from './pages/page-admin-profile/page-admin-profile.component';
import { PageDriverProfileComponent } from './pages/page-driver-profile/page-driver-profile.component';
import { PageAnswerDriverChangesComponent } from './pages/page-answer-driver-changes/page-answer-driver-changes.component';
import { PageHomeUnregisteredComponent } from './pages/page-home-unregistered/page-home-unregistered.component';
import { PageChangeBlockedStatusComponent } from './pages/page-change-blocked-status/page-change-blocked-status.component';
import { PagePurchaseTokensComponent } from './pages/page-purchase-tokens/page-purchase-tokens.component';
import { PageForgottenPasswordComponent } from './pages/page-forgotten-password/page-forgotten-password.component';
import { ActivatedAccountComponent } from './pages/activated-account/activated-account.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { ModalGiveRatingComponent } from './components/modal-give-rating/modal-give-rating.component';
import { PageViewDriveHistoryComponent } from './pages/page-view-drive-history/page-view-drive-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-guest', pathMatch: 'full' },
  { path: 'home-guest', component: PageHomeUnregisteredComponent },
  {path: 'login', component: PageLoginComponent},
  {path: 'register', component: PageRegisterComponent},
  {path: 'passenger-profile', component: PagePassengerProfileComponent},
  {path: 'admin-profile', component: PageAdminProfileComponent},
  {path: 'driver-profile', component: PageDriverProfileComponent},
  {path: 'answer-driver-data-changes', component: PageAnswerDriverChangesComponent},
  {path: 'change-blocked-status', component: PageChangeBlockedStatusComponent},
  {path: 'purchase-tokens', component: PagePurchaseTokensComponent},
  {path: 'forgotten-password', component: PageForgottenPasswordComponent},
  {path: 'activated-account/:id', component: ActivatedAccountComponent},
  {path: 'reset-password/:email', component: PageResetPasswordComponent},
  //temporary
  {path: 'rate', component: ModalGiveRatingComponent},
  {path: 'view-drive-history', component: PageViewDriveHistoryComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
