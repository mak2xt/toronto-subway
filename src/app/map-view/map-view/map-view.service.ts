import { Injectable } from "@angular/core";
import {
  MapSegmentData,
  MapSelect
} from "../map-segment/map-segment.component";
import { SegmentsCalculator } from "@app/map-view/segments-calculator/segments-calculator";
import { Station } from "@app/core";

@Injectable()
export class MapViewService {
  segmentsCalculator: SegmentsCalculator;
  constructor() {
    this.segmentsCalculator = new SegmentsCalculator();
  }

  getSegments(stations: Station[]): MapSegmentData[] {
    return this.segmentsCalculator.getSegments(stations);
  }

  getSelectorData(data: MapSelect) {
    return {
      coords: { ...data.pos },
      data: {
        id: data.id,
        options: ["from", "to"]
      }
    };
  }

  getSelectorDefaultData() {
    return {
      coords: { x: 0, y: 0 },
      data: { id: "", options: [] },
      show: false
    };
  }

  markSegmentsActive(segments: MapSegmentData[], ids: string[]) {
    return segments.map(el => {
      return {
        ...el,
        coords: { from: { ...el.coords.from }, to: { ...el.coords.to } },
        active: ids.includes(el.id)
      };
    });
  }
}
