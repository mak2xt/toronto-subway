import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Station } from "@app/core";
import { arrayObjectIndexOf } from "../../util/util";
import { DropdownInput } from "@app/shared/tsbw-dropdown/tsbw-dropdown.component";
import { StationPickerService } from "../station-picker.service";
import { AppState } from "app/state/state";
import { Store } from "@ngrx/store";
import {
  DropdownState,
  FormErr,
  selectDropdownState,
  SelectedStations,
  selectFormErr,
  selectSelectedStation
} from "@app/station-picker/state/state";
import { Observable } from "rxjs/Observable";
import {
  UpdateDropdownState,
  UpdateFormErr,
  UpdateSelectedStations
} from "@app/station-picker/state/actions";
import { Subject } from "rxjs/Subject";
import { map, withLatestFrom } from "rxjs/operators";
import { Subscriptions, unsubscribeAll } from "@app/util/sub-management";

@Component({
  selector: "station-picker-desktop",
  templateUrl: "station-picker-desktop.component.html",
  providers: [StationPickerService],
  styleUrls: ["./station-picker-desktop.component.scss"]
})
export class StationPickerDesktopComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  stationForm: FormGroup;
  fromControl: FormControl;
  toControl: FormControl;
  dropdownStationsData: {
    from: DropdownInput[];
    to: DropdownInput[];
  };
  dropdownState$: Observable<DropdownState>;
  formErr$: Observable<FormErr>;
  selectedStation$: Observable<SelectedStations>;
  submit = new Subject<void>();
  stations: Station[];
  subs: Subscriptions = {};
  constructor(
    private cService: StationPickerService,
    private store: Store<AppState>
  ) {}
  openDropdown(type: "from" | "to") {
    switch (type) {
      case "from":
        this.closeDropdown("to");
        break;
      case "to":
        this.closeDropdown("from");
    }
    this.store.dispatch(new UpdateDropdownState({ [type]: true }));
  }
  closeDropdown(type: "from" | "to") {
    this.store.dispatch(new UpdateDropdownState({ [type]: false }));
  }
  emptyInput(type: "from" | "to") {
    this.stationForm.get(type).reset("");
  }
  onStationSelected(event: DropdownInput, type: "from" | "to") {
    let station = this.stations[
      arrayObjectIndexOf(this.stations, event.id, "id")
    ];
    this.stationForm.get(type).setValue(station.name);
    this.store.dispatch(new UpdateSelectedStations({ [type]: station }));
  }
  onSubmit() {
    if (this.stationForm.errors) {
      let err = true;
      let text = "";
      if (this.stationForm.errors.empty) {
        text = "Stations are not filled!";
      } else {
        text = "Stations are the same!";
      }
      this.store.dispatch(new UpdateFormErr({ err: err, text: text }));
      return false;
    }
    this.store.dispatch(new UpdateFormErr({ err: false }));
    this.submit.next();
  }
  onStationsChange() {
    let stations = this.cService.createDropdownStations(this.stations);
    this.dropdownStationsData = {
      from: stations,
      to: stations
    };
    this.fromControl.clearValidators();
    this.toControl.clearValidators();
    this.fromControl.setValidators(this.cService.inputValidator(this.stations));
    this.toControl.setValidators(this.cService.inputValidator(this.stations));
  }
  ngOnDestroy() {
    unsubscribeAll(this.subs);
  }
  ngOnInit() {
    this.dropdownStationsData = {
      from: [],
      to: []
    };
    this.fromControl = this.form.controls.from as FormControl;
    this.toControl = this.form.controls.to as FormControl;
    this.stationForm = this.form;

    this.subs.fromControl = this.fromControl.valueChanges.subscribe(value => {
      this.dropdownStationsData.from = this.cService.filterStationList(
        this.stations,
        value
      );
    });
    this.subs.toControl = this.toControl.valueChanges.subscribe(value => {
      this.dropdownStationsData.to = this.cService.filterStationList(
        this.stations,
        value
      );
    });

    this.dropdownState$ = this.store.select(selectDropdownState);
    this.formErr$ = this.store.select(selectFormErr);

    this.selectedStation$ = this.store.select(selectSelectedStation);

    this.subs.submit = this.submit
      .asObservable()
      .pipe(withLatestFrom(this.selectedStation$), map(el => el[1]))
      .subscribe((selectedStation: SelectedStations) => {
        this.cService.publish(this.stations, selectedStation);
      });

    this.subs.stations = this.store.select("stations").subscribe(stations => {
      this.stations = stations;
      this.onStationsChange();
    });
  }
}
