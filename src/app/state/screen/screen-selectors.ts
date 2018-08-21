import { createSelector } from "@ngrx/store";
import { AppState } from "@app/state/state";

const selectScreen = (state: AppState) => state.screen;

export const selectMobile = createSelector(
  selectScreen,
  screen => screen.mobile
);

export const selectTablet = createSelector(
  selectScreen,
  screen => screen.tablet
);

export const selectDesktop = createSelector(
  selectScreen,
  screen => screen.desktop
);

export const selectNotMobile = createSelector(
  selectScreen,
  screen => !screen.mobile
);
