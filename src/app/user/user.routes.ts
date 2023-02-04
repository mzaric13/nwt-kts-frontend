import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { PageAdminProfileComponent } from "./pages/page-admin-profile/page-admin-profile.component";
import { PageAnswerDriverChangesComponent } from "./pages/page-answer-driver-changes/page-answer-driver-changes.component";
import { PageChangeBlockedStatusComponent } from "./pages/page-change-blocked-status/page-change-blocked-status.component";
import { PageChartsComponent } from "./pages/page-charts/page-charts.component";
import { PageChatListComponent } from "./pages/page-chat-list/page-chat-list.component";
import { PageCustomizeRideComponent } from "./pages/page-customize-ride/page-customize-ride.component";
import { PageDriveSimulationComponent } from "./pages/page-drive-simulation/page-drive-simulation.component";
import { PageDriverProfileComponent } from "./pages/page-driver-profile/page-driver-profile.component";
import { PageGiveConsentComponent } from "./pages/page-give-consent/page-give-consent.component";
import { PageHomePassengerComponent } from "./pages/page-home-passenger/page-home-passenger.component";
import { PageLiveChatComponent } from "./pages/page-live-chat/page-live-chat.component";
import { PagePassengerProfileComponent } from "./pages/page-passenger-profile/page-passenger-profile.component";
import { PagePurchaseTokensComponent } from "./pages/page-purchase-tokens/page-purchase-tokens.component";
import { PageRegisterDriverComponent } from "./pages/page-register-driver/page-register-driver.component";
import { PageViewDriveHistoryComponent } from "./pages/page-view-drive-history/page-view-drive-history.component";

export const UserRoutes: Routes = [
  {
    path: "passenger-profile",
    pathMatch: "full",
    component: PagePassengerProfileComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER'}
  },
  {
    path: 'admin-profile',
    pathMatch: 'full',
    component: PageAdminProfileComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_ADMIN'}
  },
  { 
    path: 'home-passenger', 
    component: PageHomePassengerComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER'} 
  },
  {
    path: 'driver-profile',
    component: PageDriverProfileComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_DRIVER'}
  },
  {
    path: 'purchase-tokens',
    component: PagePurchaseTokensComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER'}
  },
  {
    path: 'customize-ride',
    component: PageCustomizeRideComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER'}
  },
  {
    path: 'view-drive-history',
    component: PageViewDriveHistoryComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER|ROLE_DRIVER|ROLE_ADMIN'}
  },
  {
    path: 'show-charts',
    component: PageChartsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER|ROLE_DRIVER|ROLE_ADMIN'}
  },
  {
    path: 'give-consent',
    component: PageGiveConsentComponent,
  },
  {
    path: 'chat/:name',
    component: PageLiveChatComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER|ROLE_DRIVER|ROLE_ADMIN'}
  },
  {
    path: 'chat-list',
    component: PageChatListComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_ADMIN'}
  },
  {
    path: 'drive-simulation/:id',
    component: PageDriveSimulationComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_PASSENGER|ROLE_DRIVER'}
  },
  {
    path: 'answer-driver-data-changes',
    component: PageAnswerDriverChangesComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_ADMIN'}
  },
  {
    path: 'change-blocked-status',
    component: PageChangeBlockedStatusComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_ADMIN'}
  },
  {
    path: 'register-driver',
    component: PageRegisterDriverComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'ROLE_ADMIN'}
  },
];