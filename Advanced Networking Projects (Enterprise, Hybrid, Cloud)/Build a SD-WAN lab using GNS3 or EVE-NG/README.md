# SD-WAN Lab Topology Diagrams

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network Protocol](https://img.shields.io/badge/Protocol-SD--WAN-blue.svg)]()
[![PlantUML](https://img.shields.io/badge/Diagram-PlantUML-orange.svg)]()
[![Documentation](https://img.shields.io/badge/Docs-Complete-green.svg)]()

## 🌐 Overview

Professional SD-WAN network topology diagrams and PlantUML source code for lab environments, designed for use with EVE-NG, GNS3, and other network simulation platforms.

This repository contains comprehensive SD-WAN topology diagrams in multiple formats, including PlantUML source code and rendered network diagrams. Perfect for network engineers, students, and lab enthusiasts working with Cisco SD-WAN, Viptela, or similar SD-WAN solutions.

![SD-WAN Network Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop)

## 📋 Table of Contents

- [Network Architecture](#️-network-architecture)
- [SD-WAN Components](#-sd-wan-components)
- [Connection Protocols](#-connection-protocols)
- [PlantUML Diagrams](#-plantuml-diagrams)
- [Installation & Setup](#-installation--setup)
- [Usage Instructions](#-usage-instructions)
- [Topology Variations](#-topology-variations)
- [Customization Guide](#️-customization-guide)
- [Educational Resources](#-educational-resources)
- [Contributing](#-contributing)
- [License](#-license)

## 🏗️ Network Architecture

### What's Included
- **PlantUML Source Files**: Editable diagram source code for customization
- **Rendered Network Diagrams**: High-quality PNG/SVG outputs ready for documentation
- **Multiple Topology Variants**: Basic, advanced, and multi-site configurations
- **Protocol Documentation**: Detailed connection and protocol specifications

### Core Components

#### Control Plane
- **vManage**: Centralized management and orchestration platform
  - Policy configuration and deployment
- **vSmart**: Control plane controller for routing decisions
  - OMP (Overlay Management Protocol) routing
  - Policy distribution and enforcement
- **vBond**: Orchestration controller for device discovery
  - NAT traversal and authentication
  - Initial device onboarding

#### Data Plane
- **vEdge Routers**: Branch and data center edge devices
  - TLOC (Transport Locator) tunnel establishment
  - Policy enforcement and traffic steering
  - Local breakout capabilities

#### Transport Networks
- **Internet**: Primary public connectivity with IPsec overlays
- **MPLS**: Private WAN with guaranteed SLA
- **LTE/5G**: Cellular backup and last-mile connectivity

## 🔧 SD-WAN Components

### Controllers
- **vManage**: Centralized management and orchestration platform
- **vSmart**: Control plane controller for routing and policy distribution
- **vBond**: Orchestration controller for device authentication and NAT traversal

### Transport Networks
- **Internet**: Primary public internet connectivity
- **MPLS**: Private enterprise network with guaranteed QoS
- **LTE**: Cellular backup and mobile connectivity

### Edge Devices
- **DC vEdge Router**: Data center edge device with dual transport connectivity
- **Branch vEdge Routers**: Branch office edge devices with redundant transport paths

## 📡 Connection Protocols

| Protocol | Layer | Purpose | Devices |
|----------|-------|---------|---------|
| **HTTPS/NETCONF** | Management | Configuration sync | vManage ↔ All devices |
| **OMP** | Control | Route distribution | vSmart ↔ vEdge |
| **DTLS** | Control | Secure signaling | vBond ↔ vEdge |
| **IPsec** | Data | Tunnel encryption | vEdge ↔ vEdge |
| **TLOC** | Data | Tunnel addressing | Transport networks |

### Connection Details

| Protocol | Purpose | Connection Type |
|----------|---------|----------------|
| **HTTPS/NETCONF** | Management communication | vManage ↔ Internet |
| **OMP/IPsec** | Control plane routing | vSmart ↔ Internet |
| **DTLS/TLS** | Secure orchestration | vBond ↔ Transport |
| **TLOC** | Data plane tunnels | vEdge ↔ Transport |
| **NETCONF** | Controller synchronization | vManage ↔ vSmart |

## 🎨 PlantUML Diagrams

### Using PlantUML Files

#### Online Rendering
1. Copy the PlantUML code from the `.puml` files
2. Paste into [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
3. Generate PNG, SVG, or PDF outputs

#### Local Rendering
```bash
# Install PlantUML
java -jar plantuml.jar topology.puml

# Generate PNG
java -jar plantuml.jar -tpng topology.puml

# Generate SVG
java -jar plantuml.jar -tsvg topology.puml
```

#### VS Code Integration
1. Install PlantUML extension
2. Open `.puml` files in VS Code
3. Use `Alt+D` to preview diagrams
4. Export in various formats

## 🚀 Installation & Setup

### Prerequisites
- PlantUML installation or online editor access
- Java Runtime Environment (for local PlantUML rendering)
- Network simulation platform (EVE-NG, GNS3, CML)

### Lab Implementation

#### EVE-NG Setup
1. Use the topology as reference for node placement
2. Import Cisco SD-WAN images (CSR1000v, vManage OVA)
3. Configure management networks according to diagram
4. Implement transport links as shown

#### GNS3 Setup
1. Import the topology layout
2. Configure device templates for SD-WAN components
3. Set up cloud connections for Internet/MPLS simulation
4. Apply protocol configurations from documentation

#### Cisco CML Setup
1. Use topology as blueprint for lab design
2. Configure node definitions for SD-WAN devices
3. Implement network segments as depicted
4. Apply initial configurations

## 🎯 Usage Instructions

### Getting Started

#### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

#### Installation

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

#### Build for Production
```bash
npm run build
npm run preview
```

## 📊 Topology Variations

### Basic Lab (3-Site)
- 1 Data Center with dual transport
- 2 Branch offices with redundant connectivity
- Full controller redundancy (vManage, vSmart, vBond)

### Advanced Lab (5-Site)
- Multiple data centers with DCI
- Regional hub and spoke design
- Cloud on-ramp integration
- Service chaining with firewalls

### Multi-Tenant Lab
- Separate VPNs for different business units
- Segmentation policies and micro-segmentation
- Quality of Service (QoS) implementations
- Application-aware routing scenarios

## 🛠️ Customization Guide

### Modifying PlantUML Diagrams

#### Adding New Sites
```plantuml
' Add new branch office
node "Branch3" as branch3 {
  [vEdge Router] as vedge3
  [LAN Switch] as sw3
  [User PCs] as pc3
}

' Add connections
vedge3 -- internet : TLOC
vedge3 -- mpls : TLOC
```

#### Custom Styling
```plantuml
' Define custom colors and styles
skinparam node {
  BackgroundColor LightBlue
  BorderColor Navy
}

skinparam cloud {
  BackgroundColor LightGray
  BorderColor DarkGray
}
```

#### Protocol Labels
```plantuml
' Add protocol information to connections
vedge1 -- vedge2 : IPsec/ESP\nBFD Monitoring
vsmart -- vedge1 : OMP\nTCP 23456
```

### Configuration Templates

#### vManage Template
```plaintext
Device Template: DC-vEdge-Template
- System Interface: Management VPN 512
- Transport Interfaces: GE0/0 (Internet), GE0/1 (MPLS)
- Service VPN: VPN 1 (LAN), VPN 0 (Transport)
- Policies: Application-aware routing, QoS
```

#### Branch Template
```plaintext
Device Template: Branch-vEdge-Template
- System Interface: Management VPN 512
- Transport Interfaces: GE0/0 (Internet), GE0/1 (LTE)
- Service VPN: VPN 1 (LAN)
- Policies: Local breakout, backup routing
```

### Network Specifications

#### Addressing Scheme
- **Management VPN 512**: 192.168.1.0/24
- **Transport VPN 0**: Provider-assigned or DHCP
- **Service VPN 1**: 10.0.0.0/8 (private addressing)
- **Loopback Interfaces**: 1.1.1.x/32 (system IP)

#### Protocol Ports
- **OMP**: TCP 23456
- **NETCONF**: TCP 830
- **HTTPS**: TCP 443
- **DTLS**: UDP 12346
- **IPsec**: UDP 500, 4500

#### Quality of Service
- **Voice**: DSCP EF (46)
- **Video**: DSCP AF41 (34)
- **Critical Data**: DSCP AF31 (26)
- **Best Effort**: DSCP 0

### Use Cases

#### Network Training
- SD-WAN fundamentals and architecture
- Hands-on configuration experience
- Troubleshooting scenarios and labs
- Policy implementation workshops

#### Design Validation
- Proof of concept deployments
- Architecture review and documentation
- Vendor evaluation and testing
- Migration planning and validation

#### Documentation
- Network design presentations
- Technical proposals and RFPs
- Change management documentation
- Knowledge transfer materials

## 📚 Educational Resources

### Learning Objectives
After using these topology diagrams, you will understand:
- SD-WAN architectural components and relationships
- Control plane and data plane separation
- Transport network integration and redundancy
- Policy enforcement and application-aware routing
- Secure overlay network implementation

### Certification Relevance
This project aligns with:
- **CCNA**: SD-WAN fundamentals and basic concepts
- **CCNP Enterprise**: Advanced SD-WAN configuration and deployment
- **CCIE**: Complex SD-WAN policies and troubleshooting

### Cisco SD-WAN Documentation
- [Cisco SD-WAN Design Guide](https://www.cisco.com/c/en/us/solutions/enterprise-networks/sd-wan/)
- [vManage Configuration Guide](https://www.cisco.com/c/en/us/support/routers/sd-wan-vmanage/series.html)
- [SD-WAN Troubleshooting Guide](https://www.cisco.com/c/en/us/support/docs/routers/sd-wan/215769-sd-wan-troubleshooting-series-overview.html)

### Training Platforms
- **Cisco DevNet**: SD-WAN APIs and automation
- **EVE-NG**: Network simulation and labs
- **GNS3**: Open-source network emulation
- **Cisco CML**: Cisco Modeling Labs platform

### Validation Checklist

#### Pre-Deployment Validation
- [ ] Controller reachability and registration
- [ ] Certificate installation and validation
- [ ] Transport interface connectivity
- [ ] OMP neighbor establishment
- [ ] Policy template deployment

#### Post-Deployment Testing
- [ ] End-to-end connectivity verification
- [ ] Application performance testing
- [ ] Failover and redundancy validation
- [ ] QoS policy effectiveness
- [ ] Security policy enforcement

### Network Statistics

The topology includes real-time statistics:
- **3 Controllers**: vManage, vSmart, vBond
- **3 Transport Links**: Internet, MPLS, LTE
- **3 vEdge Routers**: DC, Branch1, Branch2
- **21 Active Connections**: All protocol connections mapped

## 🤝 Contributing

We welcome contributions to improve these topology diagrams and documentation:

### How to Contribute
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/topology-enhancement`
3. **Make improvements**: Update PlantUML files or documentation
4. **Test changes**: Validate diagram rendering
5. **Submit pull request**: Include description of changes

### Contribution Guidelines
- Follow PlantUML best practices and consistent styling
- Include both source files and rendered outputs
- Update documentation for any new features or topologies
- Test diagrams in multiple PlantUML renderers
- Validate technical accuracy of network designs

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting with ESLint
- Add proper TypeScript types for all props and state
- Test on multiple browsers and screen sizes

### Contribution Areas
- Additional topology variations (campus, cloud, hybrid)
- Enhanced PlantUML styling and themes
- Configuration template improvements
- Troubleshooting scenarios and guides
- Performance optimization examples
- Security best practices documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Permissions
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

### Limitations
- ❌ Liability
- ❌ Warranty

## 🙏 Acknowledgments

Special thanks to:
- **Cisco Systems**: For SD-WAN technology and documentation
- **PlantUML Community**: For excellent diagramming tools
- **Network Simulation Platforms**: EVE-NG, GNS3, and Cisco CML teams
- **Open Source Community**: For tools and collaboration
- **Educational Institutions**: Using this material for network training
- **Network Engineering Community**: For shared knowledge and feedback

## 📞 Support & Contact

For questions, issues, or contributions:

- **GitHub Issues**: [Report issues or request features](https://github.com/your-username/sdwan-topology/issues)
- **Discussions**: Join community discussions about SD-WAN topologies
- **Documentation**: Refer to inline comments in PlantUML files
- **Email**: contact@sdwanprojects.edu (for educational institutions)

### Getting Help
1. Check existing documentation and README files
2. Review the troubleshooting guide and validation checklists
3. Search existing GitHub issues
4. Create a new issue with detailed information

---

**Perfect for network engineers building SD-WAN expertise** 🚀

*This project serves as both a practical implementation guide and an educational resource for understanding SD-WAN architecture in modern network environments.*
