import { initialPickerState } from "@app/station-picker/state/state";
import {
  PickerActions,
  UPDATE_DROPDOWN_STATE,
  UPDATE_FORM_ERR,
  UPDATE_SELECTED_STATIONS
} from "@app/station-picker/state/actions";

export function dropdownStateReducer(
  state = initialPickerState.dropdownState,
  action: PickerActions
) {
  switch (action.type) {
    case UPDATE_DROPDOWN_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function selectedStationReducer(
  state = initialPickerState.selectedStation,
  action: PickerActions
) {
  switch (action.type) {
    case UPDATE_SELECTED_STATIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function formErrReducer(
  state = initialPickerState.formErr,
  action: PickerActions
) {
  switch (action.type) {
    case UPDATE_FORM_ERR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
