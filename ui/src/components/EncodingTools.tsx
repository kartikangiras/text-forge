import React, { useState } from 'react';
import { sendRequest } from '../api';
import ToolButton from './ToolButton';

interface EncodingToolsProps {
  input: string;
  onOutput: (output: string) => void;
}

const EncodingTools: React.FC<EncodingToolsProps> = ({ input, onOutput }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEncoding = async (action: string) => {
    setError('');
    setLoading(true);

    const endpointMap: Record<string, string> = {
      'base64Encode': '/api/fmt/b64en',
      'base64Decode':  '/api/fmt/b64dec',
      'urlEncode':     '/api/fmt/urlen',
      'urlDecode':     '/api/fmt/urldec',
      'sha256':        '/api/fmt/sha256'
    }

    const endpoint = endpointMap[action]

    if (!endpoint) {
      setError("unknown action");
      return;
    }

    try {
      const data = await sendRequest(endpoint, {
        text: input
      });
      onOutput(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const tools = [
    {
      action: 'base64Encode',
      label: 'Encode Base64',
      description: 'Convert text to Base64 encoding'
    },
    {
      action: 'base64Decode',
      label: 'Decode Base64',
      description: 'Convert Base64 back to text'
    },
    {
      action: 'urlEncode',
      label: 'URL Encode',
      description: 'Encode text for safe URL usage'
    },
    {
      action: 'urlDecode',
      label: 'URL Decode',
      description: 'Decode URL-encoded text'
    },
    {
      action: 'sha256',
      label: 'SHA-256 Hash',
      description: 'Generate SHA-256 hash (one-way)'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-md font-semibold text-foreground mb-1">
          Encoding & Hashing Tools
        </h2>
        <p className="text-muted-foreground text-sm">
          Encode, decode, and hash text for various purposes
        </p>
      </div>

      {error && (
        <div className="p-2 bg-destructive/15 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tools.map((tool) => {
          return (
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
                onClick={() => handleEncoding(tool.action)}
                disabled={!input.trim() || loading}
                variant="primary"
                className="w-full text-xs py-1"
              >
                {loading && tool.action === 'sha256' ? 'Hashing...' : 'Apply'}
              </ToolButton>
            </div>
          );
        })}
      </div>

      <div className="bg-muted border border-border rounded-lg p-2 mt-3">
        <h3 className="font-medium text-foreground mb-1 text-sm">
          Security Note
        </h3>
        <p className="text-xs text-muted-foreground">
          SHA-256 hashing is one-way and cannot be reversed. Base64 and URL encoding are not encryption methods.
        </p>
      </div>
    </div>
  );
};

export default EncodingTools;