"use client";
import Link from "next/link";
import { useUserProgress } from "@/store/AppStore";

const MODULES = [
  { href: "/lessons", icon: "📚", title: "שיעורים", desc: "לומדים צעד אחר צעד — Terminal, Git, Claude Code", color: "#5B35B0" },
  { href: "/terminal", icon: "⌨️", title: "סימולטור Terminal", desc: "מתרגלים פקודות בסביבה בטוחה — ללא סיכון", color: "#0D9488" },
  { href: "/git", icon: "🌿", title: "Git Visualizer", desc: "רואים גרפים אינטראקטיביים של branches ו-commits", color: "#7C3AED" },
  { href: "/challenges", icon: "🏆", title: "אתגרים", desc: "בוחנים את עצמנו וצוברים XP", color: "#D97706" },
  { href: "/journal", icon: "📓", title: "יומן למידה", desc: "מתעדים את ההתקדמות שלנו", color: "#DB2777" },
];

const LEARNING_PATH = [
  { step: 1, title: "Terminal — שפת הבסיס", desc: "לפני שמתחילים עם Claude Code — חייבים להכיר את ה-Terminal. זה הכלי שדרכו הכל עובד.", time: "20 דקות", href: "/lessons/terminal-basics" },
  { step: 2, title: "Git — שמירת היסטוריה", desc: "Git שומר את כל השינויים בקוד. בלי Git אי אפשר לעבוד בצוות ואי אפשר לחזור לגרסה קודמת.", time: "30 דקות", href: "/lessons/git-basics" },
  { step: 3, title: "Claude Code — ה-AI שכותב קוד", desc: "Claude Code הוא עוזר AI שרץ ב-Terminal, קורא את הקבצים שלנו ויכול לכתוב, לתקן ולהסביר קוד.", time: "35 דקות", href: "/lessons/claude-code-intro" },
  { step: 4, title: "Prompts מדויקים", desc: "ככל שנתאר את המשימה בצורה ברורה יותר — התוצאה תהיה טובה יותר. זו המיומנות הכי חשובה.", time: "30 דקות", href: "/lessons/advanced-prompts" },
  { step: 5, title: "אבטחה — מה לא לעשות", desc: "API keys, סיסמאות ומידע רגיש — חייבים לדעת מה לא לשים בקוד ואיך לשמור על הפרויקט.", time: "40 דקות", href: "/lessons/security-basics" },
];

export default function HomePage() {
  const progress = useUserProgress();
  const xpInLevel = progress.xp % 100;
  const completedCount = progress.completedLessons.length;

  return (
    <div style={{ padding: "36px 32px", maxWidth: 1100, margin: "0 auto" }}>

      {/* ══ HERO ══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(91,53,176,0.08) 0%, rgba(13,148,136,0.05) 100%)",
        border: "1.5px solid rgba(91,53,176,0.15)",
        borderRadius: 20, padding: "36px 40px", marginBottom: 40,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 240, height: 240, background: "radial-gradient(circle, rgba(91,53,176,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 10, color: "var(--text-primary)" }}>
          ברוכים הבאים ל-Claude Code Academy 🎉
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: 24, maxWidth: 600 }}>
          כאן לומדים לעבוד עם Claude Code — מהצעד הראשון ועד לבניית פרויקטים אמיתיים. מתחילים מאפס, ללא רקע נדרש.
        </p>

        {/* Progress */}
        <div style={{ background: "white", borderRadius: 14, padding: 20, display: "inline-flex", flexDirection: "column", gap: 10, minWidth: 300, boxShadow: "0 2px 12px rgba(91,53,176,0.1)", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
            <span style={{ fontWeight: 700, color: "var(--purple)" }}>ההתקדמות שלנו — רמה {progress.level}</span>
            <span style={{ color: "var(--text-muted)" }}>{xpInLevel}/100 XP לרמה הבאה</span>
          </div>
          <div style={{ height: 10, background: "rgba(91,53,176,0.1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${xpInLevel}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
            <span style={{ color: "var(--text-secondary)" }}>✨ <strong>{progress.xp}</strong> XP סה"כ</span>
            <span style={{ color: "var(--text-secondary)" }}>📚 <strong>{completedCount}</strong> שיעורים הושלמו</span>
            <span style={{ color: "var(--text-secondary)" }}>🔥 <strong>{progress.streak}</strong> ימים ברצף</span>
          </div>
        </div>
      </div>

      {/* ══ LEARNING PATH ══ */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 6, color: "var(--text-primary)" }}>
          🗺️ מסלול הלמידה המומלץ
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: 20 }}>
          עוקבים אחרי הסדר הזה — כל שיעור בנוי על הקודם
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {LEARNING_PATH.map((item) => {
            const isDone = progress.completedLessons.includes(item.href.split("/").pop()!);
            return (
              <Link key={item.step} href={item.href} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{
                  padding: "18px 22px", display: "flex", alignItems: "center", gap: 18,
                  borderColor: isDone ? "rgba(16,185,129,0.3)" : "var(--border)",
                  background: isDone ? "rgba(16,185,129,0.03)" : "var(--bg-card)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    background: isDone ? "rgba(16,185,129,0.15)" : "rgba(91,53,176,0.1)",
                    border: `2px solid ${isDone ? "rgba(16,185,129,0.4)" : "rgba(91,53,176,0.2)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: isDone ? 20 : 16, fontWeight: 900,
                    color: isDone ? "#059669" : "var(--purple)",
                  }}>
                    {isDone ? "✓" : item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4 }}>⏱️ {item.time}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: isDone ? "#059669" : "var(--purple)" }}>
                      {isDone ? "הושלם ✓" : "להתחיל →"}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ══ MODULES ══ */}
      <div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 6, color: "var(--text-primary)" }}>
          🛠️ כלי הלמידה
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: 20 }}>
          כל כלי פתוח בכל עת — אפשר לעבור ביניהם חופשית
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {MODULES.map(mod => (
            <Link key={mod.href} href={mod.href} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: 20, borderTop: `3px solid ${mod.color}` }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{mod.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 6 }}>{mod.title}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{mod.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
