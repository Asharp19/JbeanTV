import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatInterface } from "./nested/ChatInterface";
import { ChatHeader } from "./nested/ChatHeader";
import { MessageList } from "./nested/MessageList";
import { MessageInput } from "./nested/MessageInput";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface CEOChatProps {
  coinpair: string;
  onAnalysisComplete?: () => void;
}

export function CEOChat({ coinpair, onAnalysisComplete }: CEOChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // Use the real endpoint for chat history
        const API_URL =
          process.env.NEXT_PUBLIC_AGENCY_API || "http://localhost:5001";
        const response = await fetch(`${API_URL}/chat-history/${coinpair}`);

        if (response.ok) {
          const data = await response.json();
          if (data.history && data.history.length > 0) {
            setMessages(data.history);
          }
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    if (coinpair && messages.length === 0) {
      fetchChatHistory();
    }
  }, [coinpair, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now() / 1000,
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Use the real endpoint for chat with CEO
      const API_URL = process.env.NEXT_PUBLIC_AGENCY_API;
      const response = await fetch(`${API_URL}/chat-with-ceo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: coinpair,
          message: input,
          coinpair: coinpair,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Add assistant response to chat
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: Date.now() / 1000,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Check if this is a completion message
      if (
        data.response.includes("analysis complete") ||
        data.response.includes("prediction complete") ||
        data.response.includes("final prediction")
      ) {
        onAnalysisComplete?.();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
          timestamp: Date.now() / 1000,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <ChatInterface>
      <ChatHeader coinpair={coinpair} />
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      <MessageInput
        input={input}
        isLoading={isLoading}
        inputRef={inputRef}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </ChatInterface>
  );
}
