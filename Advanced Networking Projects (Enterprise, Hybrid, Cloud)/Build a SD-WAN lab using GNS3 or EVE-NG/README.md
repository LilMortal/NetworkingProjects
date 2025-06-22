# SD-WAN Lab Topology Diagrams

Professional SD-WAN network topology diagrams and PlantUML source code for lab environments, designed for use with EVE-NG, GNS3, and other network simulation platforms.

![SD-WAN Network Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop)

## 🌟 Overview

This repository contains comprehensive SD-WAN topology diagrams in multiple formats, including PlantUML source code and rendered network diagrams. Perfect for network engineers, students, and lab enthusiasts working with Cisco SD-WAN, Viptela, or similar SD-WAN solutions.

### What's Included
- **PlantUML Source Files**: Editable diagram source code for customization
- **Rendered Network Diagrams**: High-quality PNG/SVG outputs ready for documentation
- **Multiple Topology Variants**: Basic, advanced, and multi-site configurations
- **Protocol Documentation**: Detailed connection and protocol specifications

## 🏗️ SD-WAN Architecture

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

### Connection Protocols

| Protocol | Layer | Purpose | Devices |
|----------|-------|---------|---------|
| **HTTPS/NETCONF** | Management | Configuration sync | vManage ↔ All devices |
| **OMP** | Control | Route distribution | vSmart ↔ vEdge |
| **DTLS** | Control | Secure signaling | vBond ↔ vEdge |
| **IPsec** | Data | Tunnel encryption | vEdge ↔ vEdge |
| **TLOC** | Data | Tunnel addressing | Transport networks |

## 🚀 Getting Started

### Prerequisites
- PlantUML installation or online editor access
- Java Runtime Environment (for local PlantUML rendering)
- Network simulation platform (EVE-NG, GNS3, CML)

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

## 📋 Topology Variations

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

## 📊 Network Specifications

### Addressing Scheme
- **Management VPN 512**: 192.168.1.0/24
- **Transport VPN 0**: Provider-assigned or DHCP
- **Service VPN 1**: 10.0.0.0/8 (private addressing)
- **Loopback Interfaces**: 1.1.1.x/32 (system IP)

### Protocol Ports
- **OMP**: TCP 23456
- **NETCONF**: TCP 830
- **HTTPS**: TCP 443
- **DTLS**: UDP 12346
- **IPsec**: UDP 500, 4500

### Quality of Service
- **Voice**: DSCP EF (46)
- **Video**: DSCP AF41 (34)
- **Critical Data**: DSCP AF31 (26)
- **Best Effort**: DSCP 0

## 🎯 Use Cases

### Network Training
- SD-WAN fundamentals and architecture
- Hands-on configuration experience
- Troubleshooting scenarios and labs
- Policy implementation workshops

### Design Validation
- Proof of concept deployments
- Architecture review and documentation
- Vendor evaluation and testing
- Migration planning and validation

### Documentation
- Network design presentations
- Technical proposals and RFPs
- Change management documentation
- Knowledge transfer materials

## 📚 Learning Resources

### Cisco SD-WAN Documentation
- [Cisco SD-WAN Design Guide](https://www.cisco.com/c/en/us/solutions/enterprise-networks/sd-wan/)
- [vManage Configuration Guide](https://www.cisco.com/c/en/us/support/routers/sd-wan-vmanage/series.html)
- [SD-WAN Troubleshooting Guide](https://www.cisco.com/c/en/us/support/docs/routers/sd-wan/215769-sd-wan-troubleshooting-series-overview.html)

### Training Platforms
- **Cisco DevNet**: SD-WAN APIs and automation
- **EVE-NG**: Network simulation and labs
- **GNS3**: Open-source network emulation
- **Cisco CML**: Cisco Modeling Labs platform

## ✅ Validation Checklist

### Pre-Deployment Validation
- [ ] Controller reachability and registration
- [ ] Certificate installation and validation
- [ ] Transport interface connectivity
- [ ] OMP neighbor establishment
- [ ] Policy template deployment

### Post-Deployment Testing
- [ ] End-to-end connectivity verification
- [ ] Application performance testing
- [ ] Failover and redundancy validation
- [ ] QoS policy effectiveness
- [ ] Security policy enforcement

## 🤝 Contributing

We welcome contributions to improve these topology diagrams and documentation:

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cisco Systems**: For SD-WAN technology and documentation
- **PlantUML Community**: For excellent diagramming tools
- **Network Simulation Platforms**: EVE-NG, GNS3, and Cisco CML teams
- **Open Source Community**: For tools and collaboration

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: [Report issues or request features](https://github.com/your-username/sdwan-topology/issues)
- **Discussions**: Join community discussions about SD-WAN topologies
- **Documentation**: Refer to inline comments in PlantUML files

---

**Perfect for network engineers building SD-WAN expertise** 🚀
