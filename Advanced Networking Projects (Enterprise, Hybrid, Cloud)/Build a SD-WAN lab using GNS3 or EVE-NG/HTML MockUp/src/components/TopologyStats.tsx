import React from 'react';
import { Activity, Wifi, Shield, Cloud, Network, Router } from 'lucide-react';

export const TopologyStats: React.FC = () => {
  const stats = [
    { label: 'Controllers', value: '3', icon: Shield, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { label: 'Transport Links', value: '3', icon: Wifi, color: 'text-cyan-600', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
    { label: 'vEdge Routers', value: '3', icon: Router, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    { label: 'Active Connections', value: '21', icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} ${stat.borderColor} rounded-xl p-4 border`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.bgColor.replace('-50', '-100')}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};