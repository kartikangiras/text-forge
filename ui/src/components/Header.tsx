import React from 'react';
import { Moon, Sun, Github} from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, onThemeToggle }) => {
  return (
    <div className="bg-card border-b border-border px-6 py-4 flex-shrink-0">
      
      <div className="relative flex items-center justify-between">
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-foreground">
            TextIO
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="https://github.com/kartikangiras/textIO"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;