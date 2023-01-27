import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NavbarStartPageComponent } from './components/navbar-start-page/navbar-start-page.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { ProfilePageCardComponent } from './components/profile-page-card/profile-page-card.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfilePageCardsComponent } from './components/profile-page-cards/profile-page-cards.component';
import { PagePassengerProfileComponent } from './pages/page-passenger-profile/page-passenger-profile.component';
import { ModalPersonalInfoChangeComponent } from './components/modal-personal-info-change/modal-personal-info-change.component';
import { ModalPasswordChangeComponent } from './components/modal-password-change/modal-password-change.component';
import { ModalPictureChangeComponent } from './components/modal-picture-change/modal-picture-change.component';
import { PageAdminProfileComponent } from './pages/page-admin-profile/page-admin-profile.component';
import { PageDriverProfileComponent } from './pages/page-driver-profile/page-driver-profile.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { ModalDriverDataChangeComponent } from './components/modal-driver-data-change/modal-driver-data-change.component';
import { TableDriverDataChangesComponent } from './components/table-driver-data-changes/table-driver-data-changes.component';
import { PageAnswerDriverChangesComponent } from './pages/page-answer-driver-changes/page-answer-driver-changes.component';
import { PageHomeUnregisteredComponent } from './pages/page-home-unregistered/page-home-unregistered.component';
import { MapComponent } from './components/map/map.component';
import { RouteFormComponent } from './components/route-form/route-form.component';
import { ClickOutsidePickupDirective } from './directives/click-outside-pickup.directive';
import { LocationFilterPipe } from './pipes/location-filter.pipe';
import { ClickOutsideDestinationDirective } from './directives/click-outside-destination.directive';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { TableBlockUsersComponent } from './components/table-block-users/table-block-users.component';
import { PageChangeBlockedStatusComponent } from './pages/page-change-blocked-status/page-change-blocked-status.component';
import { ModalChangeBlockedStatusComponent } from './components/modal-change-blocked-status/modal-change-blocked-status.component';
import { PagePurchaseTokensComponent } from './pages/page-purchase-tokens/page-purchase-tokens.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { PageForgottenPasswordComponent } from './pages/page-forgotten-password/page-forgotten-password.component';
import { ActivatedAccountComponent } from './pages/activated-account/activated-account.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageHomePassengerComponent } from './pages/page-home-passenger/page-home-passenger.component';
import { NavbarPassengerComponent } from './components/navbar-passenger/navbar-passenger.component';
import { ClickOutsideExtraDestinationDirective } from './directives/click-outside-extra-destination.directive';
import { PageCustomizeRideComponent } from './pages/page-customize-ride/page-customize-ride.component';
import { FavoriteRouteButtonComponent } from './components/favorite-route-button/favorite-route-button.component';
import { RouteSummaryComponent } from './components/route-summary/route-summary.component';
import { RideOptionsComponent } from './components/ride-options/ride-options.component';
import { TagFilterPipe } from './pipes/tag-filter.pipe';
import { ClickOutsideTagDirective } from './directives/click-outside-tag.directive';
import { TagFilterUsedPipe } from './pipes/tag-filter-used.pipe';
import { ModalGiveRatingComponent } from './components/modal-give-rating/modal-give-rating.component';
import { ViewHistoryComponent } from './components/view-history/view-history.component';
import { PageViewDriveHistoryComponent } from './pages/page-view-drive-history/page-view-drive-history.component';
import { ModalDetailedHistoryViewComponent } from './components/modal-detailed-history-view/modal-detailed-history-view.component';
import { ModalMapHistoryViewComponent } from './components/modal-map-history-view/modal-map-history-view.component';
import { NavbarDriverComponent } from './components/navbar-driver/navbar-driver.component';
import { ChartsComponent } from './components/charts/charts.component';
import { PageChartsComponent } from './pages/page-charts/page-charts.component';
import { PageDriveAcceptedComponent } from './pages/page-drive-accepted/page-drive-accepted.component';
import { PageDriveRejectedComponent } from './pages/page-drive-rejected/page-drive-rejected.component';
import { PageLiveChatComponent } from './pages/page-live-chat/page-live-chat.component';
import { PageChatListComponent } from './pages/page-chat-list/page-chat-list.component';
import { MapDriveSimulationComponent } from './components/map-drive-simulation/map-drive-simulation.component';
import { PageDriveSimulationComponent } from './pages/page-drive-simulation/page-drive-simulation.component';
import { DriveInconsistencyFormComponent } from './components/drive-inconsistency-form/drive-inconsistency-form.component';
import { DriveEndFormComponent } from './components/drive-end-form/drive-end-form.component';
import { DriveStartCancelFormComponent } from './components/drive-start-cancel-form/drive-start-cancel-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarStartPageComponent,
    PageLoginComponent,
    PageRegisterComponent,
    ProfilePageCardComponent,
    ProfileInfoComponent,
    ProfilePageCardsComponent,
    PagePassengerProfileComponent,
    ModalPersonalInfoChangeComponent,
    ModalPasswordChangeComponent,
    ModalPictureChangeComponent,
    PageAdminProfileComponent,
    PageDriverProfileComponent,
    NavbarAdminComponent,
    ModalDriverDataChangeComponent,
    TableDriverDataChangesComponent,
    PageAnswerDriverChangesComponent,
    PageHomeUnregisteredComponent,
    MapComponent,
    RouteFormComponent,
    ClickOutsidePickupDirective,
    LocationFilterPipe,
    ClickOutsideDestinationDirective,
    RouteDetailsComponent,
    TableBlockUsersComponent,
    PageChangeBlockedStatusComponent,
    ModalChangeBlockedStatusComponent,
    PagePurchaseTokensComponent,
    PaymentCardComponent,
    PageForgottenPasswordComponent,
    ActivatedAccountComponent,
    PageResetPasswordComponent,
    PageHomePassengerComponent,
    NavbarPassengerComponent,
    ClickOutsideExtraDestinationDirective,
    PageCustomizeRideComponent,
    FavoriteRouteButtonComponent,
    RouteSummaryComponent,
    RideOptionsComponent,
    TagFilterPipe,
    ClickOutsideTagDirective,
    TagFilterUsedPipe,
    ModalGiveRatingComponent,
    ModalGiveRatingComponent,
    ViewHistoryComponent,
    PageViewDriveHistoryComponent,
    ModalDetailedHistoryViewComponent,
    ModalMapHistoryViewComponent,
    NavbarDriverComponent,
    ChartsComponent,
    PageChartsComponent,
    PageDriveAcceptedComponent,
    PageDriveRejectedComponent,
    PageLiveChatComponent,
    PageChatListComponent,
    MapDriveSimulationComponent,
    PageDriveSimulationComponent,
    DriveInconsistencyFormComponent,
    DriveEndFormComponent,
    DriveStartCancelFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    MatAutocompleteModule,
    MatOptionModule,
    LeafletModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('865121524523148'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
