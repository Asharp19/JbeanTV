import React from "react";

export function ChartWaves() {
  const renderChartBars = () => {
    const bars = [];
    for (let i = 0; i < 15; i++) {
      const height = `${Math.floor(5 + Math.random() * 25)}px`;
      const delay = i * 0.08;
      bars.push(
        <div
          key={i}
          className="chart-bar"
          style={{
            height,
            opacity: 0.6 + Math.random() * 0.4,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="chart-waves w-full mt-2 overflow-hidden">
      {renderChartBars()}
    </div>
  );
}
