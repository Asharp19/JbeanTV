import { formatContributors } from "./address-formatter";

/**
 * Simple markdown parser for formatting messages
 */
export function parseMarkdown(text: string): string {
  if (!text) return "";

  // Format contributor/wallet sections
  if (
    text.includes("Leading Wallets:") ||
    text.includes("LEADING CONTRIBUTORS:")
  ) {
    text = formatContributors(text);
  }

  // Store original text for debugging if needed
  const originalText = text;

  // Handle headers properly (## Header) - with added spacing
  text = text.replace(
    /^###\s+(.+)$/gm,
    '<div class="mt-4"><h3 class="text-lg font-bold">$1</h3></div>'
  );
  text = text.replace(
    /^##\s+(.+)$/gm,
    '<div class="mt-4"><h2 class="text-xl font-bold">$1</h2></div>'
  );
  text = text.replace(
    /^#\s+(.+)$/gm,
    '<div class="mt-5"><h1 class="text-2xl font-bold">$1</h1></div>'
  );

  // Handle bold sections that start a line
  text = text.replace(
    /^(\s*)\*\*([^*]+)\*\*/gm,
    '$1<div class="mt-3"><strong class="font-bold">$2</strong></div>'
  );

  // Handle inline bold sections (not at line start)
  text = text.replace(
    /(?<!^)\*\*([^*]+)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );

  // Replace italic (*text*)
  text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

  // Replace lists
  // Unordered lists with proper spacing
  text = text.replace(/^\s*-\s+(.+)$/gm, '<div class="ml-4 mt-1">• $1</div>');

  // Ordered lists with proper spacing
  text = text.replace(
    /^\s*(\d+)\.\s+(.+)$/gm,
    '<div class="ml-4 mt-1">$1. $2</div>'
  );

  // Add paragraph breaks for blank lines
  text = text.replace(/\n\s*\n/g, "<br/><br/>");

  // Convert single newlines to breaks within paragraphs
  text = text.replace(/\n(?!\s*<div|\s*<br)/g, "<br/>");

  // Wrap with paragraph if not already wrapped
  if (
    !text.startsWith("<div") &&
    !text.startsWith("<h") &&
    !text.startsWith("<p") &&
    !text.startsWith("<br")
  ) {
    text = `<p>${text}</p>`;
  }

  return text;
}
