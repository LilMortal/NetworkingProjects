# Complete SD-WAN Lab Setup Guide for GNS3 and EVE-NG

## Executive Summary

This comprehensive report provides detailed instructions for building a Software-Defined Wide Area Network (SD-WAN) laboratory environment using either GNS3 or EVE-NG network simulators. SD-WAN represents a revolutionary approach to network connectivity that simplifies branch office networking by separating the network hardware from its control mechanism. This lab setup allows network professionals to gain hands-on experience with Cisco SD-WAN technology in a controlled environment.

## Table of Contents

1. Introduction to SD-WAN Technology
2. Laboratory Prerequisites and Requirements
3. Simulator Platform Comparison (GNS3 vs EVE-NG)
4. Image Requirements and Acquisition
5. EVE-NG Installation and Configuration
6. GNS3 Installation and Configuration
7. SD-WAN Components Installation
8. Network Topology Design
9. Configuration Procedures
10. Testing and Validation
11. Troubleshooting Common Issues
12. Best Practices and Recommendations
13. Conclusion

## 1. Introduction to SD-WAN Technology

### What is SD-WAN?

Software-Defined Wide Area Network (SD-WAN) is a transformative approach to network connectivity that extends Software-Defined Networking (SDN) capabilities to connect enterprise networks over large geographic distances. Unlike traditional WAN solutions that rely on specialized hardware at each location, SD-WAN uses software to control the connectivity, management, and services between data centers, branch offices, and cloud resources.

### Key Benefits of SD-WAN:

- **Centralized Management**: Single pane of glass for managing entire WAN infrastructure
- **Policy-Based Routing**: Intelligent traffic steering based on application requirements
- **Cost Optimization**: Reduced dependence on expensive MPLS circuits
- **Enhanced Security**: Integrated security features and zero-trust network access
- **Application Performance**: Improved application performance through path optimization
- **Scalability**: Easy deployment of new sites and services
- **Visibility**: Comprehensive network analytics and monitoring

### Cisco SD-WAN Architecture Components:

1. **vManage (Management Plane)**: Centralized network management system
2. **vSmart (Control Plane)**: Distributes control plane information and policies
3. **vBond (Orchestration Plane)**: Authenticates and orchestrates connectivity
4. **vEdge (Data Plane)**: Physical or virtual devices that forward data traffic

## 2. Laboratory Prerequisites and Requirements

### Hardware Requirements

#### Minimum System Requirements:
- **CPU**: Intel i7 or AMD Ryzen 7 (8 cores minimum)
- **RAM**: 32 GB (64 GB recommended for full topology)
- **Storage**: 500 GB SSD (1TB recommended)
- **Network**: Gigabit Ethernet connection

#### Recommended System Specifications:
- **CPU**: Intel i9 or AMD Ryzen 9 (12+ cores)
- **RAM**: 64-128 GB DDR4
- **Storage**: 1TB NVMe SSD
- **Virtualization**: VMware vSphere, VMware Workstation, or KVM

### Software Requirements

#### Essential Software:
- **Hypervisor**: VMware ESXi 7.0+, VMware Workstation 16+, or KVM
- **Simulator**: EVE-NG Professional or GNS3 2.2+
- **Operating System**: Ubuntu 20.04 LTS or CentOS 8
- **Remote Access**: SSH client (PuTTY, SecureCRT)
- **File Transfer**: WinSCP, FileZilla, or SCP

#### Network Simulation Platforms:
- **EVE-NG**: Web-based network emulation platform
- **GNS3**: Graphical Network Simulator 3
- **Cisco CML**: Cisco Modeling Labs (alternative option)

## 3. Simulator Platform Comparison (GNS3 vs EVE-NG)

### EVE-NG Advantages:
- **Web-based Interface**: Access from any web browser
- **Multi-user Support**: Collaborative lab environments
- **Cloud Integration**: Easy cloud deployment options
- **Professional Features**: Advanced licensing options
- **Resource Efficiency**: Better resource management
- **Stability**: More stable for large topologies

### GNS3 Advantages:
- **Open Source**: Free community edition available
- **Local Installation**: No web dependency
- **Extensive Device Support**: Broader range of supported devices
- **Integration**: Better integration with real hardware
- **Customization**: More customizable interface options

### Recommendation:
For SD-WAN labs, **EVE-NG Professional** is recommended due to its superior resource management capabilities and web-based accessibility, which is crucial for the resource-intensive SD-WAN controllers.

## 4. Image Requirements and Acquisition

### Required Cisco SD-WAN Images:

#### Controller Images:
1. **vManage Controller**: `viptela-vmanage-19.3.0-genericx86-64.qcow2`
2. **vSmart Controller**: `viptela-smart-19.3.0-genericx86-64.qcow2`
3. **vBond Orchestrator**: `viptela-edge-19.3.0-genericx86-64.qcow2`

#### Edge Device Images:
1. **vEdge Router**: `viptela-edge-19.3.0-genericx86-64.qcow2`
2. **cEdge Router**: Standard IOS-XE image with SD-WAN capabilities

#### Supporting Images:
1. **IOS Router**: `vios-adventerprisek9-m.spa.159-3.m2.qcow2`
2. **IOS Switch**: `vios_l2-adventerprisek9-m.ssa.high_iron_20190423.qcow2`

### Image Acquisition Process:

#### Step 1: Obtain Cisco CCO Account
- Valid Cisco Connection Online (CCO) account required
- Active support contract or partner agreement necessary
- Access to Cisco Software Download portal

#### Step 2: Download Images
- Navigate to https://software.cisco.com/download/home
- Search for "SD-WAN" or "Viptela"
- Download KVM-compatible QCOW2 images
- Verify image checksums for integrity

#### Step 3: Image Preparation
- Extract downloaded archives
- Verify image formats (QCOW2 for KVM/EVE-NG)
- Organize images in dedicated directories

## 5. EVE-NG Installation and Configuration

### VMware ESXi Installation

#### Step 1: Create Port Groups
```bash
# Create management port group
vSwitch: vSwitch0
Port Group: LAB
VLAN ID: 0

# Create WAN simulation port groups
Port Group: WAN1
VLAN ID: 100

Port Group: WAN2
VLAN ID: 200

Port Group: WAN3
VLAN ID: 300
```

#### Step 2: Security Settings
Configure the following security settings for all port groups:
- **Promiscuous Mode**: Accept
- **MAC Address Changes**: Accept
- **Forged Transmits**: Accept

### EVE-NG Virtual Machine Creation

#### VM Specifications:
```
Name: EVE-NG-Pro
Guest OS: Ubuntu Linux (64-bit)
CPU: 8-16 vCPUs
RAM: 32-64 GB
Storage: 500 GB (Thin Provisioned)
Network Adapters: 4 (mapped to port groups)
CD/DVD: EVE-NG ISO image
```

### EVE-NG Installation Process

#### Step 1: Boot from ISO
1. Power on the virtual machine
2. Select language and keyboard layout
3. Choose installation location
4. Configure network settings

#### Step 2: Network Configuration
```bash
# Primary interface configuration
Interface: eth0
IP Address: 192.168.1.100/24
Gateway: 192.168.1.1
DNS: 8.8.8.8, 8.8.4.4
```

#### Step 3: System Configuration
```bash
# Hostname setup
Hostname: eve-ng-lab

# User account creation
Username: admin
Password: [secure_password]

# Time zone configuration
Timezone: UTC
```

### Post-Installation Setup

#### Step 1: Access EVE-NG Interface
1. Open web browser
2. Navigate to https://[EVE-NG-IP]
3. Accept security certificate
4. Login with created credentials

#### Step 2: License Installation
```bash
# Professional license installation
System -> License
Upload license file
Restart services
```

## 6. SD-WAN Images Installation in EVE-NG

### Directory Structure Creation

```bash
# SSH into EVE-NG system
ssh admin@[EVE-NG-IP]

# Create image directories
mkdir -p /opt/unetlab/addons/qemu/vtmgmt-19.3.0
mkdir -p /opt/unetlab/addons/qemu/vtsmart-19.3.0
mkdir -p /opt/unetlab/addons/qemu/vtbond-19.3.0
mkdir -p /opt/unetlab/addons/qemu/vtedge-19.3.0
```

### Image Upload and Configuration

#### Step 1: Upload Images
```bash
# Use SCP to upload images
scp viptela-vmanage-19.3.0-genericx86-64.qcow2 admin@[EVE-NG-IP]:/tmp/
scp viptela-smart-19.3.0-genericx86-64.qcow2 admin@[EVE-NG-IP]:/tmp/
scp viptela-edge-19.3.0-genericx86-64.qcow2 admin@[EVE-NG-IP]:/tmp/
```

#### Step 2: Install and Rename Images
```bash
# vManage installation
cd /opt/unetlab/addons/qemu/vtmgmt-19.3.0
mv /tmp/viptela-vmanage-19.3.0-genericx86-64.qcow2 virtioa.qcow2

# Create additional storage for vManage
/opt/qemu/bin/qemu-img create -f qcow2 virtiob.qcow2 100G

# vSmart installation
cd /opt/unetlab/addons/qemu/vtsmart-19.3.0
mv /tmp/viptela-smart-19.3.0-genericx86-64.qcow2 virtioa.qcow2

# vBond installation
cd /opt/unetlab/addons/qemu/vtbond-19.3.0
cp /tmp/viptela-edge-19.3.0-genericx86-64.qcow2 virtioa.qcow2

# vEdge installation
cd /opt/unetlab/addons/qemu/vtedge-19.3.0
mv /tmp/viptela-edge-19.3.0-genericx86-64.qcow2 virtioa.qcow2
```

#### Step 3: Set Permissions
```bash
# Fix permissions
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions

# Verify installation
systemctl restart eve-ng
```

## 7. Network Topology Design

### Basic SD-WAN Lab Topology

```
                    [Internet Cloud]
                           |
                    [vBond Orchestrator]
                           |
            +----------+---+---+----------+
            |          |       |          |
      [vManage]   [vSmart]    |          |
            |          |       |          |
            +----------+-------+          |
                       |                  |
                 [Branch Router]    [HQ Router]
                       |                  |
                 [Branch LAN]        [HQ LAN]
```

### Advanced Multi-Site Topology

```
                        [Internet]
                            |
                     [vBond Cluster]
                            |
        +----------+--------+--------+----------+
        |          |        |        |          |
   [vManage1]  [vManage2] [vSmart1] [vSmart2]   |
        |          |        |        |          |
        +----------+--------+--------+          |
                            |                   |
          +---------+-------+-------+---------+ |
          |         |       |       |         | |
    [Branch-1]  [Branch-2] [HQ-1] [HQ-2]  [DC-1]
          |         |       |       |         |
    [LAN-B1]   [LAN-B2]  [LAN-H1][LAN-H2] [LAN-DC1]
```

### Resource Allocation per Device

#### Controller Requirements:
- **vManage**: 8 GB RAM, 4 vCPU, 100 GB Storage
- **vSmart**: 4 GB RAM, 2 vCPU, 10 GB Storage
- **vBond**: 2 GB RAM, 1 vCPU, 10 GB Storage

#### Edge Device Requirements:
- **vEdge**: 4 GB RAM, 2 vCPU, 10 GB Storage
- **cEdge**: 4 GB RAM, 2 vCPU, 10 GB Storage

## 8. Configuration Procedures

### vBond Orchestrator Configuration

#### Initial Setup:
```bash
# Console access to vBond
viptela login: admin
Password: admin

# Enter configuration mode
viptela# config
viptela(config)# system
viptela(config-system)# host-name vBond-1
viptela(config-system)# system-ip 1.1.1.1
viptela(config-system)# site-id 1000
viptela(config-system)# organization-name "LAB-ORG"
viptela(config-system)# vbond 192.168.1.10 local
viptela(config-system)# commit and-quit
```

#### Interface Configuration:
```bash
# VPN 0 (Transport Network)
viptela(config)# vpn 0
viptela(config-vpn)# interface eth0
viptela(config-interface)# ip address 192.168.1.10/24
viptela(config-interface)# tunnel-interface
viptela(config-interface)# no shutdown
viptela(config-interface)# exit
viptela(config-vpn)# ip route 0.0.0.0/0 192.168.1.1
viptela(config-vpn)# commit and-quit
```

### vSmart Controller Configuration

#### System Configuration:
```bash
# vSmart login
viptela login: admin
Password: admin

# System settings
viptela(config)# system
viptela(config-system)# host-name vSmart-1
viptela(config-system)# system-ip 2.2.2.2
viptela(config-system)# site-id 2000
viptela(config-system)# organization-name "LAB-ORG"
viptela(config-system)# vbond 192.168.1.10
viptela(config-system)# commit and-quit
```

#### Transport Network:
```bash
# VPN 0 configuration
viptela(config)# vpn 0
viptela(config-vpn)# interface eth0
viptela(config-interface)# ip address 192.168.1.20/24
viptela(config-interface)# no shutdown
viptela(config-interface)# exit
viptela(config-vpn)# ip route 0.0.0.0/0 192.168.1.1
viptela(config-vpn)# commit and-quit
```

### vManage Controller Configuration

#### Initial Setup:
```bash
# vManage login
localhost login: admin
Password: admin

# Network configuration
config
config-transaction
system
 host-name vManage-1
 system-ip 3.3.3.3
 site-id 3000
 organization-name "LAB-ORG"
 vbond 192.168.1.10
!
vpn 0
 interface eth0
  ip address 192.168.1.30/24
  no shutdown
 !
 ip route 0.0.0.0/0 192.168.1.1
!
commit
```

#### Web Interface Access:
1. Open browser to https://192.168.1.30
2. Accept certificate warnings
3. Complete initial setup wizard
4. Create admin user account

### vEdge Router Configuration

#### Branch Site Configuration:
```bash
# vEdge Branch Router
viptela(config)# system
viptela(config-system)# host-name Branch-1
viptela(config-system)# system-ip 10.1.1.1
viptela(config-system)# site-id 100
viptela(config-system)# organization-name "LAB-ORG"
viptela(config-system)# vbond 192.168.1.10
viptela(config-system)# commit and-quit

# WAN Interface (VPN 0)
viptela(config)# vpn 0
viptela(config-vpn)# interface eth0
viptela(config-interface)# ip address 192.168.100.10/24
viptela(config-interface)# tunnel-interface
viptela(config-interface)# no shutdown
viptela(config-interface)# exit
viptela(config-vpn)# ip route 0.0.0.0/0 192.168.100.1

# LAN Interface (VPN 1)
viptela(config)# vpn 1
viptela(config-vpn)# interface eth1
viptela(config-interface)# ip address 172.16.1.1/24
viptela(config-interface)# no shutdown
viptela(config-interface)# commit and-quit
```

## 9. Certificate Management and Authentication

### Certificate Authority Setup

#### Generate Root CA:
```bash
# On vManage controller
vmanage# request root-cert-chain install /tmp/root-ca.pem

# Generate enterprise certificate
vmanage# request certificate install enterprise /tmp/enterprise.pem
```

#### Device Certificate Installation:
```bash
# Install device certificates on each component
# vBond certificate
vbond# request root-cert-chain install /tmp/root-ca.pem
vbond# request certificate install /tmp/vbond.pem

# vSmart certificate
vsmart# request root-cert-chain install /tmp/root-ca.pem
vsmart# request certificate install /tmp/vsmart.pem

# vEdge certificate
vedge# request root-cert-chain install /tmp/root-ca.pem
vedge# request certificate install /tmp/vedge.pem
```

### Device Authentication Process

#### Control Connections:
```bash
# Verify control connections
vmanage# show control connections
vmanage# show orchestrator connections
vmanage# show control local-properties
```

#### Certificate Status:
```bash
# Check certificate status
show certificate root-ca-cert
show certificate installed
show certificate validity
```

## 10. Policy Configuration

### Centralized Policy Creation

#### Access Control Lists:
```bash
# Create ACL for branch traffic
policy
 lists
  data-prefix-list BRANCH_PREFIXES
   ip-prefix 172.16.0.0/16
  !
  data-prefix-list HQ_PREFIXES
   ip-prefix 10.0.0.0/8
  !
 !
```

#### Application-Aware Routing:
```bash
# Create application-aware routing policy
policy
 app-route-policy BRANCH_POLICY
  vpn-list BRANCH_VPNS
  sequence 10
   match
    app-list CRITICAL_APPS
   !
   action
    sla-class GOLD
    preferred-color bronze
   !
  !
 !
```

#### Traffic Engineering:
```bash
# Traffic engineering policies
policy
 control-policy TRAFFIC_ENGINEERING
  sequence 10
   match route
    prefix-list BRANCH_PREFIXES
   !
   action accept
    set
     tloc 192.168.100.10 bronze encap ipsec
     preference 100
    !
   !
  !
 !
```

### Site-Specific Policies

#### QoS Configuration:
```bash
# QoS policy for voice traffic
policy
 qos-map VOICE_QOS
  class VOICE
   match dscp 46
   queue 0
   bandwidth-percent 30
   buffer-percent 10
  !
  class VIDEO
   match dscp 34
   queue 1
   bandwidth-percent 20
   buffer-percent 15
  !
 !
```

## 11. Testing and Validation

### Connectivity Testing

#### Control Plane Verification:
```bash
# Check vBond connections
show orchestrator connections

# Verify vSmart connections
show control connections

# Check OMP routes
show omp routes

# Validate BFD sessions
show bfd sessions
```

#### Data Plane Testing:
```bash
# Test end-to-end connectivity
ping 172.16.2.1 source 172.16.1.1

# Trace path selection
traceroute 172.16.2.1 source 172.16.1.1

# Monitor tunnel statistics
show tunnel statistics

# Check interface utilization
show interface statistics
```

### Performance Monitoring

#### Real-time Statistics:
```bash
# Monitor application performance
show app-route statistics

# Check SLA compliance
show policy sla-class

# View tunnel health
show tunnel health

# Monitor quality metrics
show app-route sla-class
```

#### Historical Analysis:
```bash
# Generate performance reports
show statistics interface
show statistics tunnel
show statistics application
show statistics policy
```

## 12. Advanced Features Configuration

### Security Implementation

#### IPSec Configuration:
```bash
# Configure IPSec parameters
security
 ipsec
  integrity-type sha256
  encryption-type aes256
  rekey 3600
 !
```

#### Firewall Policies:
```bash
# Zone-based firewall
security
 zone-based-firewall
  zone INSIDE
   interface eth1
  !
  zone OUTSIDE
   interface eth0
  !
  zone-pair INSIDE_OUTSIDE
   source-zone INSIDE
   destination-zone OUTSIDE
   service-policy ALLOW_OUTBOUND
  !
 !
```

### High Availability Setup

#### Controller Redundancy:
```bash
# vManage cluster configuration
cluster
 enable
 local-node
  system-ip 3.3.3.3
  role primary
 !
 remote-node
  system-ip 3.3.3.4
  role secondary
 !
```

#### Load Balancing:
```bash
# Traffic load balancing
policy
 data-policy LOAD_BALANCE
  vpn-list ALL_VPNS
  sequence 10
   match
    source-data-prefix-list ANY
   !
   action
    load-balance
    nat use-vpn 0
   !
  !
 !
```

## 13. Troubleshooting Common Issues

### Connection Problems

#### vBond Communication Issues:
```bash
# Debug commands
debug orchestrator
show log orchestrator
show certificate status

# Common solutions
- Verify network connectivity
- Check certificate validity
- Confirm system clock synchronization
- Validate DNS resolution
```

#### Control Plane Issues:
```bash
# Troubleshooting steps
show control connections-history
show control local-properties
debug control

# Resolution steps
- Check control plane connectivity
- Verify authentication certificates
- Confirm organization name consistency
- Validate site-id uniqueness
```

### Performance Issues

#### Tunnel Performance:
```bash
# Diagnostic commands
show tunnel statistics
show interface statistics
show policy access-lists counters

# Optimization steps
- Adjust MTU settings
- Configure QoS policies
- Optimize routing preferences
- Monitor bandwidth utilization
```

### Configuration Issues

#### Policy Application Problems:
```bash
# Debug policy application
show policy access-lists
show policy data-policy-filter
debug policy

# Common fixes
- Verify policy syntax
- Check sequence numbers
- Confirm match criteria
- Validate action parameters
```

## 14. Monitoring and Maintenance

### Health Monitoring

#### Dashboard Configuration:
```bash
# vManage dashboard setup
Monitor > Geography
Monitor > Network
Monitor > Devices
Monitor > Alarms
```

#### Automated Alerts:
```bash
# Configure threshold alerts
Administration > Settings > Alarms
- Device connectivity
- Interface utilization
- Tunnel status
- Certificate expiration
```

### Backup and Recovery

#### Configuration Backup:
```bash
# Automated backup configuration
Maintenance > Software Repository
Tools > Operational Commands
- Export device configurations
- Backup template configurations
- Archive policy configurations
```

#### Disaster Recovery:
```bash
# Recovery procedures
1. Restore controller configurations
2. Re-establish control connections
3. Verify policy applications
4. Test end-to-end connectivity
```

## 15. Best Practices and Recommendations

### Design Principles

#### Scalability Considerations:
- Plan for future growth in site count
- Design hierarchical addressing schemes
- Implement efficient routing protocols
- Consider controller placement strategies

#### Security Best Practices:
- Implement strong authentication mechanisms
- Use encrypted control and data channels
- Regular certificate rotation
- Network segmentation strategies

#### Performance Optimization:
- Monitor application performance metrics
- Implement appropriate QoS policies
- Optimize path selection algorithms
- Regular performance baseline reviews

### Operational Procedures

#### Change Management:
- Test changes in lab environment first
- Implement gradual rollout procedures
- Maintain configuration version control
- Document all changes thoroughly

#### Capacity Planning:
- Monitor resource utilization trends
- Plan for peak traffic periods
- Consider geographic expansion needs
- Evaluate technology refresh cycles

## 16. Conclusion

Building an SD-WAN laboratory using GNS3 or EVE-NG provides invaluable hands-on experience with modern network architectures. This comprehensive setup enables network professionals to:

- Understand SD-WAN architecture and components
- Practice configuration and troubleshooting procedures
- Test various deployment scenarios
- Develop operational expertise
- Prepare for certification examinations

The laboratory environment serves as a safe testing ground for new configurations and policies before implementing them in production networks. Regular practice in this environment will significantly enhance your SD-WAN expertise and operational confidence.

### Next Steps:
1. Complete the basic lab setup following this guide
2. Experiment with different topology designs
3. Practice various configuration scenarios
4. Implement advanced features progressively
5. Document lessons learned and best practices

### Additional Resources:
- Cisco SD-WAN Documentation Portal
- EVE-NG Community Forums
- GNS3 Academy Training Materials
- Cisco DevNet SD-WAN Learning Labs
- Network Automation Tools and Scripts

This laboratory environment will serve as the foundation for developing comprehensive SD-WAN expertise and staying current with evolving network technologies.
