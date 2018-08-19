export type RectangleCoords = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type Point = {
  x: number;
  y: number;
};

const rectangleCentre = (rect: RectangleCoords) => ({
  x: (rect.left + rect.right) / 2,
  y: (rect.top + rect.bottom) / 2
});

const calcDeltas = (point1: Point, point2: Point) => ({
  deltaX: point1.x - point2.x,
  deltaY: point1.y - point2.y
});

export const getCenteringDeltas = (
  rect1: RectangleCoords,
  rect2: RectangleCoords
) => calcDeltas(rectangleCentre(rect1), rectangleCentre(rect2));
