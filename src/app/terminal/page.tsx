"use client";
import TerminalSimulator from "@/components/terminal/TerminalSimulator";

const COMMANDS = [
  { cmd: "pwd", desc: "הצג תיקייה נוכחית", example: "/home/user/projects" },
  { cmd: "ls", desc: "הצג תוכן תיקייה", example: "src/ tests/ README.md" },
  { cmd: "ls -la", desc: "הצג הכל כולל נסתרים", example: "drwxr-xr-x Documents" },
  { cmd: "cd Documents", desc: "כנס לתיקייה", example: "עברת לתיקייה Documents" },
  { cmd: "cd ..", desc: "חזור תיקייה אחת למעלה", example: "עלית רמה אחת" },
  { cmd: "mkdir mydir", desc: "צור תיקייה חדשה", example: "נוצרה תיקייה mydir" },
  { cmd: "touch file.js", desc: "צור קובץ חדש", example: "נוצר קובץ file.js" },
  { cmd: "cat file.js", desc: "הצג תוכן קובץ", example: "console.log('hello')" },
  { cmd: "git init", desc: "אתחל Git repository", example: "Initialized empty Git repository" },
  { cmd: "git status", desc: "בדוק מצב הקבצים", example: "On branch main" },
  { cmd: "git add .", desc: "הוסף כל הקבצים", example: "קבצים עברו לStaging" },
  { cmd: "git commit -m 'הודעה'", desc: "שמור snapshot", example: "[main abc1234] הודעה" },
];

export default function TerminalPage() {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>⌨️ סימולטור Terminal</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          סביבה בטוחה לתרגול פקודות — לא יכול לקרות שום נזק למחשב שלך
        </p>
      </div>

      {/* How it works */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20, background: "linear-gradient(135deg, rgba(107,70,193,0.04), rgba(20,184,166,0.02))", borderColor: "rgba(107,70,193,0.15)" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--purple)", marginBottom: 14 }}>📖 איך זה עובד?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "1️⃣", title: "כתבי פקודה", desc: "הקלידי פקודה בשורה התחתונה ולחצי Enter" },
            { icon: "2️⃣", title: "ראי תוצאה", desc: "הפלט מופיע מיד - בדיוק כמו Terminal אמיתי" },
            { icon: "3️⃣", title: "תרגלי בחופשיות", desc: "מערכת הקבצים היא מדומה - אי אפשר לשבור כלום!" },
          ].map(step => (
            <div key={step.title} style={{ padding: 14, background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{step.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)", marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Commands Reference */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>📋 פקודות זמינות</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
          {COMMANDS.map(c => (
            <div key={c.cmd} style={{ display: "flex", gap: 10, padding: "10px 12px", background: "var(--bg-card-hover)", borderRadius: 8, border: "1px solid var(--border)", alignItems: "flex-start" }}>
              <code style={{ background: "rgba(107,70,193,0.08)", border: "1px solid rgba(107,70,193,0.15)", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "var(--purple)", direction: "ltr", flexShrink: 0, whiteSpace: "nowrap", fontFamily: "JetBrains Mono, monospace" }}>
                {c.cmd}
              </code>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{c.desc}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, direction: "ltr", textAlign: "left" }}>{c.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>⚡ סנדבוקס — נסי כאן!</h2>
        <div style={{ height: 400 }}>
          <TerminalSimulator />
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card" style={{ padding: 16, background: "rgba(20,184,166,0.03)", borderColor: "rgba(20,184,166,0.15)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)", marginBottom: 10 }}>💡 טיפים שימושיים</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[["↑ ↓", "היסטוריית פקודות"], ["Ctrl+L", "ניקוי מסך"], ["help", "רשימת כל הפקודות"], ["אפס", "איפוס מערכת הקבצים"]].map(([key, desc]) => (
            <div key={key} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <code style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 5, padding: "2px 7px", fontSize: 11, color: "var(--teal)", fontFamily: "JetBrains Mono, monospace", direction: "ltr" }}>{key}</code>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
