"use client";

import { useEffect, useState, useRef } from "react";

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Click sound listener across page when sound is enabled
    const handleClick = () => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch {
        // audio context blocked or unavailable
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [soundEnabled]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);

    if (nextState) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Ambient low frequency drone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz subtle sub drone
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        ambientOscRef.current = osc;
        ambientGainRef.current = gain;
      } catch {
        // audio context blocked
      }
    } else {
      if (ambientGainRef.current && audioCtxRef.current) {
        try {
          ambientGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
          setTimeout(() => {
            ambientOscRef.current?.stop();
            ambientOscRef.current?.disconnect();
            ambientOscRef.current = null;
          }, 350);
        } catch {
          ambientOscRef.current?.stop();
          ambientOscRef.current = null;
        }
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={soundEnabled ? "Mute sound" : "Enable sound"}
      className="fixed bottom-8 right-8 z-40 font-mono text-xs uppercase tracking-widest transition-all duration-300 text-foreground/75 hover:text-foreground active:scale-95 bg-background/80 backdrop-blur-sm px-3.5 py-1.5 border border-foreground/10 rounded-full shadow-sm"
    >
      [ SOUND // {soundEnabled ? "ON" : "OFF"} ]
    </button>
  );
}
