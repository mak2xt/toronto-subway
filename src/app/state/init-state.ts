import { AppState } from "@app/state/state";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import {
  StationsActions,
  UPDATE_STATIONS
} from "@app/state/stations/stations-actions";
import { DataService } from "@app/core";
import { map, switchMap } from "rxjs/operators";

export const initialState: AppState = {
  path: {
    distance: 0,
    path: []
  },
  stations: [],
  listView: {
    isExpanded: false,
    isHidden: false
  }
};

@Injectable()
export class InitEffect {
  constructor(private actions: Actions, private dataService: DataService) {}
  @Effect()
  init$: Observable<StationsActions> = this.actions.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() => this.dataService.getStations()),
    map(el => ({ type: UPDATE_STATIONS, payload: el }))
  );
}
