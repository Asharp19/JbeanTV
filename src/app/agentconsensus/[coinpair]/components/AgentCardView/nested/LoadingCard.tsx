import React from "react";

interface LoadingCardProps {
  cardTheme: string;
  displayTitle: string;
  formattedTargetDate: string | null;
}

export function LoadingCard({
  cardTheme,
  displayTitle,
  formattedTargetDate,
}: LoadingCardProps) {
  return (
    <div className={`jbean-card ${cardTheme}`}>
      <div className="fluid-bg"></div>
      <div className="glow-orbs"></div>

      <div className="card-header">
        <div className="title-area">
          <h3 className="title-text">{displayTitle}</h3>
          {formattedTargetDate && (
            <div className="forecast-time">Target: {formattedTargetDate}</div>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="data-row">
          <div className="data-bubble shimmer">
            <div className="data-label">High</div>
            <div className="loading-pulse"></div>
          </div>
          <div className="data-bubble shimmer">
            <div className="data-label">Low</div>
            <div className="loading-pulse"></div>
          </div>
        </div>

        <div className="data-bubble main-bubble shimmer">
          <div className="data-label">Close</div>
          <div className="loading-pulse"></div>
        </div>

        <div className="data-bubble shimmer">
          <div className="data-label">Percent Off</div>
          <div className="loading-pulse"></div>
        </div>

        <div className="chart-waves">
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="wave-dot"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
