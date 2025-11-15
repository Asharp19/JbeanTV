import { memo } from "react";
import { useBitcoinShape } from "./BitcoinShape";

interface BitcoinLogoProps {
  color: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const BitcoinLogo = memo(
  ({
    color,
    position = [-0.2, 0, 1.2],
    rotation = [0, 0, 0],
    scale = 0.4,
  }: BitcoinLogoProps) => {
    const bitcoinShape = useBitcoinShape();

    return (
      <group position={position} rotation={rotation as any} scale={scale}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry
            args={[
              bitcoinShape,
              {
                depth: 0.1,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 3,
              },
            ]}
          />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={2}
          />
        </mesh>
      </group>
    );
  }
);

BitcoinLogo.displayName = "BitcoinLogo";
