# SD-WAN Lab Topology Interactive Diagram

A beautiful, interactive network topology diagram for SD-WAN lab environments, designed for use with EVE-NG, GNS3, and other network simulation platforms.

![SD-WAN Topology](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop)

## 🌟 Features

### Interactive Network Visualization
- **Drag & Drop Nodes**: Reposition any network component by dragging
- **Click for Details**: Click on any node to view detailed information
- **Protocol Labels**: Toggle visibility of connection protocols
- **Real-time Statistics**: Live stats showing network components and connections

### Professional Design
- **Clean, Modern Interface**: Apple-level design aesthetics with subtle animations
- **Color-coded Components**: Each network section has distinct, professional colors
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Micro-interactions and hover effects for enhanced UX

### Network Architecture
- **Controllers**: vManage, vSmart, vBond orchestration components
- **Transport Networks**: Internet, MPLS, LTE connectivity options
- **Data Center**: DC vEdge Router and LAN infrastructure
- **Branch Offices**: Two branch locations with vEdge routers and user LANs
- **Cloud Services**: Optional cloud application connectivity

## 🏗️ Architecture Overview

### SD-WAN Components

#### Controllers
- **vManage**: Centralized management and orchestration platform
- **vSmart**: Control plane controller for routing and policy distribution
- **vBond**: Orchestration controller for device authentication and NAT traversal

#### Transport Networks
- **Internet**: Primary public internet connectivity
- **MPLS**: Private enterprise network with guaranteed QoS
- **LTE**: Cellular backup and mobile connectivity

#### Edge Devices
- **DC vEdge Router**: Data center edge device with dual transport connectivity
- **Branch vEdge Routers**: Branch office edge devices with redundant transport paths

### Connection Protocols

| Protocol | Purpose | Connection Type |
|----------|---------|----------------|
| **HTTPS/NETCONF** | Management communication | vManage ↔ Internet |
| **OMP/IPsec** | Control plane routing | vSmart ↔ Internet |
| **DTLS/TLS** | Secure orchestration | vBond ↔ Transport |
| **TLOC** | Data plane tunnels | vEdge ↔ Transport |
| **NETCONF** | Controller synchronization | vManage ↔ vSmart |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sdwan-topology.git
   cd sdwan-topology
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🎯 Usage Guide

### Interactive Features

#### Node Manipulation
- **Drag Nodes**: Click and drag any network component to reposition
- **Select Nodes**: Click on nodes to view detailed information
- **Reset Layout**: Refresh page to restore default positions

#### Protocol Visibility
- **Toggle Protocols**: Use the "Show/Hide Protocols" button in the header
- **Connection Types**: Different line styles indicate connection types:
  - Thick lines: Data plane connections (TLOC)
  - Medium lines: Control plane connections (OMP, DTLS)
  - Thin lines: Management synchronization

#### Information Panel
- **Node Details**: Click any node to see:
  - Component type and description
  - Supported protocols
  - Primary functions
  - Technical specifications

### Lab Integration

#### EVE-NG Integration
1. Use the topology as a reference for device placement
2. Configure devices according to the connection protocols shown
3. Implement the transport networks as shown in the diagram

#### GNS3 Integration
1. Import the topology layout into GNS3
2. Use the protocol information for interface configuration
3. Set up the controller relationships as depicted

## 🛠️ Technical Stack

### Frontend Technologies
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full IntelliSense
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Beautiful, customizable SVG icons

### Build Tools
- **Vite**: Lightning-fast build tool and development server
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization

### Key Libraries
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "lucide-react": "^0.344.0",
  "tailwindcss": "^3.4.1"
}
```

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── NetworkNode.tsx   # Individual network device component
│   ├── ConnectionLine.tsx # Network connection visualization
│   ├── NetworkSection.tsx # Background section groupings
│   └── TopologyStats.tsx # Statistics dashboard
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles and Tailwind imports
└── vite-env.d.ts        # TypeScript environment definitions
```

### Component Architecture

#### NetworkNode Component
- Handles individual network device rendering
- Manages drag-and-drop functionality
- Provides click interactions and selection states
- Supports custom icons, colors, and positioning

#### ConnectionLine Component
- Renders network connections between nodes
- Calculates dynamic line positioning and angles
- Displays protocol labels and connection types
- Supports different line styles and colors

#### NetworkSection Component
- Creates background grouping areas
- Provides visual organization for related components
- Supports custom gradients and positioning

## 🎨 Customization

### Adding New Nodes
```typescript
// Add to nodeConfigs array in App.tsx
{
  id: 'new-node',
  title: 'New Device',
  icon: YourIcon,
  bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  borderColor: 'border-blue-200',
  textColor: 'text-blue-800'
}
```

### Adding New Connections
```typescript
// Add to connections array in App.tsx
{
  from: 'source-node',
  to: 'target-node',
  protocol: 'YOUR-PROTOCOL',
  color: 'from-blue-500 to-green-500',
  type: 'control'
}
```

### Styling Customization
The project uses Tailwind CSS for styling. Key customization areas:

- **Colors**: Modify the color palette in `tailwind.config.js`
- **Animations**: Add custom animations in `src/index.css`
- **Layout**: Adjust positioning in the `nodePositions` state
- **Typography**: Customize fonts and text styles throughout components

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom configuration:
```env
VITE_APP_TITLE="Your SD-WAN Lab"
VITE_DEFAULT_PROTOCOL_VISIBILITY=true
```

### Tailwind Configuration
Customize the design system in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
      animation: {
        // Add custom animations
      }
    }
  }
}
```

## 📊 Network Statistics

The topology includes real-time statistics:
- **3 Controllers**: vManage, vSmart, vBond
- **3 Transport Links**: Internet, MPLS, LTE
- **3 vEdge Routers**: DC, Branch1, Branch2
- **21 Active Connections**: All protocol connections mapped

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting with ESLint
- Add proper TypeScript types for all props and state
- Test on multiple browsers and screen sizes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cisco SD-WAN**: For the network architecture inspiration
- **EVE-NG & GNS3**: For providing excellent network simulation platforms
- **Lucide Icons**: For the beautiful, consistent icon set
- **Tailwind CSS**: For the utility-first CSS framework
- **React Community**: For the excellent ecosystem and tools

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/your-username/sdwan-topology/issues)
- **Documentation**: Check this README and inline code comments
- **Community**: Join discussions in the Issues section

---

**Built with ❤️ for network engineers and lab enthusiasts**