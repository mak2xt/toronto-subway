import { Action } from "@ngrx/store";
import { ListViewState } from "@app/list-view/state/state";

export const UPDATE_LIST_VIEW = "UPDATE_LIST_VIEW";
export const TOGGLE_LIST_HIDE = "TOGGLE_LIST_HIDE";

export class ToggleListHide implements Action {
  readonly type = TOGGLE_LIST_HIDE;
  constructor() {}
}

export interface ListViewActions extends Action {
  payload?: Partial<ListViewState>;
}
