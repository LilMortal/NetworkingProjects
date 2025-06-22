import React from 'react';

interface NetworkSectionProps {
  title: string;
  bgGradient: string;
  position: { x: number; y: number };
  width: number;
  height: number;
}

export const NetworkSection: React.FC<NetworkSectionProps> = ({
  title,
  bgGradient,
  position,
  width,
  height
}) => {
  return (
    <div 
      className={`absolute ${bgGradient} rounded-2xl border border-white/40 backdrop-blur-sm z-0`}
      style={{
        left: position.x,
        top: position.y,
        width: width,
        height: height
      }}
    >
      <div className="p-4">
        <h2 className="text-sm font-bold text-slate-700 text-center border-b border-white/30 pb-2">
          {title}
        </h2>
      </div>
    </div>
  );
};