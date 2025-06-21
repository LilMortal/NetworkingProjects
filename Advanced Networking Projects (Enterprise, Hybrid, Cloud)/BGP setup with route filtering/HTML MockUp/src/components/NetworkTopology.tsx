import React, { useState } from 'react';
import { Router, Shield, ArrowRight, Info, Network, Filter, Database, Settings } from 'lucide-react';

interface RouterData {
  id: string;
  name: string;
  as: string;
  x: number;
  y: number;
  color: string;
  bgpNeighbors: string[];
  advertised?: string[];
}

interface PrefixList {
  id: string;
  name: string;
  x: number;
  y: number;
  rules: string[];
}

interface RouteMap {
  id: string;
  name: string;
  x: number;
  y: number;
  matchCriteria: string;
  action: string;
  usedBy: string;
}

interface Connection {
  from: string;
  to: string;
  type: 'bgp' | 'uses' | 'inbound' | 'outbound' | 'advertises';
  label?: string;
  style?: 'solid' | 'dashed' | 'dotted';
}

const NetworkTopology: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'router' | 'prefixlist' | 'routemap' | null>(null);

  const routers: RouterData[] = [
    {
      id: 'routerA',
      name: 'RouterA',
      as: 'AS 65001',
      x: 400,
      y: 300,
      color: '#87CEEB',
      bgpNeighbors: ['RouterB (65002)', 'RouterC (65003)']
    },
    {
      id: 'routerB',
      name: 'RouterB',
      as: 'AS 65002',
      x: 150,
      y: 450,
      color: '#87CEEB',
      bgpNeighbors: ['RouterA (65001)'],
      advertised: ['10.0.0.0/24', '172.16.0.0/16']
    },
    {
      id: 'routerC',
      name: 'RouterC',
      as: 'AS 65003',
      x: 650,
      y: 450,
      color: '#87CEEB',
      bgpNeighbors: ['RouterA (65001)'],
      advertised: ['192.168.1.0/24', '10.10.10.0/24 (Filtered)']
    }
  ];

  const prefixLists: PrefixList[] = [
    {
      id: 'prefixListIn',
      name: 'PrefixList_In',
      x: 200,
      y: 150,
      rules: ['permit 10.0.0.0/24', 'permit 192.168.1.0/24', 'deny any']
    },
    {
      id: 'prefixListOut',
      name: 'PrefixList_Out',
      x: 600,
      y: 150,
      rules: ['permit 172.16.0.0/16', 'deny any']
    }
  ];

  const routeMaps: RouteMap[] = [
    {
      id: 'routeMapIn',
      name: 'RouteMap_In',
      x: 300,
      y: 200,
      matchCriteria: 'match ip address prefix-list PrefixList_In',
      action: 'permit 10',
      usedBy: 'PrefixList_In'
    },
    {
      id: 'routeMapOut',
      name: 'RouteMap_Out',
      x: 500,
      y: 200,
      matchCriteria: 'match ip address prefix-list PrefixList_Out',
      action: 'permit 10',
      usedBy: 'PrefixList_Out'
    }
  ];

  const connections: Connection[] = [
    // BGP Sessions
    { from: 'routerA', to: 'routerB', type: 'bgp', label: 'BGP session (65001 ↔ 65002)', style: 'solid' },
    { from: 'routerA', to: 'routerC', type: 'bgp', label: 'BGP session (65001 ↔ 65003)', style: 'solid' },
    
    // Route Map uses Prefix List
    { from: 'routeMapIn', to: 'prefixListIn', type: 'uses', label: 'uses', style: 'dotted' },
    { from: 'routeMapOut', to: 'prefixListOut', type: 'uses', label: 'uses', style: 'dotted' },
    
    // Router uses Route Maps
    { from: 'routerA', to: 'routeMapIn', type: 'inbound', label: 'inbound filter', style: 'dashed' },
    { from: 'routerA', to: 'routeMapOut', type: 'outbound', label: 'outbound filter', style: 'dashed' },
    
    // Route Flow
    { from: 'routerB', to: 'routeMapIn', type: 'advertises', label: 'Advertised Routes Inbound', style: 'solid' },
    { from: 'routeMapIn', to: 'routerA', type: 'advertises', label: 'Filtered Routes Accepted', style: 'solid' },
    { from: 'routerA', to: 'routeMapOut', type: 'advertises', label: 'Routes to Advertise Outbound', style: 'solid' },
    { from: 'routeMapOut', to: 'routerB', type: 'advertises', label: 'Advertised Routes Outbound', style: 'solid' }
  ];

  const getItemById = (id: string, type: 'router' | 'prefixlist' | 'routemap') => {
    switch (type) {
      case 'router':
        return routers.find(r => r.id === id);
      case 'prefixlist':
        return prefixLists.find(p => p.id === id);
      case 'routemap':
        return routeMaps.find(r => r.id === id);
      default:
        return null;
    }
  };

  const getConnectionPath = (conn: Connection) => {
    let fromItem: any = null;
    let toItem: any = null;

    // Find source item
    fromItem = routers.find(r => r.id === conn.from) || 
               prefixLists.find(p => p.id === conn.from) || 
               routeMaps.find(r => r.id === conn.from);

    // Find target item
    toItem = routers.find(r => r.id === conn.to) || 
             prefixLists.find(p => p.id === conn.to) || 
             routeMaps.find(r => r.id === conn.to);

    if (!fromItem || !toItem) return '';
    
    return `M ${fromItem.x} ${fromItem.y} L ${toItem.x} ${toItem.y}`;
  };

  const getStrokeStyle = (style?: string) => {
    switch (style) {
      case 'dashed':
        return '8,4';
      case 'dotted':
        return '2,3';
      default:
        return 'none';
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'bgp':
        return '#2563EB';
      case 'uses':
        return '#059669';
      case 'inbound':
        return '#DC2626';
      case 'outbound':
        return '#7C3AED';
      case 'advertises':
        return '#EA580C';
      default:
        return '#6B7280';
    }
  };

  const routerAConfig = `router bgp 65001
 neighbor 192.0.2.2 remote-as 65002
 neighbor 192.0.2.2 route-map INBOUND in
 neighbor 192.0.2.2 route-map OUTBOUND out
 neighbor 192.0.2.3 remote-as 65003
 neighbor 192.0.2.3 route-map INBOUND in

ip prefix-list PrefixList_In seq 5 permit 10.0.0.0/24
ip prefix-list PrefixList_In seq 10 permit 192.168.1.0/24
ip prefix-list PrefixList_In seq 15 deny 0.0.0.0/0 le 32

ip prefix-list PrefixList_Out seq 5 permit 172.16.0.0/16
ip prefix-list PrefixList_Out seq 10 deny 0.0.0.0/0 le 32

route-map INBOUND permit 10
 match ip address prefix-list PrefixList_In

route-map OUTBOUND permit 10
 match ip address prefix-list PrefixList_Out`;

  const handleItemClick = (id: string, type: 'router' | 'prefixlist' | 'routemap') => {
    setSelectedItem(id);
    setSelectedType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              BGP Network Topology - PlantUML Structure
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <svg width="800" height="600" viewBox="0 0 800 600" className="w-full h-auto">
                  {/* Grid background */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                    </pattern>
                    <filter id="shadow">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                     refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                    </marker>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Connections */}
                  {connections.map((conn, index) => (
                    <g key={index}>
                      <path
                        d={getConnectionPath(conn)}
                        stroke={getConnectionColor(conn.type)}
                        strokeWidth="2"
                        strokeDasharray={getStrokeStyle(conn.style)}
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                    </g>
                  ))}
                  
                  {/* Prefix Lists */}
                  {prefixLists.map((prefixList) => (
                    <g key={prefixList.id}>
                      <rect
                        x={prefixList.x - 80}
                        y={prefixList.y - 40}
                        width="160"
                        height="80"
                        rx="8"
                        fill="#90EE90"
                        fillOpacity="0.8"
                        stroke="#000000"
                        strokeWidth="2"
                        filter="url(#shadow)"
                        className="cursor-pointer hover:fillOpacity-90 transition-all duration-200"
                        onClick={() => handleItemClick(prefixList.id, 'prefixlist')}
                      />
                      <Database
                        x={prefixList.x - 65}
                        y={prefixList.y - 25}
                        width="20"
                        height="20"
                        className="text-green-700 pointer-events-none"
                      />
                      <text
                        x={prefixList.x - 40}
                        y={prefixList.y - 10}
                        fontSize="14"
                        fontWeight="600"
                        fill="#000000"
                        className="pointer-events-none"
                      >
                        {prefixList.name}
                      </text>
                      <text
                        x={prefixList.x - 70}
                        y={prefixList.y + 8}
                        fontSize="11"
                        fill="#374151"
                        className="pointer-events-none"
                      >
                        {prefixList.rules[0]}
                      </text>
                      <text
                        x={prefixList.x - 70}
                        y={prefixList.y + 22}
                        fontSize="11"
                        fill="#374151"
                        className="pointer-events-none"
                      >
                        {prefixList.rules[1]}
                      </text>
                    </g>
                  ))}
                  
                  {/* Route Maps */}
                  {routeMaps.map((routeMap) => (
                    <g key={routeMap.id}>
                      <rect
                        x={routeMap.x - 70}
                        y={routeMap.y - 35}
                        width="140"
                        height="70"
                        rx="8"
                        fill="#FFFFE0"
                        fillOpacity="0.8"
                        stroke="#000000"
                        strokeWidth="2"
                        filter="url(#shadow)"
                        className="cursor-pointer hover:fillOpacity-90 transition-all duration-200"
                        onClick={() => handleItemClick(routeMap.id, 'routemap')}
                      />
                      <Settings
                        x={routeMap.x - 55}
                        y={routeMap.y - 20}
                        width="18"
                        height="18"
                        className="text-yellow-700 pointer-events-none"
                      />
                      <text
                        x={routeMap.x - 30}
                        y={routeMap.y - 5}
                        fontSize="14"
                        fontWeight="600"
                        fill="#000000"
                        className="pointer-events-none"
                      >
                        {routeMap.name}
                      </text>
                      <text
                        x={routeMap.x - 60}
                        y={routeMap.y + 12}
                        fontSize="10"
                        fill="#374151"
                        className="pointer-events-none"
                      >
                        {routeMap.action}
                      </text>
                    </g>
                  ))}
                  
                  {/* Routers */}
                  {routers.map((router) => (
                    <g key={router.id}>
                      <rect
                        x={router.x - 80}
                        y={router.y - 50}
                        width="160"
                        height="100"
                        rx="12"
                        fill={router.color}
                        fillOpacity="0.8"
                        stroke="#000000"
                        strokeWidth="2"
                        filter="url(#shadow)"
                        className="cursor-pointer hover:fillOpacity-90 transition-all duration-200"
                        onClick={() => handleItemClick(router.id, 'router')}
                      />
                      <Router
                        x={router.x - 65}
                        y={router.y - 35}
                        width="24"
                        height="24"
                        className="text-blue-800 pointer-events-none"
                      />
                      <text
                        x={router.x - 35}
                        y={router.y - 20}
                        fontSize="16"
                        fontWeight="700"
                        fill="#000000"
                        className="pointer-events-none"
                      >
                        {router.name}
                      </text>
                      <text
                        x={router.x - 35}
                        y={router.y - 5}
                        fontSize="14"
                        fontWeight="600"
                        fill="#000000"
                        className="pointer-events-none"
                      >
                        {router.as}
                      </text>
                      <text
                        x={router.x - 70}
                        y={router.y + 12}
                        fontSize="11"
                        fill="#374151"
                        className="pointer-events-none"
                      >
                        BGP Neighbors:
                      </text>
                      {router.bgpNeighbors.map((neighbor, idx) => (
                        <text
                          key={idx}
                          x={router.x - 70}
                          y={router.y + 25 + (idx * 12)}
                          fontSize="10"
                          fill="#374151"
                          className="pointer-events-none"
                        >
                          - {neighbor}
                        </text>
                      ))}
                    </g>
                  ))}
                  
                  {/* Notes */}
                  <g>
                    {/* RouterB Note */}
                    <rect x="20" y="520" width="200" height="60" rx="4" fill="#D3D3D3" stroke="#000" strokeWidth="1" />
                    <text x="30" y="535" fontSize="11" fontWeight="600" fill="#000">RouterB Advertises:</text>
                    <text x="30" y="550" fontSize="10" fill="#000">- 10.0.0.0/24</text>
                    <text x="30" y="565" fontSize="10" fill="#000">- 172.16.0.0/16</text>
                    
                    {/* RouterC Note */}
                    <rect x="580" y="520" width="200" height="75" rx="4" fill="#D3D3D3" stroke="#000" strokeWidth="1" />
                    <text x="590" y="535" fontSize="11" fontWeight="600" fill="#000">RouterC Advertises:</text>
                    <text x="590" y="550" fontSize="10" fill="#000">- 192.168.1.0/24</text>
                    <text x="590" y="565" fontSize="10" fill="#000">- 10.10.10.0/24 (Filtered)</text>
                    
                    {/* RouterA Configuration Note */}
                    <rect x="250" y="380" width="300" height="90" rx="4" fill="#D3D3D3" stroke="#000" strokeWidth="1" />
                    <text x="260" y="395" fontSize="11" fontWeight="600" fill="#000">BGP Configuration Example:</text>
                    <text x="260" y="410" fontSize="9" fill="#000" fontFamily="monospace">neighbor 192.0.2.2 remote-as 65002</text>
                    <text x="260" y="425" fontSize="9" fill="#000" fontFamily="monospace">neighbor 192.0.2.2 route-map INBOUND in</text>
                    <text x="260" y="440" fontSize="9" fill="#000" fontFamily="monospace">neighbor 192.0.2.2 route-map OUTBOUND out</text>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Legend */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Legend
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Components</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-sky-300 border border-black"></div>
                      <span className="text-sm">Router</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-200 border border-black"></div>
                      <span className="text-sm">Route Map</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-300 border border-black"></div>
                      <span className="text-sm">Prefix List</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 border border-black"></div>
                      <span className="text-sm">Note</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Connections</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-blue-600"></div>
                      <span className="text-sm">BGP Session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-green-600 border-dotted"></div>
                      <span className="text-sm">Uses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-red-600 border-dashed"></div>
                      <span className="text-sm">Filter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-orange-600"></div>
                      <span className="text-sm">Route Flow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal for detailed information */}
      {selectedItem && selectedType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  {selectedType === 'router' && <Router className="w-6 h-6 text-blue-600" />}
                  {selectedType === 'prefixlist' && <Database className="w-6 h-6 text-green-600" />}
                  {selectedType === 'routemap' && <Settings className="w-6 h-6 text-yellow-600" />}
                  {selectedType === 'router' && `${getItemById(selectedItem, selectedType)?.name} Details`}
                  {selectedType === 'prefixlist' && `${getItemById(selectedItem, selectedType)?.name} Configuration`}
                  {selectedType === 'routemap' && `${getItemById(selectedItem, selectedType)?.name} Configuration`}
                </h2>
                <button
                  onClick={() => {setSelectedItem(null); setSelectedType(null);}}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              {selectedType === 'router' && selectedItem === 'routerA' && (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                  {routerAConfig}
                </pre>
              )}
              {selectedType === 'router' && selectedItem !== 'routerA' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Router Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>AS Number:</strong> {getItemById(selectedItem, selectedType)?.as}</p>
                      <p><strong>BGP Neighbors:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {getItemById(selectedItem, selectedType)?.bgpNeighbors.map((neighbor: string, idx: number) => (
                          <li key={idx}>{neighbor}</li>
                        ))}
                      </ul>
                      {getItemById(selectedItem, selectedType)?.advertised && (
                        <>
                          <p className="mt-2"><strong>Advertised Prefixes:</strong></p>
                          <ul className="list-disc list-inside ml-4">
                            {getItemById(selectedItem, selectedType)?.advertised?.map((prefix: string, idx: number) => (
                              <li key={idx}>{prefix}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {selectedType === 'prefixlist' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Prefix List Rules</h3>
                  <div className="space-y-2">
                    {(getItemById(selectedItem, selectedType) as PrefixList)?.rules.map((rule, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg border">
                        <code className="text-sm font-mono">{rule}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedType === 'routemap' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Route Map Configuration</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="font-medium text-gray-700">Match Criteria:</p>
                      <code className="text-sm font-mono">{(getItemById(selectedItem, selectedType) as RouteMap)?.matchCriteria}</code>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="font-medium text-gray-700">Action:</p>
                      <code className="text-sm font-mono">{(getItemById(selectedItem, selectedType) as RouteMap)?.action}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTopology;