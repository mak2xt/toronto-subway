import { initialState } from "@app/state/init-state";
import {
  StationsActions,
  UPDATE_STATIONS
} from "@app/state/stations/stations-actions";

export function stationsReducer(
  state = initialState.stations,
  action: StationsActions
) {
  switch (action.type) {
    case UPDATE_STATIONS:
      return action.payload;
    default:
      return state;
  }
}
