import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListViewMobileComponent } from "./list-view-mobile.component";

describe("ListViewMobileComponent", () => {
  let component: ListViewMobileComponent;
  let fixture: ComponentFixture<ListViewMobileComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ListViewMobileComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
