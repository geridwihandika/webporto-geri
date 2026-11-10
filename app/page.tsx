import HeaderControls from "./components/HeaderControls";
import HeroSection from "./components/HeroSection";
import SelectedWorkSection from "./components/SelectedWorkSection";
import ExperienceSection from "./components/ExperienceSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import FooterSection from "./components/FooterSection";
import { LanguageProvider } from "./context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background text-foreground animate-fade-in relative selection:bg-foreground selection:text-background">
        {/* Interactive Controls (Language Switcher ID/EN & Dark/Light Theme) */}
        <HeaderControls />

        {/* Hero Section */}
        <HeroSection />

        {/* 01 // Portofolio */}
        <SelectedWorkSection />

        {/* 02 // Experience */}
        <ExperienceSection />

        {/* 03 // Capabilities */}
        <CapabilitiesSection />

        {/* 04 // Contact & Interactive Cat */}
        <FooterSection />
      </main>
    </LanguageProvider>
  );
}
