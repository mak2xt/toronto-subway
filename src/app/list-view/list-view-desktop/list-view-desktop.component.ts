import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Station } from "../../core/index";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  SlideInTransition,
  SlideOutTransition
} from "@app/shared/animations/slide-in-out";
import { Subscriptions, unsubscribeAll } from "@app/util/sub-management";
import { PathListView } from "@app/list-view/list-view/list-view.component";
import { Observable } from "rxjs/Observable";
import { ListViewState, selectListView } from "@app/list-view/state/state";
import { UPDATE_LIST_VIEW } from "@app/list-view/state/actions";

@Component({
  selector: "list-view-desktop",
  templateUrl: "./list-view-desktop.component.html",
  styleUrls: ["./list-view-desktop.component.scss"],
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
export class ListViewDesktopComponent implements OnInit, OnDestroy {
  subs: Subscriptions = {};
  stationsList: Station[] = [];
  @Input() pathList$: Observable<PathListView>;
  @Output() toggleHide = new EventEmitter<void>();
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

    this.subs.listView = this.store
      .select(selectListView)
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
    this.toggleHide.emit();
  }

  get stateName() {
    return this.listViewState.isExpanded ? "active" : undefined;
  }

  get slideInState() {
    return this.listViewState.isExpanded ? "expanded" : "shrunk";
  }

  ngOnInit() {
    this.subs.path = this.pathList$.subscribe(pathList => {
      this.pathList = pathList;
      this.from = this.pathList.stations[0];
      this.to = this.pathList.stations[this.pathList.stations.length - 1];
    });
  }
  ngOnDestroy() {
    unsubscribeAll(this.subs);
  }
}
