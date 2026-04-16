"use client";
/**
 * Lesson Viewer - מציג שיעור צעד אחר צעד
 * תומך ב: הסבר, קוד, תרגיל, וסנדבוקס
 */

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
      <div style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
        <h2 style={{ color: "var(--text-primary)" }}>שיעור לא נמצא</h2>
        <button onClick={() => router.push("/lessons")}
          style={{ marginTop: 16, padding: "10px 24px", background: "var(--gradient-primary)", border: "none", borderRadius: 8, color: "white", cursor: "pointer" }}>
          חזור לשיעורים
        </button>
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

    if (currentStep === totalSteps - 1) {
      dispatch({ type: "COMPLETE_LESSON", payload: lesson.id });
    }
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

  return (
    <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>
      {/* ══ SIDEBAR: Steps List ══ */}
      <div style={{
        width: 240, borderLeft: "1px solid var(--border)",
        background: "var(--bg-card)", overflowY: "auto",
        padding: "20px 12px", flexShrink: 0,
      }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
            {lesson.icon} {lesson.title}
          </div>
          <div style={{ height: 4, background: "rgba(107,70,193,0.2)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
            {currentStep + 1}/{totalSteps}
          </div>
        </div>

        {lesson.steps.map((s, i) => {
          const isDone = completedSteps.has(s.id);
          const isActive = i === currentStep;
          const isLocked = i > currentStep + 1;
          return (
            <button
              key={s.id}
              onClick={() => !isLocked && setCurrentStep(i)}
              style={{
                width: "100%", textAlign: "right", background: isActive
                  ? "linear-gradient(135deg, rgba(107,70,193,0.2), rgba(20,184,166,0.1))"
                  : "transparent",
                border: isActive ? "1px solid rgba(107,70,193,0.3)" : "1px solid transparent",
                borderRadius: 10, padding: "10px 12px",
                cursor: isLocked ? "not-allowed" : "pointer",
                marginBottom: 4, display: "flex", alignItems: "center", gap: 10,
                opacity: isLocked ? 0.4 : 1, transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>
                {isDone ? "✅" : isActive ? "▶️" : isLocked ? "🔒" : s.type === "explanation" ? "📖" : s.type === "code" ? "💻" : s.type === "exercise" ? "🎯" : "⚡"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: isActive ? 700 : 400, color: isActive ? "var(--purple-light)" : "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  {s.type === "explanation" ? "הסבר" : s.type === "code" ? "קוד" : s.type === "exercise" ? "תרגיל" : "סנדבוקס"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
        {/* Step Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{
              background: step.type === "explanation" ? "rgba(107,70,193,0.1)"
                : step.type === "code" ? "rgba(20,184,166,0.1)"
                : step.type === "exercise" ? "rgba(245,158,11,0.1)"
                : "rgba(236,72,153,0.1)",
              border: `1px solid ${step.type === "explanation" ? "rgba(107,70,193,0.3)"
                : step.type === "code" ? "rgba(20,184,166,0.3)"
                : step.type === "exercise" ? "rgba(245,158,11,0.3)"
                : "rgba(236,72,153,0.3)"}`,
              borderRadius: 999, padding: "3px 12px", fontSize: 12,
              color: step.type === "explanation" ? "var(--purple-light)"
                : step.type === "code" ? "var(--teal-light)"
                : step.type === "exercise" ? "#F59E0B"
                : "#EC4899",
            }}>
              {step.type === "explanation" ? "📖 הסבר" : step.type === "code" ? "💻 קוד" : step.type === "exercise" ? "🎯 תרגיל" : "⚡ נסה בעצמך"}
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>שלב {currentStep + 1} מתוך {totalSteps}</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>{step.title}</h1>
        </div>

        {/* Content */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          {/* Markdown-ish content */}
          <div style={{ color: "var(--text-primary)", lineHeight: 1.8 }}>
            {step.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 20, fontWeight: 800, margin: "16px 0 8px", color: "var(--text-primary)" }}>{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, margin: "12px 0 6px", color: "var(--purple-light)" }}>{line.slice(4)}</h3>;
              if (line.startsWith("- ")) return <div key={i} style={{ display: "flex", gap: 8, margin: "4px 0" }}><span style={{ color: "var(--teal)" }}>•</span><span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{line.slice(2)}</span></div>;
              if (line.startsWith("> ")) return <div key={i} style={{ borderRight: "3px solid var(--teal)", paddingRight: 12, margin: "8px 0", color: "var(--text-secondary)", fontSize: 14 }}>{line.slice(2)}</div>;
              if (line.startsWith("**") && line.includes("**")) {
                return <p key={i} style={{ margin: "4px 0", fontSize: 14, color: "var(--text-secondary)" }}
                  dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>') }} />;
              }
              if (line === "") return <div key={i} style={{ height: 8 }} />;
              return <p key={i} style={{ margin: "4px 0", fontSize: 14, color: "var(--text-secondary)" }}>{line}</p>;
            })}
          </div>
        </div>

        {/* Code Block */}
        {step.code && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>💻 קוד לדוגמה</h3>
              <button
                onClick={() => navigator.clipboard.writeText(step.code!)}
                style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 6, color: "var(--teal-light)", cursor: "pointer", fontSize: 12, padding: "4px 10px" }}
              >
                📋 העתק
              </button>
            </div>
            <div className="terminal" style={{ padding: 20, overflowX: "auto" }}>
              <pre style={{ fontSize: 13, lineHeight: 1.7, color: "#E2E8F0", margin: 0 }}>
                {step.code.split("\n").map((line, i) => (
                  <div key={i}>
                    {line.startsWith("#") ? (
                      <span style={{ color: "#6B7280" }}>{line}</span>
                    ) : line.startsWith("# Output:") || line.includes("Output:") ? (
                      <span style={{ color: "#14B8A6" }}>{line}</span>
                    ) : (
                      <span style={{ color: "#93C5FD" }}>{line}</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>
            {step.explanation && (
              <div style={{ marginTop: 12, padding: 16, background: "rgba(107,70,193,0.05)", border: "1px solid rgba(107,70,193,0.15)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--purple-light)", marginBottom: 8 }}>💡 הסבר:</div>
                {step.explanation.trim().split("\n").filter(l => l.trim()).map((line, i) => (
                  <p key={i} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: "2px 0" }}
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
              background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 8, color: "#F59E0B", cursor: "pointer", fontSize: 13, padding: "8px 16px",
            }}>
              {showHint ? "🙈 הסתר רמז" : "💡 הראה רמז"}
            </button>
            {showHint && (
              <div style={{ marginTop: 12, padding: 16, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10 }}>
                {step.hint.trim().split("\n").map((line, i) => (
                  <p key={i} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, margin: "2px 0" }}
                    dangerouslySetInnerHTML={{ __html: line.replace(/`(.*?)`/g, '<code style="background:rgba(20,184,166,0.1);padding:2px 6px;border-radius:4px;color:var(--teal-light);font-family:monospace">$1</code>') }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mini Terminal for sandbox */}
        {step.type === "sandbox" && <MiniTerminal />}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <button onClick={goPrev} disabled={currentStep === 0} style={{
            background: "var(--bg-card-hover)", border: "1px solid var(--border)",
            borderRadius: 10, color: "var(--text-secondary)", cursor: currentStep === 0 ? "not-allowed" : "pointer",
            fontSize: 14, fontWeight: 600, padding: "12px 24px", opacity: currentStep === 0 ? 0.4 : 1,
            fontFamily: "Heebo, sans-serif",
          }}>
            ← הקודם
          </button>

          <button onClick={goNext} style={{
            background: "var(--gradient-primary)", border: "none",
            borderRadius: 10, color: "white", cursor: "pointer",
            fontSize: 14, fontWeight: 700, padding: "12px 32px",
            boxShadow: "0 4px 15px rgba(107,70,193,0.3)",
            fontFamily: "Heebo, sans-serif",
          }}>
            {currentStep === totalSteps - 1 ? "✅ סיים שיעור!" : "הבא →"}
          </button>
        </div>
      </div>
    </div>
  );
}
