"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrambleText from "./ScrambleText";
import { useLanguage } from "../context/LanguageContext";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  stack: string[];
  description: {
    id: string;
    en: string;
  };
  link: string;
  cta: {
    id: string;
    en: string;
  };
  image: string;
  chord: number[]; // Frequencies for piano chords
}

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Gerbera Florist — Editorial Floral Boutique & Gift Shop",
    category: "WEB & E-COMMERCE",
    tag: "NEXT.JS 15 • SUPABASE",
    stack: ["Next.js 15", "React 19", "Tailwind CSS", "Supabase", "Framer Motion"],
    description: {
      id: "Platform e-commerce butik bunga modern dengan fitur interaktif 'Rakit Sesuai Budget' (4-step custom bouquet builder & slider nominal dinamis), estimasi ongkir instan ojol Bandung ke 12 kecamatan, checkout langsung ke WhatsApp dalam 90 detik, serta sinkronisasi stok & katalog realtime via Supabase.",
      en: "Modern editorial floral boutique e-commerce platform featuring an interactive 'Build by Budget' module (4-step custom bouquet builder with dynamic slider), instant courier delivery rate calculation across 12 sub-districts in Bandung, 90-second WhatsApp checkout, and realtime inventory sync with Supabase.",
    },
    link: "https://gerbera-tau.vercel.app/",
    cta: {
      id: "Kunjungi Website",
      en: "Visit Website",
    },
    image: "/gerbera-preview.png",
    chord: [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9 / warm floral
  },
  {
    id: "02",
    title: "Lightrees OS — Real Estate Development Operating System",
    category: "PROPTECH & SAAS",
    tag: "AI FEASIBILITY OS",
    stack: ["Next.js", "TypeScript", "Spatial GIS", "Recharts", "jsPDF", "Make.com"],
    description: {
      id: "Operating system all-in-one untuk developer properti modern. Dilengkapi kalkulator kelayakan proyek otomatis standar SPI/KJPP (Cap Rates, IRR, Cash-on-Cash, NPV), visualisasi Kurva S rencana vs realisasi lapangan, pemetaan spatial GIS comps 2 KM, Smart E-Reception QR pass, dan export instan PDF dossier appraisal.",
      en: "All-in-one operating system for modern real estate developers. Features automated project feasibility engines based on professional appraisal standards (Cap Rates, IRR, Cash-on-Cash, NPV), S-Curve planned vs actual progress tracking, 2 KM spatial GIS comps, Smart E-Reception QR passes, and one-click PDF dossier export.",
    },
    link: "https://lightrees-os.vercel.app/",
    cta: {
      id: "Kunjungi Platform",
      en: "Visit Platform",
    },
    image: "/lightrees-preview.png",
    chord: [293.66, 349.23, 440.0, 523.25, 659.25], // Dm9 / technical precision
  },
  {
    id: "03",
    title: "Property Feasibility & AI Notification",
    category: "AI WORKFLOW AUTOMATION",
    tag: "MAKE.COM PIPELINE",
    stack: ["Make.com", "OpenAI GPT-4", "Webhooks", "Google Sheets", "Telegram Bot"],
    description: {
      id: "Arsitektur otomasi event-driven berbasis Make.com. Menghubungkan trigger Webhook instan dengan LLM OpenAI GPT-4 untuk evaluasi kelayakan properti terstruktur, dual-stage ledger sync ke Google Sheets, parsing JSON otomatis, dan broadcast notifikasi eksekutif langsung ke Telegram Bot seketika saat data masuk.",
      en: "Event-driven workflow automation architecture built on Make.com. Ingests instant Webhook triggers to prompt OpenAI GPT-4 for structured property feasibility analysis, dual-stage ledger sync to Google Sheets, automated JSON parsing, and real-time executive notification dispatch to Telegram Bot upon data arrival.",
    },
    link: "https://eu1.make.com/public/shared-scenario/8M1WRNmtkG2/property-feasibility-report",
    cta: {
      id: "Kunjungi Skenario",
      en: "View Scenario",
    },
    image: "/ai-workflow-automation.png",
    chord: [196.0, 246.94, 293.66, 392.0, 440.0], // Gmaj9 / interconnected flow
  },
];

export default function SelectedWorkSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { lang } = useLanguage();
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize rich, warm acoustic piano chords on hover/interaction
  const playPianoChord = (frequencies: number[], projectId: string) => {
    setActiveProject(projectId);
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Master warm acoustic piano filter (gentle lowpass with sweep)
      const masterFilter = ctx.createBiquadFilter();
      masterFilter.type = "lowpass";
      masterFilter.frequency.setValueAtTime(3400, now);
      masterFilter.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
      masterFilter.connect(ctx.destination);

      frequencies.forEach((freq, idx) => {
        const noteTime = now + idx * 0.032;

        const oscFundamental = ctx.createOscillator();
        const gainFundamental = ctx.createGain();
        oscFundamental.type = "sine";
        oscFundamental.frequency.setValueAtTime(freq, noteTime);

        const oscOvertone = ctx.createOscillator();
        const gainOvertone = ctx.createGain();
        oscOvertone.type = "triangle";
        oscOvertone.frequency.setValueAtTime(freq * 2, noteTime);
        oscOvertone.detune.setValueAtTime(3.5, noteTime);

        gainFundamental.gain.setValueAtTime(0.0001, noteTime);
        gainFundamental.gain.linearRampToValueAtTime(0.045, noteTime + 0.007);
        gainFundamental.gain.exponentialRampToValueAtTime(0.02, noteTime + 0.18);
        gainFundamental.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.35);

        gainOvertone.gain.setValueAtTime(0.0001, noteTime);
        gainOvertone.gain.linearRampToValueAtTime(0.015, noteTime + 0.005);
        gainOvertone.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.55);

        oscFundamental.connect(gainFundamental);
        gainFundamental.connect(masterFilter);

        oscOvertone.connect(gainOvertone);
        gainOvertone.connect(masterFilter);

        oscFundamental.start(noteTime);
        oscFundamental.stop(noteTime + 1.4);
        oscOvertone.start(noteTime);
        oscOvertone.stop(noteTime + 0.6);
      });
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  return (
    <section className="container-portfolio section-spacing">
      <div className="section-header mb-12">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          <ScrambleText text={lang === "id" ? "Portofolio" : "Portfolio"} />
        </h2>
        <span className="section-number">(01)</span>
      </div>

      <div className="grid grid-cols-1 gap-12 md:gap-16">
        {PROJECTS.map((project) => {
          const isSelected = activeProject === project.id;

          return (
            <article
              key={project.id}
              onMouseEnter={() => playPianoChord(project.chord, project.id)}
              onClick={() => playPianoChord(project.chord, project.id)}
              className={`group flex flex-col justify-between border transition-all duration-300 p-5 md:p-8 bg-card/90 backdrop-blur-xs relative ${
                isSelected
                  ? "border-foreground/40 shadow-lg -translate-y-1"
                  : "border-border hover:border-foreground/30 hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              <div>
                {/* Visual Preview */}
                <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden mb-6 md:mb-8 border border-border bg-muted/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 bg-background/95 backdrop-blur-xs px-2.5 py-1 text-[10px] md:text-xs font-mono uppercase tracking-widest text-foreground border border-foreground/10">
                    {project.tag}
                  </div>
                </div>

                {/* Meta Header */}
                <div className="flex items-center justify-between mb-2 text-xs md:text-sm font-mono">
                  <span className="text-muted-foreground">{project.id} //</span>
                  <span className="category-tag">{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-3xl font-medium text-foreground group-hover:text-muted-foreground transition-colors mb-3 md:mb-4 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-4xl">
                  {project.description[lang]}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] md:text-xs font-mono bg-muted px-2.5 py-1 text-muted-foreground border border-border/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 md:pt-6 border-t border-border flex items-center justify-between">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-portfolio w-full sm:w-auto justify-between group-hover:bg-foreground group-hover:text-background transition-colors"
                >
                  <span>{project.cta[lang]}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
