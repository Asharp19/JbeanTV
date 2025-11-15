import { Message as BaseMessage } from "@/lib/types/agency";

export interface SessionData {
  id: string;
  timestamp: number;
  coinpair: string;
  status?: "complete" | "in_progress";
}

export interface ApiResponse {
  messages?: any;
  data?: any;
  complete?: boolean;
  [key: string]: any;
}

export interface Notification {
  type: "info" | "success" | "warning" | "error";
  message: string;
  duration?: number;
}

export type AgentName = "CEO" | "TechnicalAnalyst" | "CrowdAnalyst";

// Simply use the imported Message type directly
export type AgentMessage = BaseMessage;
export type Message = BaseMessage;
export type AgentMessages = Message[];

// Add the legacy AgentMessages interface structure to match page.tsx usage
export interface LegacyAgentMessages {
  CEO: (Message | string)[];
  TechnicalAnalyst: (Message | string)[];
  CrowdAnalyst: (Message | string)[];
  targetDate: string;
}

export interface AgentPrediction {
  id: string;
  coinpair: string;
  date: string;
  high: number;
  low: number;
  close: number;
  actual_close?: number;
  percent_diff?: number;
  accuracy?: number;
  // Add these properties for backward compatibility
  agentName?: string;
  targetDate?: string;
  predictionDate?: string;
  prediction?: {
    high: number;
    low: number;
    close: number;
  };
  actualPrice?: number;
  percentDifference?: number;
}

export interface ContributorData {
  address: string;
  contribution: number;
  score?: number;
}
