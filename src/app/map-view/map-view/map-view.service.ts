import { Injectable } from "@angular/core";
import {
  MapSegmentData,
  MapSelect
} from "../map-segment/map-segment.component";
import { SegmentsCalculator } from "@app/map-view/segments-calculator/segments-calculator";
import { Station } from "@app/core";
import { TransferHelper } from "@app/map-view/transfer-helper";

@Injectable()
export class MapViewService {
  segmentsCalculator: SegmentsCalculator;
  transferHelper: TransferHelper;
  terminalStations: string[];
  constructor() {
    this.segmentsCalculator = new SegmentsCalculator();
    this.transferHelper = new TransferHelper([
      // ["spa1", "spa2"], disconnected on map
      ["stg1", "stg2"],
      ["blo1", "blo2"],
      ["shy1", "shy4"],
      ["ken2", "ken3"]
    ]);
    this.terminalStations = ["unio", "vaug", "finc", "domi", "kipl", "mcco"];
  }

  private markTransfers(segment: MapSegmentData) {
    return this.transferHelper.hasTransfer(segment.id)
      ? { ...segment, enlarged: true }
      : segment;
  }

  private markTerminals(segment: MapSegmentData) {
    return this.terminalStations.includes(segment.id)
      ? { ...segment, enlarged: true }
      : segment;
  }

  private composedMarkers(segment: MapSegmentData) {
    return this.markTransfers(this.markTerminals(segment));
  }

  getSegments(stations: Station[]): MapSegmentData[] {
    return this.segmentsCalculator
      .getSegments(stations)
      .map(this.composedMarkers.bind(this));
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

  /**
   * @description takes an array of station ids and adds ids of transfer stations, fixes SVG overlaying issues
   * @param {string[]} ids
   * @returns {string[]}
   */
  withTransferIDs(ids: string[]) {
    return ids.reduce((acc, cur) => {
      if (this.transferHelper.hasTransfer(cur)) {
        acc.push(this.transferHelper.getTransferID(cur));
      }
      acc.push(cur);
      return acc;
    }, []);
  }

  /**
   * @description marks segments as active immutably
   * @param {MapSegmentData[]} segments
   * @param {string[]} ids
   * @returns {{id: string; name: string; coords: {from: LineCoords; to: LineCoords}; rotate: number; color: string; textPos: "left" | "bottom" | "right" | "up" | "none"; active?: boolean}[]}
   */
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
