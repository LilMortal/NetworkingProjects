import React, { useState } from 'react';
import { 
  Server, 
  Globe, 
  Database, 
  Building2, 
  Cloud, 
  Settings, 
  Wifi, 
  Shield,
  Network,
  Router,
  MonitorSpeaker,
  HardDrive,
  Users,
  Zap,
  Activity,
  Info
} from 'lucide-react';
import { NetworkNode } from './components/NetworkNode';
import { NetworkSection } from './components/NetworkSection';
import { ConnectionLine } from './components/ConnectionLine';
import { TopologyStats } from './components/TopologyStats';

interface NodePosition {
  x: number;
  y: number;
}

interface NodePositions {
  [key: string]: NodePosition;
}

function App() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showProtocols, setShowProtocols] = useState(true);
  const [nodePositions, setNodePositions] = useState<NodePositions>({
    // Controllers - Left column
    vManage: { x: 80, y: 180 },
    vSmart: { x: 80, y: 260 },
    vBond: { x: 80, y: 340 },
    
    // Transport Network - Center
    Internet: { x: 400, y: 180 },
    MPLS: { x: 400, y: 260 },
    LTE: { x: 400, y: 340 },
    
    // Data Center - Right center
    'DC vEdge Router': { x: 720, y: 180 },
    'DC LAN': { x: 720, y: 260 },
    
    // Branch 1 - Top right
    'Branch1 vEdge': { x: 1040, y: 120 },
    'User LAN 1': { x: 1040, y: 200 },
    
    // Branch 2 - Bottom right
    'Branch2 vEdge': { x: 1040, y: 300 },
    'User LAN 2': { x: 1040, y: 380 },
    
    // Cloud - Bottom center
    'Cloud App': { x: 400, y: 460 }
  });

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handlePositionChange = (nodeId: string, position: NodePosition) => {
    setNodePositions(prev => ({
      ...prev,
      [nodeId]: position
    }));
  };

  const connections = [
    // Controller to Transport
    { from: 'vManage', to: 'Internet', protocol: 'HTTPS/NETCONF', color: 'from-blue-500 to-cyan-500', type: 'control' },
    { from: 'vSmart', to: 'Internet', protocol: 'OMP/IPsec', color: 'from-green-500 to-blue-500', type: 'control' },
    { from: 'vBond', to: 'Internet', protocol: 'DTLS/TLS', color: 'from-purple-500 to-pink-500', type: 'control' },
    { from: 'vBond', to: 'MPLS', protocol: 'DTLS/TLS', color: 'from-purple-500 to-yellow-500', type: 'control' },
    
    // Controller sync
    { from: 'vManage', to: 'vSmart', protocol: 'NETCONF', color: 'from-blue-600 to-green-600', type: 'sync' },
    { from: 'vManage', to: 'vBond', protocol: 'HTTPS', color: 'from-blue-600 to-purple-600', type: 'sync' },
    
    // DC vEdge connectivity
    { from: 'DC vEdge Router', to: 'Internet', protocol: 'TLOC', color: 'from-emerald-500 to-cyan-500', type: 'data' },
    { from: 'DC vEdge Router', to: 'MPLS', protocol: 'TLOC', color: 'from-emerald-500 to-yellow-500', type: 'data' },
    { from: 'DC vEdge Router', to: 'vSmart', protocol: 'OMP', color: 'from-emerald-500 to-green-500', type: 'control' },
    { from: 'DC vEdge Router', to: 'vBond', protocol: 'DTLS', color: 'from-emerald-500 to-purple-500', type: 'control' },
    { from: 'DC vEdge Router', to: 'DC LAN', protocol: 'LAN', color: 'from-emerald-500 to-emerald-300', type: 'lan' },
    
    // Branch 1
    { from: 'Branch1 vEdge', to: 'Internet', protocol: 'TLOC', color: 'from-rose-500 to-cyan-500', type: 'data' },
    { from: 'Branch1 vEdge', to: 'LTE', protocol: 'TLOC', color: 'from-rose-500 to-orange-500', type: 'data' },
    { from: 'Branch1 vEdge', to: 'vSmart', protocol: 'OMP', color: 'from-rose-500 to-green-500', type: 'control' },
    { from: 'Branch1 vEdge', to: 'vBond', protocol: 'DTLS', color: 'from-rose-500 to-purple-500', type: 'control' },
    { from: 'Branch1 vEdge', to: 'User LAN 1', protocol: 'LAN', color: 'from-rose-500 to-rose-300', type: 'lan' },
    
    // Branch 2
    { from: 'Branch2 vEdge', to: 'Internet', protocol: 'TLOC', color: 'from-violet-500 to-cyan-500', type: 'data' },
    { from: 'Branch2 vEdge', to: 'MPLS', protocol: 'TLOC', color: 'from-violet-500 to-yellow-500', type: 'data' },
    { from: 'Branch2 vEdge', to: 'vSmart', protocol: 'OMP', color: 'from-violet-500 to-green-500', type: 'control' },
    { from: 'Branch2 vEdge', to: 'vBond', protocol: 'DTLS', color: 'from-violet-500 to-purple-500', type: 'control' },
    { from: 'Branch2 vEdge', to: 'User LAN 2', protocol: 'LAN', color: 'from-violet-500 to-violet-300', type: 'lan' },
    
    // Optional Cloud
    { from: 'Cloud App', to: 'Internet', protocol: 'HTTPS', color: 'from-gray-500 to-cyan-500', type: 'cloud' }
  ];

  const nodeConfigs = [
    // Controllers
    { id: 'vManage', title: 'vManage', icon: MonitorSpeaker, bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', borderColor: 'border-blue-200', textColor: 'text-blue-800' },
    { id: 'vSmart', title: 'vSmart', icon: Network, bgColor: 'bg-gradient-to-br from-green-50 to-green-100', borderColor: 'border-green-200', textColor: 'text-green-800' },
    { id: 'vBond', title: 'vBond', icon: Shield, bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100', borderColor: 'border-purple-200', textColor: 'text-purple-800' },
    
    // Transport Network
    { id: 'Internet', title: 'Internet', icon: Globe, bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100', borderColor: 'border-cyan-200', textColor: 'text-cyan-800' },
    { id: 'MPLS', title: 'MPLS', icon: Network, bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100', borderColor: 'border-yellow-200', textColor: 'text-yellow-800' },
    { id: 'LTE', title: 'LTE', icon: Zap, bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100', borderColor: 'border-orange-200', textColor: 'text-orange-800' },
    
    // Data Center
    { id: 'DC vEdge Router', title: 'DC vEdge Router', icon: Router, bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100', borderColor: 'border-emerald-200', textColor: 'text-emerald-800' },
    { id: 'DC LAN', title: 'DC LAN', icon: HardDrive, bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100', borderColor: 'border-emerald-200', textColor: 'text-emerald-800' },
    
    // Branch 1
    { id: 'Branch1 vEdge', title: 'Branch1 vEdge', icon: Router, bgColor: 'bg-gradient-to-br from-rose-50 to-rose-100', borderColor: 'border-rose-200', textColor: 'text-rose-800' },
    { id: 'User LAN 1', title: 'User LAN 1', icon: Users, bgColor: 'bg-gradient-to-br from-rose-50 to-rose-100', borderColor: 'border-rose-200', textColor: 'text-rose-800' },
    
    // Branch 2
    { id: 'Branch2 vEdge', title: 'Branch2 vEdge', icon: Router, bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100', borderColor: 'border-violet-200', textColor: 'text-violet-800' },
    { id: 'User LAN 2', title: 'User LAN 2', icon: Users, bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100', borderColor: 'border-violet-200', textColor: 'text-violet-800' },
    
    // Cloud
    { id: 'Cloud App', title: 'Cloud App', icon: Cloud, bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100', borderColor: 'border-slate-200', textColor: 'text-slate-800' }
  ];

  const getNodeDetails = (nodeId: string) => {
    const details: { [key: string]: any } = {
      'vManage': {
        type: 'Management Controller',
        description: 'Centralized network management and orchestration platform',
        protocols: ['HTTPS', 'NETCONF', 'SSH'],
        functions: ['Policy Management', 'Device Configuration', 'Monitoring', 'Analytics']
      },
      'vSmart': {
        type: 'Control Plane Controller',
        description: 'Centralized control plane for routing and policy distribution',
        protocols: ['OMP', 'IPsec', 'DTLS'],
        functions: ['Route Distribution', 'Policy Enforcement', 'Traffic Engineering']
      },
      'vBond': {
        type: 'Orchestration Controller',
        description: 'Initial authentication and orchestration for vEdge devices',
        protocols: ['DTLS', 'TLS', 'HTTPS'],
        functions: ['Device Authentication', 'Certificate Management', 'NAT Traversal']
      },
      'Internet': {
        type: 'Transport Network',
        description: 'Public internet connectivity for SD-WAN overlay',
        protocols: ['IPsec', 'TLOC'],
        functions: ['Primary Transport', 'Backup Path', 'Cloud Access']
      },
      'MPLS': {
        type: 'Transport Network',
        description: 'Private MPLS network for enterprise connectivity',
        protocols: ['IPsec', 'TLOC'],
        functions: ['Secure Transport', 'QoS Guaranteed', 'Low Latency']
      },
      'LTE': {
        type: 'Transport Network',
        description: 'Cellular LTE connectivity for backup and mobility',
        protocols: ['IPsec', 'TLOC'],
        functions: ['Backup Transport', 'Mobile Connectivity', 'Out-of-band Access']
      }
    };
    return details[nodeId] || {
      type: 'Network Component',
      description: 'SD-WAN network component',
      protocols: ['Various'],
      functions: ['Network Connectivity']
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                SD-WAN Lab Topology
              </h1>
              <p className="text-slate-600 mt-1">
                Interactive Network Diagram for EVE-NG & GNS3
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProtocols(!showProtocols)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Info className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {showProtocols ? 'Hide' : 'Show'} Protocols
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <TopologyStats />

        {/* Network Diagram Container */}
        <div className="relative w-full h-[700px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          
          {/* Network Sections (Background) */}
          <NetworkSection
            title="Controllers"
            bgGradient="bg-gradient-to-br from-blue-50/80 to-blue-100/60"
            position={{ x: 40, y: 140 }}
            width={240}
            height={280}
          />

          <NetworkSection
            title="Transport Network"
            bgGradient="bg-gradient-to-br from-slate-50/80 to-slate-100/60"
            position={{ x: 360, y: 140 }}
            width={240}
            height={380}
          />

          <NetworkSection
            title="Data Center"
            bgGradient="bg-gradient-to-br from-emerald-50/80 to-emerald-100/60"
            position={{ x: 680, y: 140 }}
            width={240}
            height={160}
          />

          <NetworkSection
            title="Branch 1"
            bgGradient="bg-gradient-to-br from-rose-50/80 to-rose-100/60"
            position={{ x: 1000, y: 80 }}
            width={240}
            height={160}
          />

          <NetworkSection
            title="Branch 2"
            bgGradient="bg-gradient-to-br from-violet-50/80 to-violet-100/60"
            position={{ x: 1000, y: 260 }}
            width={240}
            height={160}
          />

          <NetworkSection
            title="Cloud Services"
            bgGradient="bg-gradient-to-br from-slate-50/80 to-slate-100/60"
            position={{ x: 360, y: 420 }}
            width={240}
            height={120}
          />

          {/* Connection Lines */}
          {connections.map((connection, index) => (
            <ConnectionLine
              key={index}
              from={nodePositions[connection.from]}
              to={nodePositions[connection.to]}
              protocol={showProtocols ? connection.protocol : ''}
              color={connection.color}
              type={connection.type}
            />
          ))}

          {/* Network Nodes */}
          {nodeConfigs.map((node) => (
            <NetworkNode
              key={node.id}
              id={node.id}
              title={node.title}
              icon={node.icon}
              position={nodePositions[node.id]}
              bgColor={node.bgColor}
              borderColor={node.borderColor}
              textColor={node.textColor}
              isSelected={selectedNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              onPositionChange={handlePositionChange}
            />
          ))}
        </div>

        {/* Node Details Panel */}
        {selectedNode && (
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                {selectedNode}
              </h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="sr-only">Close</span>
                ✕
              </button>
            </div>
            
            {(() => {
              const details = getNodeDetails(selectedNode);
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Type
                    </h4>
                    <p className="text-sm text-blue-700">{details.type}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Protocols
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {details.protocols.map((protocol: string, idx: number) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                      <Network className="w-4 h-4 mr-2" />
                      Functions
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      {details.functions.slice(0, 2).map((func: string, idx: number) => (
                        <li key={idx} className="text-xs">• {func}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Description
                    </h4>
                    <p className="text-sm text-slate-600">{details.description}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Drag nodes to reposition</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Click nodes for details</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Toggle protocol labels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;