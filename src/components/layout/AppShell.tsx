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
      <aside style={{
        width: sidebarOpen ? 256 : 68,
        background: "var(--bg-sidebar)",
        borderLeft: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        position: "fixed", right: 0, top: 0, bottom: 0,
        zIndex: 100, transition: "width 0.3s ease",
        overflow: "hidden",
        boxShadow: "2px 0 12px rgba(107,70,193,0.06)",
      }}>

        {/* Logo */}
        <div style={{ padding: "14px 12px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, minHeight: 64 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "1px solid var(--border)", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/sparktech-logo.jpg" alt="SparkTech" style={{ width: 40, height: 40, objectFit: "contain" }} />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 13, color: "var(--purple)", lineHeight: 1.2 }}>Claude Code Academy</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>by SparkTech</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 11px", borderRadius: 10, marginBottom: 2,
                textDecoration: "none",
                background: isActive ? "linear-gradient(135deg, rgba(107,70,193,0.1), rgba(20,184,166,0.05))" : "transparent",
                border: `1px solid ${isActive ? "rgba(107,70,193,0.2)" : "transparent"}`,
                color: isActive ? "var(--purple)" : "var(--text-secondary)",
                transition: "all 0.2s",
                position: "relative",
              }}>
                {isActive && <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "55%", borderRadius: "2px 0 0 2px", background: "var(--gradient-primary)" }} />}
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 400 }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* XP */}
        {sidebarOpen && (
          <div style={{ margin: "0 10px 8px", padding: 12, background: "linear-gradient(135deg, rgba(107,70,193,0.06), rgba(20,184,166,0.03))", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
              <span style={{ fontWeight: 700, color: "var(--purple)" }}>רמה {progress.level}</span>
              <span style={{ color: "var(--text-muted)" }}>{xpInLevel}/100 XP</span>
            </div>
            <div style={{ height: 5, background: "rgba(107,70,193,0.12)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${xpInLevel}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: "var(--text-muted)" }}>✨ {progress.xp} XP · 🔥 {progress.streak} ימים</div>
          </div>
        )}

        {/* Social */}
        {sidebarOpen && (
          <div style={{ margin: "0 10px 8px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg-card)" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, textAlign: "center" }}>📲 יצירת קשר</div>
            <div style={{ display: "flex", gap: 6 }}>
              <a href="https://wa.me/972000000000" target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "7px 8px", background: "#25D366", borderRadius: 8, color: "white", textDecoration: "none", fontSize: 11, fontWeight: 700 }}>
                💬 וואטסאפ
              </a>
              <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "7px 8px", background: "#0077B5", borderRadius: 8, color: "white", textDecoration: "none", fontSize: 11, fontWeight: 700 }}>
                💼 LinkedIn
              </a>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid var(--border)", display: "flex", gap: 6 }}>
          <button onClick={toggleTheme} style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-secondary)", cursor: "pointer", fontSize: 14, padding: "7px 10px", flex: 1, fontFamily: "Heebo, sans-serif" }}>
            {state.theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-secondary)", cursor: "pointer", fontSize: 13, padding: "7px 10px" }}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginRight: sidebarOpen ? 256 : 68, transition: "margin-right 0.3s ease", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "12px 24px", borderBottom: "1px solid var(--border)", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 6px rgba(107,70,193,0.05)" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ background: "rgba(107,70,193,0.06)", border: "1px solid rgba(107,70,193,0.15)", borderRadius: 7, padding: "3px 10px", fontSize: 12, color: "var(--purple)" }}>✨ {progress.xp} XP</span>
            <span style={{ background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.15)", borderRadius: 7, padding: "3px 10px", fontSize: 12, color: "var(--teal)" }}>🏆 רמה {progress.level}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>🔥 {progress.streak} ימים</span>
            <img src="/sparktech-logo.jpg" alt="SparkTech" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "contain", border: "1px solid var(--border)", background: "white" }} />
          </div>
        </header>
        <div style={{ flex: 1 }}>{children}</div>
      </main>
    </div>
  );
}
