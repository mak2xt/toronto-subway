import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { PathListView } from "@app/list-view/list-view/list-view.component";
import { trigger } from "@angular/animations";
import {
  SlideInTransition,
  SlideOutTransition
} from "@app/shared/animations/slide-in-out";
import { selectListView } from "@app/list-view/state/state";

@Component({
  selector: "list-view-mobile",
  templateUrl: "./list-view-mobile.component.html",
  styleUrls: ["./list-view-mobile.component.scss"],
  animations: [
    trigger("slideInOut", [
      SlideInTransition("void => *", "300ms"),
      SlideOutTransition("* => void", "300ms")
    ])
  ]
})
export class ListViewMobileComponent implements OnInit {
  @Input() pathList: PathListView;
  @Output() toggleHide = new EventEmitter<void>();
  open$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.open$ = this.store
      .select(selectListView)
      .pipe(map(({ isHidden }) => !isHidden));
  }

  onHide() {
    this.toggleHide.emit();
  }

  ngOnInit() {}
}
