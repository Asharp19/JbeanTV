import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Message } from "@/lib/types/agency";
import { gsap } from "gsap";

interface MessageAnimationContextType {
  registerMessage: (
    agentId: string,
    messageId: string,
    timestamp: number
  ) => void;
  isAnimating: (agentId: string, messageId: string) => boolean;
  shouldShowMessage: (agentId: string, messageId: string) => boolean;
  isAllAnimationsComplete: boolean;
}

const MessageAnimationContext = createContext<
  MessageAnimationContextType | undefined
>(undefined);

interface MessageInfo {
  agentId: string;
  messageId: string;
  timestamp: number;
  isVisible: boolean;
  isAnimating: boolean;
}

export const MessageAnimationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Store all messages in a single array, sorted by timestamp
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const [isAllAnimationsComplete, setIsAllAnimationsComplete] = useState(false);
  const animationInProgressRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Register a new message
  const registerMessage = useCallback(
    (agentId: string, messageId: string, timestamp: number) => {
      setMessages((prev) => {
        // Check if this message is already registered
        if (
          prev.some(
            (msg) => msg.agentId === agentId && msg.messageId === messageId
          )
        ) {
          return prev;
        }

        // Add the new message
        const newMessages = [
          ...prev,
          {
            agentId,
            messageId,
            timestamp,
            isVisible: false,
            isAnimating: false,
          },
        ];

        // Sort by timestamp
        return newMessages.sort((a, b) => a.timestamp - b.timestamp);
      });
    },
    []
  );

  // Check if a specific message is currently animating
  const isAnimating = useCallback(
    (agentId: string, messageId: string) => {
      return messages.some(
        (msg) =>
          msg.agentId === agentId &&
          msg.messageId === messageId &&
          msg.isAnimating
      );
    },
    [messages]
  );

  // Check if a message should be shown
  const shouldShowMessage = useCallback(
    (agentId: string, messageId: string) => {
      return messages.some(
        (msg) =>
          msg.agentId === agentId &&
          msg.messageId === messageId &&
          msg.isVisible
      );
    },
    [messages]
  );

  // Process the next message in the queue
  const processNextMessage = useCallback(() => {
    if (animationInProgressRef.current) {
      return;
    }

    setMessages((prev) => {
      // Find the first message that's not visible yet
      const nextMessageIndex = prev.findIndex((msg) => !msg.isVisible);

      if (nextMessageIndex === -1) {
        // All messages are visible
        setIsAllAnimationsComplete(true);
        return prev;
      }

      // Mark animation as in progress
      animationInProgressRef.current = true;

      // Update the message to be visible and animating
      const updatedMessages = [...prev];
      updatedMessages[nextMessageIndex] = {
        ...updatedMessages[nextMessageIndex],
        isVisible: true,
        isAnimating: true,
      };

      // Set a timeout to finish the animation
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setMessages((current) => {
          const updated = [...current];
          const index = updated.findIndex(
            (msg) =>
              msg.agentId === updatedMessages[nextMessageIndex].agentId &&
              msg.messageId === updatedMessages[nextMessageIndex].messageId
          );

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              isAnimating: false,
            };
          }

          // Mark animation as complete
          animationInProgressRef.current = false;

          // Process the next message
          processNextMessage();

          return updated;
        });
      }, 1000); // Animation duration

      return updatedMessages;
    });
  }, []);

  // Start processing messages whenever the queue changes
  useEffect(() => {
    processNextMessage();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [messages.length, processNextMessage]);

  return (
    <MessageAnimationContext.Provider
      value={{
        registerMessage,
        isAnimating,
        shouldShowMessage,
        isAllAnimationsComplete,
      }}
    >
      {children}
    </MessageAnimationContext.Provider>
  );
};

export const useMessageAnimation = () => {
  const context = useContext(MessageAnimationContext);
  if (context === undefined) {
    throw new Error(
      "useMessageAnimation must be used within a MessageAnimationProvider"
    );
  }
  return context;
};
