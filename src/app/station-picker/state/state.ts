import { Station } from "@app/core";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface PickerState {
  dropdownState: DropdownState;
  selectedStation: SelectedStations;
  formErr: FormErr;
}

export interface DropdownState {
  from: boolean;
  to: boolean;
}

export interface SelectedStations {
  from: Station | null;
  to: Station | null;
}

export interface FormErr {
  err: boolean;
  text: string;
}

export const selectPickerState = createFeatureSelector<PickerState>(
  "stationPicker"
);

export const selectDropdownState = createSelector(
  selectPickerState,
  state => state.dropdownState
);

export const selectSelectedStation = createSelector(
  selectPickerState,
  state => state.selectedStation
);

export const selectFormErr = createSelector(
  selectPickerState,
  state => state.formErr
);

export const initialPickerState: PickerState = {
  dropdownState: {
    from: false,
    to: false
  },
  selectedStation: {
    from: null,
    to: null
  },
  formErr: {
    err: false,
    text: ""
  }
};
