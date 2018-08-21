import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";

@Component({
  selector: "list-open-button",
  templateUrl: "./list-open-button.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./list-open-button.component.scss"]
})
export class ListOpenButtonComponent implements OnInit {
  @Input() open: boolean;
  constructor() {}

  onClick() {
    this.open = !this.open;
  }

  ngOnInit() {}
}
