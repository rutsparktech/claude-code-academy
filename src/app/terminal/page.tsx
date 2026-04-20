"use client";
import TerminalSimulator from "@/components/terminal/TerminalSimulator";

const COMMAND_GROUPS = [
  {
    title: "📁 ניווט בין תיקיות",
    color: "#5B35B0",
    commands: [
      { cmd: "pwd", what: "מראה היכן אנחנו נמצאים עכשיו", output: "/home/user/projects" },
      { cmd: "ls", what: "מציג את תוכן התיקייה הנוכחית", output: "src/   tests/   README.md" },
      { cmd: "ls -la", what: "מציג הכל — כולל קבצים נסתרים", output: "drwxr-xr-x  .git/   -rw  README.md" },
      { cmd: "cd projects", what: "נכנסים לתיקייה בשם projects", output: "עברנו לתיקייה projects" },
      { cmd: "cd ..", what: "חוזרים תיקייה אחת למעלה", output: "עלינו רמה אחת" },
      { cmd: "cd ~", what: "חוזרים לתיקיית הבית", output: "/home/user" },
    ]
  },
  {
    title: "🏗️ יצירת קבצים ותיקיות",
    color: "#0D9488",
    commands: [
      { cmd: "mkdir my-project", what: "יוצרים תיקייה חדשה בשם my-project", output: "נוצרה תיקייה my-project" },
      { cmd: "mkdir -p src/components", what: "יוצרים תיקיות מקוננות (תיקייה בתוך תיקייה)", output: "נוצרו src/ ובתוכה components/" },
      { cmd: "touch index.js", what: "יוצרים קובץ ריק חדש", output: "נוצר קובץ index.js" },
      { cmd: "cat index.js", what: "מציגים את תוכן הקובץ", output: "console.log('hello')" },
    ]
  },
  {
    title: "🌿 Git — שמירת קוד",
    color: "#7C3AED",
    commands: [
      { cmd: "git init", what: "מאתחלים repository חדש בתיקייה הנוכחית", output: "Initialized empty Git repository in .git/" },
      { cmd: "git status", what: "בודקים מה השתנה מאז הcommit האחרון", output: "On branch main — modified: index.js" },
      { cmd: "git add .", what: "מוסיפים את כל השינויים לתור השמירה (Staging)", output: "הקבצים מוכנים לcommit" },
      { cmd: 'git commit -m "הוספתי כפתור"', what: "שומרים snapshot עם הודעה מסבירה", output: "[main a1b2c3] הוספתי כפתור" },
      { cmd: "git log --oneline", what: "רואים את היסטוריית השינויים", output: "a1b2c3 הוספתי כפתור\nd4e5f6 יצירת הפרויקט" },
    ]
  },
];

const DEMO_CONVERSATION = [
  { type: "info", text: "💡 כך נראה Terminal אמיתי — שורה לשורה" },
  { type: "prompt", text: "user@computer:~/projects$", cmd: "pwd" },
  { type: "output", text: "/home/user/projects" },
  { type: "prompt", text: "user@computer:~/projects$", cmd: "mkdir my-app" },
  { type: "prompt", text: "user@computer:~/projects$", cmd: "cd my-app" },
  { type: "prompt", text: "user@computer:~/projects/my-app$", cmd: "git init" },
  { type: "output", text: "Initialized empty Git repository in /home/user/projects/my-app/.git/" },
  { type: "prompt", text: "user@computer:~/projects/my-app$", cmd: "touch index.js" },
  { type: "prompt", text: "user@computer:~/projects/my-app$", cmd: 'git add . && git commit -m "פרויקט ראשון"' },
  { type: "output", text: "[main (root-commit) abc1234] פרויקט ראשון\n 1 file changed, 0 insertions(+)" },
  { type: "success", text: "✅ יצרנו פרויקט, אתחלנו Git, ושמרנו commit ראשון!" },
];

export default function TerminalPage() {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: 8 }}>⌨️ סימולטור Terminal</h1>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
          מתרגלים פקודות בסביבה בטוחה לחלוטין — שום דבר לא יכול להשתבש
        </p>
      </div>

      {/* What is Terminal */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 24, borderColor: "rgba(91,53,176,0.2)", background: "linear-gradient(135deg, rgba(91,53,176,0.04), rgba(13,148,136,0.02))" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--purple)", marginBottom: 12 }}>מה זה Terminal ולמה זה חשוב?</h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
          Terminal (שורת פקודה) הוא חלון טקסט שמאפשר לנו לתקשר עם המחשב ישירות. 
          <strong style={{ color: "var(--text-primary)" }}> כל כלי פיתוח מקצועי — כולל Claude Code — עובד דרך Terminal.</strong> 
          לכן לפני שמתחילים עם Claude Code, חייבים להכיר את הפקודות הבסיסיות.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { icon: "1️⃣", title: "כותבים פקודה", desc: "מקלידים את הפקודה ולוחצים Enter" },
            { icon: "2️⃣", title: "מקבלים תשובה", desc: "המחשב מבצע ומראה תוצאה" },
            { icon: "3️⃣", title: "ממשיכים", desc: "הפקודה הבאה מתחילה מהמצב החדש" },
          ].map(s => (
            <div key={s.title} style={{ padding: 14, background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo conversation */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>🎬 כך נראה Terminal אמיתי</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: 16 }}>
          הירוק = הפקודה שאנחנו כותבים | הלבן = התגובה של המחשב
        </p>
        <div className="terminal" style={{ padding: 20 }}>
          {DEMO_CONVERSATION.map((line, i) => {
            if (line.type === "info") return (
              <div key={i} style={{ color: "#FCD34D", fontSize: "0.9rem", marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>{line.text}</div>
            );
            if (line.type === "success") return (
              <div key={i} style={{ color: "#34D399", fontSize: "0.9rem", marginTop: 12, padding: "10px 14px", background: "rgba(52,211,153,0.1)", borderRadius: 8, border: "1px solid rgba(52,211,153,0.2)", fontFamily: "Heebo, sans-serif" }}>{line.text}</div>
            );
            if (line.type === "prompt") return (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ color: "#86EFAC", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace", flexShrink: 0 }}>{line.text}</span>
                <span style={{ color: "#67E8F9", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>{line.cmd}</span>
              </div>
            );
            return (
              <div key={i} style={{ color: "#E2E8F0", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace", marginBottom: 10, paddingRight: 8, opacity: 0.85, whiteSpace: "pre" }}>{line.text}</div>
            );
          })}
        </div>
      </div>

      {/* Commands Reference */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>📋 כל הפקודות החשובות</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: 16 }}>לחצו על כל פקודה כדי לראות בדיוק מה היא עושה</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {COMMAND_GROUPS.map(group => (
            <div key={group.title} className="glass-card" style={{ padding: 20, borderRight: `4px solid ${group.color}` }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: group.color, marginBottom: 14 }}>{group.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {group.commands.map(c => (
                  <div key={c.cmd} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 14, alignItems: "start", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <code style={{ background: "rgba(91,53,176,0.08)", border: "1px solid rgba(91,53,176,0.18)", borderRadius: 7, padding: "5px 10px", fontSize: "0.85rem", color: "var(--purple)", fontFamily: "JetBrains Mono, monospace", direction: "ltr", textAlign: "left", fontWeight: 600 }}>
                      {c.cmd}
                    </code>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500 }}>{c.what}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", direction: "ltr", textAlign: "left", background: "var(--bg-card-hover)", padding: "4px 8px", borderRadius: 6 }}>{c.output}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sandbox */}
      <div className="glass-card" style={{ padding: 22, marginBottom: 20, borderColor: "rgba(13,148,136,0.25)", background: "rgba(13,148,136,0.02)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--teal)", marginBottom: 4 }}>⚡ סנדבוקס — מתרגלים כאן!</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 16 }}>
          הסנדבוקס הוא Terminal מדומה — מערכת קבצים בזיכרון בלבד. אי אפשר לשבור כלום, אפשר לנסות הכל.
        </p>
        <div style={{ height: 380 }}>
          <TerminalSimulator />
        </div>
      </div>

      {/* Tips */}
      <div style={{ padding: 18, background: "rgba(91,53,176,0.04)", border: "1.5px solid rgba(91,53,176,0.15)", borderRadius: 12 }}>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--purple)", marginBottom: 12 }}>⌨️ קיצורי מקלדת שימושיים</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[["↑ / ↓", "חוזרים לפקודה קודמת"], ["Ctrl + L", "מנקים את המסך"], ["help", "רשימת כל הפקודות הזמינות"], ["אפס", "איפוס מלא של הסנדבוקס"]].map(([key, desc]) => (
            <div key={key} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <code style={{ background: "rgba(91,53,176,0.1)", border: "1px solid rgba(91,53,176,0.2)", borderRadius: 6, padding: "3px 9px", fontSize: "0.85rem", color: "var(--purple)", fontFamily: "JetBrains Mono, monospace", direction: "ltr", fontWeight: 600 }}>{key}</code>
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
