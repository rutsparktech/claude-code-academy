"use client";
import Link from "next/link";
import { useUserProgress } from "@/store/AppStore";
import {
  BookOpen, Terminal, GitBranch, Trophy, NotebookPen,
  Zap, Flame, CheckCircle, Clock, ChevronLeft, Award,
  GraduationCap
} from "lucide-react";

const MODULES = [
  { href: "/lessons",    Icon: BookOpen,    title: "שיעורים",            desc: "לומדים צעד אחר צעד — Terminal, Git, Claude Code",       color: "#0D5C55" },
  { href: "/terminal",   Icon: Terminal,    title: "סימולטור Terminal",   desc: "מתרגלים פקודות בסביבה בטוחה — ללא סיכון",              color: "#14B8A6" },
  { href: "/git",        Icon: GitBranch,   title: "Git Visualizer",      desc: "רואים גרפים אינטראקטיביים של branches ו-commits",       color: "#0077B5" },
  { href: "/challenges", Icon: Trophy,      title: "אתגרים",              desc: "בוחנים את עצמנו וצוברים XP",                           color: "#F97316" },
  { href: "/journal",    Icon: NotebookPen, title: "יומן למידה",          desc: "מתעדים את ההתקדמות שלנו",                              color: "#8B5CF6" },
];

const STEPS = [
  { id: "terminal-basics",    n: 1, title: "Terminal — שפת הבסיס",     desc: "לפני שמתחילים עם Claude Code — חייבים להכיר את ה-Terminal. זה הכלי שדרכו הכל עובד.",                            time: "20 דק'", href: "/lessons/terminal-basics" },
  { id: "git-basics",         n: 2, title: "Git — שמירת היסטוריה",      desc: "Git שומר את כל השינויים בקוד. בלי Git אי אפשר לעבוד בצוות ואי אפשר לחזור לגרסה קודמת.",                        time: "30 דק'", href: "/lessons/git-basics" },
  { id: "claude-code-intro",  n: 3, title: "Claude Code — ה-AI שכותב קוד", desc: "Claude Code הוא עוזר AI שרץ ב-Terminal, קורא את הקבצים ויכול לכתוב, לתקן ולהסביר קוד.",              time: "35 דק'", href: "/lessons/claude-code-intro" },
  { id: "advanced-prompts",   n: 4, title: "Prompts מדויקים",           desc: "ככל שנתאר את המשימה בצורה ברורה יותר — התוצאה תהיה טובה יותר. זו המיומנות הכי חשובה.",                        time: "30 דק'", href: "/lessons/advanced-prompts" },
  { id: "security-basics",    n: 5, title: "אבטחה — מה לא לעשות",       desc: "API keys, סיסמאות ומידע רגיש — חייבים לדעת מה לא לשים בקוד ואיך לשמור על הפרויקט.",                           time: "40 דק'", href: "/lessons/security-basics" },
];

const S = { strokeWidth: 1.75 };

export default function HomePage() {
  const progress = useUserProgress();
  const xpPct = progress.xp % 100;

  return (
    <div style={{ padding: "36px 32px", maxWidth: 1100, margin: "0 auto" }}>

      {/* ══ HERO ══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(13,92,85,0.07) 0%, rgba(20,184,166,0.04) 100%)",
        border: "1.5px solid rgba(13,92,85,0.13)",
        borderRadius: 18, padding: "36px 40px", marginBottom: 40,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, left: -60, width: 220, height: 220, background: "radial-gradient(circle, rgba(13,92,85,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <GraduationCap size={36} color="var(--primary)" {...S} />
            <h1>ברוכים הבאים ל-Claude Code Academy</h1>
          </div>
          <p style={{ fontSize: "1.05rem", marginBottom: 28, maxWidth: 580 }}>
            כאן לומדים לעבוד עם Claude Code — מהצעד הראשון ועד לבניית פרויקטים אמיתיים. מתחילים מאפס, ללא רקע נדרש.
          </p>

          {/* Stats card */}
          <div style={{
            background: "white", borderRadius: 14, padding: "18px 22px",
            display: "inline-flex", flexDirection: "column", gap: 10,
            minWidth: 320, boxShadow: "0 2px 14px rgba(13,92,85,0.1)",
            border: "1.5px solid rgba(13,92,85,0.1)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Award size={15} color="var(--primary)" {...S} />
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>רמה {progress.level}</span>
              </div>
              <span style={{ color: "var(--text-muted)" }}>{xpPct}/100 XP לרמה הבאה</span>
            </div>
            <div style={{ height: 8, background: "rgba(13,92,85,0.1)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${xpPct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)" }}>
                <Zap size={13} color="var(--primary-light)" strokeWidth={2} />
                <strong>{progress.xp}</strong> XP סה"כ
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)" }}>
                <BookOpen size={13} color="var(--primary)" {...S} />
                <strong>{progress.completedLessons.length}</strong> שיעורים
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)" }}>
                <Flame size={13} color="#F97316" strokeWidth={2} />
                <strong>{progress.streak}</strong> ימים
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ LEARNING PATH ══ */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <BookOpen size={22} color="var(--primary)" {...S} />
          <h2>מסלול הלמידה המומלץ</h2>
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: 20 }}>
          עוקבים אחרי הסדר הזה — כל שיעור בנוי על הקודם
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {STEPS.map((step) => {
            const done = progress.completedLessons.includes(step.id);
            return (
              <Link key={step.id} href={step.href} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{
                  padding: "18px 22px",
                  display: "flex", alignItems: "center", gap: 18,
                  borderColor: done ? "rgba(13,92,85,0.25)" : "var(--border)",
                  background: done ? "rgba(13,92,85,0.02)" : "var(--bg-card)",
                }}>
                  {/* Number / check */}
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    background: done ? "rgba(13,92,85,0.1)" : "rgba(13,92,85,0.06)",
                    border: `2px solid ${done ? "rgba(13,92,85,0.35)" : "rgba(13,92,85,0.16)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {done
                      ? <CheckCircle size={22} color="var(--primary)" strokeWidth={2} />
                      : <span style={{ fontSize: 16, fontWeight: 900, color: "var(--primary)" }}>{step.n}</span>}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 4 }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {step.desc}
                    </div>
                  </div>

                  {/* Right side */}
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 6, justifyContent: "center" }}>
                      <Clock size={12} {...S} />
                      {step.time}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem", fontWeight: 700, color: done ? "var(--primary)" : "var(--primary-light)", justifyContent: "center" }}>
                      {done ? "הושלם" : "להתחיל"}
                      {!done && <ChevronLeft size={14} strokeWidth={2.5} color="var(--primary-light)" />}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ══ TOOLS GRID ══ */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Terminal size={22} color="var(--primary)" {...S} />
          <h2>כלי הלמידה</h2>
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: 20 }}>
          כל כלי פתוח בכל עת — אפשר לעבור ביניהם חופשית
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))", gap: 14 }}>
          {MODULES.map(({ href, Icon, title, desc, color }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{
                padding: "22px 20px",
                borderTop: `3px solid ${color}`,
                height: "100%",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 14,
                  background: `${color}12`,
                  border: `1.5px solid ${color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color={color} strokeWidth={1.75} />
                </div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 7 }}>
                  {title}
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  {desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
