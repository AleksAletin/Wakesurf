'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, selected, hoverable }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border transition-all duration-200
        ${selected ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' : 'border-gray-200'}
        ${hoverable || onClick ? 'hover:shadow-lg hover:border-blue-300 cursor-pointer active:scale-[0.98]' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
