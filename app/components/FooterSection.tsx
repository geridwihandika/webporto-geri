"use client";

import CatCanvas from "./CatCanvas";
import { useLanguage } from "../context/LanguageContext";

export default function FooterSection() {
  const { lang } = useLanguage();

  return (
    <footer className="container-portfolio py-24 md:py-32 border-t border-border">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-16 max-w-4xl text-foreground">
        Let&apos;s build resilient systems &amp; scale together.
      </h2>

      <div className="flex flex-wrap gap-8 font-mono text-sm md:text-base">
        <a
          href="mailto:geridwihandika02@gmail.com"
          className="font-medium underline underline-offset-8 hover:text-muted-foreground transition-colors"
        >
          geridwihandika02@gmail.com
        </a>

        <a
          href="https://www.linkedin.com/in/geri-dwi-handika/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-8 hover:text-muted-foreground transition-colors"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/geridwihandika"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-8 hover:text-muted-foreground transition-colors"
        >
          GitHub
        </a>

        <a
          href="https://wa.me/6281373903294"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-8 hover:text-muted-foreground transition-colors"
        >
          WhatsApp (+62 813-7390-3294)
        </a>
      </div>

      {/* Easter Egg: Interactive Cat Game */}
      <div className="mt-24 border-t border-border pt-12 text-center">
        <p className="text-sm md:text-base text-muted-foreground mb-4 font-mono">
          {lang === "id"
            ? "Belum siap mendiskusikan project? Bantu kucing saya menghindari production bug terlebih dahulu."
            : "If you're not ready to talk business yet, at least help my cat dodge production bugs."}
        </p>

        <CatCanvas />

        <div className="mt-8 flex justify-between items-center text-xs font-mono text-muted-foreground">
          <span>&copy; 2026 Geri Dwi Handika</span>
          <span>JAKARTA &bull; INDONESIA</span>
        </div>
      </div>
    </footer>
  );
}
