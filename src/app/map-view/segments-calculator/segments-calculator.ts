import {
  LineCoords,
  MapSegmentData
} from "@app/map-view/map-segment/map-segment.component";
import { Station } from "@app/core";
import { lineColors } from "@app/core/constants/common";

type ChangeProps = Array<keyof LineCoords>;

interface SegmentsProps {
  initCoords: { from: LineCoords; to: LineCoords };
  change: ChangeProps | { from: ChangeProps; to: ChangeProps };
  changeNum: number;
  color: string;
  textPos: MapSegmentData["textPos"];
  rotate?: number;
}

export class SegmentsCalculator {
  segmentLength: number = 40;
  youngLineStations: string[];
  spadinaLineStations: string[];
  constructor() {
    this.youngLineStations = [
      "king",
      "quee",
      "dund",
      "coll",
      "well",
      "blo1",
      "rose",
      "summ",
      "stcl",
      "davi",
      "egli",
      "lawr",
      "yomi",
      "shy1",
      "nyce",
      "finc"
    ].reverse();

    this.spadinaLineStations = [
      "vaug",
      "h407",
      "pion",
      "youn",
      "fiwe",
      "dopa",
      "down",
      "wils",
      "york",
      "laww",
      "glen",
      "eglw",
      "stcw",
      "dupo",
      "spa1",
      "stg1",
      "muse",
      "qupa",
      "stpa",
      "osgo",
      "stan"
    ];
  }
  private calcNextSegmentPos(
    prevPos: LineCoords,
    props: ChangeProps,
    change: number
  ): LineCoords {
    let prevPosCopy = Object.assign({}, prevPos);
    return props.reduce((acc, cur) => {
      acc[cur] += change;
      return acc;
    }, prevPosCopy);
  }

  private calcInitCoords(
    from: LineCoords,
    props: ChangeProps,
    change: number
  ): { from: LineCoords; to: LineCoords } {
    return {
      from: from,
      to: this.calcNextSegmentPos(from, props, change)
    };
  }

  private removeLineReference(name: string): string {
    let parenthesisIndex = name.indexOf("(");
    if (parenthesisIndex === -1) {
      return name;
    }
    return name.slice(0, parenthesisIndex).trim();
  }

  private calcSegments(
    stations: Station[],
    props: SegmentsProps
  ): MapSegmentData[] {
    if (!props.rotate) {
      props.rotate = 0;
    }

    let initSegment = {
      id: stations[0].id,
      name: this.removeLineReference(stations[0].name),
      coords: props.initCoords,
      color: props.color,
      textPos: props.textPos,
      rotate: props.rotate
    };
    let changeProps = {
      from: [],
      to: []
    };

    if (Array.isArray(props.change)) {
      changeProps = {
        from: props.change,
        to: props.change
      };
    } else {
      if (props.change.from) {
        changeProps.from = props.change.from;
      }
      if (props.change.to) {
        changeProps.to = props.change.to;
      }
    }
    return stations.reduce(
      (acc, cur, index, arr) => {
        if (index === 0) {
          return acc;
        }
        let prevToPos = acc[index - 1].coords.to;
        let fromPos = this.calcNextSegmentPos(
          prevToPos,
          changeProps.from,
          props.changeNum
        );
        let toPos = this.calcNextSegmentPos(
          fromPos,
          changeProps.to,
          props.changeNum
        );
        if (index === arr.length - 1) {
          toPos = fromPos;
        }
        acc.push({
          id: cur.id,
          name: this.removeLineReference(cur.name),
          coords: {
            from: fromPos,
            to: toPos
          },
          color: props.color,
          rotate: props.rotate,
          textPos: props.textPos
        });
        return acc;
      },
      [initSegment]
    );
  }

  private getStationCoords(
    segments: MapSegmentData[],
    stationID: string
  ): { x: number; y: number } {
    let segment = segments.filter(el => el.id === stationID);
    if (segment.length !== 1) {
      throw new Error(`${stationID} is not valid station`);
    }
    return {
      x: segment[0].coords.from.x2,
      y: segment[0].coords.from.y2
    };
  }

  private getSheppardLineSegments(
    stations: Station[],
    intersection: { x: number; y: number }
  ) {
    let change = Math.abs(this.segmentLength / 2);
    return this.calcSegments(stations.filter(el => el.line === 4), {
      initCoords: this.calcInitCoords(
        {
          x1: intersection.x,
          x2: intersection.x,
          y1: intersection.y,
          y2: intersection.y
        },
        ["x2"],
        change
      ),
      color: lineColors["4"],
      change: ["x1", "x2"],
      changeNum: change,
      textPos: "bottom"
    });
  }

  private getSpadinaLineSegments(
    stations: Station[],
    intersection: { x: number; y: number }
  ) {
    let color = lineColors["1"];
    let change = Math.abs(this.segmentLength / 2);
    let stGeorgeIndex = this.spadinaLineStations.indexOf("stg1");
    let preBloorLine = this.spadinaLineStations.slice(0, stGeorgeIndex);
    let postBloorLine = this.spadinaLineStations.slice(stGeorgeIndex);
    let postBloorSegments = this.calcSegments(
      stations.filter(el => postBloorLine.includes(el.id)),
      {
        initCoords: this.calcInitCoords(
          {
            x1: intersection.x,
            x2: intersection.x,
            y1: intersection.y - change,
            y2: intersection.y
          },
          ["y1", "y2"],
          change
        ),
        color: color,
        change: ["y1", "y2"],
        changeNum: change,
        textPos: "right"
      }
    );
    let preBloorSegments = this.calcSegments(
      stations.filter(el => preBloorLine.includes(el.id)).reverse(),
      {
        initCoords: this.calcInitCoords(
          {
            x1: intersection.x,
            x2: intersection.x,
            y1: intersection.y - change + 2,
            y2: intersection.y - change * 2
          },
          ["y1", "y2"],
          -change * 1.3
        ),
        color: color,
        change: {
          from: ["x2", "x1"],
          to: ["y1", "y2"]
        },
        rotate: -45,
        changeNum: -change * 1.3,
        textPos: "right"
      }
    );
    return postBloorSegments.concat(...preBloorSegments);
  }

  private getYoungLineSegments(
    stations: Station[],
    intersection: { x: number; y: number }
  ) {
    let color = lineColors["1"];
    let change = Math.abs(this.segmentLength / 2);
    let bloorIndex = this.youngLineStations.indexOf("blo1");
    let preBloorLine = this.youngLineStations.slice(0, bloorIndex);
    let postBloorLine = this.youngLineStations.slice(bloorIndex);
    let postBloorSegments = this.calcSegments(
      stations.filter(el => postBloorLine.includes(el.id)).reverse(),
      {
        initCoords: this.calcInitCoords(
          {
            x1: intersection.x,
            x2: intersection.x,
            y1: intersection.y - change,
            y2: intersection.y
          },
          ["y1", "y2"],
          change
        ),
        color: color,
        change: ["y1", "y2"],
        changeNum: change,
        textPos: "right"
      }
    );
    let preBloorSegments = this.calcSegments(
      stations.filter(el => preBloorLine.includes(el.id)),
      {
        initCoords: this.calcInitCoords(
          {
            x1: intersection.x,
            x2: intersection.x,
            y1: intersection.y - change,
            y2: intersection.y - change * 2
          },
          ["y1", "y2"],
          -change
        ),
        color: color,
        change: ["y1", "y2"],
        changeNum: -change,
        textPos: "right"
      }
    );
    return postBloorSegments.concat(...preBloorSegments);
  }

  getSegments(stations: Station[]): MapSegmentData[] {
    let line2Segments = this.calcSegments(
      stations.filter(el => el.line === 2),
      {
        initCoords: this.calcInitCoords(
          { x1: 10, x2: 10, y1: 420, y2: 420 },
          ["x2"],
          this.segmentLength / 2
        ),
        change: ["x1", "x2"],
        color: lineColors["2"],
        changeNum: this.segmentLength / 2,
        textPos: "bottom"
      }
    );

    let line2Intersections = {
      stgeorge: this.getStationCoords(line2Segments, "stg2"),
      bloor: this.getStationCoords(line2Segments, "blo2")
    };
    let youngLineSegments = this.getYoungLineSegments(
      stations,
      line2Intersections.bloor
    );
    let spadinaLineSegments = this.getSpadinaLineSegments(
      stations,
      line2Intersections.stgeorge
    );
    let sheppardLineSegments = this.getSheppardLineSegments(
      stations,
      this.getStationCoords(youngLineSegments, "shy1")
    );
    let stAndrewCoords = this.getStationCoords(spadinaLineSegments, "stan");
    let kingCoords = this.getStationCoords(youngLineSegments, "king");
    let unionSegment: MapSegmentData = {
      id: "unio",
      name: "Union",
      coords: {
        from: {
          x1: stAndrewCoords.x + 5,
          x2: (stAndrewCoords.x + kingCoords.x) / 2,
          y1: stAndrewCoords.y + 5,
          y2: stAndrewCoords.y + 35
        },
        to: {
          x2: kingCoords.x - 5,
          x1: (stAndrewCoords.x + kingCoords.x) / 2,
          y2: stAndrewCoords.y + 5,
          y1: stAndrewCoords.y + 35
        }
      },
      textPos: "right",
      color: lineColors["1"],
      rotate: 0
    };
    return spadinaLineSegments
      .concat(...youngLineSegments)
      .concat(...line2Segments)
      .concat(unionSegment)
      .concat(...sheppardLineSegments);
  }
}
