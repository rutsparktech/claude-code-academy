"use client";
import Link from "next/link";
import { LESSONS } from "@/data/lessons";
import { useUserProgress } from "@/store/AppStore";

export default function LessonsPage() {
  const progress = useUserProgress();

  return (
    <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "var(--text-primary)" }}>
          📚 שיעורים
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
          למד צעד אחר צעד - מהיסודות ועד המתקדם
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {LESSONS.map((lesson, i) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const lessonProg = progress.lessonProgress[lesson.id];
          const stepsCompleted = lessonProg?.completedSteps.length || 0;
          const totalSteps = lesson.steps.length;
          const pct = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;

          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{
                padding: 24,
                opacity: 1,
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 36 }}>{lesson.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{
                      background: lesson.difficulty === "מתחיל"
                        ? "rgba(20,184,166,0.1)" : lesson.difficulty === "בינוני"
                        ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
                      border: `1px solid ${lesson.difficulty === "מתחיל"
                        ? "rgba(20,184,166,0.3)" : lesson.difficulty === "בינוני"
                        ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}`,
                      borderRadius: 999, padding: "2px 10px", fontSize: 11,
                      color: lesson.difficulty === "מתחיל" ? "var(--teal-light)"
                        : lesson.difficulty === "בינוני" ? "#F59E0B" : "#EF4444",
                    }}>
                      {lesson.difficulty}
                    </span>
                    {isCompleted && <span style={{ fontSize: 20 }}>✅</span>}
                    
                  </div>
                </div>

                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                  {lesson.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                  {lesson.description}
                </p>

                {/* Progress */}
                {pct > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                      <span>{stepsCompleted}/{totalSteps} שלבים</span>
                      <span>{Math.round(pct)}%</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(107,70,193,0.2)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999 }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
                  <span>⏱️ {lesson.duration} דקות</span>
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
