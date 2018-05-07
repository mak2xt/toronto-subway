import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";

@Component({
  selector: "map-selector",
  templateUrl: "./map-selector.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./map-selector.component.scss"]
})
export class MapSelectorComponent implements OnInit {
  @Input() coords: { x: number; y: number };
  @Input() data: { id: string; options: string[] };
  @Output() select = new EventEmitter<{ id: string; option: string }>();
  @Output() close = new EventEmitter<void>();
  constructor() {}

  onClick(option: string) {
    this.select.emit({
      id: this.data.id,
      option: option
    });
  }

  onClickOutside() {
    this.close.emit();
  }

  ngOnInit() {}
}
