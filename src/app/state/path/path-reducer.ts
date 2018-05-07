import { initialState } from "@app/state/init-state";
import { PathActions, UPDATE_PATH } from "@app/state/path/path-actions";
import { Path } from "@app/graph/shortest-path";

export function pathReducer(
  state: Path = initialState.path,
  action: PathActions
) {
  switch (action.type) {
    case UPDATE_PATH:
      return { ...action.payload, path: [...action.payload.path] };
    default:
      return state;
  }
}
