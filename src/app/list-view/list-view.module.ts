import { NgModule } from "@angular/core";

import { ListViewComponent } from "./list-view/list-view.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ListSectionComponent } from "./list-section/list-section.component";
import { ListTransformerPipe } from "./list-transformer.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [CommonModule, SharedModule, BrowserAnimationsModule],
  exports: [ListViewComponent, ListSectionComponent],
  declarations: [ListViewComponent, ListSectionComponent, ListTransformerPipe],
  providers: []
})
export class ListViewModule {}
