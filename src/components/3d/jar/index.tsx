import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Group } from "three";
import { Physics } from "@react-three/rapier";

// Import nested components
import { JarGlass } from "./nested/JarGlass";
import { BitcoinLogo } from "./nested/BitcoinLogo";
import { BeansContainer } from "./nested/BeansContainer";
import { useColorManager } from "./nested/ColorManager";

// Define interfaces
interface JarProps {
  color: string;
  fillLevel: number;
  position: [number, number, number];
  onClick?: () => void;
  symbol?: string;
}

export interface JarHandle {
  addBean: () => void;
}

export const Jar = forwardRef<JarHandle, JarProps>(
  ({ color, fillLevel, position, symbol }, ref) => {
    const groupRef = useRef<Group>(null);

    // Use color manager hook for animated color effects
    const { colorRef } = useColorManager({ baseColor: color });

    // State for managing dynamically added beans
    const [dynamicBeans, setDynamicBeans] = useState<
      Array<{
        id: number;
        position: [number, number, number];
        scale: number;
      }>
    >([]);

    // Handler for adding beans
    const addBean = useCallback(() => {
      const newBean = {
        id: Date.now(),
        position: [
          (Math.random() - 0.5) * 0.2,
          2,
          (Math.random() - 0.5) * 0.2,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.04,
      };
      setDynamicBeans((prev) => [...prev, newBean]);
    }, []);

    // Expose addBean method to parent components
    useImperativeHandle(ref, () => ({
      addBean,
    }));

    // Map fillLevel to actual bean count (1-1000 predictions)
    const beanCount = Math.floor(Math.min(fillLevel * 1000, 1000));

    return (
      <group ref={groupRef} position={position}>
        <Physics gravity={[0, -9.81, 0]}>
          {/* Jar glass container */}
          <JarGlass />

          {/* Beans container */}
          <BeansContainer
            beanCount={beanCount}
            colorRef={colorRef}
            dynamicBeans={dynamicBeans}
          />
        </Physics>

        {/* Bitcoin Symbol - Outside Physics system */}
        <BitcoinLogo color={color} />

        {/* Crypto Symbol - Commented in original */}
        {/* {symbol && (
          <group position={[0, -0.5, 1.1]}>
            <mesh scale={0.3}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial color={color} transparent opacity={0.9} />
            </mesh>
          </group>
        )} */}
      </group>
    );
  }
);

Jar.displayName = "Jar";
