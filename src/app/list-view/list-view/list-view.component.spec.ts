import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListViewComponent } from "./list-view.component";
import { ListTransformerPipe } from "@app/list-view/list-transformer.pipe";
import { ListSectionComponent } from "@app/list-view/list-section/list-section.component";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { InitEffect } from "@app/state/init-state";
import { AppState, reducers } from "@app/state/state";
import { CoreModule } from "@app/core/core.module";
import { UPDATE_LIST_VIEW } from "@app/state/list-view/list-view-actions";
import { UPDATE_PATH } from "@app/state/path/path-actions";

describe("ListViewComponent", () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let store: Store<AppState>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          CoreModule,
          StoreModule.forRoot(reducers),
          EffectsModule.forRoot([InitEffect])
        ],
        declarations: [
          ListViewComponent,
          ListTransformerPipe,
          ListSectionComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.get(Store);

    spyOn(store, "dispatch").and.callThrough();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should create new path list when data is updated", () => {
    const pathList = {
      distance: 0,
      stations: []
    };
    component.pathList = pathList;
    const path = {
      distance: 2,
      path: ["spa1", "stg1"]
    };
    store.dispatch({
      type: UPDATE_PATH,
      payload: path
    });
    expect(component.pathList).not.toEqual(pathList);
  });

  it("should update listViewState on UPDATE_LIST_VIEW action", () => {
    component.listViewState = {
      isExpanded: false,
      isHidden: true
    };
    const payload = {
      isHidden: true,
      isExpanded: true
    };
    store.dispatch({
      type: UPDATE_LIST_VIEW,
      payload: payload
    });
    expect(component.listViewState).toEqual(payload);
  });

  describe("#onHide", () => {
    it("should dispatch an action", () => {
      component.onHide();
      expect(store.dispatch).toHaveBeenCalled();
    });
    it("should dispatch an action with payload {isHidden: true} when isHidden false", () => {
      const action = {
        type: UPDATE_LIST_VIEW,
        payload: {
          isHidden: true
        }
      };
      component.listViewState.isHidden = false;
      component.onHide();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
  describe("onExpand", () => {
    it("should dispatch an action", () => {
      component.onExpand();
      expect(store.dispatch).toHaveBeenCalled();
    });
    it("should dispatch an action with payload {isExpanded: true} when isExpanded false", () => {
      const action = {
        type: UPDATE_LIST_VIEW,
        payload: {
          isExpanded: true
        }
      };
      component.listViewState.isExpanded = false;
      component.onExpand();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
