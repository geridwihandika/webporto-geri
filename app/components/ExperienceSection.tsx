"use client";

import { ArrowUpRight } from "lucide-react";
import ScrambleText from "./ScrambleText";
import { useLanguage } from "../context/LanguageContext";

interface ExperienceItem {
  id: string;
  company: string;
  role: {
    id: string;
    en: string;
  };
  period: {
    id: string;
    en: string;
  };
  location: string;
  type: "Enterprise" | "Web3" | "Developer";
  description: {
    id: string;
    en: string;
  };
  link: string;
  highlights: {
    id: string[];
    en: string[];
  };
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "01",
    company: "PT Finnet Indonesia (Telkom Group)",
    role: {
      id: "Engineer on Site",
      en: "Engineer on Site",
    },
    period: {
      id: "2025 — Sekarang",
      en: "2025 — Present",
    },
    location: "Jakarta, Indonesia",
    type: "Enterprise",
    description: {
      id: "Menangani operasional & dukungan teknis misi kritis layanan Direktorat Jenderal Imigrasi (eVisa, M-Paspor, dan MPN).",
      en: "Managing 24/7 technical operations and mission-critical support for the Directorate General of Immigration (eVisa, M-Paspor, and MPN state revenue payment systems).",
    },
    highlights: {
      id: [
        "Menangani 20-30 tiket insiden dan permohonan layanan per hari dengan kepatuhan SLA ketat.",
        "Troubleshooting end-to-end pada service gateway, REST API, database SQL, dan log sistem.",
        "Monitoring performa server produksi Linux dan mitigasi gangguan ketersediaan layanan.",
        "Koordinasi eskalasi insiden bersama Ditjen Imigrasi, vendor pihak ketiga, dan tim internal.",
      ],
      en: [
        "Resolving 20-30 incident tickets and service requests daily under strict SLA compliance.",
        "End-to-end troubleshooting across service gateways, REST APIs, SQL databases, and system logs.",
        "Monitoring Linux production server performance and mitigating high-availability risks.",
        "Coordinating incident escalations with immigration officials, third-party vendors, and internal teams.",
      ],
    },
    link: "https://www.finpay.id/",
  },
  {
    id: "02",
    company: "WINSNIP Community",
    role: {
      id: "Account & Community Management",
      en: "Account & Community Management",
    },
    period: {
      id: "2024 — 2026",
      en: "2024 — 2026",
    },
    location: "Remote",
    type: "Web3",
    description: {
      id: "Mengelola komunikasi, pertumbuhan engagement, dan edukasi komunitas Web3 & ekosistem cryptocurrency.",
      en: "Managing communication, community growth, and technical education across Web3 & cryptocurrency ecosystems.",
    },
    highlights: {
      id: [
        "Menyampaikan alpha research, analisis protokol blockchain, dan verifikasi campaign airdrop.",
        "Menangani user inquiry, troubleshooting interaksi on-chain, dan menjaga trust member komunitas.",
        "Mengorganisir kampanye engagement dan event komunitas berskala ribuan member aktif.",
      ],
      en: [
        "Delivering alpha protocol research, blockchain analytics, and airdrop campaign verification.",
        "Handling user inquiries, troubleshooting on-chain interactions, and maintaining community trust.",
        "Organizing engagement campaigns and online events for communities of thousands of active members.",
      ],
    },
    link: "https://t.me/winsnip",
  },
  {
    id: "03",
    company: "Blockchain Node Validator",
    role: {
      id: "Validator Operator (Nesa, 0G Labs, Soneium)",
      en: "Validator Operator (Nesa, 0G Labs, Soneium)",
    },
    period: {
      id: "2023 — 2024",
      en: "2023 — 2024",
    },
    location: "Remote / Cloud Ops",
    type: "Developer",
    description: {
      id: "Mengoperasikan validator node untuk testnet & mainnet pada jaringan Layer-1 / Layer-2 AI & Modular.",
      en: "Operating testnet and mainnet validator nodes on Layer-1 and Layer-2 AI & Modular blockchain networks.",
    },
    highlights: {
      id: [
        "Memelihara server Linux high-availability untuk validasi konsensus dan sinkronisasi block.",
        "Monitoring otomatis menggunakan telemetry, alert trigger, dan script bash cronjob.",
        "Analisis log sistem untuk menjamin uptime node 99.9% dan integritas transaksi.",
      ],
      en: [
        "Maintaining high-availability Linux servers for consensus validation and block synchronization.",
        "Automated monitoring workflows utilizing server telemetry, alert triggers, and bash cron scripts.",
        "Performing system log analysis to achieve 99.9% uptime and ensure transaction integrity.",
      ],
    },
    link: "https://0g.ai/",
  },
  {
    id: "04",
    company: "Bank Negara Indonesia (BNI)",
    role: {
      id: "Metaverse Web Developer",
      en: "Metaverse Web Developer",
    },
    period: {
      id: "2022 — 2023",
      en: "2022 — 2023",
    },
    location: "Jakarta, Indonesia",
    type: "Developer",
    description: {
      id: "Mengembangkan antarmuka web interaktif untuk ekosistem platform metaverse Bank BNI.",
      en: "Developed interactive web interfaces for Bank Negara Indonesia's (BNI) metaverse platform ecosystem.",
    },
    highlights: {
      id: [
        "Membangun antarmuka web responsif performa tinggi menggunakan Next.js dan Tailwind CSS.",
        "Integrasi interaksi 3D web dan sinkronisasi state pengguna secara real-time.",
        "Kolaborasi erat dengan desainer UI/UX untuk memastikan fidelitas tinggi dan user experience mulus.",
      ],
      en: [
        "Built high-performance responsive web interfaces leveraging Next.js and Tailwind CSS.",
        "Integrated interactive 3D web elements with real-time user state synchronization.",
        "Collaborated closely with UI/UX designers to guarantee high fidelity and seamless user experience.",
      ],
    },
    link: "https://www.bni.co.id/",
  },
  {
    id: "05",
    company: "Sei Network",
    role: {
      id: "Ambassador Program",
      en: "Ambassador Program",
    },
    period: {
      id: "Apr 2023 — Agu 2023",
      en: "Apr 2023 — Aug 2023",
    },
    location: "Remote / Global",
    type: "Web3",
    description: {
      id: "Mendukung peluncuran dan adopsi Layer-1 blockchain ekosistem Sei Network melalui edukasi teknis.",
      en: "Supported the launch and developer adoption of Sei Network's Layer-1 ecosystem through technical education.",
    },
    highlights: {
      id: [
        "Menyusun dokumentasi dan materi edukasi mengenai arsitektur twin-turbo consensus Sei.",
        "Membantu onboarding developer & user baru ke testnet Sei Network.",
      ],
      en: [
        "Authored documentation and educational materials on Sei's twin-turbo consensus architecture.",
        "Facilitated technical onboarding for developers and users joining the Sei Network testnet.",
      ],
    },
    link: "https://www.sei.io/",
  },
];

export default function ExperienceSection() {
  const { lang } = useLanguage();

  return (
    <section className="container-portfolio section-spacing">
      <div className="section-header mb-12">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          <ScrambleText text={lang === "id" ? "Pengalaman" : "Experience"} />
        </h2>
        <span className="section-number">(02)</span>
      </div>

      {/* Experience List - Directly Visible Without Division */}
      <div className="divide-y divide-border border-b border-border">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="py-8 transition-colors">
            <div className="w-full flex items-start justify-between text-left">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 flex-1">
                <span className="font-mono text-xs text-muted-foreground w-8">
                  {exp.id}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl md:text-2xl font-medium text-foreground">
                      {exp.company}
                    </h3>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border border-foreground/20 hover:border-foreground bg-background hover:bg-foreground hover:text-background transition-all text-foreground rounded-xs shadow-xs"
                      title={lang === "id" ? `Kunjungi ${exp.company}` : `Visit ${exp.company}`}
                    >
                      <span>{lang === "id" ? "Buka Link" : "Visit Link"}</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {exp.role[lang]} &bull; {exp.location}
                  </p>
                </div>
                <div className="font-mono text-xs text-muted-foreground md:text-right">
                  {exp.period[lang]}
                </div>
              </div>
            </div>

            {/* Content (Fully Displayed) */}
            <div className="mt-5 pl-0 md:pl-16 text-sm text-foreground/90 max-w-4xl space-y-3">
              <p className="leading-relaxed text-muted-foreground">
                {exp.description[lang]}
              </p>
              <ul className="space-y-1.5 pt-1">
                {exp.highlights[lang].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-foreground/40 font-mono text-xs mt-0.5">&gt;</span>
                    <span className="leading-normal text-muted-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
