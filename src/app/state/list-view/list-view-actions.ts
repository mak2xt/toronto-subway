import { Action } from "@ngrx/store";
import { ListViewState } from "@app/state/state";

export const UPDATE_LIST_VIEW = "UPDATE_LIST_VIEW";

export interface ListViewActions extends Action {
  payload?: Partial<ListViewState>;
}
