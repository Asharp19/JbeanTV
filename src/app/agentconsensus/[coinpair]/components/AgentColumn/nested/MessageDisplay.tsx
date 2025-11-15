import React from "react";
import { AgentMessages } from "../../types";

interface MessageDisplayProps {
  title: string;
  messages: AgentMessages;
  isLoading?: boolean;
}

export function MessageDisplay({
  title,
  messages,
  isLoading,
}: MessageDisplayProps) {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-4">
        <h4 className="text-lg font-medium">Messages</h4>
        <div className="h-40 flex items-center justify-center">
          <div className="animate-pulse text-content-tertiary">
            Loading messages...
          </div>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="mt-4 space-y-4">
        <h4 className="text-lg font-medium">Messages</h4>
        <div className="h-40 flex items-center justify-center">
          <div className="text-content-tertiary">No messages available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <h4 className="text-lg font-medium">Messages</h4>
      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {messages.map((message, index) => (
          <div key={index} className="p-3 bg-background-tertiary/40 rounded-lg">
            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
            <div className="text-xs text-content-tertiary mt-1">
              {new Date(message.timestamp ?? 0 * 1000).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
