import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import {
  selectMobile,
  selectNotMobile
} from "@app/state/screen/screen-selectors";
import { Observable } from "rxjs/Observable";
import { Station } from "@app/core";
import { Subscriptions, unsubscribeAll } from "@app/util/sub-management";
import { map, withLatestFrom } from "rxjs/operators";
import { Path } from "@app/graph/shortest-path";
import { arrayObjectIndexOf } from "@app/util/util";
import { ToggleListHide } from "../state/actions";

export interface PathListView {
  distance: number;
  stations: Array<Station>;
}

@Component({
  selector: "list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"]
})
export class ListViewComponent implements OnInit, OnDestroy {
  subs: Subscriptions;
  mobile$ = this.store.select(selectMobile);
  notMobile$ = this.store.select(selectNotMobile);
  pathList$: Observable<PathListView>;
  stations$: Observable<Station[]>;
  constructor(private store: Store<AppState>) {
    this.stations$ = this.store.select("stations");
    this.pathList$ = this.store
      .select("path")
      .pipe(
        withLatestFrom(this.stations$),
        map(([path, stations]) => this.createPathList(stations, path))
      );
  }
  private createPathList(stations: Station[], path: Path): PathListView {
    let ret: any = {};
    ret.distance = path.distance;
    ret.stations = path.path.map(
      el => stations[arrayObjectIndexOf(stations, el, "id")]
    );
    return ret;
  }
  toggleHide() {
    this.store.dispatch(new ToggleListHide());
  }
  ngOnInit() {}
  ngOnDestroy() {
    unsubscribeAll(this.subs);
  }
}
