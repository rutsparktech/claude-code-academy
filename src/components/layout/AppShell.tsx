"use client";
/**
 * AppShell - מעטפת האפליקציה
 * כולל: Sidebar ניווט, Header, ומיכל תוכן
 * תומך ב-RTL מלא ומצב כהה/בהיר
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, useUserProgress, xpForLevel } from "@/store/AppStore";

// ============================================================
// NAV ITEMS - מבנה הניווט
// ============================================================
const NAV_ITEMS = [
  { href: "/", icon: "🏠", label: "בית", id: "home" },
  { href: "/lessons", icon: "📚", label: "שיעורים", id: "lessons" },
  { href: "/terminal", icon: "⌨️", label: "טרמינל", id: "terminal" },
  { href: "/git", icon: "🌿", label: "Git Visualizer", id: "git" },
  { href: "/challenges", icon: "🏆", label: "אתגרים", id: "challenges" },
  { href: "/journal", icon: "📓", label: "יומן", id: "journal" },
];

// ============================================================
// COMPONENT
// ============================================================
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { state, dispatch } = useApp();
  const progress = useUserProgress();
  const pathname = usePathname();

  const toggleTheme = () => {
    dispatch({ type: "SET_THEME", payload: state.theme === "dark" ? "light" : "dark" });
  };

  // XP progress within current level
  const xpInLevel = progress.xp % 100;
  const xpNeeded = 100;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-dark)" }}>
      {/* ══════════════════════════════════
          SIDEBAR
      ══════════════════════════════════ */}
      <aside
        style={{
          width: sidebarOpen ? 260 : 72,
          background: "var(--bg-card)",
          borderLeft: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          transition: "width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
                boxShadow: "var(--shadow-purple)",
              }}
            >
              🤖
            </div>
            {sidebarOpen && (
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 15,
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  Claude Code
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  Academy
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 12px",
                  borderRadius: 12,
                  marginBottom: 4,
                  textDecoration: "none",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(107,70,193,0.2), rgba(20,184,166,0.1))"
                    : "transparent",
                  border: isActive ? "1px solid rgba(107,70,193,0.3)" : "1px solid transparent",
                  color: isActive ? "var(--purple-light)" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: "60%",
                      borderRadius: "2px 0 0 2px",
                      background: "var(--gradient-primary)",
                    }}
                  />
                )}
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && (
                  <span style={{ fontSize: 14, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User XP Card */}
        {sidebarOpen && (
          <div
            style={{
              margin: "0 12px 12px",
              padding: 14,
              background: "linear-gradient(135deg, rgba(107,70,193,0.1), rgba(20,184,166,0.05))",
              border: "1px solid var(--border)",
              borderRadius: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                רמה {progress.level}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {xpInLevel}/{xpNeeded} XP
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(107,70,193,0.2)",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(xpInLevel / xpNeeded) * 100}%`,
                  height: "100%",
                  background: "var(--gradient-primary)",
                  borderRadius: 999,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>
              🔥 רצף: {progress.streak} ימים
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div
          style={{
            padding: "12px 8px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 8,
            justifyContent: sidebarOpen ? "space-between" : "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              background: "var(--bg-card-hover)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: 16,
              padding: "8px 12px",
              transition: "all 0.2s",
              flex: sidebarOpen ? 1 : "none",
            }}
            title={state.theme === "dark" ? "מצב בהיר" : "מצב כהה"}
          >
            {state.theme === "dark" ? "☀️" : "🌙"}
            {sidebarOpen && <span style={{ fontSize: 12, marginRight: 6 }}>
              {state.theme === "dark" ? " בהיר" : " כהה"}
            </span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "var(--bg-card-hover)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: 14,
              padding: "8px 12px",
              transition: "all 0.2s",
            }}
            title={sidebarOpen ? "כווץ תפריט" : "הרחב תפריט"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <main
        style={{
          flex: 1,
          marginRight: sidebarOpen ? 260 : 72,
          transition: "margin-right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--border)",
            background: "rgba(10,10,15,0.8)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(107,70,193,0.2), rgba(20,184,166,0.1))",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 12,
                color: "var(--teal-light)",
              }}
            >
              ✨ {progress.xp} XP
            </div>
            <div
              style={{
                background: "rgba(107,70,193,0.1)",
                border: "1px solid rgba(107,70,193,0.3)",
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 12,
                color: "var(--purple-light)",
              }}
            >
              🏆 רמה {progress.level}
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            🔥 רצף {progress.streak} ימים
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "0" }}>{children}</div>
      </main>
    </div>
  );
}
