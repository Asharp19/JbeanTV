import React, { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";

interface GsapStatusContainerProps {
  children: ReactNode;
}

export function GsapStatusContainer({ children }: GsapStatusContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<HTMLDivElement>(null);
  const circuitDotsRef = useRef<HTMLDivElement>(null);

  // Initialize animations
  useEffect(() => {
    // Container entrance animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    }

    // Timeline line animation
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          transformOrigin: "left center",
          ease: "power2.inOut",
        }
      );
    }

    // Circuit animation
    if (circuitRef.current) {
      // Create a more noticeable animation for the circuit lines
      gsap.fromTo(
        circuitRef.current,
        {
          backgroundPosition: "0% 0%",
          opacity: 0.15,
        },
        {
          backgroundPosition: "100% 100%",
          opacity: 0.25,
          duration: 150,
          repeat: -1,
          yoyo: true,
          ease: "none",
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[130px] overflow-hidden rounded-xl border border-indigo-500/30 shadow-lg backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(140deg, rgba(11,17,43,0.98) 0%, rgba(19,26,55,0.98) 50%, rgba(11,20,38,0.98) 100%)",
        boxShadow:
          "0 8px 32px -10px rgba(0,70,255,0.15), 0 0 10px -3px rgba(0,150,255,0.1), 0 0 2px rgba(158,226,255,0.2) inset",
      }}
    >
      <div
        ref={circuitRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
         
            linear-gradient(to bottom, rgba(20, 24, 31, 0.897) 1px, transparent 1px),
       
            linear-gradient(90deg, rgba(20, 18, 17, 0.192) 25%, transparent 25%, transparent 50%, rgba(27, 36, 85, 0.514) 50%, rgba(16, 17, 29, 0.25) 75%, transparent 75%, transparent)
          `,
          backgroundSize:
            "40px 40px, 40px 40px, 20px 20px, 20px 20px, 60px 60px",
          opacity: 0.65,
        }}
      />
      {/* Additional glowing circuit paths */}
      <div className="absolute inset-0 z-0">
        {/* Horizontal paths */}
        <div
          className="absolute h-[2px] w-[70%] opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, #3B82F6, transparent)",
            top: "35%",
            left: "15%",
            boxShadow: "0 0 12px #3B82F6",
            animation: "horizontalMove 8s linear infinite",
          }}
        />
        <div
          className="absolute h-[2px] w-[50%] opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, #10B981, transparent)",
            top: "65%",
            right: "5%",
            boxShadow: "0 0 10px #10B981",
            animation: "horizontalMove 6s linear infinite reverse",
          }}
        />

        {/* Vertical paths */}
        <div
          className="absolute w-[2px] h-[50%] opacity-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #6366F1, transparent)",
            left: "30%",
            top: "25%",
            boxShadow: "0 0 10px #6366F1",
            animation: "verticalMove 10s linear infinite",
          }}
        />
        <div
          className="absolute w-[2px] h-[70%] opacity-50"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #3B82F6, transparent)",
            right: "25%",
            top: "15%",
            boxShadow: "0 0 12px #3B82F6",
            animation: "verticalMove 7s linear infinite reverse",
          }}
        />
      </div>
      {/* Content container with padding */}
      <div className="relative z-10 h-full flex flex-col px-4">
        {/* Steps container - this contains the timeline and steps */}
        <div className="relative flex items-center justify-between w-full h-full">
          {/* Horizontal timeline line with animated gradient - positioned to run through the center of circles */}
          <div
            ref={timelineRef}
            className="absolute left-0 right-0 h-[2px] rounded-full z-[1] overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #2dd4bf, #818cf8)",
              boxShadow: "0 0 10px rgba(14, 165, 233, 0.4)",
              top: "45px",
            }}
          >
            {/* Animated shine effect on the timeline */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
          </div>

          {children}
        </div>
      </div>
      {/* Use regular CSS instead of styled-jsx for animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes horizontalMove {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes verticalMove {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
