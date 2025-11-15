export interface ConsensusData {
  sentiment: "bullish" | "bearish" | "neutral";
  confidence: number;
  targetPrice: number;
  analysis: {
    technical: string;
    crowds: {
      participants: number;
      strength: "Low" | "Medium" | "High";
    };
  };
}
