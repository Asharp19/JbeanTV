import React, { RefObject } from "react";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  inputRef: RefObject<HTMLTextAreaElement>;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function MessageInput({
  input,
  isLoading,
  inputRef,
  onSubmit,
  onChange,
  onKeyDown,
}: MessageInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 border-t border-content-quaternary"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Ask a question about the analysis..."
          className="flex-grow bg-background-tertiary/20 border border-content-quaternary rounded-lg p-3 min-h-[80px] max-h-[150px] text-content-primary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-accent-primary hover:bg-accent-primary/90 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed h-[50px] w-[50px] flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
