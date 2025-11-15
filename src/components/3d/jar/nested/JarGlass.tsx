import { memo, useRef } from "react";
import { Mesh } from "three";
import { RigidBody } from "@react-three/rapier";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useJarGeometry } from "./JarGeometry";

interface JarGlassProps {
  position?: [number, number, number];
}

export const JarGlass = memo(({ position = [0, 0, 0] }: JarGlassProps) => {
  const jarRef = useRef<Mesh>(null);
  const jarGeometry = useJarGeometry();

  return (
    <>
      {/* Glass Jar - Static RigidBody */}
      <RigidBody type="fixed" colliders="trimesh" position={position}>
        <mesh ref={jarRef} castShadow receiveShadow geometry={jarGeometry}>
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={-0.2}
            reflectivity={0.2}
            roughness={0.3}
            ior={2}
            transmission={0.95}
            transmissionSampler={true}
            resolution={1024}
            clearcoat={0.4}
            clearcoatRoughness={0.8}
            envMapIntensity={2}
          />
        </mesh>
      </RigidBody>

      {/* Jar Bottom - Static RigidBody */}
      <RigidBody
        type="fixed"
        position={[position[0], position[1] - 1.25, position[2]]}
      >
        <mesh>
          <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
          <meshStandardMaterial visible={false} />
        </mesh>
      </RigidBody>
    </>
  );
});

JarGlass.displayName = "JarGlass";
