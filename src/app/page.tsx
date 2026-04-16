"use client";
/**
 * Home Dashboard - לוח בקרה ראשי
 * מציג: ברכה, סטטיסטיקות, קורסים, ואתגר יומי
 */

import Link from "next/link";
import { useUserProgress } from "@/store/AppStore";

const MODULES = [
  {
    href: "/lessons",
    icon: "📚",
    title: "שיעורים",
    desc: "Terminal, Git, Node.js - צעד אחר צעד",
    color: "#6B46C1",
    lessons: 12,
    completed: 0,
  },
  {
    href: "/terminal",
    icon: "⌨️",
    title: "סימולטור Terminal",
    desc: "תרגל פקודות בסביבה בטוחה",
    color: "#14B8A6",
    lessons: null,
    completed: null,
  },
  {
    href: "/git",
    icon: "🌿",
    title: "Git Visualizer",
    desc: "ראה גרפים אינטראקטיביים של Git",
    color: "#9F7AEA",
    lessons: null,
    completed: null,
  },
  {
    href: "/challenges",
    icon: "🏆",
    title: "אתגרים",
    desc: "בחנים יומיים ומשימות קידוד",
    color: "#F59E0B",
    lessons: null,
    completed: null,
  },
  {
    href: "/journal",
    icon: "📓",
    title: "יומן למידה",
    desc: "תעד את ההתקדמות שלך",
    color: "#EC4899",
    lessons: null,
    completed: null,
  },
];

const QUICK_TIPS = [
  { cmd: "ls -la", desc: "הצג כל הקבצים כולל נסתרים" },
  { cmd: "git status", desc: "בדוק מצב הrepository" },
  { cmd: "cd ..", desc: "עלה תיקייה אחת למעלה" },
  { cmd: "mkdir mydir", desc: "צור תיקייה חדשה" },
];

export default function HomePage() {
  const progress = useUserProgress();
  const xpInLevel = progress.xp % 100;

  return (
    <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>

      {/* ══ HERO SECTION ══ */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(107,70,193,0.15) 0%, rgba(20,184,166,0.08) 100%)",
          border: "1px solid rgba(107,70,193,0.25)",
          borderRadius: 24,
          padding: "40px 40px",
          marginBottom: 32,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: "absolute", top: -60, left: -60,
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(107,70,193,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -40, right: 100,
          width: 150, height: 150,
          background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 40 }}>👋</span>
            <div>
              <h1 style={{
                fontSize: 32, fontWeight: 900,
                background: "linear-gradient(135deg, #9F7AEA 0%, #2DD4BF 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}>
                ברוך הבא ל-Claude Code Academy!
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 6 }}>
                מוכן ללמוד? בואו נתחיל את המסע שלך לעולם הקידוד 🚀
              </p>
            </div>
          </div>

          {/* XP Progress */}
          <div style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: 12, padding: 16,
            display: "inline-flex", flexDirection: "column", gap: 8,
            minWidth: 280,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--purple-light)", fontWeight: 600 }}>רמה {progress.level}</span>
              <span style={{ color: "var(--text-muted)" }}>{xpInLevel}/100 XP לרמה הבאה</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{
                width: `${xpInLevel}%`, height: "100%",
                background: "linear-gradient(90deg, #6B46C1, #14B8A6)",
                borderRadius: 999, transition: "width 0.6s ease",
              }} />
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
              <span style={{ color: "var(--text-muted)" }}>✨ {progress.xp} XP סה"כ</span>
              <span style={{ color: "var(--text-muted)" }}>📚 {progress.completedLessons.length} שיעורים</span>
              <span style={{ color: "var(--text-muted)" }}>🔥 {progress.streak} ימים רצף</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MODULES GRID ══ */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>
        מודולי למידה
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16, marginBottom: 32,
      }}>
        {MODULES.map((mod) => (
          <Link key={mod.href} href={mod.href} style={{ textDecoration: "none" }}>
            <div
              className="glass-card"
              style={{
                padding: 20, cursor: "pointer",
                borderTop: `3px solid ${mod.color}`,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{mod.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>
                {mod.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {mod.desc}
              </div>
              {mod.lessons !== null && (
                <div style={{
                  marginTop: 12,
                  fontSize: 12, color: "var(--text-muted)",
                  display: "flex", gap: 8,
                }}>
                  <span>{mod.lessons} שיעורים</span>
                  <span>•</span>
                  <span style={{ color: mod.color }}>{mod.completed} הושלמו</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* ══ QUICK TIPS ══ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)" }}>
            💡 טיפים מהירים
          </h2>
          <div
            className="glass-card"
            style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}
          >
            {QUICK_TIPS.map((tip, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "8px 0",
                borderBottom: i < QUICK_TIPS.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <code style={{
                  background: "rgba(20,184,166,0.1)",
                  border: "1px solid rgba(20,184,166,0.2)",
                  borderRadius: 6, padding: "3px 8px",
                  fontSize: 12, color: "var(--teal-light)",
                  whiteSpace: "nowrap",
                }}>
                  {tip.cmd}
                </code>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{tip.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)" }}>
            🎯 אתגר היום
          </h2>
          <div
            className="glass-card"
            style={{
              padding: 24,
              background: "linear-gradient(135deg, rgba(107,70,193,0.1), rgba(20,184,166,0.05))",
              borderColor: "rgba(107,70,193,0.3)",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>🏗️</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 8 }}>
              צור מבנה פרויקט
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
              השתמש בטרמינל כדי ליצור מבנה תיקיות לפרויקט Node.js בסיסי עם תיקיות src, tests ו-docs
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: 999, padding: "3px 10px", fontSize: 12, color: "#F59E0B",
              }}>
                +50 XP
              </span>
              <Link href="/challenges" style={{
                background: "var(--gradient-primary)", borderRadius: 8,
                color: "white", fontSize: 13, fontWeight: 600,
                padding: "8px 16px", textDecoration: "none",
                transition: "all 0.2s",
              }}>
                התחל ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
