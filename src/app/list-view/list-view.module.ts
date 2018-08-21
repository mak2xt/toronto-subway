import { NgModule } from "@angular/core";

import { ListViewDesktopComponent } from "./list-view-desktop/list-view-desktop.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ListSectionComponent } from "./list-section/list-section.component";
import { ListTransformerPipe } from "./list-transformer.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListOpenButtonComponent } from "./list-open-button/list-open-button.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { ListViewMobileComponent } from "./list-view-mobile/list-view-mobile.component";
import { StoreModule } from "@ngrx/store";
import { listViewReducer } from "@app/list-view/state/reducer";
import { EffectsModule } from "@ngrx/effects";
import { ListEffects } from "@app/list-view/state/effects";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forFeature("listView", listViewReducer),
    EffectsModule.forFeature([ListEffects])
  ],
  exports: [ListViewComponent],
  declarations: [
    ListViewDesktopComponent,
    ListSectionComponent,
    ListTransformerPipe,
    ListOpenButtonComponent,
    ListViewComponent,
    ListViewMobileComponent
  ],
  providers: []
})
export class ListViewModule {}
