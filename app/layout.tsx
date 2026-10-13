import type { Metadata } from "next";
import "./globals.css";
import "./v2.css";

export const metadata: Metadata = {
  title: "AI CORE 艾構 — Design with clarity. Build with purpose.",
  description: "艾構 AI CORE — 獨立數位設計與開發工作室。網站設計、UI/UX 與客製化數位工具。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
