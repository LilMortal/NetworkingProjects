# BGP Multi-AS Network Design Analysis Report

## 1. Introduction

I designed this network diagram to illustrate a multi-Autonomous System (AS) BGP routing architecture that demonstrates advanced route filtering and policy implementation. The diagram represents a strategic inter-AS communication network where Router A serves as a central hub connecting two separate autonomous systems, with sophisticated route filtering mechanisms to control routing advertisements and ensure secure, policy-compliant routing decisions.

## 2. Network Overview

The network consists of three primary routing entities operating across three distinct autonomous systems:

**Router A (AS 65001)** functions as the central hub router, establishing BGP peering relationships with both Router B and Router C. This router implements comprehensive route filtering policies through route-maps and prefix lists to control both inbound and outbound routing advertisements.

**Router B (AS 65002)** operates as an external BGP peer to Router A, advertising specific network prefixes including 10.0.0.0/24 and 172.16.0.0/16. This router represents a typical enterprise or service provider edge router participating in inter-AS routing.

**Router C (AS 65003)** serves as another external BGP peer, advertising 192.168.1.0/24 and 10.10.10.0/24 networks. However, the 10.10.10.0/24 prefix is filtered by Router A's policies, demonstrating selective route acceptance.

The route filtering infrastructure includes two prefix lists and two route maps that work in tandem to implement granular routing policies. PrefixList_In controls which routes Router A accepts from its neighbors, while PrefixList_Out determines which routes Router A advertises to its peers.

## 3. Technical Details

I implemented BGP (Border Gateway Protocol) version 4 as the primary routing protocol for inter-AS communication. The AS numbers chosen (65001, 65002, 65003) fall within the private AS range (64512-65534), indicating this is likely an internal or lab environment rather than public internet routing.

The inbound prefix list permits 10.0.0.0/24 and 192.168.1.0/24 networks while denying all others, ensuring only approved routes enter Router A's routing table. The outbound prefix list permits only 172.16.0.0/16 advertisements, creating a controlled advertisement policy.

Route maps provide the policy framework, matching against the prefix lists with permit statements for sequence 10. The BGP configuration utilizes standard neighbor statements with route-map applications for both inbound and outbound directions.

IP addressing appears to follow RFC 1918 private addressing schemes, with the BGP peering likely occurring over 192.0.2.0/24 subnet based on the configuration example showing neighbor 192.0.2.2.

## 4. Assumptions

I made several assumptions based on the diagram's abstract nature:

The physical connectivity between routers exists and is operational, though the specific transport mechanism (dedicated circuits, MPLS, internet) is not specified. I assume standard Ethernet or serial interfaces for BGP peering.

BGP sessions are established using TCP port 179 with proper authentication mechanisms, though security details are not explicitly shown in the diagram.

The routers have sufficient processing power and memory to handle the BGP routing table and filtering operations without performance degradation.

Network timing and synchronization are properly configured to prevent BGP session flapping or routing loops.

## 5. Requirements & Dependencies

The network requires several key components for proper operation:

**Hardware requirements** include enterprise-grade routers capable of running BGP with route filtering capabilities. Each router needs sufficient RAM and CPU to process routing updates and maintain neighbor relationships.

**Software dependencies** include BGP-capable routing software (Cisco IOS, Juniper JUNOS, or equivalent) with support for route-maps and prefix-lists.

**Supporting services** such as NTP for time synchronization, DNS for hostname resolution (if used), and SNMP for monitoring and management are essential.

**External dependencies** include stable physical or logical connectivity between AS boundaries and proper AS number allocation if this were to be deployed in a production environment.

## 6. Potential Issues & Mitigations

I identified several potential vulnerabilities and their mitigations:

**Single points of failure** exist if Router A becomes unavailable, as it serves as the sole interconnection point between AS 65002 and AS 65003. I would mitigate this by implementing redundant routers and establishing additional BGP peering relationships.

**Route hijacking risks** could occur without proper authentication. I recommend implementing BGP MD5 authentication for all neighbor relationships and considering RPKI (Resource Public Key Infrastructure) validation.

**Routing loops** might develop if the route filtering policies are misconfigured. I would implement careful testing procedures and monitoring to detect and prevent such issues.

**Prefix filtering bypass** could occur if the route-maps or prefix lists are incorrectly configured. Regular auditing and automated configuration validation would help prevent these issues.

## 7. Justification of Design Decisions

I chose this hub-and-spoke topology with Router A as the central point to demonstrate centralized policy control and simplify routing relationships. This design allows for consistent policy enforcement and easier troubleshooting.

The use of prefix lists combined with route maps provides granular control over routing decisions while maintaining flexibility for future policy modifications. This two-tier filtering approach separates prefix matching from policy actions.

Private AS numbers were selected to indicate this is a controlled environment, appropriate for testing or internal networking scenarios where public AS numbers are not required.

The specific prefix filtering demonstrates real-world scenarios where organizations need to control which routes they accept from peers and which routes they advertise to prevent routing pollution or security issues.

## 8. Scalability & Future Considerations

For future scalability, I would consider implementing route reflectors if the number of BGP peers increases significantly. This would reduce the full-mesh requirement for iBGP sessions within AS 65001.

The current design could be enhanced by adding route redistribution between BGP and IGP protocols if internal routing is required within each AS.

Implementation of BGP communities would provide more sophisticated policy control and easier management of routing policies across multiple autonomous systems.

For production deployment, I would recommend migrating to public AS numbers, implementing proper security measures including RPKI, and establishing SLA monitoring for BGP session availability and convergence times.

The design provides a solid foundation for expansion to include additional autonomous systems, redundant connections, and more complex routing policies as organizational requirements evolve.
