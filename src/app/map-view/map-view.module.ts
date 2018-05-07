import { NgModule } from "@angular/core";

import { MapViewComponent } from "./map-view/map-view.component";
import { CommonModule } from "@angular/common";
import { MapSegmentComponent } from "./map-segment/map-segment.component";
import { MapSelectorComponent } from "./map-selector/map-selector.component";
import { SharedModule } from "@app/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [CommonModule, SharedModule, BrowserAnimationsModule],
  exports: [MapViewComponent, MapSegmentComponent, MapSelectorComponent],
  declarations: [MapViewComponent, MapSegmentComponent, MapSelectorComponent],
  providers: []
})
export class MapViewModule {}
