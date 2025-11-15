import { PredictionChart } from "@/components/charts/prediction-chart";
import { PredictionJars, PredictionJarsHandle } from "./PredictionJars";
import { ChartIcon } from "@/components/ui/icons";
import { RefObject } from "react";

interface ChartSectionProps {
  symbol: string;
}

export function ChartSection({ symbol }: ChartSectionProps) {
  return (
    <div className="w-full h-full rounded-2xl bg-card backdrop-blur-xl shadow-glass overflow-hidden flex flex-col">
      <div className="flex items-center justify-between bg-gradient-glass px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-transparent p-0.5">
            <div className="w-full h-full rounded-lg p-0.5">
              <ChartIcon className="w-full h-full text-brand-start" />
            </div>
          </div>
          <div>
            <h2 className="text-content-primary font-medium">Price Chart</h2>
            <p className="text-content-tertiary text-sm">Live market data</p>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex w-full h-full flex-row gap-6">
          <div className="flex-grow h-[450px] md:h-full bg-gradient-card rounded-xl overflow-hidden">
            <PredictionChart symbol={symbol} />
          </div>
        </div>
      </div>
    </div>
  );
}
