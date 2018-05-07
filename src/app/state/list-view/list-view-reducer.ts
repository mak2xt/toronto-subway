import { ListViewState } from "@app/state/state";
import {
  ListViewActions,
  UPDATE_LIST_VIEW
} from "@app/state/list-view/list-view-actions";
import { initialState } from "@app/state/init-state";

export function listViewReducer(
  state: ListViewState = initialState.listView,
  action: ListViewActions
) {
  switch (action.type) {
    case UPDATE_LIST_VIEW:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
