import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/store/AppStore";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Claude Code Academy | SparkTech",
  description: "למד Claude Code מאפס - פלטפורמת למידה אינטראקטיבית מבית SparkTech",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
