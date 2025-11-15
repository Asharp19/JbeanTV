import React from "react";

interface ChatHeaderProps {
  coinpair: string;
}

export function ChatHeader({ coinpair }: ChatHeaderProps) {
  return (
    <div className="p-4 bg-gradient-glass border-b border-content-quaternary">
      <h3 className="text-lg font-medium text-content-primary">
        Chat with Coordinator Agent
      </h3>
      <p className="text-sm text-content-tertiary">
        Ask questions about the {coinpair} prediction analysis
      </p>
    </div>
  );
}
