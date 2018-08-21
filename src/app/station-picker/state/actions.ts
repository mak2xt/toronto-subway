import { Action } from "@ngrx/store";
import {
  DropdownState,
  FormErr,
  SelectedStations
} from "@app/station-picker/state/state";

export const UPDATE_DROPDOWN_STATE = "UPDATE_DROPDOWN_STATE";
export const UPDATE_SELECTED_STATIONS = "UPDATE_SELECTED_STATIONS";
export const UPDATE_FORM_ERR = "UPDATE_FORM_ERR";
export const SWITCH_DROPDOWN_STATE = "SWITCH_DROPDOWN_STATE";

export class UpdateDropdownState implements Action {
  readonly type = UPDATE_DROPDOWN_STATE;
  constructor(public payload: Partial<DropdownState>) {}
}

export class SwitchDropdownState implements Action {
  readonly type = SWITCH_DROPDOWN_STATE;
  constructor(public payload: Partial<DropdownState>) {}
}

export class UpdateSelectedStations implements Action {
  readonly type = UPDATE_SELECTED_STATIONS;
  constructor(public payload: Partial<SelectedStations>) {}
}

export class UpdateFormErr implements Action {
  readonly type = UPDATE_FORM_ERR;
  constructor(public payload: Partial<FormErr>) {}
}

export type PickerActions =
  | UpdateDropdownState
  | UpdateSelectedStations
  | UpdateFormErr
  | SwitchDropdownState;
