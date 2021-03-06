//Dijkstra's Algorithm in Javascript using a Weighted Graph
//https://gist.github.com/MoeweX/ab98efee9435b47529e3a6cb50c5b605

import { environment } from "../../environments/environment";
import {GraphShortView} from "./BaseGraph";


export interface Path {
  distance: number,
  path: string[]
}

function log(message) {
  // const logging = !environment.production;
  const logging = false;
  if (logging) {
    console.log(message);
  }
}

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

export function shortestPath(graph : GraphShortView, startNodeName: string, endNodeName : string) : Path{
  // track the lowest cost to reach each node
  let costs = {};
  costs[endNodeName] = "Infinity";
  costs = Object.assign(costs, graph[startNodeName]);

  // track paths
  const parents = {endNodeName: null};
  for (let child in graph[startNodeName]) {
    parents[child] = startNodeName;
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      if (String(n) === String(startNodeName)) {
        log("WE DON'T GO BACK TO START");
      } else {
        log("StartNodeName: " + startNodeName);
        log("Evaluating cost to node " + n + " (looking from node " + node + ")");
        log("Last Cost: " + costs[n]);
        let newCost = cost + children[n];
        log("New Cost: " + newCost);
        if (!costs[n] || costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
          log("Updated cost und parents");
        } else {
          log("A shorter path already exists");
        }
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = [endNodeName];
  let parent = parents[endNodeName];
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs[endNodeName],
    path: optimalPath
  };

  return results;
}
