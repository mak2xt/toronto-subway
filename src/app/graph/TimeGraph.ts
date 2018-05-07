import { BaseGraph } from "./BaseGraph";
import { GraphNode } from "./GraphNode";
import { GraphEdge } from "./GraphEdge";

export class TimeGraph extends BaseGraph {
  constructor(nodes?: GraphNode[], edges?: GraphEdge[]) {
    super(nodes, edges);
  }
  setTimings() {}
}
