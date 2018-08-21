import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StationPickerMobileComponent } from "./station-picker-mobile.component";

describe("StationPickerMobileComponent", () => {
  let component: StationPickerMobileComponent;
  let fixture: ComponentFixture<StationPickerMobileComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [StationPickerMobileComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StationPickerMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
