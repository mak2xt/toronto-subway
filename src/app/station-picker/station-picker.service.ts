import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { duplicateValues } from "../util/util";
import { Station } from "../core";
import { DropdownInput } from "../shared/tsbw-dropdown/tsbw-dropdown.component";

@Injectable()
export class StationPickerService {
  constructor() {}
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
}
