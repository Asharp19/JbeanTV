import { useMemo } from "react";
import * as THREE from "three";
import { Vector2, CylinderGeometry } from "three";

export const useJarGeometry = () => {
  // Memoize jar geometry calculation
  return useMemo(() => {
    return createJarGeometry();
  }, []);
};

// Create jar geometry with curved edges
function createJarGeometry() {
  const geometry = new CylinderGeometry(1, 1.1, 2.5, 32, 32, true);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const vec = new Vector2();
  const curvature = 0.15;

  for (let i = 0; i < pos.count; i++) {
    vec.fromBufferAttribute(pos, i);
    const y = pos.getY(i);
    const topEdgeY = 1.25;
    const edgeRadius = 0.2;
    const distFromTop = Math.abs(y - topEdgeY);

    let curve;
    if (distFromTop < edgeRadius) {
      curve = 1 - Math.pow(1 - distFromTop / edgeRadius, 2);
    } else {
      curve = 1 - Math.pow(Math.abs(y / 1.25), 2);
    }

    const scale = 1 + curve * curvature;
    pos.setXY(i, vec.x * scale, y);
  }

  return geometry;
}
