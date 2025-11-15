import React from "react";

interface CardHeaderProps {
  displayTitle: string;
  formattedTargetDate: string | null;
}

export function CardHeader({
  displayTitle,
  formattedTargetDate,
}: CardHeaderProps) {
  return (
    <div className="card-header w-full">
      <div className="title-area flex flex-col items-center">
        <h3 className="title-text text-center truncate max-w-full px-2">
          {displayTitle}
        </h3>
        {formattedTargetDate && (
          <div className="forecast-time text-white text-sm truncate max-w-full px-2">
            Target: {formattedTargetDate + " UTC"}
          </div>
        )}
      </div>
    </div>
  );
}
