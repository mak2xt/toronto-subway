import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { map, mergeMap } from "rxjs/operators";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import { UPDATE_PATH } from "@app/state/path/path-actions";
import {
  ListViewActions,
  UPDATE_LIST_VIEW
} from "@app/list-view/state/actions";

@Injectable()
export class ListEffects {
  constructor(private actions: Actions, private store: Store<AppState>) {}
  @Effect()
  pathUpdate$: Observable<ListViewActions> = this.actions.pipe(
    ofType(UPDATE_PATH),
    mergeMap(_ => this.store.select("screen")),
    map(({ mobile }) => {
      if (mobile) {
        return {
          type: UPDATE_LIST_VIEW,
          payload: {
            isExpanded: false,
            isHidden: true
          }
        };
      }

      return {
        type: UPDATE_LIST_VIEW,
        payload: {
          isExpanded: true,
          isHidden: false
        }
      };
    })
  );
}
