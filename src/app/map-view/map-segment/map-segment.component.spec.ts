import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MapSegmentComponent, MapSegmentData } from "./map-segment.component";
import { Component, ViewChild } from "@angular/core";
import { MapSelect } from "@app/map-view/map-segment/map-segment.component";
import { simulatedClick } from "../../util/util";

describe("MapSegmentComponent", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MapSegmentComponent, TestHostComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should fire select event on click", () => {
    spyOn(component, "onSelect").and.callThrough();
    component.mapSegmentComponent.onClick(
      simulatedClick(fixture.nativeElement.querySelector(".circle"))
    );
    expect(component.onSelect).toHaveBeenCalledWith({
      id: component.mapSegment.id,
      pos: {
        x: 0,
        y: 0
      }
    });
  });
  it("should set active class on circle element when active", () => {
    component.mapSegment = {
      ...component.mapSegment,
      coords: {
        from: { ...component.mapSegment.coords.from },
        to: { ...component.mapSegment.coords.to }
      },
      active: true
    };
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(".circle.active")
    ).not.toBeNull();
  });
  it("should set transform on text", () => {
    expect(
      fixture.debugElement.nativeElement.querySelector("text")
        .transform instanceof SVGAnimatedTransformList
    ).toBeTruthy();
  });
  it("should set transform on line", () => {
    expect(
      fixture.debugElement.nativeElement.querySelector("line")
        .transform instanceof SVGAnimatedTransformList
    ).toBeTruthy();
  });
  it("should set transform on circle", () => {
    expect(
      fixture.debugElement.nativeElement.querySelector("circle")
        .transform instanceof SVGAnimatedTransformList
    ).toBeTruthy();
  });
  describe("#getTransformString", () => {});
  describe("#getTextTransformString", () => {});
});

@Component({
  selector: "host-component",
  template: `<svg><svg:g map-segment [data]="mapSegment" (select)="onSelect($event)" ></svg:g></svg>`
})
class TestHostComponent {
  @ViewChild(MapSegmentComponent) mapSegmentComponent: MapSegmentComponent;
  mapSegment: MapSegmentData = {
    id: "1",
    name: "1",
    coords: {
      from: {
        x1: 0,
        x2: 20,
        y1: 20,
        y2: 20
      },
      to: {
        x1: 20,
        x2: 40,
        y1: 20,
        y2: 20
      }
    },
    rotate: 0,
    color: "black",
    textPos: "left",
    active: false
  };
  onSelect(data: MapSelect) {}
}
