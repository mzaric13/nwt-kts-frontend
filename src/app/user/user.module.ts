import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
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
import { SharedModule } from "../shared/shared.module";
import { DriveEndFormComponent } from "./components/drive-end-form/drive-end-form.component";
import { DriveInconsistencyFormComponent } from "./components/drive-inconsistency-form/drive-inconsistency-form.component";
import { DriveStartCancelFormComponent } from "./components/drive-start-cancel-form/drive-start-cancel-form.component";
import { FavoriteRouteButtonComponent } from "./components/favorite-route-button/favorite-route-button.component";
import { ModalChangeBlockedStatusComponent } from "./components/modal-change-blocked-status/modal-change-blocked-status.component";
import { ModalDriverDataChangeComponent } from "./components/modal-driver-data-change/modal-driver-data-change.component";
import { ModalGiveRatingComponent } from "./components/modal-give-rating/modal-give-rating.component";
import { PaymentCardComponent } from "./components/payment-card/payment-card.component";
import { RideOptionsComponent } from "./components/ride-options/ride-options.component";
import { RouteSummaryComponent } from "./components/route-summary/route-summary.component";
import { TableBlockUsersComponent } from "./components/table-block-users/table-block-users.component";
import { TableDriverDataChangesComponent } from "./components/table-driver-data-changes/table-driver-data-changes.component";
import { TagFilterPipe } from "./pipe/tag-filter.pipe";
import { TagFilterUsedPipe } from "./pipe/tag-filter-used.pipe";
import { ClickOutsideTagDirective } from "./directives/click-outside-tag.directive";
import { RouterModule } from "@angular/router";
import { UserRoutes } from "./user.routes";
import { CommonModule } from "@angular/common";
import { PaypalCardComponent } from './components/paypal-card/paypal-card.component';

@NgModule({
    declarations: [
        PageAdminProfileComponent,
        PageAnswerDriverChangesComponent,
        PageChangeBlockedStatusComponent,
        PageChartsComponent,
        PageChatListComponent,
        PageCustomizeRideComponent,
        PageDriveAcceptedComponent,
        PageDriveRejectedComponent,
        PageDriveSimulationComponent,
        PageDriverProfileComponent,
        PageHomePassengerComponent,
        PageLiveChatComponent,
        PagePassengerProfileComponent,
        DriveEndFormComponent,
        DriveInconsistencyFormComponent,
        DriveStartCancelFormComponent,
        FavoriteRouteButtonComponent,
        ModalChangeBlockedStatusComponent,
        ModalDriverDataChangeComponent,
        ModalGiveRatingComponent,
        PaymentCardComponent,
        RideOptionsComponent,
        RouteSummaryComponent,
        TableBlockUsersComponent,
        TableDriverDataChangesComponent,
        TagFilterPipe,
        TagFilterUsedPipe,
        ClickOutsideTagDirective,
        PaypalCardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatChipsModule,
        NgxMaterialTimepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        SharedModule,
        RouterModule.forChild(UserRoutes)
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class UserModule {};