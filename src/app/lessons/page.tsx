"use client";
import Link from "next/link";
import { LESSONS } from "@/data/lessons";
import { useUserProgress } from "@/store/AppStore";

const DIFFICULTY_STYLE: Record<string, { bg: string; border: string; color: string }> = {
  "מתחיל":  { bg: "rgba(10,122,112,0.08)",  border: "rgba(10,122,112,0.25)",  color: "#0A7A70" },
  "בינוני": { bg: "rgba(217,119,6,0.08)",   border: "rgba(217,119,6,0.25)",   color: "#B45309" },
  "מתקדם":  { bg: "rgba(220,38,38,0.08)",   border: "rgba(220,38,38,0.25)",   color: "#DC2626" },
};

export default function LessonsPage() {
  const progress = useUserProgress();

  return (
    <div style={{ padding: "32px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>📚 שיעורים</h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)" }}>
          לומדים צעד אחר צעד — מהיסודות ועד לעבודה אמיתית עם Claude Code
        </p>
      </div>

      {/* Progress summary */}
      <div style={{ padding: 18, background: "var(--bg-card)", border: "1.5px solid var(--border)", borderRadius: 12, marginBottom: 28, display: "flex", gap: 28, alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--purple)" }}>{progress.completedLessons.length}</div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>הושלמו</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--teal)" }}>{LESSONS.length - progress.completedLessons.length}</div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>נותרו</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: 6, color: "var(--text-secondary)" }}>
            <span>התקדמות כללית</span>
            <span style={{ fontWeight: 700 }}>{Math.round((progress.completedLessons.length / LESSONS.length) * 100)}%</span>
          </div>
          <div style={{ height: 8, background: "rgba(76,42,158,0.1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${(progress.completedLessons.length / LESSONS.length) * 100}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {LESSONS.map((lesson, i) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const lessonProg = progress.lessonProgress[lesson.id];
          const stepsCompleted = lessonProg?.completedSteps.length || 0;
          const totalSteps = lesson.steps.length;
          const pct = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;
          const diffStyle = DIFFICULTY_STYLE[lesson.difficulty] || DIFFICULTY_STYLE["מתחיל"];

          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: 22, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 36 }}>{lesson.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ background: diffStyle.bg, border: `1px solid ${diffStyle.border}`, color: diffStyle.color, borderRadius: 999, padding: "3px 12px", fontSize: "0.8rem", fontWeight: 700 }}>
                      {lesson.difficulty}
                    </span>
                    {isCompleted && <span style={{ fontSize: "1.1rem" }}>✅</span>}
                  </div>
                </div>

                {/* Content */}
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{lesson.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                  {lesson.description}
                </p>

                {/* Progress bar */}
                {pct > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 4 }}>
                      <span>{stepsCompleted}/{totalSteps} שלבים</span>
                      <span>{Math.round(pct)}%</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(76,42,158,0.1)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999 }} />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  <span>⏱️ {lesson.duration} דק'</span>
                  <span>✨ {lesson.xp} XP</span>
                  <span>📑 {totalSteps} שלבים</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
