import React from "react";
import { Github, ArrowRight, ShieldCheck } from "lucide-react";
import {
  ProjectsSection,
  SkillsSection,
  EducationSection,
  ExperienceSection,
  AchievementsSection,
} from "./PortfolioSections.jsx";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold text-ink">
          Aryan Khadka<span className="text-signal">_</span>
        </a>
        <nav className="hidden gap-6 sm:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wide text-muted transition hover:text-signal"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="border-b border-hairline bg-void px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded border border-[#24313D] bg-[#121821] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#9FB0BD]">
            <ShieldCheck className="h-3.5 w-3.5 text-signal" />
            Cybersecurity Portfolio
          </div>

          <h1 className="font-mono text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Building practical security skills through hands-on labs, detection engineering, and network defense.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9FB0BD] sm:text-lg">
            I’m Aryan Khadka, a cybersecurity student focused on defensive security, network security, and cloud security. This portfolio documents projects I have built, tested, troubleshot, and supported with public technical evidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2.5 font-mono text-xs font-semibold text-[#07100E] transition hover:opacity-90"
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Mr-Fool008"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#24313D] bg-[#121821] px-4 py-2.5 font-mono text-xs text-[#C9D3DB] transition hover:border-signal/40 hover:text-signal"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-[#24313D] bg-[#121821] p-3">
              <p className="font-mono text-xs text-signal">FOCUS</p>
              <p className="mt-1 text-sm text-[#C9D3DB]">Blue Team & Network Defense</p>
            </div>
            <div className="rounded-md border border-[#24313D] bg-[#121821] p-3">
              <p className="font-mono text-xs text-signal">WORKFLOW</p>
              <p className="mt-1 text-sm text-[#C9D3DB]">Build → Test → Detect → Document</p>
            </div>
            <div className="rounded-md border border-[#24313D] bg-[#121821] p-3">
              <p className="font-mono text-xs text-signal">EVIDENCE</p>
              <p className="mt-1 text-sm text-[#C9D3DB]">GitHub Repos & Lab Write-ups</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-void px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">Aryan Khadka — Cybersecurity Portfolio</p>
        <a
          href="https://github.com/Mr-Fool008"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-signal"
        >
          <Github className="h-3.5 w-3.5" />
          github.com/Mr-Fool008
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-void font-sans">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectsSection />
        <div className="h-px bg-hairline" />
        <SkillsSection />
        <div className="h-px bg-hairline" />
        <EducationSection />
        <div className="h-px bg-hairline" />
        <ExperienceSection />
        <div className="h-px bg-hairline" />
        <AchievementsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
