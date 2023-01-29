import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from "@angular/material/chips";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MapDriveSimulationComponent } from "./components/map-drive-simulation/map-drive-simulation.component";
import { MapComponent } from "./components/map/map.component";
import { ModalDetailedHistoryViewComponent } from "./components/modal-detailed-history-view/modal-detailed-history-view.component";
import { ModalMapHistoryViewComponent } from "./components/modal-map-history-view/modal-map-history-view.component";
import { ModalPasswordChangeComponent } from "./components/modal-password-change/modal-password-change.component";
import { ModalPersonalInfoChangeComponent } from "./components/modal-personal-info-change/modal-personal-info-change.component";
import { ModalPictureChangeComponent } from "./components/modal-picture-change/modal-picture-change.component";
import { ProfileInfoComponent } from "./components/profile-info/profile-info.component";
import { ProfilePageCardComponent } from "./components/profile-page-card/profile-page-card.component";
import { ProfilePageCardsComponent } from "./components/profile-page-cards/profile-page-cards.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { RouteDetailsComponent } from "./components/route-details/route-details.component";
import { RouteFormComponent } from "./components/route-form/route-form.component";
import { ViewHistoryComponent } from "./components/view-history/view-history.component";
import { RouterModule } from "@angular/router";
import { ChartsComponent } from "./components/charts/charts.component";
import { LocationFilterPipe } from "./pipe/location-filter.pipe";
import { ClickOutsideDestinationDirective } from "./directives/click-outside-destination.directive";
import { ClickOutsideExtraDestinationDirective } from "./directives/click-outside-extra-destination.directive";
import { ClickOutsidePickupDirective } from "./directives/click-outside-pickup.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ChartsComponent,
        MapComponent,
        MapDriveSimulationComponent,
        ModalDetailedHistoryViewComponent,
        ModalMapHistoryViewComponent,
        ModalPasswordChangeComponent,
        ModalPersonalInfoChangeComponent,
        ModalPictureChangeComponent,
        ProfileInfoComponent,
        ProfilePageCardComponent,
        ProfilePageCardsComponent,
        RouteDetailsComponent,
        RouteFormComponent,
        ViewHistoryComponent,
        RegistrationComponent,
        LocationFilterPipe,
        ClickOutsideDestinationDirective,
        ClickOutsideExtraDestinationDirective,
        ClickOutsidePickupDirective
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatOptionModule,
        MatDatepickerModule,
        NgxChartsModule,
        FormsModule,
        ReactiveFormsModule,
        LeafletModule,
        DragDropModule,
        FontAwesomeModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule
    ],
    exports: [
        ChartsComponent,
        MapComponent,
        MapDriveSimulationComponent,
        ModalDetailedHistoryViewComponent,
        ModalMapHistoryViewComponent,
        ModalPasswordChangeComponent,
        ModalPersonalInfoChangeComponent,
        ModalPictureChangeComponent,
        ProfileInfoComponent,
        ProfilePageCardComponent,
        ProfilePageCardsComponent,
        RouteDetailsComponent,
        RouteFormComponent,
        ViewHistoryComponent,
        RegistrationComponent,
        LocationFilterPipe,
        ClickOutsideDestinationDirective,
        ClickOutsideExtraDestinationDirective,
        ClickOutsidePickupDirective
    ]
})
export class SharedModule {}