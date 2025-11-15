import { memo, ReactNode } from "react";

interface CardContentProps {
  left: ReactNode;
  right: ReactNode;
}

export const CardContent = memo(function CardContent({
  left,
  right,
}: CardContentProps) {
  return (
    <div className="flex flex-row gap-4 justify-end items-end max-h-[30%]  h-full">
      {/* Left Column */}

      <div className="">{left}</div>

      {/* Right Column */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2 sm:gap-3">
        {right}
      </div>
    </div>
  );
});
