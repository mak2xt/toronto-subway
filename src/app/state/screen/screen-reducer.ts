import {
  SCREEN_WIDTH_CHANGED,
  ScreenActions
} from "@app/state/screen/screen-actions";
import { MOBILE_MAX_WIDTH, TABLET_MAX_WIDTH } from "@app/core/constants/common";
import { initialState } from "@app/state/init-state";

export function screenReducer(
  state = initialState.screen,
  action: ScreenActions
) {
  switch (action.type) {
    case SCREEN_WIDTH_CHANGED:
      const mobile = action.payload <= MOBILE_MAX_WIDTH;
      const tablet =
        action.payload <= TABLET_MAX_WIDTH && action.payload > MOBILE_MAX_WIDTH;
      return {
        mobile,
        tablet,
        desktop: !mobile && !tablet
      };
    default:
      return state;
  }
}
