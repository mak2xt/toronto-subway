import { ListTransformerPipe } from "./list-transformer.pipe";
import { Station } from "../core";

const testStations: Station[] = [
  {
    id: "1",
    name: "1",
    line: 1,
    connections: [{ id: "4", line: 1 }, { id: "3", line: 1 }]
  },
  {
    id: "4",
    name: "4",
    line: 1,
    connections: [{ id: "2", line: 2 }, { id: "1", line: 1 }]
  },
  {
    id: "2",
    name: "2",
    line: 2,
    connections: [{ id: "1", line: 1 }]
  },
  {
    id: "3",
    name: "3",
    line: 1,
    connections: [{ id: "4", line: 1 }]
  }
];

describe("ListTransformerPipe", () => {
  it("create an instance", () => {
    const pipe = new ListTransformerPipe();
    expect(pipe).toBeTruthy();
  });
  describe("#transform", () => {
    it("should have transform method", () => {
      const pipe = new ListTransformerPipe();
      expect(pipe.transform).toBeDefined();
    });
    it("should return first and last station when not expanded", () => {
      const pipe = new ListTransformerPipe();
      expect(pipe.transform(testStations, false)).toContain(testStations[0]);
      expect(pipe.transform(testStations, false)).toContain(testStations[2]);
    });
    it("should return the same array when expanded", () => {
      const pipe = new ListTransformerPipe();
      expect(pipe.transform(testStations, true)).toEqual(testStations);
    });
    it("should return first line change station when not expanded", () => {
      const pipe = new ListTransformerPipe();
      expect(pipe.transform(testStations, false)).toContain(testStations[1]);
    });
  });
});
