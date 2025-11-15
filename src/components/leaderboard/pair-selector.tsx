import { Card } from "@/components/ui/card";

interface PairSelectorProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
  pairs: string[];
}

export function PairSelector({ selectedPair, onPairChange, pairs }: PairSelectorProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <label htmlFor="pair-select" className="text-sm font-medium text-content-primary">
      Select Trading Pair:
      </label>
      <div className="relative">
        <select
          id="pair-select"
          value={selectedPair}
          onChange={(e) => onPairChange(e.target.value)}
          className="appearance-none bg-background-secondary/40 text-slate-100 px-4 py-2 pr-10 rounded-lg border border-slate-100/10 cursor-pointer hover:bg-input transition-colors min-w-[150px]"
        >
          <option value="all">All Pairs</option>
          {pairs.map((pair) => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-slate-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 