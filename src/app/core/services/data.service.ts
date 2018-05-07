import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Station } from "./path.service";

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}
  getStations() {
    return this.httpClient.get<Station[]>("/assets/stations.json");
  }
}
