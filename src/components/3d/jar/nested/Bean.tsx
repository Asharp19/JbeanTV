import { memo } from "react";
import { Color } from "three";
import { RigidBody } from "@react-three/rapier";

interface BeanProps {
  position: [number, number, number];
  scale: number;
  color: Color;
  id?: number | string;
}

export const Bean = memo(({ position, scale, color, id }: BeanProps) => {
  return (
    <RigidBody
      key={id}
      colliders="ball"
      restitution={0.3}
      friction={0.8}
      position={position}
    >
      <mesh scale={[scale, scale * 0.6, scale]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={2}
        />
      </mesh>
    </RigidBody>
  );
});

Bean.displayName = "Bean";
