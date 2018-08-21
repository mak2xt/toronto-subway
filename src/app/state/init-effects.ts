import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import {
  StationsActions,
  UPDATE_STATIONS
} from "@app/state/stations/stations-actions";
import { DataService } from "@app/core";
import { WINDOW } from "@app/core/window.wrapper";
import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Inject, Injectable } from "@angular/core";
import {
  ScreenActions,
  ScreenWidthChanged
} from "@app/state/screen/screen-actions";

@Injectable()
export class InitEffect {
  constructor(
    @Inject(WINDOW) private window: Window,
    private actions: Actions,
    private dataService: DataService
  ) {}
  @Effect()
  screen$: Observable<ScreenActions> = this.actions.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() =>
      fromEvent(this.window, "resize").pipe(
        debounceTime(200),
        map(() => this.window.innerWidth),
        distinctUntilChanged(),
        startWith(this.window.innerWidth)
      )
    ),
    tap(console.log),
    map(width => new ScreenWidthChanged(width))
  );
  @Effect()
  init$: Observable<StationsActions> = this.actions.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() => this.dataService.getStations()),
    map(el => ({ type: UPDATE_STATIONS, payload: el }))
  );
}
