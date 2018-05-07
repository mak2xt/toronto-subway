import { Action } from "@ngrx/store";
import { Station } from "@app/core";

export const UPDATE_STATIONS = "UPDATE_STATIONS";

export interface StationsActions extends Action {
  payload?: Station[];
}
