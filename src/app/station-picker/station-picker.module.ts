import { NgModule } from "@angular/core";

import { StationPickerComponent } from "./station-picker/station-picker.component";
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
  exports: [StationPickerComponent],
  declarations: [StationPickerComponent],
  providers: []
})
export class StationPickerModule {}
