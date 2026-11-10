"use client";

import ScrambleText from "./ScrambleText";
import { useLanguage } from "../context/LanguageContext";

export default function CapabilitiesSection() {
  const { lang } = useLanguage();

  const skills = [
    "Application & Server Monitoring",
    "End-to-End Troubleshooting",
    "Linux Systems Administration",
    "Log Analysis & RCA",
    "AI Agent & Workflow Automation",
    "Blockchain Node Operations",
    "Web3 Community Management",
  ];

  const tools = [
    "Linux (Ubuntu)",
    "Next.js & React.js",
    "Tailwind CSS",
    "TypeScript & JavaScript",
    "Python & Bash Scripting",
    "Hermes Agent & LLM APIs",
  ];

  const education = [
    {
      institution: "Telkom University",
      degree: {
        id: "D3 Sistem Informasi",
        en: "Associate Degree in Information Systems",
      },
      period: "2020 — 2023",
      note: {
        id: "IPK 3.60 / 4.00 — Lulus dengan Pujian",
        en: "GPA 3.60 / 4.00 — Graduated with Honors",
      },
    },
    {
      institution: "Asia Cyber University",
      degree: {
        id: "S1 Sistem Informasi (PJJ)",
        en: "Bachelor of Information Systems (Online PJJ)",
      },
      period: {
        id: "2026 — Sekarang",
        en: "2026 — Present",
      },
      note: {
        id: "Program PJJ S1 Sistem Informasi",
        en: "Distance Learning Undergraduate Program",
      },
    },
    {
      institution: {
        id: "Bahasa",
        en: "Language",
      },
      degree: {
        id: "Bahasa Indonesia & English",
        en: "Indonesian & English",
      },
      period: "Active",
      note: {
        id: "Indonesia (Native) • English (Intermediate)",
        en: "Indonesian (Native) • English (Intermediate)",
      },
    },
  ];

  return (
    <section className="container-portfolio section-spacing">
      <div className="section-header mb-12">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          <ScrambleText text={lang === "id" ? "Kemampuan" : "Capabilities"} />
        </h2>
        <span className="section-number">(03)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Skills */}
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-6">
            {lang === "id" ? "Kompetensi Utama" : "Core Competencies"}
          </h3>
          <ul className="space-y-3 font-mono text-sm">
            {skills.map((item, idx) => (
              <li
                key={idx}
                className="text-foreground/90 flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <span className="text-muted-foreground/60 text-xs">/</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-6">
            {lang === "id" ? "Teknologi & Stack" : "Tech & Stack"}
          </h3>
          <ul className="space-y-3 font-mono text-sm">
            {tools.map((item, idx) => (
              <li
                key={idx}
                className="text-foreground/90 flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <span className="text-muted-foreground/60 text-xs">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Education & Certs */}
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-6">
            {lang === "id" ? "Pendidikan & Kredensial" : "Education & Credentials"}
          </h3>
          <div className="space-y-6">
            {education.map((item, idx) => (
              <div key={idx} className="border-b border-border/60 pb-4">
                <p className="text-base font-medium text-foreground">
                  {typeof item.institution === "string"
                    ? item.institution
                    : item.institution[lang]}
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  {typeof item.degree === "string"
                    ? item.degree
                    : item.degree[lang]}{" "}
                  &bull;{" "}
                  {typeof item.period === "string"
                    ? item.period
                    : item.period[lang]}
                </p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  {typeof item.note === "string"
                    ? item.note
                    : item.note[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
