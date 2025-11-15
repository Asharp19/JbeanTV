import { memo, ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
  width?: number;
}

export const CardContainer = memo(function CardContainer({
  children,
  width,
}: CardContainerProps) {
  return (
    <div
      className="prediction-card max-w-[90%]  bg-background-secondary/40 border border-primary shadow-glass rounded-xl p-2 sm:p-3 lg:p-4"
      style={{ width: width ? `${width}px` : "auto" }}
    >
      {children}
    </div>
  );
});
