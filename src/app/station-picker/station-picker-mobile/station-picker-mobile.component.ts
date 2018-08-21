import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { StationPickerService } from "@app/station-picker/station-picker.service";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import {
  SwitchDropdownState,
  UpdateSelectedStations
} from "@app/station-picker/state/actions";
import { Subscriptions, unsubscribeAll } from "@app/util/sub-management";
import { DropdownInput } from "@app/shared/tsbw-dropdown/tsbw-dropdown.component";
import { Station } from "@app/core";
import {
  selectDropdownState,
  selectSelectedStation
} from "@app/station-picker/state/state";
import { filter, map, take } from "rxjs/operators";

interface ViewProps {
  height: string;
  expanded: boolean;
}

@Component({
  selector: "station-picker-mobile",
  templateUrl: "./station-picker-mobile.component.html",
  providers: [StationPickerService],
  styleUrls: ["./station-picker-mobile.component.scss"]
})
export class StationPickerMobileComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  controls: {
    from: FormControl;
    to: FormControl;
  };
  stationForm: FormGroup;
  viewProps: ViewProps = {
    height: "auto",
    expanded: false
  };
  subs: Subscriptions = {};
  list: DropdownInput[];
  stations: Station[];
  error = false;
  constructor(
    private cService: StationPickerService,
    private store: Store<AppState>
  ) {}

  private setError(b: boolean) {
    this.error = b;
  }

  focus(type: "from" | "to") {
    this.expand();
    this.controls[type].setValue("");
    this.store.dispatch(new SwitchDropdownState({ [type]: true }));
  }

  select(id: string) {
    this.store
      .select(selectDropdownState)
      .pipe(
        map(v => {
          for (let key of Object.keys(v)) {
            if (v[key]) {
              return key;
            }
          }
        }),
        take(1)
      )
      .subscribe(key => {
        let station = this.cService.getStationById(this.stations, id);
        this.controls[key].setValue(station.name);
        this.store.dispatch(new UpdateSelectedStations({ [key]: station }));
      });
  }

  expand() {
    this.viewProps.height = "45vh";
    this.viewProps.expanded = true;
  }

  shrink() {
    this.viewProps.expanded = false;
    this.viewProps.height = "auto";
  }

  ngOnInit() {
    this.controls = this.form.controls as {
      from: FormControl;
      to: FormControl;
    };
    this.stationForm = this.form;

    this.store.select("stations").subscribe(data => {
      this.stations = data;
    });

    this.subs.fromControl = this.controls.from.valueChanges.subscribe(value => {
      this.list = this.cService.filterStationList(this.stations, value);
    });
    this.subs.toControl = this.controls.to.valueChanges.subscribe(value => {
      this.list = this.cService.filterStationList(this.stations, value);
    });

    this.subs.submit = this.store
      .select(selectSelectedStation)
      .pipe(filter(({ from, to }) => from !== null && to !== null))
      .subscribe(v => {
        if (this.stationForm.errors === null) {
          this.setError(false);
          this.cService.publish(this.stations, v);
        } else {
          this.setError(true);
        }
      });
  }
  ngOnDestroy() {
    unsubscribeAll(this.subs);
  }
}
