import { Action } from "@ngrx/store";

export const SCREEN_WIDTH_CHANGED = "SCREEN_WIDTH_CHANGED";

export class ScreenWidthChanged implements Action {
  readonly type = SCREEN_WIDTH_CHANGED;
  constructor(public payload: number) {}
}

export type ScreenActions = ScreenWidthChanged;
