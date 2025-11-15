import React from "react";
import { parseMarkdown } from "@/lib/utils/markdown";

interface WalletsBubbleProps {
  title: string;
  content: string;
}

export function WalletsBubble({ title, content }: WalletsBubbleProps) {
  return (
    <div className="wallets-bubble w-full">
      <div className="section-header">{title}</div>
      <div className="wallets-content custom-scrollbar max-h-28 overflow-y-auto">
        <div
          className="whitespace-pre-wrap break-words text-sm"
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(content),
          }}
        />
      </div>
    </div>
  );
}
