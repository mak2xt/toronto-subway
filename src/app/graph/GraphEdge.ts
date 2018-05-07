import { GraphNode } from "./GraphNode";

export class GraphEdge {
  constructor(
    readonly fromNode: GraphNode,
    readonly toNode: GraphNode,
    private weight: number,
    readonly directed: boolean = false
  ) {}
  getWeight() {
    return this.weight;
  }
  setWeight(weight: number) {
    this.weight = weight;
  }
}
