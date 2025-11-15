import React from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === "user"
            ? "bg-accent-primary/20 text-content-primary"
            : "bg-background-tertiary/40 text-content-primary"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className="text-xs text-content-tertiary mt-1">
          {new Date(message.timestamp * 1000).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
