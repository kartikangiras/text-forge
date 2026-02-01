import React, { useState } from 'react';
import { sendRequest } from '../api'; 
import ToolButton from '../components/ToolButton';

interface CodeFormatterProps {
    input: string;
    onOutput: (output: string) => void;
}

const CodeFormatter: React.FC<CodeFormatterProps> = ({ input, onOutput }) => {
  const [error, setError] = useState<string>('');

  const handleFormat = async (action: string) => {
    setError('');

    const endpointMap: Record<string, string> = {
        'jsonBeautify': '/api/fmt/json',
        'kvToJson': '/api/fmt/kvjson',
        'cssMinify': '/api/fmt/css'
    }

    const endPoint = endpointMap[action];

    if (!endPoint) {
      setError("unknown action");
      return;
    } 
    try {
      const data = await sendRequest(endPoint, {
          text : input
      });

      onOutput(data.result)

      }catch(err: unknown) {
        setError(err instanceof Error ? err.message : "an error occured");
        console.error(err);
      }
  };

   const tools = [
    {
      action: 'jsonBeautify',
      label: 'Beautify JSON',
      description: 'Format JSON with proper indentation'
    },
    {
      action: 'kvToJson',
      label: 'Key-Value to JSON',
      description: 'Convert key=value pairs to JSON object'
    },
    {
      action: 'cssMinify',
      label: 'Minify CSS',
      description: 'Remove comments and whitespace from CSS'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-md font-semibold text-foreground mb-2">
          Code & Data Formatter
        </h2>
        <p className="text-muted-foreground text-sm">
          Format, beautify, and convert code and data structures
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/15 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {tools.map((tool) => {
          return (
            <div
              key={tool.action}
              className="p-2 bg-card rounded-lg border border-border hover:border-primary transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="font-medium text-sm text-foreground mb-1">
                  {tool.label}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 leading-tight">
                  {tool.description}
                </p>
              </div>
              <ToolButton
                onClick={() => handleFormat(tool.action)}
                disabled={!input.trim()}
                variant="primary"
                className="w-full text-xs py-1"
              >
                Apply
              </ToolButton>
            </div>
          );
        })}
      </div>

      <div className="bg-muted border border-border rounded-lg p-3 mt-3">
        <h3 className="text-sm font-medium text-foreground mb-1">
          Key-Value Format Example
        </h3>
        <code className="text-xs text-muted-foreground block">
          name=Kartik Angiras<br/>
          number=59<br/>
          planet=Mars
        </code>
      </div>
    </div>
  );
};

export default CodeFormatter;