import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TSBWInputComponent } from "./tsbw-input/tsbw-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TSBWDropdownComponent } from "./tsbw-dropdown/tsbw-dropdown.component";
import { ClickOutsideDirective } from "./click-outside.directive";

@NgModule({
  declarations: [
    TSBWInputComponent,
    TSBWDropdownComponent,
    ClickOutsideDirective
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TSBWInputComponent, TSBWDropdownComponent, ClickOutsideDirective]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
