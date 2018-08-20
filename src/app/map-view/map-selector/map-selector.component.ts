import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { WINDOW } from "@app/core/window.wrapper";

@Component({
  selector: "map-selector",
  templateUrl: "./map-selector.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./map-selector.component.scss"]
})
export class MapSelectorComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() coords: { x: number; y: number };
  @Input() data: { id: string; options: string[] };
  @Output() select = new EventEmitter<{ id: string; option: string }>();
  @Output() close = new EventEmitter<void>();
  @ViewChild("container") container: ElementRef;
  constructor(
    @Inject(WINDOW) private window: Window,
    private ref: ChangeDetectorRef
  ) {}

  private shouldAdjustCoords() {
    return (
      this.coords.x + this.container.nativeElement.clientWidth >=
      this.window.innerWidth
    );
  }

  private adjustCoords() {
    let elWidth = this.container.nativeElement.clientWidth;
    this.coords = {
      ...this.coords,
      x: this.coords.x - elWidth
    };
  }

  onClick(option: string) {
    this.select.emit({
      id: this.data.id,
      option: option
    });
  }

  onClickOutside() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.coords &&
      !changes.coords.firstChange &&
      this.shouldAdjustCoords()
    ) {
      this.adjustCoords();
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.shouldAdjustCoords()) {
      setTimeout(() => {
        this.adjustCoords();
      });
      this.ref.markForCheck();
    }
  }
}
