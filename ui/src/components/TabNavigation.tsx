import React from 'react';
import type { ToolType } from '../types';

interface TabNavigationProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const tools = [
  { id: 'cleanup', name: 'Text Cleanup', description: 'Clean and analyze text' },
  { id: 'case', name: 'Case Converter', description: 'Convert text cases' },
  { id: 'format', name: 'Code Formatter', description: 'Format JSON, CSS & more' },
  { id: 'encoding', name: 'Encoding & Hash', description: 'Encode, decode & hash' },
  { id: 'generators', name: 'Generators', description: 'Generate UUIDs & passwords' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTool, onToolChange }) => {
  return (
    <div className="bg-background border-b border-border flex-shrink-0">
      
      <div className="flex w-full overflow-x-auto">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id as ToolType)}
              className={`
                flex-1 min-w-[140px] px-2 py-4 text-sm font-medium border-b-2 transition-all duration-200
                ${isActive
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <div className="text-center">
                <div className="font-semibold">{tool.name}</div>
                <div className="text-xs opacity-75 mt-1 truncate">{tool.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;