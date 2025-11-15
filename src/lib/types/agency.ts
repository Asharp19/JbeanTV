export interface Message {
  id: string;
  agent: string;
  content: string;
  timestamp?: number;
  is_final?: boolean;
}

export interface AgentMessages {
  CEO: Message[];
  TechnicalAnalyst: Message[];
  CrowdAnalyst: Message[];
  targetDate: string;
}

export interface TechnicalIndicators {
  price: number;
  ma20: number;
  ma50: number;
  rsi: number;
  macd: number;
  volume: number;
}

export interface ConsensusResponse {
  messages: Message[];
  complete: boolean;
  sentiment: "bullish" | "bearish" | "neutral";
  confidence: number;
  targetPrice: number;
  analysis: {
    technical: {
      formatted: string;
      indicators: TechnicalIndicators;
    };
    crowds: {
      formatted: string;
      participants: number;
      strength: "Low" | "Medium" | "High";
    };
  };
}
