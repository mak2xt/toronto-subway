import { NgModule } from "@angular/core";

import { StationPickerDesktopComponent } from "./station-picker-desktop/station-picker-desktop.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { PickerState } from "@app/station-picker/state/state";
import {
  dropdownStateReducer,
  formErrReducer,
  selectedStationReducer
} from "@app/station-picker/state/reducers";
import { StationPickerMobileComponent } from "./station-picker-mobile/station-picker-mobile.component";
import { StationPickerWrapperComponent } from "./station-picker-wrapper/station-picker-wrapper.component";

let reducers: ActionReducerMap<PickerState> = {
  dropdownState: dropdownStateReducer,
  selectedStation: selectedStationReducer,
  formErr: formErrReducer
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature("stationPicker", reducers)
  ],
  exports: [StationPickerWrapperComponent],
  declarations: [
    StationPickerDesktopComponent,
    StationPickerMobileComponent,
    StationPickerWrapperComponent
  ],
  providers: []
})
export class StationPickerModule {}
