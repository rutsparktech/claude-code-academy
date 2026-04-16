import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/store/AppStore";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Claude Code Academy | למד Claude Code מאפס",
  description: "פלטפורמת למידה אינטראקטיבית ללימוד Claude Code",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" data-theme="dark">
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
