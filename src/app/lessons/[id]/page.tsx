"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLessonById } from "@/data/lessons";
import { useApp } from "@/store/AppStore";
import MiniTerminal from "@/components/terminal/MiniTerminal";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { dispatch } = useApp();
  const lesson = getLessonById(params.id as string);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);

  if (!lesson) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>😕</div>
        <h2 style={{ marginBottom: 16 }}>שיעור לא נמצא</h2>
        <button onClick={() => router.push("/lessons")} className="btn-primary">חזרה לשיעורים</button>
      </div>
    );
  }

  const step = lesson.steps[currentStep];
  const totalSteps = lesson.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const markStepComplete = () => {
    const newCompleted = new Set(completedSteps).add(step.id);
    setCompletedSteps(newCompleted);
    dispatch({ type: "COMPLETE_LESSON_STEP", payload: { lessonId: lesson.id, stepId: step.id } });
    dispatch({ type: "ADD_XP", payload: Math.floor(lesson.xp / totalSteps) });
    if (currentStep === totalSteps - 1) dispatch({ type: "COMPLETE_LESSON", payload: lesson.id });
  };

  const goNext = () => {
    if (!completedSteps.has(step.id)) markStepComplete();
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    else router.push("/lessons");
    setShowHint(false);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    setShowHint(false);
  };

  const TYPE_LABEL: Record<string, string> = {
    explanation: "📖 הסבר", code: "💻 קוד", exercise: "🎯 תרגיל", sandbox: "⚡ סנדבוקס"
  };
  const TYPE_COLOR: Record<string, string> = {
    explanation: "var(--purple)", code: "var(--teal)", exercise: "#B45309", sandbox: "#DB2777"
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>

      {/* ══ STEPS SIDEBAR ══ */}
      <div style={{ width: 252, borderLeft: "1.5px solid var(--border)", background: "var(--bg-card)", overflowY: "auto", padding: "18px 10px", flexShrink: 0 }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4, fontWeight: 600 }}>
            {lesson.icon} {lesson.title}
          </div>
          <div style={{ height: 5, background: "rgba(76,42,158,0.1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{currentStep + 1} מתוך {totalSteps}</div>
        </div>

        {lesson.steps.map((s, i) => {
          const isDone = completedSteps.has(s.id);
          const isActive = i === currentStep;
          const isLocked = i > currentStep + 1;
          return (
            <button key={s.id} onClick={() => !isLocked && setCurrentStep(i)} style={{
              width: "100%", textAlign: "right",
              background: isActive ? "linear-gradient(135deg, rgba(76,42,158,0.1), rgba(10,122,112,0.06))" : "transparent",
              border: `1px solid ${isActive ? "rgba(76,42,158,0.25)" : "transparent"}`,
              borderRadius: 10, padding: "10px 11px", cursor: isLocked ? "not-allowed" : "pointer",
              marginBottom: 4, display: "flex", alignItems: "center", gap: 10,
              opacity: isLocked ? 0.45 : 1, transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>
                {isDone ? "✅" : isActive ? "▶️" : isLocked ? "🔒" : s.type === "explanation" ? "📖" : s.type === "code" ? "💻" : s.type === "exercise" ? "🎯" : "⚡"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: isActive ? 700 : 500, color: isActive ? "var(--purple)" : "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{TYPE_LABEL[s.type]}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>

        {/* Step type badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: `${TYPE_COLOR[step.type]}15`, border: `1.5px solid ${TYPE_COLOR[step.type]}35`, color: TYPE_COLOR[step.type], borderRadius: 999, padding: "4px 14px", fontSize: "0.85rem", fontWeight: 700 }}>
            {TYPE_LABEL[step.type]}
          </span>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>שלב {currentStep + 1} מתוך {totalSteps}</span>
        </div>

        <h1 style={{ marginBottom: 20 }}>{step.title}</h1>

        {/* Content */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <div className="lesson-content">
            {step.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} style={{ margin: "18px 0 10px" }}>{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} style={{ margin: "14px 0 8px", color: "var(--purple-light)" }}>{line.slice(4)}</h3>;
              if (line.startsWith("- ")) return (
                <div key={i} style={{ display: "flex", gap: 10, margin: "6px 0", fontSize: "1rem", lineHeight: 1.65 }}>
                  <span style={{ color: "var(--teal)", fontWeight: 700, marginTop: 2 }}>•</span>
                  <span style={{ color: "var(--text-secondary)" }}
                    dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>').replace(/`(.*?)`/g, '<code style="background:rgba(76,42,158,0.08);padding:2px 7px;border-radius:5px;color:var(--purple);font-size:0.9em;font-family:JetBrains Mono,monospace">$1</code>') }} />
                </div>
              );
              if (line.startsWith("> ")) return (
                <div key={i} style={{ borderRight: "3px solid var(--teal)", paddingRight: 14, margin: "10px 0", color: "var(--text-secondary)", fontStyle: "italic", fontSize: "0.97rem" }}>
                  {line.slice(2)}
                </div>
              );
              if (line === "") return <div key={i} style={{ height: 10 }} />;
              return (
                <p key={i} style={{ margin: "5px 0", fontSize: "1rem" }}
                  dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>').replace(/`(.*?)`/g, '<code style="background:rgba(76,42,158,0.08);padding:2px 7px;border-radius:5px;color:var(--purple);font-size:0.9em;font-family:JetBrains Mono,monospace">$1</code>') }} />
              );
            })}
          </div>
        </div>

        {/* Code Block */}
        {step.code && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3>💻 קוד לדוגמה</h3>
              <button onClick={() => navigator.clipboard.writeText(step.code!)}
                style={{ background: "rgba(10,122,112,0.08)", border: "1.5px solid rgba(10,122,112,0.2)", borderRadius: 8, color: "var(--teal)", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, padding: "5px 12px", fontFamily: "Heebo, sans-serif" }}>
                📋 העתקה
              </button>
            </div>
            <div className="terminal" style={{ padding: 22, overflowX: "auto" }}>
              <pre style={{ margin: 0 }}>
                {step.code.split("\n").map((line, i) => (
                  <div key={i} style={{ lineHeight: 1.8 }}>
                    {line.startsWith("#") ? (
                      <span className="terminal-comment">{line}</span>
                    ) : line.includes("Output:") || line.includes("output:") ? (
                      <span className="terminal-success">{line}</span>
                    ) : (
                      <span className="terminal-command">{line}</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>
            {step.explanation && (
              <div style={{ marginTop: 14, padding: 18, background: "rgba(76,42,158,0.05)", border: "1.5px solid rgba(76,42,158,0.15)", borderRadius: 10 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--purple)", marginBottom: 8 }}>💡 הסבר:</div>
                {step.explanation.trim().split("\n").filter(l => l.trim()).map((line, i) => (
                  <p key={i} style={{ fontSize: "0.95rem", marginBottom: 4, lineHeight: 1.65 }}
                    dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>') }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {step.hint && (
          <div style={{ marginBottom: 20 }}>
            <button onClick={() => setShowHint(!showHint)} style={{
              background: "rgba(217,119,6,0.08)", border: "1.5px solid rgba(217,119,6,0.25)",
              borderRadius: 9, color: "#B45309", cursor: "pointer", fontSize: "0.95rem", fontWeight: 600,
              padding: "9px 18px", fontFamily: "Heebo, sans-serif"
            }}>
              {showHint ? "🙈 הסתרת הרמז" : "💡 הצגת רמז"}
            </button>
            {showHint && (
              <div style={{ marginTop: 12, padding: 18, background: "rgba(217,119,6,0.05)", border: "1.5px solid rgba(217,119,6,0.2)", borderRadius: 10 }}>
                {step.hint.trim().split("\n").map((line, i) => (
                  <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 4 }}
                    dangerouslySetInnerHTML={{ __html: line.replace(/`(.*?)`/g, '<code style="background:rgba(10,122,112,0.1);padding:2px 8px;border-radius:5px;color:var(--teal);font-family:JetBrains Mono,monospace;font-size:0.9em">$1</code>') }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sandbox */}
        {step.type === "sandbox" && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ marginBottom: 12 }}>⚡ סנדבוקס — מתרגלים כאן!</h3>
            <MiniTerminal />
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "1.5px solid var(--border)" }}>
          <button onClick={goPrev} disabled={currentStep === 0} style={{
            background: "var(--bg-card)", border: "1.5px solid var(--border)",
            borderRadius: 10, color: "var(--text-secondary)", cursor: currentStep === 0 ? "not-allowed" : "pointer",
            fontSize: "1rem", fontWeight: 600, padding: "12px 26px", opacity: currentStep === 0 ? 0.4 : 1,
            fontFamily: "Heebo, sans-serif",
          }}>
            ← הקודם
          </button>
          <button onClick={goNext} className="btn-primary" style={{ padding: "12px 34px", fontSize: "1rem" }}>
            {currentStep === totalSteps - 1 ? "✅ סיום השיעור!" : "הבא →"}
          </button>
        </div>
      </div>
    </div>
  );
}
