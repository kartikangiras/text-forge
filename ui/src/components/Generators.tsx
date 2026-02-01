import React, { useState } from 'react';
import { sendRequest } from '../api';
import ToolButton from './ToolButton';

interface GeneratorsProps {
  onOutput: (output: string) => void;
}

const Generators: React.FC<GeneratorsProps> = ({ onOutput }) => {
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleUUIDGeneration = async () => {
    setError('')

    try {
      const data = await sendRequest('/api/fmt/uuid', {});
      onOutput(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate UUID');
    }
  };

  const handlePasswordGeneration = async () => {
    setError('')
    setLoading(true);
    try {
      const data = await sendRequest('/api/fmt/pass', {
        length: passwordLength
      })
      onOutput(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Utility Generators
        </h2>
        <p className="text-muted-foreground text-sm">
          Generate UUIDs, passwords, and other useful data
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/15 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-medium text-foreground mb-4">UUID Generator</h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            Generate universally unique identifiers for your applications
          </p>
          
          <div className="flex flex-col gap-3">
            <ToolButton
              onClick={handleUUIDGeneration}
              variant="primary"
              className="w-full"
            >
              Generate UUID v4 (Random)
            </ToolButton>
            <ToolButton
              onClick={handleUUIDGeneration}
              variant="secondary"
              className="w-full"
            >
              Generate UUID 
            </ToolButton>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-medium text-foreground mb-4">Password Generator</h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            Generate secure, random passwords with customizable options
          </p>
          
          <div className="mb-4">
            <span className="block text-sm font-medium text-foreground mb-2">
              Length: {passwordLength}
            </span>
            <input
              type="range"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>8</span>
              <span>64</span>
            </div>
          </div>
          
          <ToolButton
            onClick={handlePasswordGeneration}
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Password'}
          </ToolButton>
        </div>
      </div>

      <div className="bg-muted border border-border rounded-lg p-3 mt-3">
        <h3 className="font-medium text-foreground mb-1">
          Security Best Practices
        </h3>
        <p className="text-sm text-muted-foreground">
          Use strong passwords with mixed characters. UUIDs are suitable for unique identifiers but not for security purposes.
        </p>
      </div>
    </div>
  );
};

export default Generators;