import { useMemo } from "react";
import { Shape } from "three";

export const useBitcoinShape = () => {
  return useMemo(() => createBitcoinShape(), []);
};

// Bitcoin SVG path converted to Shape
function createBitcoinShape() {
  const shape = new Shape();
  // Simple Bitcoin ₿ shape
  shape.moveTo(0, 1);
  shape.lineTo(0.6, 1);
  shape.bezierCurveTo(0.9, 1, 1.1, 0.8, 1.1, 0.5);
  shape.bezierCurveTo(1.1, 0.2, 0.9, 0, 0.6, 0);
  shape.lineTo(0, 0);
  shape.lineTo(0, 1);

  // Inner cutouts
  const hole1 = new Shape();
  hole1.moveTo(0.3, 0.8);
  hole1.lineTo(0.7, 0.8);
  hole1.lineTo(0.7, 0.6);
  hole1.lineTo(0.3, 0.6);
  hole1.lineTo(0.3, 0.8);

  const hole2 = new Shape();
  hole2.moveTo(0.3, 0.4);
  hole2.lineTo(0.7, 0.4);
  hole2.lineTo(0.7, 0.2);
  hole2.lineTo(0.3, 0.2);
  hole2.lineTo(0.3, 0.4);

  shape.holes.push(hole1, hole2);
  return shape;
}
