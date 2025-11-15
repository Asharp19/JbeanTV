import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Import ApexCharts dynamically to prevent SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartDataPoint {
  date: string;
  predictedHigh: number;
  predictedLow: number;
  predictedClose: number;
  actualHigh?: number;
  actualLow?: number;
  actualClose?: number;
  isPending: boolean;
}

interface PredictionChartProps {
  data: ChartDataPoint[];
  tabType: "ai" | "coordinator" | "crowd";
}

export const PredictionChart: React.FC<PredictionChartProps> = ({
  data,
  tabType,
}) => {
  // Get chart colors based on tab type
  const getChartColors = () => {
    switch (tabType) {
      case "ai":
        return {
          predicted: "#a855f7", // purple-500
          actual: "#54ff6b", // green for actual
          predictedDot: "#a855f7",
          actualDot: "#54ff6b",
          grid: "rgba(168, 85, 247, 0.15)",
          bg: "#0d0c0f",
        };
      case "coordinator":
        return {
          predicted: "#3b82f6", // blue-500
          actual: "#54ff6b", // green for actual
          predictedDot: "#3b82f6",
          actualDot: "#54ff6b",
          grid: "rgba(59, 130, 246, 0.15)",
          bg: "#1B1033",
        };
      case "crowd":
        return {
          predicted: "#14b8a6", // teal-500
          actual: "#54ff6b", // green for actual
          predictedDot: "#14b8a6",
          actualDot: "#54ff6b",
          grid: "rgba(20, 184, 166, 0.15)",
          bg: "#1B1033",
        };
      default:
        return {
          predicted: "#a855f7",
          actual: "#54ff6b",
          predictedDot: "#a855f7",
          actualDot: "#54ff6b",
          grid: "rgba(168, 85, 247, 0.15)",
          bg: "#1B1033",
        };
    }
  };

  const colors = getChartColors();

  // Prepare data for ApexCharts even if data is empty
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        series: [],
        categories: [],
        minPrice: 0,
        maxPrice: 0,
      };
    }

    // Calculate average price to determine Y-axis min and max (±30%)
    const allCloseValues = data.flatMap((d) => [
      d.predictedClose,
      ...(d.actualClose !== undefined ? [d.actualClose] : []),
    ]);

    const avgPrice =
      allCloseValues.reduce((sum, val) => sum + val, 0) / allCloseValues.length;
    const minPrice = avgPrice * 0.7; // 30% below average
    const maxPrice = avgPrice * 1.3; // 30% above average

    // Format dates for ApexCharts
    const categories = data.map((d) => d.date);

    // Create series data
    const predictedSeries = {
      name: "Predicted Close",
      type: "line",
      data: data.map((d) => d.predictedClose),
    };

    // Only include actual values that exist
    const actualSeries = {
      name: "Actual Close",
      type: "line",
      data: data.map((d) =>
        d.actualClose !== undefined ? d.actualClose : null
      ),
    };

    // Create range indicators (high-low)
    const predictedRangeSeries = {
      name: "Predicted Range",
      type: "rangeArea",
      data: data.map((d) => ({
        x: d.date,
        y: [d.predictedLow, d.predictedHigh],
      })),
    };

    // Create actual range series (if available)
    const actualRangeSeries = {
      name: "Actual Range",
      type: "rangeArea",
      data: data.map((d) => {
        if (d.actualLow !== undefined && d.actualHigh !== undefined) {
          return {
            x: d.date,
            y: [d.actualLow, d.actualHigh],
          };
        }
        return {
          x: d.date,
          y: [null, null],
        };
      }),
    };

    return {
      series: [
        predictedSeries,
        actualSeries,
        predictedRangeSeries,
        actualRangeSeries,
      ],
      categories,
      minPrice,
      maxPrice,
    };
  }, [data]);

  // If no data, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-content-tertiary">
        No data available for chart
      </div>
    );
  }

  // Format price for display
  const formatPrice = (price: number | undefined) => {
    if (price === undefined || price === null) {
      return "N/A";
    }
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Chart options
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      background: colors.bg,
      fontFamily: "inherit",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [colors.predicted, colors.actual, colors.predicted, colors.actual],
    fill: {
      type: ["solid", "solid", "gradient", "gradient"],
      opacity: [1, 1, 0.15, 0.15],
      gradient: {
        shade: "dark",
        type: "vertical",
        opacityFrom: 0.2,
        opacityTo: 0.05,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3, 0, 0],
      dashArray: [0, 0, 0, 0],
    },
    grid: {
      borderColor: "#0c0a0f",
      strokeDashArray: 3,
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 8,
      },
      colors: [
        colors.predictedDot,
        colors.actualDot,
        "transparent",
        "transparent",
      ],
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: Array(data.length).fill("#8897AD"),
          fontSize: "10px",
        },
        trim: true,
        format: undefined,
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: chartData.minPrice,
      max: chartData.maxPrice,
      labels: {
        style: {
          colors: ["#8897AD"],
          fontSize: "10px",
        },
        formatter: (value: number) => {
          if (value === undefined || value === null) return "N/A";
          return `$${value.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`;
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        // Get predicted and actual values for this point
        const point = data[dataPointIndex];
        const predictionIndex = dataPointIndex + 1;

        const predClose = formatPrice(point.predictedClose);
        const actualClose = point.actualClose
          ? formatPrice(point.actualClose)
          : "N/A";

        const predRange = `${formatPrice(point.predictedLow)} - ${formatPrice(
          point.predictedHigh
        )}`;
        const actualRange =
          point.actualLow && point.actualHigh
            ? `${formatPrice(point.actualLow)} - ${formatPrice(
                point.actualHigh
              )}`
            : "N/A - N/A";

        return `
          <div class="py-2 px-3" style="background: #1B1033; border: 1px solid #2D2152; border-radius: 6px;">
            <div class="mb-2 text-gray-300 text-xs">Prediction #${predictionIndex}</div>
            
            <div class="grid gap-1 mb-2">
              <div class="flex items-center gap-2 text-xs">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${colors.predicted};"></span>
                <span class="text-gray-400">Predicted Close:</span>
                <span class="text-white font-medium">${predClose}</span>
              </div>
              
              <div class="flex items-center gap-2 text-xs">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${colors.actual};"></span>
                <span class="text-gray-400">Actual Close:</span>
                <span class="text-white font-medium">${actualClose}</span>
              </div>
              
              <div class="flex items-center gap-2 text-xs">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${colors.predicted};"></span>
                <span class="text-gray-400">Predicted Range:</span>
                <span class="text-white font-medium">${predRange}</span>
              </div>
              
              <div class="flex items-center gap-2 text-xs">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${colors.actual};"></span>
                <span class="text-gray-400">Actual Range:</span>
                <span class="text-white font-medium">${actualRange}</span>
              </div>
            </div>
          </div>
        `;
      },
      style: {
        fontSize: "12px",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 0,
      offsetY: 0,
      markers: {
        size: 8,
      },
      itemMargin: {
        horizontal: 8,
      },
      labels: {
        colors: "#fff",
      },
      fontSize: "11px",
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        {typeof window !== "undefined" && (
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="line"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};
