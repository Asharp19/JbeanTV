/**
 * Converts a numeric index to a truncated Ethereum-style address
 * @param index Numeric index (e.g., 67, 15, 36)
 * @returns Truncated ETH address (e.g., 0xbe3f...67)
 */
export function formatAsEthAddress(index: number | string): string {
  // Convert string to number if needed
  const numIndex = typeof index === "string" ? parseInt(index, 10) : index;

  // Create a deterministic hex string based on the index
  // Use the index to seed a simple hash function
  const seed = numIndex * 379 + 47; // Simple deterministic formula
  let fullAddress = "0x";

  // Generate 40 hex characters (20 bytes)
  for (let i = 0; i < 10; i++) {
    // Generate different segments of the address based on variations of the seed
    const segment = Math.abs((seed * (i + 1) * 631) % 65536)
      .toString(16)
      .padStart(4, "0");
    fullAddress += segment;
  }

  // Ensure the last 2 chars match the original index (padded)
  const indexStr = numIndex.toString().padStart(2, "0");
  const lastTwoChars = indexStr.slice(-2);
  fullAddress = fullAddress.slice(0, 38) + lastTwoChars;

  // Return truncated address: 0xbe3f...67
  return `${fullAddress.slice(0, 6)}...${fullAddress.slice(-2)}`;
}

/**
 * Formats contributor data with wallet addresses
 * @param text Text containing index-based contributor references
 * @returns Text with formatted wallet addresses
 */
export function formatContributors(text: string): string {
  // Replace patterns like "67: 98.7%" with "0xabcd...67: 98.7%"
  return text.replace(
    /(\d+)(:)\s+(\d+\.\d+%)/g,
    (match, index, colon, percentage) => {
      const address = formatAsEthAddress(index);
      // Add styling to make addresses stand out
      return `<span class="font-mono bg-black/20 px-1 rounded text-indigo-300">${address}</span>${colon} <span class="text-white font-medium">${percentage}</span>`;
    }
  );
}
