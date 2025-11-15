export interface TradingPair {
  symbol: string;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
  rewardPool: string;
  currentStreak: number;
}

export const AVAILABLE_PAIRS: TradingPair[] = [
  {
    symbol: "BTCUSD",
    name: "Bitcoin",
    color: "#ff9900",
    bgColor: "from-[#ff9900]/10 to-[#ff9900]/5",
    icon: "₿",
    rewardPool: "$ 90,000",
    currentStreak: 30,
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum",
    color: "#627EEA",
    bgColor: "from-[#627EEA]/10 to-[#627EEA]/5",
    icon: "Ξ",
    rewardPool: "$ 45,000",
    currentStreak: 30,
  },
  {
    symbol: "SOLUSD",
    name: "Solana",
    color: "#14F195",
    bgColor: "from-[#14F195]/10 to-[#14F195]/5",
    icon: "◎",
    rewardPool: "$ 30,000",
    currentStreak: 30,
  },
  {
    symbol: "XRPUSD",
    name: "Ripple",
    color: "#d0e0f0",
    bgColor: "from-[#23292F]/10 to-[#23292F]/5",
    icon: "✗",
    rewardPool: "$ 35,000",
    currentStreak: 30,
  },
  {
    symbol: "BNBUSD",
    name: "BNB",
    color: "#F3BA2F",
    bgColor: "from-[#F3BA2F]/10 to-[#F3BA2F]/5",
    icon: "B",
    rewardPool: "$ 40,000",
    currentStreak: 30,
  },
];

