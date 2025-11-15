import { useState, useEffect } from "react";

export function useTargetDate(selectedPair: string) {
  const [targetDate, setTargetDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Use the internal API route instead of the direct agency API
        const response = await fetch(`/api/agent-messages/${selectedPair}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch agent messages: ${response.status}`);
        }

        const result = await response.json();
        console.log("Agent messages response:", result);
        if (result.success && result.data?.messages?.targetDate) {
          setTargetDate(result.data.messages.targetDate);
        } else if (result.messages && result.messages.targetDate) {
          // Fallback for unwrapped response
          setTargetDate(result.messages.targetDate);
        }
      } catch (error) {
        console.error("Error fetching agent messages:", error);
        // Fallback target date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTargetDate(tomorrow.toISOString());
      }
    };

    fetchMessages();
  }, [selectedPair]);

  return { targetDate, setTargetDate };
}

