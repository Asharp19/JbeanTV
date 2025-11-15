import {
  useRef,
  forwardRef,
  useImperativeHandle,
  memo,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Card } from "@/components/ui/card";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  shaderMaterial,
} from "@react-three/drei";
import { Jar, JarHandle } from "@/components/3d/jar";
import { BackSide, ShaderMaterial, Color } from "three";
import { Gradient } from "lamina";
import { LayerMaterial } from "lamina";
import { format } from "date-fns";

interface PredictionJarsProps {
  pair: {
    symbol: string;
    predictions: number;
    color: string;
  };
  onSubmit?: () => void;
}

export interface PredictionJarsHandle {
  addBeanToPair: () => void;
}

// Custom shader for radial gradient
const BaseGlowMaterial = shaderMaterial(
  {
    color: [1, 0.5, 0],
    time: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      float alpha = smoothstep(1.0, 0.0, dist * 2.0);
      float pulse = sin(time * 2.0) * 0.1 + 0.9;
      gl_FragColor = vec4(color, alpha * pulse);
    }
  `
);

// Register the custom material
extend({ BaseGlowMaterial });

type BaseGlowMaterialImpl = {
  uniforms: {
    color: { value: number[] };
    time: { value: number };
  };
} & ShaderMaterial;

// Declare the JSX type for our custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      baseGlowMaterial: {
        ref?: React.RefObject<BaseGlowMaterialImpl>;
        color?: [number, number, number];
        transparent?: boolean;
      };
    }
  }
}

// Memoized Canvas content component
const CanvasContent = memo(
  ({
    initialColor,
    initialPredictions,
    jarRef,
  }: {
    initialColor: string;
    initialPredictions: number;
    jarRef: React.RefObject<JarHandle>;
  }) => {
    // Maintain internal state
    const [state] = useState(() => ({
      color: initialColor,
      predictions: initialPredictions,
    }));

    // Convert hex color to RGB array
    const colorArray = useMemo(() => {
      const color = new Color(state.color);
      return [color.r, color.g, color.b] as [number, number, number];
    }, [state.color]);

    // Animation ref for time uniform
    const materialRef = useRef<BaseGlowMaterialImpl>(null);

    // useFrame(({ clock }) => {
    //   if (materialRef.current) {
    //     materialRef.current.uniforms.time.value = clock.getElapsedTime();
    //   }
    // });

    return (
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        className="rounded-lg"
      >
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial lighting="physical" side={BackSide}>
            <Gradient
              colorA={initialColor}
              colorB="#c0c6ef"
              axes="y"
              start={0}
              end={-0.5}
            />
          </LayerMaterial>
        </mesh>

        {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} /> */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <Environment preset="city" />

        {/* Base Glow */}
        <mesh
          position={[0, -1.25, 0]}
          scale={2}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[3, 3, 32, 32]} />
          <baseGlowMaterial ref={materialRef} color={[0, 0, 0]} transparent />
        </mesh>

        <Jar
          ref={jarRef}
          color={state.color}
          fillLevel={state.predictions / 1000}
          position={[0, 0, 0]}
        />
      </Canvas>
    );
  }
);

CanvasContent.displayName = "CanvasContent";

// Memoized Info Overlay
const InfoOverlay = memo(
  ({
    pair,
    targetDate,
  }: {
    pair?: PredictionJarsProps["pair"];
    targetDate: string;
  }) => (
    <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start">
      <div className="text-white">
        <h3 className="text-lg font-bold">{pair?.symbol}</h3>
        <p className="text-sm opacity-80">{pair?.predictions} predictions</p>
      </div>
      <div className="text-white text-right">
        <p className="text-xs font-medium opacity-80">
          Current Round <br />
          Submission Ends
        </p>
        <p>
          {format(
            new Date(new Date().setDate(new Date().getDate() + 1)).setUTCHours(
              0,
              0,
              0,
              0
            ),
            "MMM d, hh:mm a"
          )}
        </p>
      </div>
    </div>
  )
);

InfoOverlay.displayName = "InfoOverlay";

// Memoized PredictionJars component
export const PredictionJars = memo(
  forwardRef<PredictionJarsHandle, PredictionJarsProps>(({ pair }, ref) => {
    const jarRef = useRef<JarHandle>(null);
    const targetDate = `2025-04-${new Date().getDate() + 1}T00:00`;
    const pairRef = useRef(pair);
    pairRef.current = pair; // Keep ref updated with latest pair data

    const addBeanToPair = useCallback(() => {
      if (jarRef.current) {
        jarRef.current.addBean();
      }
    }, []); // No dependencies needed as we use refs

    useImperativeHandle(
      ref,
      () => ({
        addBeanToPair,
      }),
      [addBeanToPair]
    );

    return (
      <Card className="w-[250px] h-[450px] bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass hover:shadow-glow transition-shadow duration-300">
        <div className="relative rounded-lg w-full h-full">
          <CanvasContent
            initialColor={pair?.color}
            initialPredictions={pair?.predictions}
            jarRef={jarRef}
          />
          <InfoOverlay pair={pair} targetDate={targetDate} />
        </div>
      </Card>
    );
  })
);

PredictionJars.displayName = "PredictionJars";
