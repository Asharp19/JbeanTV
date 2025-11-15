export function formatPrice(price: number | undefined): string {
  if (!price) return "-";
  
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  });
}

export function validateCoinPair(coinpair: string): boolean {
  return /^([A-Z]+)USD$/.test(coinpair);
}

