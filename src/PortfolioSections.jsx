import React, { useState, useEffect } from "react";
import {
  Shield,
  Terminal,
  FileSearch,
  Radar,
  Crosshair,
  BrainCircuit,
  X,
  GraduationCap,
  Award,
  Github,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

/*
  FONT NOTE:
  This uses Tailwind's built-in font-mono / font-sans stacks so it renders
  correctly with no setup. For the real site, drop this in your <head>:
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  and swap font-mono/font-sans usages below for a Tailwind config with:
    fontFamily: { mono: ['"IBM Plex Mono"', 'monospace'], sans: ['"IBM Plex Sans"', 'sans-serif'] }
*/

// ---------- Tier styling (severity-style coding, not decorative) ----------
const TIER_STYLES = {
  Foundational: { text: "text-sky-400", bg: "bg-sky-400/10", ring: "ring-sky-400/30" },
  Applied: { text: "text-amber-400", bg: "bg-amber-400/10", ring: "ring-amber-400/30" },
  Advanced: { text: "text-orange-400", bg: "bg-orange-400/10", ring: "ring-orange-400/30" },
};

// ---------- Data ----------
const PROJECTS = [
  {
    caseId: "DET-24-001",
    tier: "Advanced",
    tactic: "Defense Evasion / Persistence",
    icon: Terminal,
    title: "Detection Engineering & Windows Kernel Telemetry",
    bullets: [
      "Authored custom KQL detection rules in a simulated Elastic (ELK) SIEM to surface anomalous process-creation events, cutting manual log-triage effort.",
      "Instrumented Windows Kernel Telemetry (ETW) to capture low-level process/thread activity, mapping behaviors to MITRE ATT&CK techniques for persistence and defense evasion.",
      "Tuned Windows audit policies and built saved KQL searches aligned to standard logging baselines to close event-visibility gaps.",
    ],
    tags: ["ELK / Elastic Stack", "KQL", "Windows Event Logs", "ETW", "MITRE ATT&CK"],
    writeup: {
      objective:
        "Stand up detection coverage for kernel-level persistence and defense-evasion techniques using ETW telemetry piped into an ELK SIEM.",
      method: [
        "Deployed an ELK stack and forwarded Windows Event Logs + ETW providers for process, thread, and image-load events.",
        "Authored KQL queries to flag parent/child process anomalies, unsigned image loads, and registry-run-key modifications.",
        "Validated each rule against a benign baseline capture and a technique-simulation run to check for false positives.",
      ],
      findings:
        "Reduced noisy default alerting into a small set of high-signal KQL rules, each mapped to a specific ATT&CK technique ID for traceability.",
    },
  },
  {
    caseId: "DFIR-24-002",
    tier: "Advanced",
    tactic: "Execution / Defense Evasion",
    icon: FileSearch,
    title: "DFIR & Memory Forensics Lab",
    bullets: [
      "Conducted memory triage on captured images with Volatility (pslist, pstree, malfind, netscan) to identify injected processes and hidden network connections.",
      "Reconstructed an incident timeline using a structured incident-handling workflow, correlating memory artifacts with persistence indicators.",
      "Documented findings and IOCs as a structured case file, tagging each behavior with its MITRE ATT&CK technique ID.",
    ],
    tags: ["Volatility", "Memory Forensics", "DFIR", "Incident Handling", "IOC Analysis"],
    writeup: {
      objective: "Triage a memory image from a suspected-compromised host and reconstruct what happened, in order.",
      method: [
        "Ran pslist/pstree to establish the process tree and spot orphaned or unexpected parent processes.",
        "Used malfind to flag injected code regions and netscan to surface active/hidden network connections.",
        "Cross-referenced findings against the incident-handling workflow (identification → containment → eradication → lessons learned).",
      ],
      findings:
        "Identified a process-injection chain and mapped each stage to ATT&CK technique IDs, producing a case file suitable for handoff.",
    },
  },
  {
    caseId: "IDS-24-003",
    tier: "Applied",
    tactic: "Reconnaissance",
    icon: Radar,
    title: "Network Defense & IDS Optimization",
    bullets: [
      "Ran service discovery with Nmap and deep packet inspection in Wireshark across TCP/UDP/DNS/HTTP traffic to baseline normal network behavior.",
      "Authored and tuned custom Snort IDS rules to flag scanning and exploitation attempts, validating detections against live capture data.",
      "Mapped detected traffic patterns to the Cyber Kill Chain to prioritize alerting on early-stage reconnaissance.",
    ],
    tags: ["Nmap", "Wireshark", "Snort IDS", "Cyber Kill Chain", "Traffic Analysis"],
    writeup: {
      objective: "Build a baseline of normal traffic, then tune IDS rules that catch recon without drowning in noise.",
      method: [
        "Captured baseline traffic in Wireshark and profiled expected DNS/HTTP behavior.",
        "Wrote Snort rules targeting common scan signatures (SYN sweeps, service fingerprinting patterns).",
        "Replayed Nmap scans against the sensor to confirm detection and tune thresholds against false positives.",
      ],
      findings:
        "Custom rules caught scan activity the default ruleset missed, with alerts prioritized by Kill Chain stage.",
    },
  },
  {
    caseId: "OFF-24-004",
    tier: "Applied",
    tactic: "Initial Access / Execution",
    icon: Crosshair,
    title: "Offensive Security & Exploit Fundamentals",
    bullets: [
      "Exploited common network services and executed stack-based buffer overflow attacks in a controlled HackTheBox environment, delivering payloads via Metasploit.",
      "Practiced pivoting and port-forwarding to move laterally across segmented lab networks post-exploitation.",
      "Fed offensive findings back into detection logic, closing the loop between attack technique and defensive visibility.",
    ],
    tags: ["Metasploit", "Buffer Overflows", "Port Forwarding", "HackTheBox", "Exploitation"],
    writeup: {
      objective: "Work through exploitation fundamentals hands-on to understand what defenders are actually detecting.",
      method: [
        "Enumerated exposed services and identified a vulnerable target in a HackTheBox lab network.",
        "Built and delivered a payload via Metasploit, then confirmed shell access.",
        "Pivoted through the compromised host to reach a second, segmented subnet using port-forwarding.",
      ],
      findings:
        "Translated each offensive step into a corresponding detection opportunity (e.g., process creation, outbound port anomalies).",
    },
  },
  {
    caseId: "ML-24-005",
    tier: "Advanced",
    tactic: "Detection (cross-cutting)",
    icon: BrainCircuit,
    title: "Applied ML for Threat & Anomaly Classification",
    bullets: [
      "Built and trained ML models on custom network and log datasets to classify anomalous behavior and known malware signatures.",
      "Engineered features from raw traffic and log data to improve classification accuracy for detection use cases.",
      "Evaluated model output against labeled IOC data to measure detection precision and reduce false-positive alerting.",
    ],
    tags: ["Python", "Machine Learning", "Anomaly Detection", "SQL", "Threat Classification"],
    writeup: {
      objective: "Test whether a lightweight ML classifier can flag anomalous log/traffic behavior more precisely than static rules.",
      method: [
        "Assembled and labeled a custom dataset of normal vs. anomalous log/traffic samples.",
        "Engineered features (frequency, entropy, timing) and trained a classification model in Python.",
        "Scored the model against held-out labeled IOC data and compared precision/recall to rule-based detection.",
      ],
      findings: "Model-based scoring surfaced a class of low-and-slow anomalies that static thresholds missed.",
    },
  },
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
    repoUrl: "https://github.com/Mr-Fool008/lazarus-apt38-case-study",
  },
];


const SKILL_GROUPS = [
  {
    label: "Defensive & SOC",
    icon: Shield,
    items: ["Elastic Stack (ELK)", "KQL", "Snort IDS", "Wireshark", "Volatility", "Windows Event Logs", "ETW / Kernel Telemetry"],
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

// ---------- Shared bits ----------
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
      <div
        className="w-full max-w-2xl rounded-lg border border-[#24313D] bg-[#121821] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
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
            <span className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-mono text-[#7C8B99] ring-1 ring-[#24313D]">
              TACTIC: {project.tactic.toUpperCase()}
            </span>
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
              <span key={t} className="rounded bg-[#182029] px-2 py-1 font-mono text-[11px] text-[#9FB0BD] ring-1 ring-[#24313D]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-[#24313D] pt-4">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#00D9B5]/10 px-3 py-1.5 font-mono text-xs text-[#00D9B5] ring-1 ring-[#00D9B5]/30 transition hover:bg-[#00D9B5]/20"
              >
                <Github className="h-3.5 w-3.5" /> View Case Study
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md bg-[#182029] px-3 py-1.5 font-mono text-xs text-[#5A6B78] ring-1 ring-[#24313D]"
                >
                  <Github className="h-3.5 w-3.5" /> Repo coming soon
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;
  return (
    <button
      onClick={() => onOpen(project)}
      className="group flex w-full flex-col rounded-lg border border-[#24313D] bg-[#121821] p-5 text-left transition hover:border-[#00D9B5]/40 hover:bg-[#141C26] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9B5]"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#00D9B5]" strokeWidth={1.75} />
          <span className="font-mono text-xs text-[#7C8B99]">CASE {project.caseId}</span>
        </div>
        <TierBadge tier={project.tier} />
      </div>

      <h3 className="mb-2 font-mono text-[15px] font-semibold leading-snug text-[#E4EAEF]">{project.title}</h3>
      <p className="mb-3 font-mono text-[11px] text-[#7C8B99]">TACTIC: {project.tactic}</p>

      <ul className="mb-4 space-y-1.5">
        {project.bullets.slice(0, 2).map((b, i) => (
          <li key={i} className="text-[13px] leading-relaxed text-[#9FB0BD]">
            <span className="text-[#00D9B5]">›</span> {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[#24313D] pt-3">
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="rounded bg-[#182029] px-1.5 py-0.5 font-mono text-[10px] text-[#7C8B99] ring-1 ring-[#24313D]">
            {t}
          </span>
        ))}
      </div>

      <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-[#00D9B5] opacity-0 transition group-hover:opacity-100">
        Open case file <ExternalLink className="h-3 w-3" />
      </span>
    </button>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState(null);
  return (
    <section id="projects" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// case_files</p>
          <h2 className="mt-1 font-mono text-2xl font-semibold text-[#E4EAEF]">Projects & Lab Work</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#7C8B99]">
            Hands-on labs from CIS4622 and HackTheBox, logged like SOC tickets. Each case includes the technique
            mapping, method, and findings — click a card to open the full write-up.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.caseId} project={p} onOpen={setActive} />
          ))}
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
            <div className="rounded-md bg-[#182029] p-2.5 ring-1 ring-[#24313D]">
              <GraduationCap className="h-5 w-5 text-[#00D9B5]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-mono text-base font-semibold text-[#E4EAEF]">
                B.S. Computer & Information Systems Security
              </h3>
              <p className="text-sm text-[#9FB0BD]">University of South Florida — Tampa, FL</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded bg-[#182029] px-2 py-0.5 font-mono text-[11px] text-[#9FB0BD] ring-1 ring-[#24313D]">
                  Green & Gold Directors Scholar
                </span>
                <span className="rounded bg-[#182029] px-2 py-0.5 font-mono text-[11px] text-[#9FB0BD] ring-1 ring-[#24313D]">
                  Dean's List
                </span>
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
              <div>
                <p className="font-mono text-sm font-medium text-[#E4EAEF]">{it.title}</p>
                <p className="text-xs text-[#7C8B99]">{it.detail}</p>
              </div>
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
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#00D9B5]" strokeWidth={1.75} />
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-[#E4EAEF]">{g.label}</h3>
                </div>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-[13px] text-[#9FB0BD]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Optional — compact, non-technical work experience entry
export function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#0B0F14] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#00D9B5]">// experience</p>
        <h2 className="mt-1 mb-8 font-mono text-2xl font-semibold text-[#E4EAEF]">Experience</h2>

        <div className="flex flex-col gap-2 rounded-lg border border-[#24313D] bg-[#121821] p-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-mono text-sm font-semibold text-[#E4EAEF]">Student AV Technician</h3>
            <p className="text-xs text-[#7C8B99]">University of South Florida</p>
          </div>
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
