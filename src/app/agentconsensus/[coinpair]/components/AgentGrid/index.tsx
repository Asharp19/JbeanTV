import React from "react";
import { AgentGridLayout } from "./nested/AgentGridLayout";
import { AgentColumn } from "../AgentColumn";
import { AgentMessages, Message } from "../types";

interface AgentGridProps {
  coordinatorMessages: (string | Message)[];
  technicalMessages: (string | Message)[];
  crowdMessages: (string | Message)[];
  isLoading: boolean;
  targetDate?: string;
}

export function AgentGrid({
  coordinatorMessages,
  technicalMessages,
  crowdMessages,
  isLoading,
  targetDate,
}: AgentGridProps) {
  // Debug logging for targetDate
  console.log("AgentGrid received targetDate:", targetDate);

  // Mock leaderboard data for Coordinator Agent
  const mockCoordinatorLeaderboard = `LEADING CONTRIBUTORS:
1. 0xd8dA...9604 • Success Rate: 92% 
2. 0x895D...7764 • Success Rate: 87% 
3. 0x1f90...c326 • Success Rate: 85% `;

  // Mock leaderboard data for Crowd Analysis Agent
  const mockCrowdLeaderboard = `LEADING CONTRIBUTORS:
1. 0xd8dA...9604 • Success Rate: 92% 
2. 0x895D...7764 • Success Rate: 87% 
3. 0x1f90...c326 • Success Rate: 85% `;

  const extractContributorsData = (messages: (string | Message)[]) => {
    if (!Array.isArray(messages) || messages.length === 0) return undefined;

    // Get the most recent message
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage) return undefined;

    // Extract content based on message type
    const content =
      typeof latestMessage === "string"
        ? latestMessage
        : latestMessage.content || "";

    // Extract contributor section using regex
    const contributorsRegex =
      /(?:LEADING CONTRIBUTORS:|Contributors:|0x[a-f0-9]+)[\s\S]+?(?=(?:\n\n|\n(?:ANALYSIS|SUMMARY|High|Low|Close|##|$)))/i;
    const matches = content.match(contributorsRegex);

    return matches ? matches[0] : undefined;
  };

  // Extract contributors data or use mock data if not found
  const realCrowdContributors = extractContributorsData(crowdMessages);
  const crowdContributors = realCrowdContributors || mockCrowdLeaderboard;

  return (
    <AgentGridLayout>
      <AgentColumn
        title="Coordinator"
        messages={coordinatorMessages}
        isLoading={isLoading}
        targetDate={targetDate}
        contributorsData={mockCoordinatorLeaderboard}
        technicalMessages={technicalMessages}
        crowdMessages={crowdMessages}
      />
      <AgentColumn
        title="Technical Analysis"
        messages={technicalMessages}
        isLoading={isLoading}
        targetDate={targetDate}
      />
      <AgentColumn
        title="Crowd Analysis"
        messages={crowdMessages}
        isLoading={isLoading}
        targetDate={targetDate}
        contributorsData={crowdContributors}
      />
    </AgentGridLayout>
  );
}
