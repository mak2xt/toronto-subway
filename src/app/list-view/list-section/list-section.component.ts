import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { Station } from "../../core";
import { lineColors } from "@app/core/constants/common";

@Component({
  selector: "list-section",
  templateUrl: "./list-section.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./list-section.component.scss"]
})
export class ListSectionComponent implements OnInit {
  @Input() station: Station;
  lineColor: string;
  constructor() {}

  ngOnInit() {
    this.lineColor = lineColors[this.station.line];
  }
}
