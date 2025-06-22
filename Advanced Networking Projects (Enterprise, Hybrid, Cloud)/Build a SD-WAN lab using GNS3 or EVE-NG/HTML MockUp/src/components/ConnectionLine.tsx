import React from 'react';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  protocol: string;
  color?: string;
  type?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  from,
  to,
  protocol,
  color = 'from-blue-500 to-purple-500',
  type = 'default'
}) => {
  // Calculate center points of nodes
  const fromCenter = { x: from.x + 80, y: from.y + 40 };
  const toCenter = { x: to.x + 80, y: to.y + 40 };
  
  const length = Math.sqrt(Math.pow(toCenter.x - fromCenter.x, 2) + Math.pow(toCenter.y - fromCenter.y, 2));
  const angle = Math.atan2(toCenter.y - fromCenter.y, toCenter.x - fromCenter.x) * 180 / Math.PI;

  // Calculate midpoint for protocol label
  const midX = (fromCenter.x + toCenter.x) / 2;
  const midY = (fromCenter.y + toCenter.y) / 2;

  // Line thickness based on type
  const getLineThickness = () => {
    switch (type) {
      case 'control': return 'h-1';
      case 'data': return 'h-1.5';
      case 'sync': return 'h-0.5';
      case 'lan': return 'h-1';
      default: return 'h-1';
    }
  };

  // Line style based on type
  const getLineStyle = () => {
    switch (type) {
      case 'control': return 'opacity-90';
      case 'data': return 'opacity-100';
      case 'sync': return 'opacity-70';
      case 'lan': return 'opacity-80';
      default: return 'opacity-80';
    }
  };

  return (
    <>
      {/* Connection Line */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: fromCenter.x,
          top: fromCenter.y,
          width: length,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%'
        }}
      >
        <div className={`w-full bg-gradient-to-r ${color} ${getLineThickness()} ${getLineStyle()} rounded-full`} />
      </div>
      
      {/* Protocol Label */}
      {protocol && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: midX - 35,
            top: midY - 10
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm text-slate-700 text-xs px-2 py-1 rounded-md whitespace-nowrap font-medium shadow-sm border border-slate-200">
            {protocol}
          </div>
        </div>
      )}
    </>
  );
};