import React, { ReactNode, memo } from "react";

interface AgentGridLayoutProps {
  children: ReactNode;
}

export const AgentGridLayout = memo(function AgentGridLayout({ children }: AgentGridLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
      {children}
    </div>
  );
});
