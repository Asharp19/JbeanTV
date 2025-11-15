import Link from "next/link";

interface TradingPair {
  symbol: string;
  predictions: number;
  change24h: number;
}

export function PopularPairs() {
  // This would eventually fetch from your API/Supabase
  const pairs: TradingPair[] = [
    { symbol: "BTC-USDT", predictions: 156, change24h: 2.5 },
    { symbol: "ETH-USDT", predictions: 98, change24h: -1.2 },
    // Add more pairs as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pairs.map((pair) => (
        <Link
          key={pair.symbol}
          href={`/predictions/${pair.symbol}`}
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <h3 className="font-semibold">{pair.symbol}</h3>
          <p className="text-sm text-gray-600">
            {pair.predictions} active predictions
          </p>
        </Link>
      ))}
    </div>
  );
}
