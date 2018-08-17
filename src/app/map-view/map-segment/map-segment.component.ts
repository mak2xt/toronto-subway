import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";

export interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface MapSegmentData {
  id: string; //station id
  name: string; //station name
  coords: {
    from: LineCoords;
    to: LineCoords;
  };
  rotate: number;
  color: string;
  textPos: "left" | "bottom" | "right" | "up" | "none";
  active?: boolean;
}

export interface MapSelect {
  id: string;
  pos: {
    x: number;
    y: number;
  };
}

@Component({
  selector: "[map-segment]",
  templateUrl: "./map-segment.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./map-segment.component.scss"]
})
export class MapSegmentComponent implements OnInit, AfterViewInit {
  textSize = 8;
  constructor() {}

  @ViewChild("text") svg;

  @Input() data: MapSegmentData;
  @Output() select = new EventEmitter<MapSelect>();

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.select.emit({
      id: this.data.id,
      pos: {
        x: event.pageX,
        y: event.pageY
      }
    });
  }

  getTransformString(pos: "to" | "from") {
    return `rotate(${this.data.rotate} ${this.data.coords[pos].x1} ${
      this.data.coords["from"].y1
    })`;
  }

  getTextTransformString() {
    let rotate = 0;
    if (this.data.textPos === "bottom") {
      rotate = 45;
    }
    switch (this.data.textPos) {
      case "right":
        return `translate(4, -6)`;
      case "left":
        return ``;
      case "none":
        return "scale(0)";
      default:
        return `rotate(${rotate} ${this.data.coords["to"].x1 + 4} ${this.data
          .coords["from"].y1 + 7}) `;
    }
  }

  ngOnInit() {
    if (this.data.textPos === "bottom") {
      this.textSize = 9;
    }
  }

  ngAfterViewInit() {
    if (this.data.textPos === "left") {
      let width = this.svg.nativeElement.getBBox().width;
      this.svg.nativeElement.setAttribute(
        "transform",
        `translate(-${width + 20}, -6)`
      );
    }
    // console.log(this.svg.nativeElement.getBBox());
  }
}
