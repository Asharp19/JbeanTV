import { CryptoIcon } from "./CryptoIcon";

interface PairSelectorProps {
  availablePairs: Array<{
    symbol: string;
    name: string;
    color: string;
    icon: string;
  }>;
  selectedPair: string;
  onPairChange: (symbol: string) => void;
}

export function PairSelector({
  availablePairs,
  selectedPair,
  onPairChange,
}: PairSelectorProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar">
      {availablePairs.map((pair) => {
        const isSelected = selectedPair === pair.symbol;
        return (
          <button
            key={pair.symbol}
            onClick={() => onPairChange(pair.symbol)}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap
              ${
                isSelected
                  ? `bg-gradient-to-r from-background-secondary to-background-tertiary border border-content-tertiary text-white shadow-lg`
                  : "bg-background-secondary/40 text-content-secondary hover:bg-background-secondary border border-transparent"
              }`}
            style={
              isSelected
                ? {
                    borderColor: `${pair.color}50`,
                    boxShadow: `0 4px 12px ${pair.color}25`,
                  }
                : {}
            }
          >
            <span className={isSelected ? "opacity-100" : "opacity-70"}>
              <CryptoIcon symbol={pair.symbol} size={20} color={pair.color} />
            </span>
            <span className="font-medium">{pair.name}</span>
          </button>
        );
      })}
    </div>
  );
}

