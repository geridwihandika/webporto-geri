"use client";

import ScrambleText from "./ScrambleText";

interface ExplorationItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  items: { label: string; icon: string }[];
  description: string;
}

const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "01",
    category: "SYSTEM / TELEMETRY",
    title: "Incident Triage & MPN Telemetry",
    badge: "MISSION CRITICAL",
    items: [
      { label: "SQL Telemetry", icon: "📊" },
      { label: "Linux Daemon", icon: "🐧" },
      { label: "SLA Watchdog", icon: "⏱️" },
      { label: "Log Parser", icon: "📑" },
    ],
    description:
      "Telemetry scripts dan query SQL diagnostik untuk memonitor 20-30 insiden harian sistem pembayaran MPN & Ditjen Imigrasi.",
  },
  {
    id: "02",
    category: "SECURITY / AUDIT",
    title: "EVM & Attack Surface Scanner",
    badge: "WEB3 AUDIT",
    items: [
      { label: "Reentrancy Scan", icon: "🛡️" },
      { label: "Storage Collision", icon: "🔍" },
      { label: "Oracle TWAP", icon: "⚡" },
      { label: "Access Control", icon: "🔐" },
    ],
    description:
      "Riset kerentanan smart contract, bytecode analysis, dan simulasi skenario attack vector pada protokol DeFi & bridge.",
  },
  {
    id: "03",
    category: "AI ORCHESTRATION",
    title: "Autonomous Agent & LLM Pipeline",
    badge: "HERMES AGENT",
    items: [
      { label: "Subagent Tree", icon: "🤖" },
      { label: "Tool Synthesis", icon: "⚙️" },
      { label: "Dynamic Context", icon: "🧠" },
      { label: "CDP Automation", icon: "🌐" },
    ],
    description:
      "Arsitektur agent AI otonom yang mampu menjalankan riset kode, otomatisasi browser headless, dan pemecahan masalah teknis.",
  },
  {
    id: "04",
    category: "AUTOMATION / BOT",
    title: "N8N & On-Chain Event Pipelines",
    badge: "WORKFLOW",
    items: [
      { label: "Mempool Listener", icon: "🔗" },
      { label: "Telegram Alert", icon: "💬" },
      { label: "Webhook Bridge", icon: "🪝" },
      { label: "Data Snapshot", icon: "💾" },
    ],
    description:
      "Pipeline integrasi multi-step yang menghubungkan notifikasi Telegram bot, verifikasi airdrop on-chain, dan webhook API.",
  },
];

export default function ExplorationsSection() {
  return (
    <section className="container-portfolio section-spacing">
      <div className="section-header mb-12">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          <ScrambleText text="Explorations & Labs" />
        </h2>
        <span className="section-number">(02)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
        {EXPLORATIONS.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* 4-quadrant brutalist mosaic preview */}
            <div className="grid grid-cols-2 gap-1.5 mb-4 border border-border p-1.5 bg-card/50 group-hover:border-foreground/30 transition-colors">
              {item.items.map((sub, idx) => (
                <div
                  key={idx}
                  className="exploration-item aspect-square flex flex-col items-center justify-center p-3 text-center border border-border/40 group-hover:bg-muted/70 transition-colors"
                >
                  <span className="text-2xl mb-1.5 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                    {sub.icon}
                  </span>
                  <span className="font-mono text-[10px] tracking-tight uppercase text-muted-foreground group-hover:text-foreground">
                    {sub.label}
                  </span>
                </div>
              ))}
            </div>

            <span className="category-tag block mb-1">{item.category}</span>
            <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
