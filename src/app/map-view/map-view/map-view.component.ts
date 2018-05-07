import { Component, OnDestroy, OnInit } from "@angular/core";
import { MapViewService } from "./map-view.service";
import {
  MapSegmentData,
  MapSelect
} from "../map-segment/map-segment.component";
import { Station } from "../../core";
import { Store } from "@ngrx/store";
import { AppState } from "@app/state/state";
import { PathService } from "@app/core";
import { UPDATE_PATH } from "@app/state/path/path-actions";
import { Subscription } from "rxjs/Subscription";
import { UPDATE_LIST_VIEW } from "@app/state/list-view/list-view-actions";
import { trigger } from "@angular/animations";
import {
  FadeInTransition,
  FadeOutTransition
} from "@app/shared/animations/fade-in-out";

@Component({
  selector: "map-view",
  templateUrl: "./map-view.component.html",
  styleUrls: ["./map-view.component.scss"],
  providers: [MapViewService],
  animations: [
    trigger("fadeInOut", [
      FadeInTransition("void => *", "125ms"),
      FadeOutTransition("* => void", "125ms")
    ])
  ]
})
export class MapViewComponent implements OnInit, OnDestroy {
  segments: MapSegmentData[] = [];
  stations: Subscription;
  path: Subscription;
  stationsList: Station[] = [];
  selectorData: {
    coords: { x: number; y: number };
    data: { id: string; options: string[] };
    show: boolean;
  };
  choosenStations: { from?: string; to?: string } = {};
  constructor(
    private cService: MapViewService,
    private pathService: PathService,
    private store: Store<AppState>
  ) {
    this.stations = this.store.select("stations").subscribe(stations => {
      this.stationsList = stations;
      if (stations.length !== 0)
        this.segments = this.cService.getSegments(stations);
    });
    this.path = this.store.select("path").subscribe(path => {
      this.segments = this.cService.markSegmentsActive(
        this.segments,
        path.path
      );
    });

    this.selectorData = this.cService.getSelectorDefaultData();
  }
  onSelected(event: MapSelect) {
    let selectorData = this.cService.getSelectorData(event);
    this.selectorData = { ...selectorData, show: true };
  }
  onSelectorClose() {
    this.selectorData = this.cService.getSelectorDefaultData();
  }
  onStation(event: { id: string; option: "from" | "to" }) {
    this.selectorData.show = false;
    this.choosenStations[event.option] = event.id;
    this.segments = this.cService.markSegmentsActive(this.segments, [event.id]);
    if (this.choosenStations.from && this.choosenStations.to) {
      this.store.dispatch({
        type: UPDATE_PATH,
        payload: this.pathService.getPath(
          this.stationsList,
          this.choosenStations.from,
          this.choosenStations.to
        )
      });
      this.choosenStations = {};
    }
  }
  shrinkListView() {
    this.store.dispatch({
      type: UPDATE_LIST_VIEW,
      payload: {
        isExpanded: false
      }
    });
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.path.unsubscribe();
    this.stations.unsubscribe();
  }
}
