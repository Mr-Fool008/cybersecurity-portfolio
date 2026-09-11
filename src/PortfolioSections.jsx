import React, { useState, useEffect } from "react";
import {
  Shield,
  Radar,
  Crosshair,
  BrainCircuit,
  Network,
  X,
  GraduationCap,
  Award,
  Github,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const TIER_STYLES = {
  Foundational: { text: "text-sky-400", bg: "bg-sky-400/10", ring: "ring-sky-400/30" },
  Applied: { text: "text-amber-400", bg: "bg-amber-400/10", ring: "ring-amber-400/30" },
  Advanced: { text: "text-orange-400", bg: "bg-orange-400/10", ring: "ring-orange-400/30" },
};

// Featured projects are intentionally limited to work with a public supporting repository.
const PROJECTS = [
  {
    caseId: "TI-24-006",
    tier: "Advanced",
    tactic: "Threat Intelligence / C2",
    icon: Radar,
    title: "Lazarus Group / APT38 Threat Modeling & Detection",
    bullets: [
      "Modeled the 2016 Bangladesh Bank SWIFT heist into a STIX 1.x threat graph using Soltra Edge, mapping TTPs across all kill-chain phases.",
      "Expanded intrusion stages to MITRE ATT&CK Enterprise techniques and authored 3 production-grade Sigma rules and Splunk SPL queries.",
    ],
    tags: ["STIX/TAXII", "MITRE ATT&CK", "Sigma", "Splunk SPL", "Threat Modeling"],
    writeup: {
      objective: "Model the multi-stage SWIFT bank heist in STIX, map techniques to ATT&CK, and engineer detection logic for log tampering and C2 beaconing.",
      method: [
        "Constructed a structured STIX package linking threat actors, malware behaviors (Banswift), and C2 observables.",
        "Mapped kill-chain stages to MITRE ATT&CK IDs across Initial Access, Defense Evasion (T1565.001), and C2 (T1071.001).",
        "Authored Sigma detection rules and Splunk SPL queries targeting database tampering and anomalous outbound beaconing.",
      ],
      findings: "Demonstrated that adversary dwell time relied on record suppression; engineered detections to catch transaction tampering in near-real-time.",
    },
    repoUrl: "https://github.com/Mr-Fool008/lazaraus-apt38-case-study",
  },
  {
    caseId: "NIDS-24-007",
    tier: "Advanced",
    tactic: "Reconnaissance / Command and Control",
    icon: Network,
    title: "Network Security Analyzer & Algorithmic NIDS",
    repoUrl: "https://github.com/Mr-Fool008/network-security-analyzer",
    bullets: [
      "Engineered a modular Python NIDS pairing Layer 3/4 packet parsing with purpose-fit data structures — hash sets, a sliding-window deque, and a bounded min-heap — to flag port scans, SYN floods, and rate-limit violations in O(1)-O(N log K) time.",
      "Modeled host communication as a directed adjacency graph to surface lateral-movement and C2 fan-out patterns (star topologies) directly from captured traffic.",
      "Built dual-mode ingestion (offline PCAP + live NIC sniffing via Scapy) with SIEM-ready JSON-Lines alerting and a full unittest suite covering every detection rule.",
    ],
    tags: ["Python", "Scapy", "NIDS", "Data Structures & Algorithms", "Graph Analysis", "SIEM Logging"],
    writeup: {
      objective: "Build a from-scratch NIDS that pairs classic network detection (port scans, SYN floods, C2 beacon patterns) with the data structure best suited to each rule's access pattern.",
      method: [
        "Parsed raw packets at Layer 3/4 to extract IPs, ports, TCP flags, and timestamps for every capture.",
        "Implemented per-rule state with a matching structure: hash sets for port cardinality, a deque-based sliding window for rate limiting, a bounded min-heap for top-K talkers, and an adjacency graph for lateral-movement fan-out.",
        "Validated every rule against a synthetic PCAP generator producing both benign and attack traffic, backed by a full unittest suite.",
      ],
      findings: "Most detection rules run in O(1) amortized time per packet, with top-K talker ranking bounded at O(N log K); alerts export to reports/alerts.json in a SIEM-ready JSON-Lines format alongside a CSV traffic summary.",
    },
  },
  {
    caseId: "SIEM-26-008",
    tier: "Advanced",
    tactic: "Impact / Defense Evasion",
    icon: Shield,
    title: "Enterprise Wazuh SIEM & Real-Time File Integrity Monitoring",
    repoUrl: "https://github.com/Mr-Fool008/wazuh-siem-fim-lab",
    bullets: [
      "Deployed an on-premise Wazuh SIEM/XDR manager and enrolled a Windows 11 endpoint for secure, centralized security telemetry collection.",
      "Configured real-time Syscheck File Integrity Monitoring for a protected Windows directory and validated file creation, modification, and deletion detections.",
      "Generated controlled PowerShell tampering events and correlated Wazuh Syscheck alerts with integrity metadata and cryptographic hash evidence.",
    ],
    tags: ["Wazuh", "SIEM / XDR", "File Integrity Monitoring", "PowerShell", "Windows Security", "Syscheck"],
    writeup: {
      objective: "Build and validate a reproducible enterprise-style SIEM lab that detects endpoint file integrity violations in real time and preserves investigation-ready evidence.",
      method: [
        "Deployed Wazuh Manager on Ubuntu Server and enrolled a Windows 11 endpoint using agent credentials and secure TCP 1514 communication.",
        "Configured Syscheck with real-time monitoring for C:\\wazuh-test and restarted the Wazuh agent to apply the FIM policy.",
        "Simulated file creation, unauthorized modification, and deletion with PowerShell, then reviewed the resulting Syscheck events in the Wazuh dashboard.",
      ],
      findings: "Confirmed end-to-end detection of file addition, integrity modification, and deletion events, with Wazuh rules surfacing actionable alerts and integrity evidence for incident-response analysis.",
    },
  },
];

const SKILL_GROUPS = [
  {
    label: "Defensive & SOC",
    icon: Shield,
    items: ["Wazuh SIEM/XDR", "File Integrity Monitoring (FIM)", "Elastic Stack (ELK)", "KQL", "Snort IDS", "Wireshark", "Volatility", "Windows Event Logs", "ETW / Kernel Telemetry"],
  },
  {
    label: "Offensive / Assessment",
    icon: Crosshair,
    items: ["Nmap", "Metasploit", "Stack-Based Buffer Overflows", "Port Forwarding / Tunneling", "HackTheBox Labs"],
  },
  {
    label: "Threat Intel & Frameworks",
    icon: Radar,
    items: ["MITRE ATT&CK", "Cyber Kill Chain", "STIX/TAXII", "Soltra Edge", "IOC Analysis"],
  },
  {
    label: "AI & Automation",
    icon: BrainCircuit,
    items: ["Applied ML for Threat Detection", "Python", "SQL", "C/C++"],
  },
];

function TierBadge({ tier }) {
  const s = TIER_STYLES[tier] ?? TIER_STYLES.Applied;
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-mono font-medium ring-1 ${s.text} ${s.bg} ${s.ring}`}>
      {tier.toUpperCase()}
    </span>
  );
}

function CaseModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;
  const Icon = project.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-lg border border-[#24313D] bg-[#121821] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-[#24313D] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-[#182029] p-2 ring-1 ring-[#24313D]">
              <Icon className="h-5 w-5 text-[#00D9B5]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-mono text-xs text-[#7C8B99]">CASE {project.caseId}</p>
              <h3 className="font-mono text-base font-semibold text-[#E4EAEF]">{project.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 text-[#7C8B99] hover:bg-[#182029] hover:text-[#E4EAEF]" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="flex flex-wrap gap-2">
            <TierBadge tier={project.tier} />
            <span className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-mono text-[#7C8B99] ring-1 ring-[#24313D]">TACTIC: {project.tactic.toUpperCase()}</span>
          </div>
          <section>
            <h4 className="mb-1.5 font-mono text-xs uppercase tracking-wide text-[#7C8B99]">Objective</h4>
            <p className="text-sm leading-relaxed text-[#C9D3DB]">{project.writeup.objective}</p>
          </section>
          <section>
            <h4 className="mb-1.5 font-mono text-xs uppercase tracking-wide text-[#7C8B99]">Method</h4>
            <ul className="space-y-1.5">
              {project.writeup.method.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-[#C9D3DB]">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00D9B5]" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="mb-1.5 font-mono text-xs uppercase tracking-wide text-[#7C8B99]">Findings</h4>
            <p className="text-sm leading-relaxed text-[#C9D3DB]">{project.writeup.findings}</p>
          </section>
          <div className="flex flex-wrap gap-2 border-t border-[#24313D] pt-4">
            {project.tags.map((t) => (
              <span key={t} className="rounded bg-[#182029] px-2 py-1 font-mono text-[11px] text-[#9FB0BD] ring-1 ring-[#24313D]">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-[#24313D] pt-4">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#00D9B5]/10 px-3 py-1.5 font-mono text-xs text-[#00D9B5] ring-1 ring-[#00D9B5]/30 transition hover:bg-[#00D9B5]/20">
              <Github className="h-3.5 w-3.5" /> View Case Study
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;
  return (
    <button onClick={() => onOpen(project)} className="group flex w-full flex-col rounded-lg border border-[#24313D] bg-[#121821] p-5 text-left transition hover:border-[#00D9B5]/40 hover:bg-[#141C26] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9B5]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#00D9B5]" strokeWidth={1.75} />
          <span className="font-mono text-xs text-[#7C8B99]">CASE {project.caseId}</span>
          <Github className="h-3.5 w-3.5 text-[#7C8B99]" strokeWidth={1.75} />
        </div>
        <TierBadge tier={project.tier} />
      </div>
      <h3 className="mb-2 font-mono text-[15px] font-semibold leading-snug text-[#E4EAEF]">{project.title}</h3>
      <p className="mb-3 font-mono text-[11px] text-[#7C8B99]">TACTIC: {project.tactic}</p>
      <ul className="mb-4 space-y-1.5">
        {project.bullets.slice(0, 2).map((b, i) => (
          <li key={i} className="text-[13px] leading-relaxed text-[#9FB0BD]"><span className="text-[#00D9B5]">›</span> {b}</li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[#24313D] pt-3">
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="rounded bg-[#182029] px-1.5 py-0.5 font-mono text-[10px] text-[#7C8B99] ring-1 ring-[#24313D]">{t}</span>
        ))}
      </div>
      <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-[#00D9B5] opacity-0 transition group-hover:opacity-100">Open case file <ExternalLink className="h-3 w-3" /></span>
    </button>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState(null);
  return (
    <section id="projects" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// verified_case_files</p>
          <h2 className="mt-1 font-mono text-2xl font-semibold text-[#E4EAEF]">Featured Cybersecurity Projects</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#7C8B99]">Selected hands-on security projects backed by public GitHub repositories, technical documentation, code, detection logic, or lab evidence. Click a card to review the case file and supporting repository.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => <ProjectCard key={p.caseId} project={p} onOpen={setActive} />)}
        </div>
      </div>
      <CaseModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// education</p>
        <h2 className="mt-1 mb-8 font-mono text-2xl font-semibold text-[#E4EAEF]">Education</h2>
        <div className="flex flex-col gap-4 rounded-lg border border-[#24313D] bg-[#121821] p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-[#182029] p-2.5 ring-1 ring-[#24313D]"><GraduationCap className="h-5 w-5 text-[#00D9B5]" strokeWidth={1.75} /></div>
            <div>
              <h3 className="font-mono text-base font-semibold text-[#E4EAEF]">B.S. Computer & Information Systems Security</h3>
              <p className="text-sm text-[#9FB0BD]">University of South Florida — Tampa, FL</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded bg-[#182029] px-2 py-0.5 font-mono text-[11px] text-[#9FB0BD] ring-1 ring-[#24313D]">Green & Gold Directors Scholar</span>
                <span className="rounded bg-[#182029] px-2 py-0.5 font-mono text-[11px] text-[#9FB0BD] ring-1 ring-[#24313D]">Dean's List</span>
              </div>
            </div>
          </div>
          <span className="font-mono text-xs text-[#7C8B99]">Aug 2024 – May 2028 (expected)</span>
        </div>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  const items = [
    { title: "Green & Gold Directors Scholar", detail: "Merit-based university honor" },
    { title: "Dean's List — Fall 2024", detail: "Academic standing" },
    { title: "WCSC — White Hatters Cybersecurity Club", detail: "Active member, 2025–present" },
    { title: "SHPE & ACM", detail: "Active member, 2024–present" },
  ];
  return (
    <section id="achievements" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// achievements</p>
        <h2 className="mt-1 mb-8 font-mono text-2xl font-semibold text-[#E4EAEF]">Achievements & Affiliations</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-3 rounded-lg border border-[#24313D] bg-[#121821] p-4">
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9B5]" strokeWidth={1.75} />
              <div><p className="font-mono text-sm font-medium text-[#E4EAEF]">{it.title}</p><p className="text-xs text-[#7C8B99]">{it.detail}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// capability_matrix</p>
        <h2 className="mt-1 mb-8 font-mono text-2xl font-semibold text-[#E4EAEF]">Skills</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.label} className="rounded-lg border border-[#24313D] bg-[#121821] p-5">
                <div className="mb-3 flex items-center gap-2"><Icon className="h-4 w-4 text-[#00D9B5]" strokeWidth={1.75} /><h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-[#E4EAEF]">{g.label}</h3></div>
                <ul className="space-y-1.5">{g.items.map((item) => <li key={item} className="text-[13px] text-[#9FB0BD]">{item}</li>)}</ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// experience</p>
        <h2 className="mt-1 mb-8 font-mono text-2xl font-semibold text-[#E4EAEF]">Experience</h2>
        <div className="flex flex-col gap-2 rounded-lg border border-[#24313D] bg-[#121821] p-5 sm:flex-row sm:items-start sm:justify-between">
          <div><h3 className="font-mono text-sm font-semibold text-[#E4EAEF]">Student AV Technician</h3><p className="text-xs text-[#7C8B99]">University of South Florida</p></div>
          <span className="font-mono text-xs text-[#7C8B99]">May 2026 – Present</span>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioSections() {
  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <ProjectsSection />
      <div className="h-px bg-[#1A222B]" />
      <SkillsSection />
      <div className="h-px bg-[#1A222B]" />
      <EducationSection />
      <div className="h-px bg-[#1A222B]" />
      <ExperienceSection />
      <div className="h-px bg-[#1A222B]" />
      <AchievementsSection />
    </div>
  );
}
