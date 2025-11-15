import { memo } from "react";

interface CarouselNavButtonsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export const CarouselNavButtons = memo(function CarouselNavButtons({
  onPrevClick,
  onNextClick,
  isPrevDisabled,
  isNextDisabled,
}: CarouselNavButtonsProps) {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={onPrevClick}
        disabled={isPrevDisabled}
        className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-content-secondary hover:bg-accent-primary/10 transition-colors disabled:opacity-50 disabled:hover:bg-card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={onNextClick}
        disabled={isNextDisabled}
        className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-content-secondary hover:bg-accent-primary/10 transition-colors disabled:opacity-50 disabled:hover:bg-card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
});
