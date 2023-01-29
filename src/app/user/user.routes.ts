import { Routes } from "@angular/router";
import { PageAdminProfileComponent } from "./pages/page-admin-profile/page-admin-profile.component";
import { PageDriverProfileComponent } from "./pages/page-driver-profile/page-driver-profile.component";
import { PageHomePassengerComponent } from "./pages/page-home-passenger/page-home-passenger.component";
import { PagePassengerProfileComponent } from "./pages/page-passenger-profile/page-passenger-profile.component";
import { PagePurchaseTokensComponent } from "./pages/page-purchase-tokens/page-purchase-tokens.component";

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
  }
];