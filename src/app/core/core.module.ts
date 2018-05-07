import {NgModule, Optional, SkipSelf} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DataService} from "./services/data.service";
import {PathService} from "./services/path.service";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [DataService, PathService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule){
    if(core){
      throw new Error('CoreModule import error')
    }
  }
}
