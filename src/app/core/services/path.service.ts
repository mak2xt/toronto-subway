import { Injectable } from "@angular/core";
import { TimeGraph } from "@app/graph/TimeGraph";
import { GraphNode } from "@app/graph/GraphNode";
import { GraphEdge } from "@app/graph/GraphEdge";
import { Path, shortestPath } from "@app/graph/shortest-path";
import { arrayObjectIndexOf } from "../../util/util";

export interface StationMinimal {
  id: string;
  line: number;
}

export interface Station extends StationMinimal {
  name: string;
  connections: StationMinimal[];
}

@Injectable()
export class PathService {
  private timeGraph: TimeGraph;
  constructor() {
    this.timeGraph = null;
  }
  private getNodeByStationID(nodes: GraphNode[], station: string) {
    for (let node of nodes) {
      if (node.getID() === station) {
        return node;
      }
    }
    return null;
  }
  private fillTimeGraph(stations: Station[]) {
    let nodes: GraphNode[] = [];
    let edges: GraphEdge[] = [];
    for (let station of stations) {
      let node = this.getNodeByStationID(nodes, station.id);
      if (node === null) {
        node = new GraphNode(station.id);
        nodes.push(node);
      }

      for (let connection of station.connections) {
        let connectionNode = this.getNodeByStationID(nodes, connection.id);

        if (connectionNode === null) {
          connectionNode = new GraphNode(connection.id);
          nodes.push(connectionNode);
        }

        let weight = 1;
        //transfer is too long, always not worth it
        if (connection.id === "spa2" || connection.id === "spa1") weight = 20;
        edges.push(new GraphEdge(node, connectionNode, weight));
      }
    }
    this.timeGraph = new TimeGraph(nodes, edges);
  }
  getPath(
    stations: Station[],
    from: Station | string,
    to: Station | string
  ): Path {
    if (!this.timeGraph) {
      this.fillTimeGraph(stations);
    }
    if (typeof from === "string") {
      from = stations[arrayObjectIndexOf(stations, from, "id")];
    }
    if (typeof to === "string") {
      to = stations[arrayObjectIndexOf(stations, to, "id")];
    }
    return shortestPath(
      this.timeGraph.getGraphShortView(),
      from.id.toString(),
      to.id.toString()
    );
  }
}
