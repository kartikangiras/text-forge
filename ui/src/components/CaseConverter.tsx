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
                <h2 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Case Converter
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Convert text between different case formats
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cases.map((caseItem) => (
                    <div
                        key={caseItem.type}
                        className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                    >
                        <h3 className="font-medium text-xs text-gray-900 dark:text-gray-100 mb-1">
                            {caseItem.label}
                        </h3>

                        <div className="mb-2 px-1 py-0.5 bg-white dark:bg-gray-900 rounded border">
                            <code className="text-[10px] text-gray-600 dark:text-gray-400">
                                {caseItem.preview}
                            </code>
                        </div>

                        <button
                            onClick={() => handleConversion(caseItem.type)}
                            disabled={!input.trim()}
                            className="w-full bg-purple-600 text-white text-xs py-1 rounded hover:bg-purple-700 transition-colors"
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