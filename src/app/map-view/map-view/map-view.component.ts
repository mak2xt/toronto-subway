import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MapViewService } from "./map-view.service";
import { MapSelect } from "../map-segment/map-segment.component";
import { Station } from "../../core";
import { Store } from "@ngrx/store";
import { AppState } from "@app/state/state";
import { PathService } from "@app/core";
import { UPDATE_PATH } from "@app/state/path/path-actions";
import { Subscription } from "rxjs/Subscription";
import { trigger } from "@angular/animations";
import {
  FadeInTransition,
  FadeOutTransition
} from "@app/shared/animations/fade-in-out";
import { MapSize } from "@app/core/constants/common";
import {
  getCenteringDeltas,
  RectangleCoords
} from "@app/map-view/rectangle-geometry";
import { MapSegmentData } from "@app/map-view/segments-calculator/segments-calculator";

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
export class MapViewComponent implements OnInit, OnDestroy, AfterViewInit {
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
  translate = {
    scale: 1,
    x: 0,
    y: 0
  };
  moveAdjustments = {
    scale: 1,
    deltaX: 0,
    deltaY: 0
  };
  mapSize = MapSize;
  constructor(
    private cService: MapViewService,
    private pathService: PathService,
    private store: Store<AppState>,
    private elRef: ElementRef
  ) {
    this.stations = this.store.select("stations").subscribe(stations => {
      this.stationsList = stations;
      if (stations.length !== 0)
        this.segments = this.cService.getSegments(stations);
    });
    this.path = this.store.select("path").subscribe(path => {
      this.segments = this.cService.markSegmentsActive(
        this.segments,
        this.cService.withTransferIDs(path.path)
        // path.path
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
  onPinchPan(event: any) {
    this.translate.scale = this.moveAdjustments.scale * event.scale;
    this.translate.x =
      this.moveAdjustments.deltaX + event.deltaX / this.translate.scale;
    this.translate.y =
      this.moveAdjustments.deltaY + event.deltaY / this.translate.scale;
  }
  onPinchPanEnd() {
    this.moveAdjustments = {
      scale: this.translate.scale,
      deltaX: this.translate.x,
      deltaY: this.translate.y
    };
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.path.unsubscribe();
    this.stations.unsubscribe();
  }
  ngAfterViewInit() {
    let viewRect = this.elRef.nativeElement.getBoundingClientRect();
    let mapRect: RectangleCoords = {
      top: viewRect.top,
      right: viewRect.left + this.mapSize.x,
      bottom: viewRect.top + this.mapSize.y,
      left: viewRect.left
    };

    let deltas = getCenteringDeltas(viewRect, mapRect);

    //macro-tick to calm down angular change detection
    setTimeout(() => {
      this.translate.x = deltas.deltaX;
      this.translate.y = deltas.deltaY;
      this.onPinchPanEnd();
    });
  }
}
