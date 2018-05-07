import { Action } from "@ngrx/store";
import { Path } from "@app/graph/shortest-path";

export const UPDATE_PATH = "UPDATE_PATH";

export interface PathActions extends Action {
  payload?: Path;
}
