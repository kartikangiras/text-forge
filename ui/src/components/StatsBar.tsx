import React from "react";

export interface TextStats {
    words: number;
    characters: number;
    lines: number;
    charactersNoSpaces: number;
}

interface StatsBarProps {
    stats: TextStats;
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const statItems = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Lines', value: stats.lines },
    { label: 'Chars (no spaces)', value: stats.charactersNoSpaces }
  ];

  return (
    <div className="bg-card border-t border-border px-6 py-3">
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
        {statItems.map((item) => {
          return (
            <div key={item.label} className="flex items-center space-x-1">
              <span className="text-sm font-medium text-muted-foreground">
                {item.label}:
              </span>
              <span className="text-sm font-bold text-primary">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsBar;