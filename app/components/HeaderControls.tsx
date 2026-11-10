"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function HeaderControls() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2">
        <div className="h-11 md:h-12 w-24 rounded-full border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-md" />
        <div className="rounded-full w-11 h-11 md:w-12 md:h-12 border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-md" />
      </div>
    );
  }

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2">
      {/* Language Toggle Button */}
      <button
        onClick={toggleLang}
        title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
        className="h-11 md:h-12 px-3.5 rounded-full flex items-center gap-1.5 border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95 transition-all text-xs font-mono font-medium text-foreground hover:bg-muted cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 opacity-80" />
        <span
          className={
            lang === "id"
              ? "font-bold text-foreground"
              : "text-muted-foreground opacity-60"
          }
        >
          ID
        </span>
        <span className="text-muted-foreground/30 text-[10px]">/</span>
        <span
          className={
            lang === "en"
              ? "font-bold text-foreground"
              : "text-muted-foreground opacity-60"
          }
        >
          EN
        </span>
      </button>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={isDark ? "Light mode" : "Dark mode"}
        className="rounded-full w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95 transition-all text-foreground hover:bg-muted cursor-pointer"
      >
        {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
      </button>
    </div>
  );
}
