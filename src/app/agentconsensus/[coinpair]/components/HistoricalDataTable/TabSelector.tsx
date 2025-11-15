import React from "react";

interface TabSelectorProps {
  activeTab: "ai" | "coordinator" | "crowd";
  onTabChange: (tab: "ai" | "coordinator" | "crowd") => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: "ai",
      label: "AI Predictions",
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      id: "coordinator",
      label: "Coordinator Agent",
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      id: "crowd",
      label: "Wisdom of Crowds",
      color: "bg-teal-500",
      textColor: "text-teal-500",
    },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as "ai" | "coordinator" | "crowd")}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap
            ${
              activeTab === tab.id
                ? `bg-background-secondary border-b-2 ${tab.textColor} font-medium shadow-sm`
                : "bg-background-secondary/40 text-content-secondary hover:bg-background-secondary border-transparent"
            }`}
        >
          <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
