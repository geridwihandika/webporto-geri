"use client";

import { ArrowUpRight } from "lucide-react";
import ScrambleText from "./ScrambleText";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section className="container-portfolio py-24 md:py-36 border-b border-foreground/10">
      {/* Top Bar with mono badge & location */}
      <div className="w-full border-t border-foreground pt-4 mb-12 flex justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span>{lang === "id" ? "[ PORTOFOLIO & PROFIL ]" : "[ PORTFOLIO & PROFILE ]"}</span>
        <span>JAKARTA, ID</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Role */}
        <div className="md:col-span-4 flex flex-col gap-8 font-mono text-xs text-muted-foreground">
          <div>
            <span className="text-foreground block font-bold mb-2">
              Role
            </span>
            <div className="space-y-1.5 leading-relaxed">
              <div>WEB DEVELOPER</div>
              <div>SYSTEM ADMINISTRATOR</div>
              <div>WEB3 ANALYST &amp; RESEARCH</div>
              <div>IT OPERATIONS &amp; MONITORING</div>
              <div>AI AGENT &amp; WORKFLOW AUTOMATION</div>
            </div>
          </div>
        </div>

        {/* Right Side: Big Brutalist Name + Bio + Quick Links */}
        <div className="md:col-span-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-10 text-foreground">
            <span className="block hover:translate-x-2 transition-transform">
              <ScrambleText text="Geri" />
            </span>
            <span className="block hover:translate-x-2 transition-transform">
              <ScrambleText text="Dwi" />
            </span>
            <span className="block hover:translate-x-2 transition-transform">
              <ScrambleText text="Handika" />
            </span>
          </h1>

          <div className="w-full border-t border-foreground/20 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
            <div className="md:col-span-5">
              {lang === "id" ? (
                <p className="text-lg md:text-xl font-normal leading-relaxed text-foreground">
                  Berpengalaman di bidang IT dengan fokus pada{" "}
                  <strong className="font-semibold text-foreground">
                    System Administration, Web Development, Web3 Research, dan AI Technology
                  </strong>
                  . Memiliki keterampilan dalam pengelolaan sistem Linux, pengembangan website menggunakan pendekatan Vibe Coding, serta pemanfaatan AI Tools dan AI Agents untuk menciptakan solusi inovatif dan mengotomatisasi workflow. Memiliki kemampuan problem solving yang baik, cepat beradaptasi dengan perkembangan teknologi, serta mampu bekerja secara mandiri maupun berkolaborasi dalam tim.
                </p>
              ) : (
                <p className="text-lg md:text-xl font-normal leading-relaxed text-foreground">
                  Experienced in IT specializing in{" "}
                  <strong className="font-semibold text-foreground">
                    System Administration, Web Development, Web3 Research, and AI Technology
                  </strong>
                  . Proficient in Linux systems administration, modern web engineering with the Vibe Coding approach, and deploying AI Tools &amp; Autonomous Agents to build innovative digital solutions and automate workflows. Strong problem-solving capabilities, quick to adapt to emerging technological trends, and proven track record of delivering results both independently and in collaborative teams.
                </p>
              )}
            </div>

            <div className="md:col-span-3 flex flex-col border-t border-foreground/10 text-sm font-mono divide-y divide-foreground/10">
              <a
                href="https://wa.me/6281373903294"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span>{lang === "id" ? "HUBUNGI SAYA" : "GET IN TOUCH"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/geri-dwi-handika/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://github.com/geridwihandika"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="mailto:geridwihandika02@gmail.com"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span>EMAIL</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
