import { memo } from "react";
import { CarouselNavButtons } from "./CarouselNavButtons";

interface CarouselHeaderProps {
  title: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export const CarouselHeader = memo(function CarouselHeader({
  title,
  onPrevClick,
  onNextClick,
  isPrevDisabled,
  isNextDisabled,
}: CarouselHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-content-primary">{title}</h2>
      <CarouselNavButtons
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
});
