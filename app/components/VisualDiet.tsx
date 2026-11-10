"use client";

import { useState, useRef } from "react";
import ScrambleText from "./ScrambleText";
import { Volume2, VolumeX } from "lucide-react";

interface WatchItem {
  id: string;
  title: string;
  genre: string;
  status: "[ON]" | "[END]";
  image: string;
  chord: number[]; // Frequencies for synth preview
}

const WATCHLIST: WatchItem[] = [
  {
    id: "01",
    title: "Berserk",
    genre: "DARK FANTASY",
    status: "[ON]",
    image: "https://ik.imagekit.io/jma7wkem8/7b64b61c2b59ab3cf35de7ee65fd6b87.jpg",
    chord: [110, 164.81, 220],
  },
  {
    id: "02",
    title: "Attack on Titan",
    genre: "DARK FANTASY",
    status: "[END]",
    image: "https://ik.imagekit.io/jma7wkem8/ef16826f29a5ca88c8421b85f2e6af6b.jpg",
    chord: [130.81, 196.0, 261.63],
  },
  {
    id: "03",
    title: "Cyberpunk: Edgerunners",
    genre: "CYBERPUNK",
    status: "[END]",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    chord: [146.83, 220.0, 293.66],
  },
  {
    id: "04",
    title: "Kimetsu no Yaiba",
    genre: "DARK FANTASY",
    status: "[ON]",
    image: "https://ik.imagekit.io/jma7wkem8/a5a42a7b49234de25a238e6be9f945a4.jpg",
    chord: [164.81, 246.94, 329.63],
  },
  {
    id: "05",
    title: "Steins;Gate",
    genre: "SCI-FI THRILLER",
    status: "[END]",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    chord: [174.61, 261.63, 349.23],
  },
  {
    id: "06",
    title: "Solo Leveling",
    genre: "FANTASY ACTION",
    status: "[ON]",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    chord: [196.0, 293.66, 392.0],
  },
  {
    id: "07",
    title: "One Piece",
    genre: "ADVENTURE",
    status: "[ON]",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    chord: [220.0, 329.63, 440.0],
  },
  {
    id: "08",
    title: "Jujutsu Kaisen",
    genre: "DARK FANTASY",
    status: "[ON]",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    chord: [246.94, 369.99, 493.88],
  },
];

export default function VisualDiet() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playPreviewSound = (chord: number[], id: string) => {
    setActiveItem(id);
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

      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      });
    } catch {
      // Audio context blocked
    }
  };

  return (
    <section className="container-portfolio py-24 border-t border-border">
      <div className="mb-12 flex items-baseline justify-between">
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
          <ScrambleText text="Visual Diet & Radar" />
        </h3>
        <span className="text-muted-foreground font-mono text-sm">
          (04.5) — <span className="uppercase">WATCHLIST</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WATCHLIST.map((item) => (
          <div
            key={item.id}
            onClick={() => playPreviewSound(item.chord, item.id)}
            onMouseEnter={() => playPreviewSound(item.chord, item.id)}
            className="group p-6 border border-border bg-card/30 hover:bg-card hover:border-foreground/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col justify-between aspect-[3/4] relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.85)), url("${item.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            {/* Header */}
            <div className="z-10 relative flex justify-between items-start">
              <div>
                <span className="text-xs font-mono mb-2 block text-white/80 group-hover:text-white">
                  {item.id}
                </span>
                <h4 className="text-xl font-medium leading-tight text-white group-hover:underline underline-offset-4 decoration-1">
                  {item.title}
                </h4>
              </div>
              <div className="text-white/60 group-hover:text-white transition-colors">
                {activeItem === item.id ? (
                  <Volume2 className="w-4 h-4 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="z-10 relative mt-auto pt-8">
              <div className="flex justify-between items-end border-t pt-4 border-white/20 group-hover:border-white/50">
                <span className="text-xs font-mono uppercase tracking-wider text-white/75 group-hover:text-white">
                  {item.genre}
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-white/90">
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
