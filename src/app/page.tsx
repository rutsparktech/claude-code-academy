"use client";
import Link from "next/link";
import { useUserProgress } from "@/store/AppStore";
import { BookOpen, Terminal, GitBranch, Trophy, NotebookPen, Zap, Flame, CheckCircle, Clock, ChevronLeft, Award, GraduationCap, GitBranch as Github, Globe, Lock, Code2 } from "lucide-react";

const LEARNING_PATH = [
  { id: "terminal-basics",    n: 1, Icon: Terminal,  title: "Terminal",          subtitle: "הכלי הבסיסי", desc: "לפני GitHub, לפני Vercel, לפני הכל — Terminal הוא השפה שמחברת בין כל הכלים.", time: "25 דק'", href: "/lessons/terminal-basics",   color: "#0D5C55" },
  { id: "git-basics",         n: 2, Icon: GitBranch, title: "Git",               subtitle: "מכונת הזמן",   desc: "שמרו כל שינוי, חיזרו לכל גרסה. Git הוא הבסיס שכל מפתח בעולם משתמש בו.", time: "30 דק'", href: "/lessons/git-basics",         color: "#0077B5" },
  { id: "github-basics",      n: 3, Icon: GitBranch as Github,    title: "GitHub",            subtitle: "הקוד בענן",    desc: "פתחו חשבון, העלו פרויקט, שתפו עם העולם. GitHub = הבית של הקוד שלכם.", time: "30 דק'", href: "/lessons/github-basics",      color: "#333333" },
  { id: "deploy-vercel",      n: 4, Icon: Globe,     title: "Vercel",            subtitle: "אתר חי!",      desc: "מהקוד בGitHub לאתר עם כתובת — תוך 5 דקות, בחינם. כל push = עדכון אוטומטי.", time: "25 דק'", href: "/lessons/deploy-vercel",      color: "#6B46C1" },
  { id: "claude-code-intro",  n: 5, Icon: Code2,     title: "Claude Code",       subtitle: "AI שכותב",     desc: "AI שרץ ב-Terminal, קורא קבצים, כותב קוד, ועושה push — כל מה שלמדנו, אוטומטית.", time: "35 דק'", href: "/lessons/claude-code-intro",  color: "#0D5C55" },
  { id: "advanced-prompts",   n: 6, Icon: BookOpen,  title: "Prompts מדויקים",  subtitle: "לתקשר עם AI",  desc: "ההבדל בין תוצאה בינונית למדהימה הוא באיך מדברים עם Claude Code.", time: "30 דק'", href: "/lessons/advanced-prompts",   color: "#14B8A6" },
  { id: "security-basics",    n: 7, Icon: Lock,      title: "אבטחה",            subtitle: "הגנה על הפרויקט", desc: "שגיאה אחת יכולה לחשוף סיסמאות או לעלות כסף. למדו מה לעולם לא לשים בקוד.", time: "35 דק'", href: "/lessons/security-basics",    color: "#DC2626" },
  { id: "system-architecture", n: 8, Icon: GraduationCap, title: "פרויקט מלא", subtitle: "מאפס עד Vercel", desc: "הכל ביחד — בנו אפליקציה אמיתית עם Claude Code ופרסו אותה לאינטרנט.", time: "60 דק'", href: "/lessons/system-architecture", color: "#F97316" },
];

const TOOLS = [
  { href: "/terminal",   Icon: Terminal,    title: "סימולטור Terminal", desc: "תרגלו פקודות בסביבה בטוחה",         color: "#0D5C55" },
  { href: "/git",        Icon: GitBranch,   title: "Git Visualizer",    desc: "ראו גרפים אינטראקטיביים של commits", color: "#0077B5" },
  { href: "/challenges", Icon: Trophy,      title: "אתגרים",            desc: "בחנו את הידע שצברתם",               color: "#F97316" },
  { href: "/journal",    Icon: NotebookPen, title: "יומן למידה",        desc: "תעדו מה למדתם כל יום",              color: "#8B5CF6" },
];

const S = { strokeWidth: 1.75 };

export default function HomePage() {
  const progress = useUserProgress();
  const xpPct = progress.xp % 100;
  const doneCount = progress.completedLessons.length;

  return (
    <div style={{ padding: "32px 28px", maxWidth: 1000, margin: "0 auto" }}>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, rgba(13,92,85,0.07), rgba(20,184,166,0.04))", border: "1.5px solid rgba(13,92,85,0.13)", borderRadius: 18, padding: "32px 36px", marginBottom: 36, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -50, left: -50, width: 180, height: 180, background: "radial-gradient(circle, rgba(13,92,85,0.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h1 style={{ marginBottom: 10 }}>ברוכים הבאים ל-Claude Code Academy</h1>
          <p style={{ fontSize: "1.05rem", marginBottom: 24, maxWidth: 560 }}>
            מהצעד הראשון בTerminal ועד לאפליקציה חיה בVercel — לומדים הכל עם Claude Code.
            <strong style={{ color: "var(--primary)" }}> ללא רקע קודם.</strong>
          </p>

          {/* Stats */}
          <div style={{ background: "white", borderRadius: 14, padding: "16px 20px", display: "inline-flex", flexDirection: "column", gap: 10, minWidth: 300, boxShadow: "0 2px 14px rgba(13,92,85,0.1)", border: "1.5px solid rgba(13,92,85,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700, color: "var(--primary)" }}>
                <Award size={14} color="var(--primary)" {...S} /> רמה {progress.level}
              </span>
              <span style={{ color: "var(--text-muted)" }}>{xpPct}/100 XP</span>
            </div>
            <div style={{ height: 8, background: "rgba(13,92,85,0.1)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${xpPct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s" }} />
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 12.5, color: "var(--text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Zap size={12} color="#14B8A6" strokeWidth={2} />{progress.xp} XP</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={12} color="var(--primary)" {...S} />{doneCount}/{LEARNING_PATH.length} שיעורים</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Flame size={12} color="#F97316" strokeWidth={2} />{progress.streak} ימים</span>
            </div>
          </div>
        </div>
      </div>

      {/* LEARNING PATH */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <BookOpen size={22} color="var(--primary)" {...S} />
          <h2>מסלול הלמידה — מאפס לפרויקט חי</h2>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: "0.95rem" }}>
          כל שיעור בנוי על הקודם. עוקבים לפי הסדר ומגיעים עם אפליקציה אמיתית פרוסה באינטרנט.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LEARNING_PATH.map((step) => {
            const done = progress.completedLessons.includes(step.id);
            return (
              <Link key={step.id} href={step.href} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{
                  padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
                  borderColor: done ? "rgba(13,92,85,0.25)" : "var(--border)",
                  borderRight: `4px solid ${done ? "#0D5C55" : step.color}`,
                }}>
                  {/* Number circle */}
                  <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: done ? "rgba(13,92,85,0.1)" : `${step.color}12`, border: `2px solid ${done ? "rgba(13,92,85,0.35)" : step.color + "40"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {done
                      ? <CheckCircle size={20} color="#0D5C55" strokeWidth={2} />
                      : <step.Icon size={19} color={step.color} strokeWidth={1.75} />}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)" }}>{step.title}</span>
                      <span style={{ fontSize: "0.78rem", background: `${step.color}12`, border: `1px solid ${step.color}30`, color: step.color, borderRadius: 999, padding: "1px 9px", fontWeight: 600 }}>{step.subtitle}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                  </div>

                  {/* Right */}
                  <div style={{ flexShrink: 0, textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 5, justifyContent: "center" }}>
                      <Clock size={11} {...S} />{step.time}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem", fontWeight: 700, color: done ? "#0D5C55" : step.color, justifyContent: "center" }}>
                      {done ? "הושלם ✓" : <><span>להתחיל</span><ChevronLeft size={14} strokeWidth={2.5} /></>}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* TOOLS */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Terminal size={20} color="var(--primary)" {...S} />
          <h2>כלי תרגול</h2>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: 18, fontSize: "0.95rem" }}>פתוחים תמיד — תרגלו מתי שרוצים</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {TOOLS.map(({ href, Icon, title, desc, color }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: "18px 16px", borderTop: `3px solid ${color}`, height: "100%" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, marginBottom: 12, background: `${color}12`, border: `1.5px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={color} strokeWidth={1.75} />
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
