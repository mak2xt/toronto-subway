import { ListViewActions, TOGGLE_LIST_HIDE, UPDATE_LIST_VIEW } from "./actions";
import {
  initialListViewState,
  ListViewState
} from "@app/list-view/state/state";

export function listViewReducer(
  state: ListViewState = initialListViewState,
  action: ListViewActions
) {
  switch (action.type) {
    case UPDATE_LIST_VIEW:
      return { ...state, ...action.payload };
    case TOGGLE_LIST_HIDE:
      return { ...state, isHidden: !state.isHidden };
    default:
      return state;
  }
}
