import { Component, OnInit } from "@angular/core";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import {
  selectMobile,
  selectNotMobile
} from "@app/state/screen/screen-selectors";
import { FormControl, FormGroup } from "@angular/forms";
import { StationPickerService } from "@app/station-picker/station-picker.service";

@Component({
  selector: "station-picker",
  templateUrl: "./station-picker-wrapper.component.html",
  providers: [StationPickerService],
  styleUrls: ["./station-picker-wrapper.component.scss"]
})
export class StationPickerWrapperComponent implements OnInit {
  controls: {
    from: FormControl;
    to: FormControl;
  };
  stationForm: FormGroup;
  mobile$ = this.store.select(selectMobile);
  notMobile$ = this.store.select(selectNotMobile);
  constructor(
    private store: Store<AppState>,
    private cService: StationPickerService
  ) {
    this.controls = {
      from: new FormControl(null),
      to: new FormControl(null)
    };
    this.stationForm = new FormGroup(
      this.controls,
      this.cService.stationValidator(["from", "to"])
    );
  }

  ngOnInit() {}
}
