import React, { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";

interface StepProps {
  id: number;
  label: string;
  description: string;
  icon: ReactNode;
  isActive: boolean;
  isLastCompleted: boolean;
  isLoading: boolean;
  index: number;
}

export function GsapStatusStep({
  id,
  label,
  description,
  icon,
  isActive,
  isLastCompleted,
  isLoading,
  index,
}: StepProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // Animation for circle indicator
  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: isActive ? 1 : 0.9,
          opacity: 1,
          duration: 0.7,
          delay: 0.1 * index,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isActive, index]);

  // Animation for the icon
  useEffect(() => {
    if (isActive && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.2 + 0.1 * index,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isActive, index]);

  // Animation for label
  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { y: 5, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15 * index,
        }
      );
    }
  }, [index]);

  // Animation for description
  useEffect(() => {
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 5 },
        {
          opacity: isActive ? 0.9 : 0.6,
          y: 0,
          duration: 0.6,
          delay: 0.2 * index,
        }
      );
    }
  }, [isActive, index]);

  // Animation for pulse effect
  useEffect(() => {
    if (isActive && pulseRef.current) {
      gsap.fromTo(
        pulseRef.current,
        { opacity: 0.1 },
        {
          opacity: 0.6,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }
  }, [isActive]);

  // Shimmer animation for active steps

  // Get the appropriate gradient colors based on step ID
  const getStepColors = () => {
    switch (id) {
      case 1: // Initializing Agents
        return {
          from: "#14b8a6", // teal
          to: "#0ea5e9", // sky
          pulseColor: "rgba(20, 184, 166, 0.6)", // teal with transparency
          textColor: "#0ea5e9",
        };
      case 2: // Processing Technical Analysis
        return {
          from: "#8b5cf6", // violet
          to: "#06b6d4", // cyan
          pulseColor: "rgba(139, 92, 246, 0.6)", // violet with transparency
          textColor: "#8b5cf6",
        };
      case 3: // Gathering Crowd Wisdom
        return {
          from: "#f59e0b", // amber
          to: "#84cc16", // lime
          pulseColor: "rgba(132, 204, 22, 0.6)", // lime with transparency
          textColor: "#84cc16",
        };
      case 4: // Calculating Consensus
        return {
          from: "#ec4899", // pink
          to: "#6366f1", // indigo
          pulseColor: "rgba(236, 72, 153, 0.6)", // pink with transparency
          textColor: "#ec4899",
        };
      default:
        return {
          from: "#0ea5e9", // sky
          to: "#14b8a6", // teal
          pulseColor: "rgba(14, 165, 233, 0.6)", // sky with transparency
          textColor: "#0ea5e9",
        };
    }
  };

  const { from, to, pulseColor, textColor } = getStepColors();

  // Define gradients and styles
  const circleStyle = isActive
    ? {
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: `0 5px 15px ${pulseColor}, 0 0 2px ${from}`,
      }
    : {
        background: "rgba(30, 41, 59, 0.8)",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
      };

  return (
    <div className="flex flex-col items-center w-[22%] z-[5]">
      {/* Icon Circle */}
      <div
        ref={circleRef}
        className={`relative z-[10] flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm ${
          isActive ? "border border-white/10" : "border border-slate-700/30"
        }`}
        style={circleStyle}
      >
        {/* Shimmer effect for active step */}
        {isActive && (
          <div
            ref={shimmerRef}
            className="absolute inset-0 overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
        {isActive ? (
          <div ref={iconRef} className="text-white">
            {icon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        ) : (
          <div className="w-2 h-2 rounded-full bg-slate-600/50 backdrop-blur-sm"></div>
        )}
        {isActive && (
          <div
            ref={pulseRef}
            className="absolute inset-0 rounded-full blur-md -z-10"
            style={{
              background: `radial-gradient(circle, ${pulseColor} 0%, rgba(0,0,0,0) 70%)`,
            }}
          ></div>
        )}
      </div>

      {/* Text content below icon */}
      <div ref={labelRef} className="text-center max-w-max mt-2">
        <h4
          className={`text-xs font-medium leading-tight
          ${isActive ? "text-white" : "text-slate-400"}`}
          style={isActive ? { color: textColor } : {}}
        >
          {label}
          {isLastCompleted && isLoading && (
            <span className="inline-flex relative ml-1">
              <span className="flex">
                <span className="animate-ping h-1 w-1 absolute inline-flex rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-blue-500"></span>
              </span>
            </span>
          )}
        </h4>

        <p
          ref={descriptionRef}
          className={`text-[9px] mt-0.5 leading-tight max-w-[100px] mx-auto
            ${isActive ? "text-slate-300" : "text-slate-500"}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
