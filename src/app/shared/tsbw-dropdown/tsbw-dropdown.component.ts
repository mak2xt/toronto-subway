import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";

export interface DropdownInput {
  id: string;
  label: string;
}

@Component({
  selector: "tsbw-dropdown",
  templateUrl: "./tsbw-dropdown.component.html",
  styleUrls: ["./tsbw-dropdown.component.scss"]
})
export class TSBWDropdownComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: DropdownInput[];
  @Input() show: number;
  @Output() select = new EventEmitter<DropdownInput>();
  @Output() close = new EventEmitter<void>();
  height: string = "1px";
  itemHeight = 50;
  closingState: boolean = false;
  activeIndex = 0;
  active: DropdownInput;
  mainElementFocused: boolean;
  constructor() {}

  private setActive(index: number) {
    this.active = this.data[index];
  }

  nextItem($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.activeIndex < this.data.length - 1) {
      this.activeIndex++;
      this.setActive(this.activeIndex);
    }
  }

  prevItem($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.setActive(this.activeIndex);
    }
  }

  isAccessebilityFocused(id: string) {
    return this.mainElementFocused && id === this.active.id;
  }

  focus(b: boolean) {
    this.mainElementFocused = b;
  }

  selectItem(item: DropdownInput) {
    this.select.emit(item);
    this.height = "1px";
    this.closingState = true;
  }
  onClose() {
    if (this.closingState) {
      this.close.emit();
    }
  }
  calcDropdownHeight(numOfItems: number) {
    return numOfItems * this.itemHeight + 5 + "px";
  }
  setDropdownHeight() {
    this.height =
      this.data.length < this.show
        ? this.calcDropdownHeight(this.data.length)
        : this.calcDropdownHeight(this.show);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.setDropdownHeight();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && !changes.data.firstChange) {
      this.setDropdownHeight();
    }
  }
  ngOnInit() {
    this.setActive(this.activeIndex);
  }
}
