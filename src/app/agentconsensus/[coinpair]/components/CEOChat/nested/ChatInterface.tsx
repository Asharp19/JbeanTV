import React, { ReactNode } from "react";

interface ChatInterfaceProps {
  children: ReactNode;
}

export function ChatInterface({ children }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-full bg-background-secondary/40 backdrop-blur-xl rounded-2xl border border-content-quaternary overflow-hidden">
      {children}
    </div>
  );
}
