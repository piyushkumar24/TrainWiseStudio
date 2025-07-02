
import React from 'react';
import { cn } from '@/lib/utils';

interface BrandProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  textClassName?: string;
}

export const Brand = ({ 
  size = 'md', 
  showText = true, 
  className,
  textClassName 
}: BrandProps) => {
  const sizeConfig = {
    sm: {
      icon: 'w-6 h-6',
      iconText: 'text-xs',
      text: 'text-sm',
    },
    md: {
      icon: 'w-8 h-8',
      iconText: 'text-sm',
      text: 'text-lg',
    },
    lg: {
      icon: 'w-10 h-10',
      iconText: 'text-base',
      text: 'text-xl',
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0",
        config.icon
      )}>
        <span className={cn("text-white font-bold", config.iconText)}>
          TW
        </span>
      </div>
      {showText && (
        <h1 className={cn(
          "font-bold text-gray-900 truncate",
          config.text,
          textClassName
        )}>
          <span className="text-orange-500">TrainWise</span>Studio
        </h1>
      )}
    </div>
  );
};
