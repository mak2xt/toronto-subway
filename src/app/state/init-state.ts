import { AppState } from "@app/state/state";

export const initialState: AppState = {
  path: {
    distance: 0,
    path: []
  },
  stations: [],
  screen: {
    mobile: false,
    tablet: false,
    desktop: false
  }
};
