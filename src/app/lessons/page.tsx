"use client";
import Link from "next/link";
import { LESSONS } from "@/data/lessons";
import { useUserProgress } from "@/store/AppStore";
import { CheckCircle, Clock, Zap, List, BookOpen, Gauge } from "lucide-react";

const DIFF: Record<string, { bg: string; border: string; color: string }> = {
  "מתחיל":  { bg: "rgba(13,92,85,0.07)",  border: "rgba(13,92,85,0.22)",  color: "#0D5C55" },
  "בינוני": { bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.22)", color: "#EA6C00" },
  "מתקדם":  { bg: "rgba(220,38,38,0.07)",  border: "rgba(220,38,38,0.22)",  color: "#DC2626" },
};

const LESSON_ICONS: Record<string, string> = {
  "terminal-basics":   "⌨️",
  "git-basics":        "🌿",
  "nodejs-basics":     "💚",
  "claude-code-intro": "🤖",
  "advanced-prompts":  "✍️",
  "security-basics":   "🔒",
  "deploy-vercel":     "🚀",
  "system-architecture":"🏗️",
};

const S = { strokeWidth: 1.75 };

export default function LessonsPage() {
  const progress = useUserProgress();
  const total = LESSONS.length;
  const done = progress.completedLessons.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ padding: "32px 32px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <BookOpen size={26} color="var(--primary)" {...S} />
          <h1>שיעורים</h1>
        </div>
        <p>לומדים צעד אחר צעד — מהיסודות ועד לעבודה אמיתית עם Claude Code</p>
      </div>

      {/* Progress summary */}
      <div style={{
        padding: "18px 22px",
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        borderRadius: 14, marginBottom: 28,
        display: "flex", gap: 28, alignItems: "center",
        boxShadow: "var(--shadow-sm)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>{done}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4, fontWeight: 600 }}>הושלמו</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--primary-light)", lineHeight: 1 }}>{total - done}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4, fontWeight: 600 }}>נותרו</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: 8, color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 600 }}>התקדמות כללית</span>
            <span style={{ fontWeight: 700, color: "var(--primary)" }}>{pct}%</span>
          </div>
          <div style={{ height: 8, background: "rgba(13,92,85,0.1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {LESSONS.map((lesson) => {
          const isDone = progress.completedLessons.includes(lesson.id);
          const lp = progress.lessonProgress[lesson.id];
          const stepsDone = lp?.completedSteps.length || 0;
          const stepsTotal = lesson.steps.length;
          const stepPct = stepsTotal > 0 ? (stepsDone / stepsTotal) * 100 : 0;
          const diff = DIFF[lesson.difficulty] || DIFF["מתחיל"];

          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: 22, height: "100%", display: "flex", flexDirection: "column" }}>

                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 13,
                    background: "rgba(13,92,85,0.07)",
                    border: "1.5px solid rgba(13,92,85,0.14)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26,
                  }}>
                    {LESSON_ICONS[lesson.id] || "📖"}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{
                      background: diff.bg, border: `1.5px solid ${diff.border}`,
                      color: diff.color, borderRadius: 999,
                      padding: "3px 11px", fontSize: "0.78rem", fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      <Gauge size={11} strokeWidth={2} />
                      {lesson.difficulty}
                    </span>
                    {isDone && <CheckCircle size={20} color="var(--primary)" strokeWidth={2} />}
                  </div>
                </div>

                {/* Title + desc */}
                <h3 style={{ fontSize: "1.02rem", marginBottom: 8 }}>{lesson.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6, flex: 1, marginBottom: 14 }}>
                  {lesson.description}
                </p>

                {/* Progress */}
                {stepPct > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 5 }}>
                      <span>{stepsDone}/{stepsTotal} שלבים</span>
                      <span style={{ fontWeight: 600 }}>{Math.round(stepPct)}%</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(13,92,85,0.1)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: `${stepPct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999 }} />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "0.82rem", color: "var(--text-muted)",
                  borderTop: "1.5px solid var(--border)", paddingTop: 12,
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} {...S} /> {lesson.duration} דק'
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Zap size={12} strokeWidth={2} color="var(--primary-light)" /> {lesson.xp} XP
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <List size={12} {...S} /> {stepsTotal} שלבים
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
