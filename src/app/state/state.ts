import { Path } from "@app/graph/shortest-path";
import { Station } from "@app/core";
import { ActionReducerMap } from "@ngrx/store";
import { pathReducer } from "@app/state/path/path-reducer";
import { stationsReducer } from "@app/state/stations/stations-reducer";
import { screenReducer } from "@app/state/screen/screen-reducer";

export interface ScreenState {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export interface AppState {
  path: Path;
  stations: Station[];
  screen: ScreenState;
}

export const reducers: ActionReducerMap<AppState> = {
  path: pathReducer,
  stations: stationsReducer,
  screen: screenReducer
};
