# BGP Network Topology with Route Filtering

A comprehensive interactive visualization of Border Gateway Protocol (BGP) network topology demonstrating route filtering mechanisms between autonomous systems. This project transforms PlantUML network diagrams into dynamic, clickable web interfaces for educational and documentation purposes.

## 🌐 Overview

This application visualizes a three-router BGP network setup where RouterA (AS 65001) acts as a central hub connecting to RouterB (AS 65002) and RouterC (AS 65003). The implementation demonstrates advanced BGP route filtering using prefix lists and route maps to control route advertisement and acceptance.

## 🏗️ Network Architecture

### Autonomous Systems
- **AS 65001** - RouterA (Central Hub)
- **AS 65002** - RouterB (Peer)
- **AS 65003** - RouterC (Peer)

### BGP Peering Relationships
```
RouterA (65001) ←→ RouterB (65002)
RouterA (65001) ←→ RouterC (65003)
```

### Route Advertisement Strategy

#### RouterB Advertisements
- `10.0.0.0/24` - Internal network segment
- `172.16.0.0/16` - Private address space

#### RouterC Advertisements
- `192.168.1.0/24` - Local network segment
- `10.10.10.0/24` - **Filtered by RouterA's inbound policy**

## 🛡️ Route Filtering Implementation

### Inbound Filtering (RouterA)
**Prefix List: PrefixList_In**
```cisco
ip prefix-list PrefixList_In seq 5 permit 10.0.0.0/24
ip prefix-list PrefixList_In seq 10 permit 192.168.1.0/24
ip prefix-list PrefixList_In seq 15 deny 0.0.0.0/0 le 32
```

**Route Map: RouteMap_In**
```cisco
route-map INBOUND permit 10
 match ip address prefix-list PrefixList_In
```

### Outbound Filtering (RouterA)
**Prefix List: PrefixList_Out**
```cisco
ip prefix-list PrefixList_Out seq 5 permit 172.16.0.0/16
ip prefix-list PrefixList_Out seq 10 deny 0.0.0.0/0 le 32
```

**Route Map: RouteMap_Out**
```cisco
route-map OUTBOUND permit 10
 match ip address prefix-list PrefixList_Out
```

## 📋 Complete RouterA Configuration

```cisco
router bgp 65001
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
 match ip address prefix-list PrefixList_Out
```

## 🎨 Visual Design System

### Component Color Coding
| Component | Color | Purpose |
|-----------|-------|---------|
| **Routers** | Light Sky Blue (`#87CEEB`) | Network devices |
| **Route Maps** | Light Yellow (`#FFFFE0`) | Policy engines |
| **Prefix Lists** | Light Green (`#90EE90`) | Filter definitions |
| **Notes** | Light Gray (`#D3D3D3`) | Documentation |

### Connection Types
| Connection | Color | Style | Meaning |
|------------|-------|-------|---------|
| **BGP Sessions** | Blue (`#2563EB`) | Solid | Peering relationships |
| **Uses** | Green (`#059669`) | Dotted | Component dependencies |
| **Inbound Filter** | Red (`#DC2626`) | Dashed | Incoming route policies |
| **Outbound Filter** | Purple (`#7C3AED`) | Dashed | Outgoing route policies |
| **Route Flow** | Orange (`#EA580C`) | Solid | Advertisement direction |

## 🚀 Features

### Interactive Elements
- **Clickable Components**: Click any router, route map, or prefix list for detailed information
- **Configuration Viewer**: Modal dialogs display complete Cisco IOS configurations
- **Route Flow Visualization**: Animated arrows show route advertisement paths
- **Responsive Design**: Optimized for desktop and mobile viewing

### Educational Tools
- **Comprehensive Legend**: Visual guide to all symbols and connections
- **Contextual Information**: Hover states and detailed component descriptions
- **Real-world Configuration**: Production-ready Cisco IOS syntax examples

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling

### UI Components
- **Lucide React** for consistent iconography
- **Custom SVG Graphics** for network topology visualization
- **Responsive Grid System** for adaptive layouts

### Development Tools
- **ESLint** with TypeScript rules for code quality
- **PostCSS** with Autoprefixer for CSS processing
- **Modern ES2020** target for optimal browser support

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with SVG support

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd bgp-network-topology

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

## 🎯 Use Cases

### Educational Applications
- **Network Engineering Courses**: Visual BGP protocol demonstration
- **Certification Training**: CCNA/CCNP route filtering examples
- **Workshop Materials**: Interactive learning tools

### Professional Documentation
- **Network Design Reviews**: Architecture visualization
- **Change Management**: Policy impact assessment
- **Troubleshooting Guides**: Route filtering diagnostics

### Research & Development
- **Protocol Analysis**: BGP behavior modeling
- **Policy Testing**: Filter configuration validation
- **Network Simulation**: Topology planning

## 🔧 Customization Guide

### Adding New Routers
```typescript
const newRouter: RouterData = {
  id: 'routerD',
  name: 'RouterD',
  as: 'AS 65004',
  x: 400,
  y: 150,
  color: '#87CEEB',
  bgpNeighbors: ['RouterA (65001)']
};
```

### Creating Custom Filters
```typescript
const customPrefixList: PrefixList = {
  id: 'customFilter',
  name: 'Custom_Filter',
  x: 300,
  y: 100,
  rules: ['permit 203.0.113.0/24', 'deny any']
};
```

### Modifying Visual Styles
```css
/* Custom router colors */
.router-enterprise { fill: #4A90E2; }
.router-service-provider { fill: #7ED321; }
.router-customer { fill: #F5A623; }
```

## 📊 Network Flow Analysis

### Route Processing Pipeline
1. **Advertisement**: RouterB/RouterC announce prefixes
2. **Inbound Filtering**: RouterA applies PrefixList_In via RouteMap_In
3. **Route Selection**: BGP best path algorithm
4. **Outbound Filtering**: RouterA applies PrefixList_Out via RouteMap_Out
5. **Propagation**: Filtered routes advertised to peers

### Filtering Results
| Source | Prefix | Inbound Result | Outbound Result |
|--------|--------|----------------|-----------------|
| RouterB | 10.0.0.0/24 | ✅ Accepted | ❌ Filtered |
| RouterB | 172.16.0.0/16 | ❌ Filtered | ✅ Advertised |
| RouterC | 192.168.1.0/24 | ✅ Accepted | ❌ Filtered |
| RouterC | 10.10.10.0/24 | ❌ Filtered | ❌ Filtered |

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- Follow TypeScript strict mode guidelines
- Use Tailwind CSS utility classes
- Maintain component modularity
- Include comprehensive type definitions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PlantUML Community** for diagram specification standards
- **Cisco Systems** for BGP configuration syntax reference
- **React Community** for component architecture patterns
- **Tailwind CSS** for utility-first design principles

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Review existing documentation and examples
- Check the interactive legend for visual guidance

---

**Built with ❤️ for network engineers, educators, and students learning BGP routing protocols.**