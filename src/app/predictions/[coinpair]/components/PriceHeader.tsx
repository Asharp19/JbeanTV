import { CryptoIcon } from "./CryptoIcon";

interface PriceHeaderProps {
  pair: {
    symbol: string;
    name: string;
    color: string;
    bgColor: string;
  };
  formattedPrice: string;
}

export function PriceHeader({ pair, formattedPrice }: PriceHeaderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-br ${pair.bgColor} border border-content-quaternary backdrop-blur-sm`}
    >
      <div className="absolute right-0 top-0 opacity-10 -mr-8 mt-4">
        <CryptoIcon symbol={pair.symbol} size={180} color={pair.color} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-content-primary mb-1 flex items-center">
            <span className="mr-3">
              <CryptoIcon symbol={pair.symbol} size={38} color={pair.color} />
            </span>
            <span>{pair.name} Price Prediction</span>
          </h1>
          <p className="text-content-secondary text-lg">
            Predict the future price of {pair.name} and earn rewards
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-sm text-content-tertiary">Current Price</div>
          <div
            className="text-2xl md:text-3xl font-bold"
            style={{ color: pair.color }}
          >
            {formattedPrice}
          </div>
          <div className="text-xs text-content-quaternary">USD</div>
        </div>
      </div>
    </div>
  );
}

