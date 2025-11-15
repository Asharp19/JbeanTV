import { memo, useMemo } from "react";
import { Color } from "three";
import { Bean } from "./Bean";

interface BeansContainerProps {
  beanCount: number;
  colorRef: React.MutableRefObject<Color>;
  position?: [number, number, number];
  dynamicBeans?: Array<{
    id: number;
    position: [number, number, number];
    scale: number;
  }>;
}

export const BeansContainer = memo(
  ({
    beanCount,
    colorRef,
    position = [0, -0.8, 0],
    dynamicBeans = [],
  }: BeansContainerProps) => {
    // Generate static beans based on fill level
    const beans = useMemo(() => {
      const radius = 0.8;
      const points: Array<{
        position: [number, number, number];
        scale: number;
      }> = [];

      // Create layers of beans with more vertical spacing for physics
      const layerHeight = 0.2; // Increased for physics spacing
      const beansPerLayer = 12; // Reduced density for better physics
      const layers = Math.ceil(beanCount / beansPerLayer);

      for (let layer = 0; layer < layers; layer++) {
        const layerRadius = radius * (1 - (layer / layers) * 0.2);
        const layerBeans = Math.min(
          beansPerLayer,
          beanCount - layer * beansPerLayer
        );

        for (let i = 0; i < layerBeans; i++) {
          const angle = (i / layerBeans) * Math.PI * 2 + layer * 0.5;
          const jitter = Math.random() * 0.1;

          const x = Math.cos(angle) * layerRadius + jitter;
          const y = layer * layerHeight + 0.2; // Added initial height
          const z = Math.sin(angle) * layerRadius + jitter;

          points.push({
            position: [x, y, z],
            scale: 0.12 + Math.random() * 0.04,
          });
        }
      }

      return points;
    }, [beanCount]);

    return (
      <group position={position}>
        {/* Existing static beans */}
        {beans.map((bean, index) => (
          <Bean
            key={`static-bean-${index}`}
            id={index}
            position={bean.position}
            scale={bean.scale}
            color={colorRef.current}
          />
        ))}

        {/* Dynamically added beans */}
        {dynamicBeans.map((bean) => (
          <Bean
            key={`dynamic-bean-${bean.id}`}
            id={bean.id}
            position={bean.position}
            scale={bean.scale}
            color={colorRef.current}
          />
        ))}
      </group>
    );
  }
);

BeansContainer.displayName = "BeansContainer";
