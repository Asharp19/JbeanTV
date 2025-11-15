import React, { ReactNode } from "react";

interface ColumnContainerProps {
  children: ReactNode;
}

export function ColumnContainer({ children }: ColumnContainerProps) {
  return (
    <div className="flex flex-col h-full bg-background-secondary/40 backdrop-blur-xl p-6 rounded-2xl border border-content-quaternary">
      {children}
    </div>
  );
}
