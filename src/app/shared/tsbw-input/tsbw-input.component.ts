import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Component({
  selector: "tsbw-input",
  templateUrl: "./tsbw-input.component.html",
  styleUrls: ["./tsbw-input.component.scss"]
})
export class TSBWInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() placehld: string;
  @Input() label?: string;
  valid$: Observable<boolean>;
  constructor() {}

  ngOnInit() {
    this.valid$ = this.control.valueChanges.pipe(map(_ => this.control.valid));
  }
}
