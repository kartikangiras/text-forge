import React from 'react';

interface ToolButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'secondary',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
    
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-input',
    
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ToolButton;