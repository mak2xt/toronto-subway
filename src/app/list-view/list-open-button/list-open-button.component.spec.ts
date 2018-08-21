import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListOpenButtonComponent } from "./list-open-button.component";

describe("ListOpenButtonComponent", () => {
  let component: ListOpenButtonComponent;
  let fixture: ComponentFixture<ListOpenButtonComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ListOpenButtonComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOpenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
