"use client";
import TerminalSimulator from "@/components/terminal/TerminalSimulator";
const QUICK = [
  { cmd: "help", desc: "רשימת כל הפקודות" },
  { cmd: "ls -la", desc: "הצג קבצים עם פרטים" },
  { cmd: "mkdir myproject", desc: "צור תיקייה" },
  { cmd: "git init", desc: "אתחל repository" },
];
export default function TerminalPage() {
  return (
    <div style={{ padding: "24px 28px", height: "calc(100vh - 65px)", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>⌨️ סימולטור Terminal</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>סביבה בטוחה לתרגול פקודות - לא יכול לקרות שום נזק!</p>
      </div>
      <div style={{ display: "flex", gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minHeight: 0 }}><TerminalSimulator /></div>
        <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="glass-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>🚀 התחל מכאן</h3>
            {QUICK.map((q, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < QUICK.length - 1 ? "1px solid var(--border)" : "none" }}>
                <code style={{ display: "block", background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 6, padding: "4px 8px", fontSize: 12, color: "var(--teal-light)", marginBottom: 4, direction: "ltr", textAlign: "left" }}>{q.cmd}</code>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{q.desc}</span>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>⌨️ קיצורי מקלדת</h3>
            {[["↑ / ↓","היסטוריה"],["Ctrl+C","בטל פקודה"],["Ctrl+L","נקה מסך"]].map(([key, desc], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                <code style={{ background: "rgba(107,70,193,0.1)", borderRadius: 4, padding: "2px 6px", color: "var(--purple-light)", direction: "ltr" }}>{key}</code>
                <span style={{ color: "var(--text-muted)" }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
