import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MarkerType, type Node, type Edge } from "@xyflow/react";
import Canvas from "./Canvas";

interface Subtopic {
  title: string;
  description: string;
}

interface RoadmapNode {
  title: string;
  subtopics: Subtopic[];
}

interface RoadmapData {
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

const OverviewFlow = () => {
  const location = useLocation();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const roadmapData = location.state?.result;

  // Default data
  const defaultData: RoadmapData = {
    title: "Test Connection: A Comprehensive Learning Roadmap",
    description:
      "This roadmap provides a structured learning path for understanding, executing, and troubleshooting network connection tests. It covers fundamental concepts, essential command-line tools, advanced diagnostic techniques, and systematic troubleshooting methodologies to effectively diagnose connectivity issues across various layers of the network stack.",
    nodes: [
      {
        title: "1. Grasping Network Connectivity Fundamentals",
        subtopics: [
          {
            title: "IP Addresses, Ports, and Protocols",
            description:
              "Learn the basics of IP addressing (IPv4 vs. IPv6), common network ports (e.g., 80, 443, 22, 3389), and core protocols like TCP (Transmission Control Protocol) for reliable connections and UDP (User Datagram Protocol) for connectionless communication. Understand how they form the basis for all network communication.",
          },
          {
            title: "The OSI Model (Simplified)",
            description:
              "Understand the relevant layers of the OSI model, particularly the Network Layer (Layer 3) where IP operates, and the Transport Layer (Layer 4) where TCP/UDP operates. This helps in pinpointing where a connection failure might be occurring.",
          },
          {
            title: "Client-Server Architecture",
            description:
              "Familiarize yourself with the client-server model, understanding how a client initiates a request and a server responds, and the role of network connections in enabling this interaction. This context is crucial for understanding what you are testing.",
          },
        ],
      },
      {
        title: "2. Mastering Essential Command-Line Connectivity Tools",
        subtopics: [
          {
            title: "`ping` (ICMP Echo Request)",
            description:
              "Learn to use the `ping` command to test basic network reachability to a host and measure round-trip time. Understand how to interpret its output, including 'Request timed out' and 'Destination host unreachable' messages, and its reliance on ICMP.",
          },
          {
            title: "`tracert` / `traceroute` (Route Tracing)",
            description:
              "Utilize `tracert` (Windows) or `traceroute` (Linux/macOS) to discover the path packets take to reach a destination. Learn to identify network bottlenecks, dropped packets, or unexpected routing through interpreting hop-by-hop latency and asterisks.",
          },
          {
            title: "`telnet` / `nc` (Netcat) for Port Connectivity",
            description:
              "Practice using `telnet` (or the more versatile `nc` / `netcat`) to test if a specific port is open and listening on a remote host. This is crucial for verifying application-level connectivity beyond basic network reachability.",
          },
          {
            title:
              "`ipconfig` / `ifconfig` / `ip` (Local Network Configuration)",
            description:
              "Understand how to use `ipconfig` (Windows) or `ifconfig`/`ip addr` (Linux/macOS) to verify your local machine's IP address, subnet mask, default gateway, and DNS servers. This is often the first step in diagnosing 'no connection' issues.",
          },
        ],
      },
      {
        title: "3. Diagnosing Common Connection Obstacles",
        subtopics: [
          {
            title: "DNS Resolution Issues (`nslookup` / `dig`)",
            description:
              "Learn how DNS (Domain Name System) impacts connectivity and use `nslookup` (Windows/Linux/macOS) or `dig` (Linux/macOS) to troubleshoot problems with resolving hostnames to IP addresses, a common cause of 'cannot connect' errors.",
          },
          {
            title: "Firewall Blockages (Local & Network)",
            description:
              "Identify how local (OS) firewalls and network firewalls can block connections. Learn to check basic firewall rules on your OS and understand that network-level firewalls require collaboration with network administrators.",
          },
          {
            title: "Routing Problems and Default Gateway",
            description:
              "Understand the role of the default gateway and routing tables. Learn to confirm your device can reach its default gateway and that the gateway has a route to your target network/host, which is essential for communication beyond the local subnet.",
          },
          {
            title: "Target Service Availability (`netstat`)",
            description:
              "Use `netstat` to view active network connections and ports currently listening on your local machine or the target server (if you have access). This helps confirm if the intended application/service is actually running and accepting connections on the expected port.",
          },
        ],
      },
      {
        title: "4. Advanced Connection Diagnostics and Analysis",
        subtopics: [
          {
            title: "Packet Sniffing with Wireshark",
            description:
              "Get introduced to network packet analysis using Wireshark. Learn to capture and filter network traffic to deeply inspect communication flows, identify dropped packets, retransmissions, or protocol errors that simpler tools might miss.",
          },
          {
            title: "Basic Port Scanning with Nmap",
            description:
              "Learn the very basics of Nmap (Network Mapper) to quickly identify open ports and services running on a target host. Focus on simple 'connect scan' techniques (e.g., `nmap -sT <target>`) to verify service presence.",
          },
          {
            title: "Testing Application-Layer Connectivity (cURL, Postman)",
            description:
              "Move beyond basic network tests to application-specific testing. Learn to use `cURL` for command-line HTTP/HTTPS requests or Postman for testing REST APIs, verifying that the application logic itself is responsive and reachable over the network.",
          },
          {
            title: "VPN/Proxy Connectivity Checks",
            description:
              "Understand specific considerations when testing connections through VPNs or proxies. Learn to verify that the VPN tunnel is established and that proxy settings are correctly configured and not interfering with the connection path.",
          },
        ],
      },
      {
        title: "5. Interpreting Results, Remediation & Best Practices",
        subtopics: [
          {
            title: "Understanding Error Messages and Codes",
            description:
              "Learn to interpret common network error messages (e.g., 'Connection refused', 'Host unreachable', 'TTL expired', HTTP status codes like 404, 500) and relate them back to specific network layers or issues. This is key to effective troubleshooting.",
          },
          {
            title: "Systematic Troubleshooting Flowchart",
            description:
              "Develop a logical, step-by-step approach to troubleshooting connectivity issues. Start from the client side, verify local network configuration, then move to gateway, DNS, firewalls, and finally the target server/service, isolating variables at each stage.",
          },
          {
            title: "Documenting Findings and Reporting",
            description:
              "Practice documenting the steps taken, tools used, and results observed during your testing. This aids in collaboration, future troubleshooting, and provides clear reports for escalation to other teams (e.g., network, server, development).",
          },
          {
            title: "Proactive Connection Health Checks",
            description:
              "Understand the concept of proactive monitoring. Learn about tools and strategies (even simple scripts) to regularly test critical connections, ensuring uptime and identifying potential issues before they impact users.",
          },
        ],
      },
    ],
  };

  const data: RoadmapData = roadmapData || defaultData;

  useEffect(() => {
    if (!location.state?.roadmapData) {
      console.log("No roadmap data found, using default data");
    }
  }, [location.state]);

  const generateNodeEdges = (data: RoadmapData): void => {
    let counter: number = 0;
    let currPoss: number = 0;
    let subtopicpos: number = 300;

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: counter.toString(),
      type: "start",
      data: { label: data.title },
      position: { x: currPoss, y: 0 },
    });

    edges.push({
      id: `e${counter - 1}-1`,
      source: counter.toString(),
      target: (++counter).toString(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    });

    data.nodes.forEach((node) => {
      currPoss += 400 + node.subtopics.length * 50;

      nodes.push({
        id: `${counter++}`,
        type: "main",
        position: {
          x: currPoss,
          y: 0,
        },
        data: { label: node.title },
      });

      edges.push({
        id: `e${counter}`,
        source: (counter - 1).toString(),
        target: counter.toString(),
        sourceHandle: "b",
        style: { stroke: "rgb(158, 118, 255)" },
      });

      node.subtopics.forEach((subtopic, index) => {
        subtopicpos += 150;

        nodes.push({
          id: `${counter}-${index}`,
          type: "circle",
          position: { x: subtopicpos, y: 200 },
          data: { label: subtopic.title, description: subtopic.description },
        });

        edges.push({
          id: `e${counter}-${index}`,
          source: (counter - 1).toString(),
          target: `${counter}-${index}`,
          sourceHandle: "c",
          animated: true,
        });
      });
    });

    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    generateNodeEdges(data);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-4xl font-black leading-24 tracking-tight">
          {data.title}{" "}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {data.nodes.length}
                </p>
                <p className="text-sm text-gray-600">Main Topics</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {data.nodes.reduce(
                    (acc, node) => acc + node.subtopics.length,
                    0
                  )}
                </p>
                <p className="text-sm text-gray-600">Subtopics</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {roadmapData ? "AI" : "Demo"}
                </p>
                <p className="text-sm text-gray-600">Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl overflow-hidden">
          <div className="h-screen">
            <Canvas nodes={nodes} edges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewFlow;
