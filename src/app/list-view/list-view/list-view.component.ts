import { Component, OnDestroy } from "@angular/core";
import { Path } from "../../graph/shortest-path";
import { Station } from "../../core/index";
import { arrayObjectIndexOf } from "../../util/util";
import { AppState, ListViewState } from "@app/state/state";
import { Store } from "@ngrx/store";
import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Subscription } from "rxjs/Subscription";
import { UPDATE_LIST_VIEW } from "@app/state/list-view/list-view-actions";
import {
  SlideInTransition,
  SlideOutTransition
} from "@app/shared/animations/slide-in-out";

interface PathListView {
  distance: number;
  stations: Array<Station>;
}

@Component({
  selector: "list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
  animations: [
    trigger("slideInOut", [
      SlideInTransition("void => shrunk", "300ms"),
      SlideInTransition("void => expanded", "500ms"),
      SlideOutTransition("shrunk => void", "300ms"),
      SlideOutTransition("expanded => void", "500ms")
    ]),
    trigger("listExpand", [
      transition("* => void", [
        style({
          height: "*",
          opacity: "1",
          transform: "translateX(0)"
        }),
        sequence([
          animate(
            ".3s ease",
            style({
              height: "*",
              opacity: ".2",
              transform: "translateX(20px)"
            })
          ),
          animate(
            ".2s ease",
            style({
              height: "0",
              opacity: 0,
              transform: "translateX(20px)"
            })
          )
        ])
      ]),
      transition("void => active", [
        style({
          height: "0",
          opacity: "0",
          transform: "translateX(20px)"
        }),
        sequence([
          animate(
            ".2s ease",
            style({
              height: "*",
              opacity: ".2",
              transform: "translateX(20px)"
            })
          ),
          animate(
            ".4s ease",
            style({
              height: "*",
              opacity: 1,
              transform: "translateX(0)"
            })
          )
        ])
      ])
    ])
  ]
})
export class ListViewComponent implements OnDestroy {
  subs: {
    stations?: Subscription;
    path?: Subscription;
    listView?: Subscription;
  } = {};
  stationsList: Station[] = [];
  pathList: PathListView;
  from: Station;
  to: Station;
  listViewState: ListViewState;
  constructor(private store: Store<AppState>) {
    this.pathList = {
      distance: 0,
      stations: []
    };
    this.subs.stations = this.store.select("stations").subscribe(stations => {
      this.stationsList = stations;
    });
    this.subs.path = this.store.select("path").subscribe(path => {
      this.pathList = this.createPathList(this.stationsList, path);
      this.from = this.pathList.stations[0];
      this.to = this.pathList.stations[this.pathList.stations.length - 1];
    });

    this.subs.listView = this.store
      .select("listView")
      .subscribe(listViewState => {
        this.listViewState = listViewState;
      });
  }

  onExpand() {
    this.store.dispatch({
      type: UPDATE_LIST_VIEW,
      payload: {
        isExpanded: !this.listViewState.isExpanded
      }
    });
  }

  onHide() {
    this.store.dispatch({
      type: UPDATE_LIST_VIEW,
      payload: {
        isHidden: !this.listViewState.isHidden
      }
    });
  }

  get stateName() {
    return this.listViewState.isExpanded ? "active" : undefined;
  }

  get slideInState() {
    return this.listViewState.isExpanded ? "expanded" : "shrunk";
  }

  private createPathList(stations: Station[], path: Path): PathListView {
    let ret: any = {};
    ret.distance = path.distance;
    ret.stations = path.path.map(
      el => stations[arrayObjectIndexOf(stations, el, "id")]
    );
    return ret;
  }
  ngOnDestroy() {
    for (let sub of Object.keys(this.subs)) {
      console.log(sub);
      this.subs[sub].unsubscribe();
    }
  }
}
