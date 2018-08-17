import { Station } from "@app/core";

/**
 * @description changes station name immutably
 * @param {Station} station
 * @param {string} name
 * @returns {Station}
 */
export function changeStationName(station: Station, name: string): Station {
  return {
    ...station,
    connections: station.connections.map(el => ({ id: el.id, line: el.line })),
    name: name
  };
}

export function removeLineReference(name: string): string {
  let parenthesisIndex = name.indexOf("(");
  if (parenthesisIndex === -1) {
    return name;
  }
  return name.slice(0, parenthesisIndex).trim();
}

export const spadinaLineStations = [
  "vaug",
  "h407",
  "pion",
  "youn",
  "fiwe",
  "dopa",
  "down",
  "wils",
  "york",
  "laww",
  "glen",
  "eglw",
  "stcw",
  "dupo",
  "spa1",
  "stg1",
  "muse",
  "qupa",
  "stpa",
  "osgo",
  "stan"
];

export const youngLineStations = [
  "king",
  "quee",
  "dund",
  "coll",
  "well",
  "blo1",
  "rose",
  "summ",
  "stcl",
  "davi",
  "egli",
  "lawr",
  "yomi",
  "shy1",
  "nyce",
  "finc"
].reverse();
