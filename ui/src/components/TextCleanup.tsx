import React from 'react';
import { sendRequest } from '../api';
import ToolButton from '../components/ToolButton';

interface TextCleanupProps {
  input: string;
  onOutput: (output: string) => void;
}

const TextCleanup: React.FC<TextCleanupProps> = ({ input, onOutput }) => {
  
  const handleCleanup = async (action: string) => {
    if (!input) return;

    try {
      const data = await sendRequest('/api/fmt/clean', { 
        text: input, 
        action: action 
      });
      
      onOutput(data.result);
    } catch (error) {
      console.error(error);
      alert("Cleanup failed. Check backend console.");
    }
  };

  const tools = [
    {
      action: 'removeExtraSpaces',
      label: 'Remove Extra Spaces',
      description: 'Collapse multiple spaces into single spaces'
    },
    {
      action: 'removeLineBreaks',
      label: 'Remove Line Breaks',
      description: 'Convert text to single line'
    },
    {
      action: 'removeAllSpaces',
      label: 'Remove All Spaces',
      description: 'Remove all whitespace characters'
    },
    {
      action: 'trimLines',
      label: 'Trim Each Line',
      description: 'Remove leading/trailing spaces from each line'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-md font-semibold text-foreground mb-1">
          Text Cleanup Tools
        </h2>
        <p className="text-muted-foreground text-sm">
          Clean up your text by removing unwanted whitespace and formatting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tools.map((tool) => (
          <div
            key={tool.action}
            className="p-2 bg-card rounded-lg border border-border hover:border-primary transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="font-medium text-foreground mb-1">
                {tool.label}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {tool.description}
              </p>
            </div>
            <ToolButton
              onClick={() => handleCleanup(tool.action)}
              disabled={!input.trim()}
              variant="primary"
              className="w-full"
            >
              Apply
            </ToolButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCleanup;