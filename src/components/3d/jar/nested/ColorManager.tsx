import { useRef, useEffect } from "react";
import { Color } from "three";
import { useFrame } from "@react-three/fiber";

interface ColorManagerProps {
  baseColor: string;
}

export const useColorManager = ({ baseColor }: ColorManagerProps) => {
  const colorRef = useRef(new Color(baseColor));
  const targetColorRef = useRef(new Color(baseColor));

  // Update the target color when the base color changes
  useEffect(() => {
    targetColorRef.current.set(baseColor);
  }, [baseColor]);

  // Set up the color animation
  useFrame((state) => {
    // Update color interpolation
    const t = Math.sin(state.clock.getElapsedTime() * 2) * 0.5 + 0.5;
    colorRef.current.lerp(targetColorRef.current, 0.1);

    // Change target color based on bounce
    if (t < 0.2) {
      targetColorRef.current.set("#3B82F6"); // brand.start
    } else if (t < 0.4) {
      targetColorRef.current.set("#00D1FF"); // brand.end
    } else if (t < 0.6) {
      targetColorRef.current.set("#FF6B3D"); // brand.accent
    } else if (t < 0.8) {
      targetColorRef.current.set("#A78BFA"); // brand.purple
    } else {
      targetColorRef.current.set(baseColor); // Original color
    }
  });

  return {
    colorRef,
    targetColorRef,
  };
};
