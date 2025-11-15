import { useMemo } from "react";
import { Color } from "three";

// Memoized Bean geometry and material configuration
export const useBeanGeometry = (colorValue: string) => {
  // Memoize color reference to prevent unnecessary re-renders
  const colorRef = useMemo(() => new Color(colorValue), [colorValue]);

  // Define standard material properties
  const materialProps = useMemo(
    () => ({
      roughness: 0.2,
      metalness: 0.3,
      envMapIntensity: 2,
    }),
    []
  );

  return {
    colorRef,
    materialProps,
  };
};
