import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StationPickerWrapperComponent } from "./station-picker-wrapper.component";

describe("StationPickerWrapperComponent", () => {
  let component: StationPickerWrapperComponent;
  let fixture: ComponentFixture<StationPickerWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [StationPickerWrapperComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StationPickerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
