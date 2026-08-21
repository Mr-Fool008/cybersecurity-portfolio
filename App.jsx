import React from "react";
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
        <nav className="hidden gap-6 sm:flex">
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

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-void font-sans">
      <SiteHeader />
      <ProjectsSection />
      <div className="h-px bg-hairline" />
      <SkillsSection />
      <div className="h-px bg-hairline" />
      <EducationSection />
      <div className="h-px bg-hairline" />
      <ExperienceSection />
      <div className="h-px bg-hairline" />
      <AchievementsSection />
    </div>
  );
}
