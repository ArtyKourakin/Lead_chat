import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-ассистент 24/7",
  description: "Лендинг AI-ассистента для заявок, оплаты и встреч.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
