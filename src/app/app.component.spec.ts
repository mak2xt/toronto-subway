import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { MapViewModule } from "@app/map-view/map-view.module";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "@app/core/core.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { InitEffect } from "@app/state/init-state";
import { reducers } from "@app/state/state";
import { StationPickerModule } from "@app/station-picker/station-picker.module";
import { ListViewModule } from "@app/list-view/list-view.module";
describe("AppComponent", () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          CoreModule,
          StoreModule.forRoot(reducers),
          EffectsModule.forRoot([InitEffect]),
          StationPickerModule,
          ListViewModule,
          MapViewModule
        ],
        declarations: [AppComponent]
      }).compileComponents();
    })
  );
  it(
    "should create the app",
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
