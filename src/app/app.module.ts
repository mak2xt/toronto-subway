import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { StationPickerModule } from "./station-picker/station-picker.module";
import { ListViewModule } from "./list-view/list-view.module";
import { MapViewModule } from "./map-view/map-view.module";
import { reducers } from "@app/state/state";
import { EffectsModule } from "@ngrx/effects";
import { InitEffect } from "@app/state/init-state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([InitEffect]),
    StationPickerModule,
    ListViewModule,
    MapViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
