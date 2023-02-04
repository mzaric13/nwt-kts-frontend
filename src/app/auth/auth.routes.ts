import { Routes } from "@angular/router";
import { LoginGuard } from "./guards/login/login.guard";
import { PageLoginComponent } from "./pages/page-login/page-login.component";

export const AuthRoutes: Routes = [
  {
    path: "login",
    pathMatch: "full",
    component: PageLoginComponent,
    canActivate: [LoginGuard],
  },
];