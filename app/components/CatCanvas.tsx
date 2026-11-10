"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  passed: boolean;
}

// 16-step upbeat classic arcade chiptune melody (frequencies in Hz)
const MELODY_STEPS = [
  329.63, 0, 392.0, 440.0, 523.25, 0, 493.88, 392.0,
  293.66, 0, 349.23, 440.0, 493.88, 0, 392.0, 329.63,
  329.63, 392.0, 523.25, 0, 587.33, 523.25, 493.88, 392.0,
  440.0, 0, 392.0, 349.23, 329.63, 293.66, 261.63, 293.66,
];

const BASS_STEPS = [
  130.81, 130.81, 164.81, 164.81, 196.0, 196.0, 164.81, 130.81,
  146.83, 146.83, 174.61, 174.61, 196.0, 196.0, 146.83, 130.81,
  164.81, 164.81, 196.0, 196.0, 220.0, 220.0, 196.0, 164.81,
  174.61, 174.61, 196.0, 196.0, 164.81, 146.83, 130.81, 146.83,
];

export default function CatCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmTimerRef = useRef<number | null>(null);
  const bgmStepRef = useRef(0);
  const masterFilterRef = useRef<BiquadFilterNode | null>(null);

  const playerRef = useRef({
    x: 60,
    y: 110,
    width: 44,
    height: 24,
    dy: 0,
    grounded: true,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const frameCountRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  const gravity = 0.55;
  const jumpForce = -9.5;
  const speed = 4.5;
  const spawnInterval = 90;

  // Initialize or resume AudioContext
  const getAudioContext = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      if (!masterFilterRef.current) {
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(3200, ctx.currentTime);
        filter.connect(ctx.destination);
        masterFilterRef.current = filter;
      }
      return ctx;
    } catch {
      return null;
    }
  }, []);

  // Jump Sound: Classic arcade bouncy upward pitch chirp
  const playJumpSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pleasant square-sine hybrid for punchy 8-bit jump
    osc.type = "triangle";
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.13);

    // Punchy audible volume envelope
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }, [soundEnabled, getAudioContext]);

  // Score Sound: Clean double coin chime
  const playScoreSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.05); // E6

    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.13);
  }, [soundEnabled, getAudioContext]);

  // Game Over Sound: Retro crashing slide
  const playGameOverSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.4);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }, [soundEnabled, getAudioContext]);

  // Stop BGM timer
  const stopBgm = useCallback(() => {
    if (bgmTimerRef.current !== null) {
      clearInterval(bgmTimerRef.current);
      bgmTimerRef.current = null;
    }
  }, []);

  // Start lively 8-bit Background Music loop
  const startBgm = useCallback(() => {
    stopBgm();
    const ctx = getAudioContext();
    if (!ctx) return;

    // Force resume immediately
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    bgmStepRef.current = 0;

    // 120ms tempo per 16th note (~125 BPM)
    bgmTimerRef.current = window.setInterval(() => {
      if (!soundEnabled) return;
      const c = getAudioContext();
      if (!c || c.state !== "running") return;

      const now = c.currentTime;
      const step = bgmStepRef.current % MELODY_STEPS.length;
      bgmStepRef.current++;

      const melFreq = MELODY_STEPS[step];
      const bassFreq = BASS_STEPS[step];

      // 1. Lead Melody Note (classic pulse / square feel)
      if (melFreq > 0) {
        const leadOsc = c.createOscillator();
        const leadGain = c.createGain();

        leadOsc.type = "square";
        leadOsc.frequency.setValueAtTime(melFreq, now);

        // Audible, snappy retro envelope
        leadGain.gain.setValueAtTime(0.035, now);
        leadGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);

        leadOsc.connect(leadGain);
        if (masterFilterRef.current) {
          leadGain.connect(masterFilterRef.current);
        } else {
          leadGain.connect(c.destination);
        }

        leadOsc.start(now);
        leadOsc.stop(now + 0.1);
      }

      // 2. Punchy Bassline Pulse
      if (bassFreq > 0 && step % 2 === 0) {
        const bassOsc = c.createOscillator();
        const bassGain = c.createGain();

        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(0.055, now);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        bassOsc.connect(bassGain);
        bassGain.connect(c.destination);

        bassOsc.start(now);
        bassOsc.stop(now + 0.18);
      }

      // 3. Crisp Hi-hat / Percussion Click on upbeat steps
      if (step % 4 === 2) {
        const clickOsc = c.createOscillator();
        const clickGain = c.createGain();

        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(1400, now);
        clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.025);

        clickGain.gain.setValueAtTime(0.025, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        clickOsc.connect(clickGain);
        clickGain.connect(c.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.035);
      }
    }, 120);
  }, [soundEnabled, getAudioContext, stopBgm]);

  useEffect(() => {
    const saved = localStorage.getItem("cat_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
    return () => stopBgm();
  }, [stopBgm]);

  const resetGame = useCallback(() => {
    // Explicitly activate AudioContext during this user event
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const canvas = canvasRef.current;
    const height = canvas ? canvas.height : 150;
    playerRef.current = {
      x: 60,
      y: height - 10 - 24,
      width: 44,
      height: 24,
      dy: 0,
      grounded: true,
    };
    obstaclesRef.current = [];
    frameCountRef.current = 0;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    startBgm();
  }, [startBgm, getAudioContext]);

  const jump = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    if (playerRef.current.grounded) {
      playerRef.current.dy = jumpForce;
      playerRef.current.grounded = false;
      playJumpSound();
    }
  }, [jumpForce, playJumpSound, getAudioContext]);

  const handleAction = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    if (!isPlaying || gameOver) {
      resetGame();
    } else {
      jump();
    }
  }, [isPlaying, gameOver, resetGame, jump, getAudioContext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleAction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 150;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = isDark ? "#fafafa" : "#09090b";
      const groundColor = isDark ? "#27272a" : "#e4e4e7";
      const obstacleColor = isDark ? "#71717a" : "#52525b";
      const eyeColor = isDark ? "#09090b" : "#ffffff";

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Ground line
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 10);
      ctx.lineTo(canvas.width, canvas.height - 10);
      ctx.strokeStyle = groundColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isPlaying && !gameOver) {
        // Physics
        playerRef.current.dy += gravity;
        playerRef.current.y += playerRef.current.dy;

        const floorY = canvas.height - 10 - playerRef.current.height;
        if (playerRef.current.y >= floorY) {
          playerRef.current.y = floorY;
          playerRef.current.dy = 0;
          playerRef.current.grounded = true;
        } else {
          playerRef.current.grounded = false;
        }

        // Spawn obstacles
        if (frameCountRef.current % spawnInterval === 0) {
          const obsH = 20 + Math.random() * 22;
          obstaclesRef.current.push({
            x: canvas.width,
            y: canvas.height - 10 - obsH,
            width: 18,
            height: obsH,
            passed: false,
          });
        }

        // Update obstacles & collision
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
          const obs = obstaclesRef.current[i];
          obs.x -= speed;

          // Collision check
          const p = playerRef.current;
          if (
            p.x < obs.x + obs.width &&
            p.x + p.width > obs.x &&
            p.y < obs.y + obs.height &&
            p.y + p.height > obs.y
          ) {
            setGameOver(true);
            setIsPlaying(false);
            stopBgm();
            playGameOverSound();
            setHighScore((prev) => {
              const newHigh = Math.max(prev, score);
              try {
                localStorage.setItem("cat_highscore", newHigh.toString());
              } catch {}
              return newHigh;
            });
            break;
          }

          // Score check
          if (!obs.passed && obs.x + obs.width < p.x) {
            obs.passed = true;
            setScore((s) => s + 1);
            playScoreSound();
          }

          // Remove offscreen
          if (obs.x + obs.width < 0) {
            obstaclesRef.current.splice(i, 1);
          }
        }

        frameCountRef.current++;
      }

      // Draw Obstacles (represented as server bug glitches)
      obstaclesRef.current.forEach((obs) => {
        ctx.fillStyle = obstacleColor;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        // Little indicator dot on top of obstacle
        ctx.fillStyle = isDark ? "#ef4444" : "#dc2626";
        ctx.fillRect(obs.x + obs.width / 2 - 2, obs.y + 3, 4, 4);
      });

      // Draw Cat
      const { x: cx, y: cy } = playerRef.current;
      ctx.fillStyle = primaryColor;

      // Cat Body (rounded ellipse)
      ctx.beginPath();
      ctx.ellipse(cx + 22, cy + 14, 18, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cat Head
      ctx.beginPath();
      ctx.arc(cx + 36, cy + 6, 9, 0, Math.PI * 2);
      ctx.fill();

      // Cat Ears
      ctx.beginPath();
      ctx.moveTo(cx + 30, cy - 1);
      ctx.lineTo(cx + 33, cy - 8);
      ctx.lineTo(cx + 36, cy);
      ctx.moveTo(cx + 36, cy);
      ctx.lineTo(cx + 39, cy - 8);
      ctx.lineTo(cx + 42, cy - 1);
      ctx.fill();

      // Eye
      ctx.fillStyle = eyeColor;
      ctx.beginPath();
      ctx.arc(cx + 38, cy + 5, 2, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx + 5, cy + 12);
      const tailWiggle =
        isPlaying && !playerRef.current.grounded
          ? -12
          : Math.sin(frameCountRef.current * 0.15) * 6;
      ctx.quadraticCurveTo(cx - 4, cy + 4 + tailWiggle, cx - 8, cy + tailWiggle);
      ctx.stroke();

      // Paws / Legs
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const legOffset =
        isPlaying && playerRef.current.grounded
          ? Math.sin(frameCountRef.current * 0.3) * 4
          : 0;
      ctx.moveTo(cx + 12, cy + 22);
      ctx.lineTo(cx + 12 + legOffset, cy + 26);
      ctx.moveTo(cx + 18, cy + 22);
      ctx.lineTo(cx + 18 - legOffset, cy + 26);
      ctx.moveTo(cx + 28, cy + 22);
      ctx.lineTo(cx + 28 + legOffset, cy + 26);
      ctx.moveTo(cx + 34, cy + 22);
      ctx.lineTo(cx + 34 - legOffset, cy + 26);
      ctx.stroke();

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, gameOver, score, playScoreSound, playGameOverSound, stopBgm]);

  return (
    <div
      onClick={handleAction}
      className="w-full select-none overflow-hidden relative cursor-pointer border border-border bg-card/40 p-4 rounded-sm transition-colors hover:border-foreground/30"
    >
      <div className="flex justify-between items-center w-full px-2 mb-2 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>SCORE: {score.toString().padStart(3, "0")}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (!next) {
                stopBgm();
              } else if (isPlaying && !gameOver) {
                startBgm();
              }
            }}
            title={soundEnabled ? "Mute Game Audio" : "Unmute Game Audio"}
            className="flex items-center gap-1.5 text-[10px] uppercase font-mono px-2 py-0.5 border border-foreground/20 hover:border-foreground rounded-xs transition-colors pointer-events-auto bg-background/80 hover:bg-foreground hover:text-background text-foreground cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3 h-3 text-emerald-500" />
                <span>MUSIC &amp; SFX ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 opacity-50" />
                <span className="opacity-50">MUTED</span>
              </>
            )}
          </button>
        </div>

        <span className="text-[10px] uppercase tracking-wider text-center pointer-events-none hidden sm:inline">
          {!isPlaying &&
            !gameOver &&
            (lang === "id"
              ? "SPACEBAR / TAP UNTUK MULAI LOMPAT"
              : "SPACEBAR / TAP TO START JUMPING")}
          {isPlaying &&
            !gameOver &&
            (lang === "id"
              ? "HINDARI PRODUCTION BUG"
              : "AVOID THE INCIDENT BUGS")}
          {gameOver &&
            (lang === "id"
              ? "TERKENA BUG! TAP UNTUK COBA LAGI"
              : "INCIDENT HIT! TAP TO RETRY")}
        </span>

        <span>HI: {highScore.toString().padStart(3, "0")}</span>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full cursor-pointer touch-action-none block outline-none"
        height={150}
      />
    </div>
  );
}
