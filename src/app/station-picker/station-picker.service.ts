import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { arrayObjectIndexOf, duplicateValues } from "../util/util";
import { PathService, Station } from "../core";
import { DropdownInput } from "../shared/tsbw-dropdown/tsbw-dropdown.component";
import { AppState } from "@app/state/state";
import { Store } from "@ngrx/store";
import { UPDATE_PATH } from "@app/state/path/path-actions";
import { SelectedStations } from "@app/station-picker/state/state";

@Injectable()
export class StationPickerService {
  constructor(
    private pathService: PathService,
    private store: Store<AppState>
  ) {}
  shortifyStationName(name: string): string {
    return name.slice(0, 20);
  }
  inputValidator(stations: Station[]): ValidatorFn {
    return (control: AbstractControl) => {
      return stations.filter(el => el.name === control.value).length === 0
        ? { station: false }
        : null;
    };
  }
  createDropdownStations(stations: Station[]): DropdownInput[] {
    return stations.map(el => {
      return {
        id: el.id,
        label: this.shortifyStationName(el.name)
      };
    });
  }
  stationValidator(formControlNames: string[]): ValidatorFn {
    return (control: AbstractControl) => {
      let controls = formControlNames.map(el => control.get(el));
      let controlsErrors = controls.map(el => el.errors);
      if (controlsErrors.filter(el => el !== null).length !== 0) {
        return { empty: true };
      }
      let controlsValues = controls.map(el => el.value);
      if (duplicateValues(controlsValues).length !== 0) {
        return { duplicates: true };
      }
      return null;
    };
  }
  filterStationList(stations: Station[], value: string): DropdownInput[] {
    return stations.reduce(
      (acc, cur) => {
        let stationName = cur.name.toLowerCase();
        if (stationName.indexOf(value.toLowerCase()) === 0) {
          acc.push({
            id: cur.id,
            label: this.shortifyStationName(cur.name)
          });
        }
        return acc;
      },
      [] as DropdownInput[]
    );
  }

  getStationById(stations: Station[], id: string) {
    return stations[arrayObjectIndexOf(stations, id, "id")];
  }

  publish(stations: Station[], selectedStations: SelectedStations) {
    this.store.dispatch({
      type: UPDATE_PATH,
      payload: this.pathService.getPath(
        stations,
        selectedStations.from,
        selectedStations.to
      )
    });
  }
}
