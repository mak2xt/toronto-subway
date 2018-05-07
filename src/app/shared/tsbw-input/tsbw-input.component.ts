import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'tsbw-input',
  templateUrl: './tsbw-input.component.html',
  styleUrls: ['./tsbw-input.component.scss']
})
export class TSBWInputComponent implements OnInit {

  @Input() control : FormControl;
  @Input() placehld : string;
  constructor() { }

  ngOnInit() {
  }

}
