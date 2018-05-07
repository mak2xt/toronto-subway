import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListSectionComponent } from "./list-section.component";
import { Component, ViewChild } from "@angular/core";
import { Station } from "@app/core";

describe("ListSectionComponent", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ListSectionComponent, TestHostComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should set lineColor", () => {
    expect(component.listSectionComponent.lineColor).toBeDefined();
  });
  it("should display station name", () => {
    expect(fixture.nativeElement.querySelector(".name").innerHTML).toEqual("1");
  });
  it("should have line", () => {
    expect(fixture.nativeElement.querySelector(".line")).toBeDefined();
  });
  it("should have dot", () => {
    expect(fixture.nativeElement.querySelector(".dot")).toBeDefined();
  });
});

@Component({
  selector: `host-component`,
  template: `<list-section [station]="testStation"></list-section>`
})
class TestHostComponent {
  testStation: Station = {
    id: "1",
    name: "1",
    line: 1,
    connections: []
  };
  @ViewChild(ListSectionComponent) listSectionComponent: ListSectionComponent;
}
