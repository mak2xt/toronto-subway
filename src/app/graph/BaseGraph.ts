import { GraphNode } from "./GraphNode";
import { GraphEdge } from "./GraphEdge";
import { arrayObjectIndexOf } from "../util/util";

export interface GraphShortView {
  //nodes
  [key: string]: {
    [key: string]: number; //keys indicate connections to nodes, values are weight of the edge
  };
}

export class BaseGraph {
  private nodes: GraphNode[];
  private edges: GraphEdge[];
  constructor(nodes?: GraphNode[], edges?: GraphEdge[]) {
    this.nodes = [];
    this.edges = [];
    if (nodes) {
      this.nodes = nodes;
    }
    if (edges) {
      this.edges = edges;
    }
  }
  private getNodeIndex(node: GraphNode) {
    return arrayObjectIndexOf(this.nodes, node.getID(), "id");
  }
  private getEdgeIndex(edge: GraphEdge) {
    for (let i = 0; i < this.edges.length; i++) {
      if (
        this.edges[i].fromNode === edge.fromNode &&
        this.edges[i].toNode === edge.toNode
      ) {
        return i;
      }
    }
    return -1;
  }
  addNode(node: GraphNode) {
    this.nodes.push(node);
  }
  removeNode(node: GraphNode) {
    let index = this.getNodeIndex(node);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }
  addEdge(edge: GraphEdge) {
    this.edges.push(edge);
  }
  changeEdgeWeight(edge: GraphEdge, weight: number) {
    let index = this.getEdgeIndex(edge);
    if (index !== -1) {
      this.edges[index].setWeight(weight);
    }
  }
  removeEdge(edge: GraphEdge) {
    let index = this.getEdgeIndex(edge);
    if (index !== -1) {
      this.edges.splice(index, 1);
    }
  }
  getGraphShortView(): GraphShortView {
    let obj = {};
    for (let node of this.nodes) {
      let objNodeKey = node.getID();
      obj[objNodeKey] = {};
      for (let edge of this.edges) {
        if (edge.fromNode === node) {
          let edgeObj = {};
          edgeObj[edge.toNode.getID()] = edge.getWeight();

          obj[objNodeKey] = Object.assign(obj[objNodeKey], edgeObj);
        }
      }
    }
    return obj;
  }
}
