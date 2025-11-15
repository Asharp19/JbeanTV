import React, { useEffect, useState } from "react";
import { GsapStatusContainer } from "./nested/GsapStatusContainer";
import { GsapStatusStep } from "./nested/GsapStatusStep";

interface AgentStatusProps {
  isLoading: boolean;
}

const statusSteps = [
  {
    id: 1,
    label: "Initializing Agents",
    description: "Setting up AI predictive systems",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Technical Analysis",
    description: "Processing market indicators & patterns",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        <path d="M18 11V8h-3" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Crowd Wisdom",
    description: "Analyzing sentiment & on-chain data",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Price Consensus",
    description: "Determining final price projections",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-8 8" />
        <path d="M8.5 8.5L8 12l3.5-.5L16 8" />
        <path d="M15.5 15.5L12 16l.5-3.5L16 8" />
      </svg>
    ),
  },
];

export function AgentStatus({ isLoading }: AgentStatusProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // Step timing logic
  useEffect(() => {
    if (isLoading) {
      // More progressive timing for steps
      const timings = [3500, 4000, 4500, 5000];
      let timeoutIds: NodeJS.Timeout[] = [];

      statusSteps.forEach((step, index) => {
        if (index === 0) return; // Skip first step

        const timeoutId = setTimeout(
          () => {
            setActiveStep(step.id);
          },
          timings.slice(0, index).reduce((a, b) => a + b, 0)
        );

        timeoutIds.push(timeoutId);
      });

      return () => {
        timeoutIds.forEach((id) => clearTimeout(id));
      };
    } else {
      // When loading completes, make sure all steps are completed
      setActiveStep(statusSteps.length);
    }
  }, [isLoading]);

  // Progress animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const step = activeStep;
          const maxProgress = (step / statusSteps.length) * 100;

          if (prev < maxProgress) {
            return Math.min(prev + 0.5, maxProgress);
          }
          return prev;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isLoading, activeStep]);

  return (
    <div className="py-5 z-10 relative">
      <div className="flex items-center justify-end mb-2 px-1 ">
        <div className="flex items-center text-xs text-slate-400 gap-1.5">
          <span className={isLoading ? "text-cyan-400" : "text-green-400"}>
            {isLoading ? "Processing" : "Complete"}
          </span>
          <span
            className={`relative flex h-2 w-2 ${
              isLoading ? "text-cyan-400" : "text-green-400"
            }`}
          >
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLoading ? "bg-cyan-400" : "bg-green-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLoading ? "bg-cyan-500" : "bg-green-500"
              }`}
            ></span>
          </span>
        </div>
      </div>

      <GsapStatusContainer>
        {statusSteps.map((step, index) => {
          const isActive = activeStep >= step.id;
          const isLastCompleted = activeStep === step.id;

          return (
            <GsapStatusStep
              key={step.id}
              id={step.id}
              label={step.label}
              description={step.description}
              icon={step.icon}
              isActive={isActive}
              isLastCompleted={isLastCompleted}
              isLoading={isLoading}
              index={index}
            />
          );
        })}
      </GsapStatusContainer>
    </div>
  );
}
