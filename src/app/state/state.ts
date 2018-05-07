import { Path } from "@app/graph/shortest-path";
import { Station } from "@app/core";
import { ActionReducerMap } from "@ngrx/store";
import { pathReducer } from "@app/state/path/path-reducer";
import { stationsReducer } from "@app/state/stations/stations-reducer";
import { listViewReducer } from "@app/state/list-view/list-view-reducer";

export interface ListViewState {
  isExpanded: boolean;
  isHidden: boolean;
}

export interface AppState {
  path: Path;
  stations: Station[];
  listView: ListViewState;
}

export const reducers: ActionReducerMap<AppState> = {
  path: pathReducer,
  stations: stationsReducer,
  listView: listViewReducer
};
