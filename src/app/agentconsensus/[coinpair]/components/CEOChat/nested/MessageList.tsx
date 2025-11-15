import React, { RefObject } from "react";
import { MessageItem } from "./MessageItem";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-content-tertiary py-8">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
