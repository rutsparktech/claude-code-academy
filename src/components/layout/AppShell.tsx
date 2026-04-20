"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, useUserProgress } from "@/store/AppStore";

const NAV_ITEMS = [
  { href: "/", icon: "🏠", label: "בית" },
  { href: "/lessons", icon: "📚", label: "שיעורים" },
  { href: "/terminal", icon: "⌨️", label: "טרמינל" },
  { href: "/git", icon: "🌿", label: "Git Visualizer" },
  { href: "/challenges", icon: "🏆", label: "אתגרים" },
  { href: "/journal", icon: "📓", label: "יומן" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { state, dispatch } = useApp();
  const progress = useUserProgress();
  const pathname = usePathname();
  const xpInLevel = progress.xp % 100;

  const toggleTheme = () =>
    dispatch({ type: "SET_THEME", payload: state.theme === "dark" ? "light" : "dark" });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)" }}>
      {/* ══ SIDEBAR ══ */}
      <aside style={{
        width: sidebarOpen ? 260 : 72,
        background: "var(--bg-sidebar)",
        borderLeft: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        position: "fixed", right: 0, top: 0, bottom: 0,
        zIndex: 100, transition: "width 0.3s ease",
        overflow: "hidden",
        boxShadow: "2px 0 16px rgba(107,70,193,0.08)",
      }}>

        {/* Logo + Brand */}
        <div style={{ padding: "18px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, minHeight: 80 }}>
          <div style={{
            width: sidebarOpen ? 52 : 44, height: sidebarOpen ? 52 : 44,
            borderRadius: 14, overflow: "hidden", flexShrink: 0,
            border: "2px solid rgba(107,70,193,0.2)",
            background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(107,70,193,0.12)",
            transition: "all 0.3s ease",
          }}>
            <img src="/sparktech-logo.jpg" alt="SparkTech" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 900, fontSize: 15, color: "var(--purple)", lineHeight: 1.2 }}>Claude Code Academy</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>by Rut Pacter</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 12px", borderRadius: 10, marginBottom: 3,
                textDecoration: "none",
                background: isActive ? "linear-gradient(135deg, rgba(107,70,193,0.12), rgba(20,184,166,0.06))" : "transparent",
                border: `1px solid ${isActive ? "rgba(107,70,193,0.22)" : "transparent"}`,
                color: isActive ? "var(--purple)" : "var(--text-secondary)",
                transition: "all 0.2s",
                position: "relative",
              }}>
                {isActive && <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "55%", borderRadius: "2px 0 0 2px", background: "var(--gradient-primary)" }} />}
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: 14, fontWeight: isActive ? 700 : 500 }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* XP Progress */}
        {sidebarOpen && (
          <div style={{ margin: "0 10px 10px", padding: 14, background: "linear-gradient(135deg, rgba(107,70,193,0.07), rgba(20,184,166,0.04))", border: "1px solid rgba(107,70,193,0.15)", borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: "var(--purple)" }}>רמה {progress.level}</span>
              <span style={{ color: "var(--text-secondary)" }}>{xpInLevel}/100 XP</span>
            </div>
            <div style={{ height: 7, background: "rgba(107,70,193,0.12)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${xpInLevel}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-secondary)" }}>✨ {progress.xp} XP · 🔥 {progress.streak} ימים</div>
          </div>
        )}

        {/* Contact */}
        <div style={{ margin: "0 10px 10px", padding: sidebarOpen ? "14px 12px" : "10px 6px", border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg-card)" }}>
          {sidebarOpen && (
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12, textAlign: "center" }}>
              ליצירת קשר עם רות
            </div>
          )}
          <div style={{ display: "flex", gap: sidebarOpen ? 10 : 0, justifyContent: "center", flexDirection: sidebarOpen ? "row" : "column", alignItems: "center" }}>
            <a href="https://api.whatsapp.com/send?phone=972533178665&text=הי+רות,+הגעתי+מclaude+code+academy" target="_blank" rel="noopener noreferrer"
              title="WhatsApp"
              style={{
                width: 46, height: 46,
                borderRadius: "50%",
                background: "#25D366",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none", fontSize: 22,
                boxShadow: "0 3px 10px rgba(37,211,102,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
                marginBottom: sidebarOpen ? 0 : 8,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              💬
            </a>
            <a href="https://www.linkedin.com/in/rut-pachter-8a74b9343" target="_blank" rel="noopener noreferrer"
              title="LinkedIn"
              style={{
                width: 46, height: 46,
                borderRadius: "50%",
                background: "#0077B5",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none", fontSize: 22,
                boxShadow: "0 3px 10px rgba(0,119,181,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              💼
            </a>
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid var(--border)", display: "flex", gap: 6 }}>
          <button onClick={toggleTheme} style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-secondary)", cursor: "pointer", fontSize: 14, padding: "8px 10px", flex: 1, fontFamily: "Heebo, sans-serif" }}>
            {state.theme === "dark" ? "☀️" : "🌙"}{sidebarOpen && <span style={{ fontSize: 12, marginRight: 4 }}>{state.theme === "dark" ? " בהיר" : " כהה"}</span>}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-secondary)", cursor: "pointer", fontSize: 13, padding: "8px 10px" }}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <main style={{ flex: 1, marginRight: sidebarOpen ? 260 : 72, transition: "margin-right 0.3s ease", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "14px 28px", borderBottom: "1px solid var(--border)", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(107,70,193,0.05)" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ background: "rgba(107,70,193,0.07)", border: "1px solid rgba(107,70,193,0.18)", borderRadius: 8, padding: "5px 13px", fontSize: 13, color: "var(--purple)", fontWeight: 600 }}>✨ {progress.xp} XP</span>
            <span style={{ background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.18)", borderRadius: 8, padding: "5px 13px", fontSize: 13, color: "var(--teal)", fontWeight: 600 }}>🏆 רמה {progress.level}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>🔥 {progress.streak} ימים ברצף</span>
            <img src="/sparktech-logo.jpg" alt="SparkTech" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "contain", border: "1px solid var(--border)", background: "white" }} />
          </div>
        </header>
        <div style={{ flex: 1 }}>{children}</div>
      </main>
    </div>
  );
}
