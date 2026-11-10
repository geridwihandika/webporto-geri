import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geri Dwi Handika — Production Engineer & Web3 Security Researcher",
  description:
    "Production Engineer at PT Finnet Indonesia (Telkom Group) & Web3 Security Researcher. Engineering high-availability mission-critical systems, end-to-end incident troubleshooting, and on-chain protocol architecture.",
  keywords: [
    "Geri Dwi Handika",
    "Production Engineer",
    "Finnet Indonesia",
    "Telkom Group",
    "Web3 Security",
    "Smart Contract Audit",
    "Ditjen Imigrasi",
    "Next.js Developer",
  ],
  authors: [{ name: "Geri Dwi Handika", url: "https://linkedin.com/in/geri-dwi-handika/" }],
  openGraph: {
    title: "Geri Dwi Handika — Production Engineer & Web3 Security Researcher",
    description:
      "Engineering high-availability mission-critical systems and Web3 automation. Ditjen Imigrasi production operations, BNI Metaverse, and blockchain node infrastructure.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
