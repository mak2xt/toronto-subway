import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TSBWInputComponent } from "./tsbw-input/tsbw-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TSBWDropdownComponent } from "./tsbw-dropdown/tsbw-dropdown.component";
import { ClickOutsideDirective } from "./click-outside.directive";
import { SafePipe } from "./safe.pipe";

@NgModule({
  declarations: [
    TSBWInputComponent,
    TSBWDropdownComponent,
    ClickOutsideDirective,
    SafePipe
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TSBWInputComponent,
    TSBWDropdownComponent,
    ClickOutsideDirective,
    SafePipe
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
