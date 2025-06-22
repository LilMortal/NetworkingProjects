import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NetworkNodeProps {
  id: string;
  title: string;
  icon: LucideIcon;
  position: { x: number; y: number };
  bgColor: string;
  borderColor: string;
  textColor: string;
  isSelected?: boolean;
  onClick?: () => void;
  onPositionChange?: (id: string, position: { x: number; y: number }) => void;
}

export const NetworkNode: React.FC<NetworkNodeProps> = ({
  id,
  title,
  icon: Icon,
  position,
  bgColor,
  borderColor,
  textColor,
  isSelected = false,
  onClick,
  onPositionChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && onPositionChange) {
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, 1200));
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, 600));
      onPositionChange(id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`
        absolute select-none transition-all duration-200 cursor-pointer z-30
        ${bgColor} ${borderColor} ${textColor}
        ${isDragging ? 'cursor-grabbing scale-105 shadow-2xl z-50' : 'cursor-grab hover:scale-105 hover:shadow-lg'}
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        border-2 rounded-xl p-4 min-w-[160px] backdrop-blur-sm
      `}
      style={{
        left: position.x,
        top: position.y
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className={`p-2 rounded-lg ${bgColor.replace('from-', 'from-').replace('to-', 'to-').replace('-50', '-100').replace('-100', '-200')}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="font-semibold text-sm text-center leading-tight">
          {title}
        </span>
      </div>
    </div>
  );
};