import { memo } from "react";
import { Label } from "./Label";
import { cn } from "@/lib/utils";

interface StatsBoxProps {
  title: string;
  items: Array<{
    label: string;
    value: string | number;
  }>;
  variant?: "default" | "percentage" | "date";
  layout?: {
    type: "rows" | "cols";
    count: number;
  };
  className?: string;
}

export const StatsBox = memo(function StatsBox({
  title,
  items,
  variant = "default",
  layout = { type: "cols", count: 3 },
  className,
}: StatsBoxProps) {
  const gridClass =
    layout.type === "rows"
      ? `grid grid-rows-${layout.count}`
      : `grid grid-cols-${layout.count}`;

  const isStatistics = title.toLowerCase() === "statistics";
  const isPoolDistribution = title.toLowerCase() === "pool distribution";
  const isTargetDate = title.toLowerCase() === "target date";

  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-glass",
        {
          "flex-1 p-4 sm:p-5": isStatistics,
          "p-3 sm:p-4": isPoolDistribution,
          "p-2 sm:p-3": isTargetDate,
        },
        className
      )}
    >
      <p
        className={cn("text-content-tertiary", {
          "text-sm mb-6": isStatistics,
          "text-xs mb-3": isPoolDistribution,
          "text-xs mb-2": isTargetDate,
        })}
      >
        {title}
      </p>
      <div
        className={cn({
          "flex flex-col justify-between h-[calc(100%-3rem)]": isStatistics,
          "grid grid-cols-5 gap-2": isPoolDistribution,
          "flex items-center justify-center h-12": isTargetDate,
        })}
      >
        {items.map((item) => (
          <Label
            key={item.label}
            label={item.label}
            value={item.value}
            variant={variant}
            size={isStatistics ? "md" : "sm"}
            align={isStatistics ? "left" : "center"}
          />
        ))}
      </div>
    </div>
  );
});
