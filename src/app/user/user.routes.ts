import { Routes } from "@angular/router";
import { PageAdminProfileComponent } from "./pages/page-admin-profile/page-admin-profile.component";
import { PageAnswerDriverChangesComponent } from "./pages/page-answer-driver-changes/page-answer-driver-changes.component";
import { PageChangeBlockedStatusComponent } from "./pages/page-change-blocked-status/page-change-blocked-status.component";
import { PageChartsComponent } from "./pages/page-charts/page-charts.component";
import { PageChatListComponent } from "./pages/page-chat-list/page-chat-list.component";
import { PageCustomizeRideComponent } from "./pages/page-customize-ride/page-customize-ride.component";
import { PageDriveAcceptedComponent } from "./pages/page-drive-accepted/page-drive-accepted.component";
import { PageDriveRejectedComponent } from "./pages/page-drive-rejected/page-drive-rejected.component";
import { PageDriveSimulationComponent } from "./pages/page-drive-simulation/page-drive-simulation.component";
import { PageDriverProfileComponent } from "./pages/page-driver-profile/page-driver-profile.component";
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
    //canActivate: [LoginGuard],
  },
  {
    path: 'admin-profile',
    pathMatch: 'full',
    component: PageAdminProfileComponent
  },
  { 
    path: 'home-passenger', 
    component: PageHomePassengerComponent 
  },
  {
    path: 'driver-profile',
    component: PageDriverProfileComponent
  },
  {
    path: 'purchase-tokens',
    component: PagePurchaseTokensComponent
  },
  {
    path: 'customize-ride',
    component: PageCustomizeRideComponent
  },
  {
    path: 'view-drive-history',
    component: PageViewDriveHistoryComponent
  },
  {
    path: 'show-charts',
    component: PageChartsComponent,
  },
  {
    path: 'drive-accepted',
    component: PageDriveAcceptedComponent
  },
  {
    path: 'drive-rejected',
    component: PageDriveRejectedComponent
  },
  {
    path: 'chat/:name',
    component: PageLiveChatComponent
  },
  {
    path: 'chat-list',
    component: PageChatListComponent
  },
  {
    path: 'drive-simulation/:id',
    component: PageDriveSimulationComponent
  },
  {
    path: 'answer-driver-data-changes',
    component: PageAnswerDriverChangesComponent
  },
  {
    path: 'change-blocked-status',
    component: PageChangeBlockedStatusComponent
  },
  {
    path: 'register-driver',
    component: PageRegisterDriverComponent,
  },
];