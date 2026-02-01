import React from "react";
import { sendRequest } from '../api'; 

interface CaseConverterProps {
    input: string;
    onOutput: (output: string) => void;
}

const CaseConverter: React.FC<CaseConverterProps> = ({ input, onOutput }) => {

    const handleConversion = async (caseType: string) => {
        if (!input.trim()) return;

        try {
            const data = await sendRequest('/api/fmt/case', {
                text: input,
                type: caseType
            });
            onOutput(data.result);
        } catch (error) {
            console.error("Conversion failed:", error);
        }
    };

    const cases = [
        { type: 'uppercase', label: 'UPPERCASE', preview: 'HELLO WORLD' },
        { type: 'lowercase', label: 'lowercase', preview: 'hello world' },
        { type: 'sentence', label: 'Sentence case', preview: 'Hello world' },
        { type: 'title', label: 'Title Case', preview: 'Hello World' },
        { type: 'camelcase', label: 'camelCase', preview: 'helloWorld' },
        { type: 'pascalcase', label: 'PascalCase', preview: 'HelloWorld' }, 
        { type: 'snakecase', label: 'snake_case', preview: 'hello_world' }, 
        { type: 'kebabcase', label: 'kebab-case', preview: 'hello-world' }, 
        { type: 'constant-case', label: 'CONSTANT_CASE', preview: 'HELLO_WORLD' } 
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-md font-semibold text-foreground mb-1">
                    Case Converter
                </h2>
                <p className="text-muted-foreground text-sm">
                    Convert text between different case formats
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cases.map((caseItem) => (
                    <div
                        key={caseItem.type}
                        className="p-2 bg-card rounded border border-border hover:border-primary transition-colors flex flex-col justify-between"
                    >
                        <h3 className="font-medium text-xs text-card-foreground mb-1">
                            {caseItem.label}
                        </h3>

                        <div className="mb-2 px-1 py-0.5 bg-muted rounded border border-border">
                            <code className="text-[10px] text-muted-foreground block truncate">
                                {caseItem.preview}
                            </code>
                        </div>

                        <button
                            onClick={() => handleConversion(caseItem.type)}
                            disabled={!input.trim()}
                            className="w-full bg-primary text-primary-foreground text-xs py-1 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            Convert
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseConverter;