"use client";
import { useState } from "react";
import { useApp } from "@/store/AppStore";

const QUIZ_QUESTIONS = [
  { id: "q1", category: "Terminal", xp: 20, question: "איזו פקודה מציגה את התיקייה הנוכחית?", options: ["ls", "pwd", "cd", "mkdir"], correctIndex: 1, explanation: "pwd = Print Working Directory - מציג את הנתיב המלא של התיקייה הנוכחית" },
  { id: "q2", category: "Terminal", xp: 20, question: "מה עושה הפקודה 'ls -la'?", options: ["יוצר תיקייה חדשה", "מוחק קבצים", "מציג כל הקבצים כולל נסתרים עם פרטים מלאים", "מחליף תיקייה"], correctIndex: 2, explanation: "-l = פרטים ארוכים, -a = all (כולל נסתרים שמתחילים בנקודה)" },
  { id: "q3", category: "Git", xp: 30, question: "מה ההבדל בין 'git add' ל-'git commit'?", options: ["אין הבדל", "git add מוסיף לStaging, git commit שומר snapshot", "git add שולח לGitHub", "git commit מוחק קבצים"], correctIndex: 1, explanation: "Workflow: עבוד → git add (Staging) → git commit (snapshot)" },
  { id: "q4", category: "Git", xp: 30, question: "מה זה 'branch' ב-Git?", options: ["סוג commit מיוחד", "כלי לשינוי הודעה", "קו פיתוח עצמאי המאפשר עבודה מקבילה", "שיטה למחיקת commits"], correctIndex: 2, explanation: "Branch מאפשר לפתח פיצ'ר בלי להשפיע על main" },
  { id: "q5", category: "Node.js", xp: 25, question: "מה הפקודה ליצירת פרויקט Node.js חדש?", options: ["node new", "npm init", "npx create", "nodejs start"], correctIndex: 1, explanation: "npm init יוצר package.json - קובץ ההגדרות של הפרויקט" },
  { id: "q6", category: "Claude Code", xp: 40, question: "מהי הדרך להתקין Claude Code?", options: ["pip install claude-code", "npm install -g @anthropic-ai/claude-code", "brew install claude", "apt-get install claude"], correctIndex: 1, explanation: "Claude Code מותקן דרך npm כpackage גלובלי" },
  { id: "q7", category: "Terminal", xp: 15, question: "מה עושה 'cd ..'?", options: ["נכנס לתיקיית Documents", "חוזר לתיקייה הקודמת", "עולה תיקייה אחת למעלה", "מציג תיקיות"], correctIndex: 2, explanation: ".. מייצג את התיקייה שמעל הנוכחית" },
  { id: "q8", category: "Git", xp: 35, question: "מה עושה 'git merge'?", options: ["מוחק branch", "מאחד שינויים משני branches", "יוצר branch חדש", "מעתיק repository"], correctIndex: 1, explanation: "git merge מאחד שינויים מbranch אחד לאחר" },
];

const ACHIEVEMENTS = [
  { id: "first-lesson", icon: "🎓", title: "תלמיד ראשון", desc: "השלם שיעור ראשון", condition: (p: any) => p.completedLessons.length >= 1 },
  { id: "three-lessons", icon: "📚", title: "קורא נלהב", desc: "השלם 3 שיעורים", condition: (p: any) => p.completedLessons.length >= 3 },
  { id: "all-lessons", icon: "🏅", title: "בוגר האקדמיה", desc: "השלם את כל השיעורים", condition: (p: any) => p.completedLessons.length >= 8 },
  { id: "quiz-pass", icon: "✅", title: "עובר בחן", desc: "ענה נכון על שאלה אחת", condition: (p: any) => p.completedChallenges.length >= 1 },
  { id: "quiz-master", icon: "🔥", title: "מאסטר בחן", desc: "ענה נכון על 5 שאלות", condition: (p: any) => p.completedChallenges.length >= 5 },
  { id: "100-xp", icon: "⭐", title: "מאה XP!", desc: "צבור 100 XP", condition: (p: any) => p.xp >= 100 },
  { id: "500-xp", icon: "💎", title: "חמש מאות XP!", desc: "צבור 500 XP", condition: (p: any) => p.xp >= 500 },
  { id: "journal-start", icon: "📓", title: "יומן פתוח", desc: "כתוב רשומה ביומן", condition: (p: any) => p.journalEntries.length >= 1 },
];

export default function ChallengesPage() {
  const { state, dispatch } = useApp();
  const progress = state.userProgress;
  const [activeTab, setActiveTab] = useState<"quiz" | "achievements">("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const q = QUIZ_QUESTIONS[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctIndex) {
      setScore(s => s + 1);
      setTotalXP(x => x + q.xp);
      dispatch({ type: "ADD_XP", payload: q.xp });
      dispatch({ type: "COMPLETE_CHALLENGE", payload: q.id });
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1); setSelected(null); setAnswered(false);
    } else { setQuizDone(true); }
  };

  const resetQuiz = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setScore(0); setTotalXP(0); setQuizDone(false);
  };

  return (
    <div style={{ padding: "28px", maxWidth: 860, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>🏆 אתגרים</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>בחני את הידע שלך וצבור XP</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: "2px solid var(--border)" }}>
        {[{ id: "quiz", label: "❓ בחן ידע" }, { id: "achievements", label: "🏅 הישגים" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            style={{ background: "none", border: "none", borderBottom: activeTab === tab.id ? "2px solid var(--purple)" : "2px solid transparent", color: activeTab === tab.id ? "var(--purple)" : "var(--text-muted)", cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400, padding: "8px 18px", marginBottom: -2, fontFamily: "Heebo, sans-serif", transition: "all 0.2s" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══ QUIZ ══ */}
      {activeTab === "quiz" && !quizDone && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 13 }}>
            <span style={{ color: "var(--text-muted)" }}>שאלה {currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "#10B981", fontWeight: 600 }}>✅ {score} נכון</span>
              <span style={{ color: "var(--purple)", fontWeight: 600 }}>✨ {totalXP} XP</span>
            </div>
          </div>
          <div style={{ height: 5, background: "rgba(107,70,193,0.1)", borderRadius: 999, marginBottom: 24, overflow: "hidden" }}>
            <div style={{ width: `${(currentQ / QUIZ_QUESTIONS.length) * 100}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.4s ease" }} />
          </div>

          <div className="glass-card" style={{ padding: 26, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <span style={{ background: "rgba(107,70,193,0.08)", border: "1px solid rgba(107,70,193,0.2)", borderRadius: 999, padding: "2px 10px", fontSize: 11, color: "var(--purple)" }}>{q.category}</span>
              <span style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 999, padding: "2px 10px", fontSize: 11, color: "var(--teal)" }}>+{q.xp} XP</span>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.5, marginBottom: 22 }}>{q.question}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = i === selected;
                let bg = "var(--bg-card-hover)", border = "var(--border)", color = "var(--text-primary)";
                if (answered) {
                  if (isCorrect) { bg = "rgba(16,185,129,0.08)"; border = "rgba(16,185,129,0.35)"; color = "#059669"; }
                  else if (isSelected) { bg = "rgba(239,68,68,0.08)"; border = "rgba(239,68,68,0.35)"; color = "#DC2626"; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, color, cursor: answered ? "default" : "pointer", fontSize: 14, padding: "13px 16px", textAlign: "right", display: "flex", alignItems: "center", gap: 10, fontFamily: "Heebo, sans-serif", transition: "all 0.2s" }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: answered && isCorrect ? "#10B981" : answered && isSelected && !isCorrect ? "#EF4444" : "rgba(107,70,193,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, color: answered && (isCorrect || isSelected) ? "white" : "var(--purple)" }}>
                      {answered ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {answered && (
            <>
              <div style={{ padding: 16, marginBottom: 14, background: selected === q.correctIndex ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)", border: `1px solid ${selected === q.correctIndex ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`, borderRadius: 10 }}>
                <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 14, color: selected === q.correctIndex ? "#059669" : "#DC2626" }}>
                  {selected === q.correctIndex ? "✅ נכון! כל הכבוד!" : "❌ לא נכון - אבל עכשיו תדע!"}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{q.explanation}</div>
              </div>
              <button onClick={nextQuestion} style={{ width: "100%", background: "var(--gradient-primary)", border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "13px", fontFamily: "Heebo, sans-serif" }}>
                {currentQ < QUIZ_QUESTIONS.length - 1 ? "שאלה הבאה ←" : "סיים בחן 🎉"}
              </button>
            </>
          )}
        </div>
      )}

      {/* ══ RESULTS ══ */}
      {activeTab === "quiz" && quizDone && (
        <div className="glass-card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 14 }}>{score >= 6 ? "🏆" : score >= 4 ? "🎉" : "💪"}</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, color: "var(--text-primary)" }}>
            {score >= 6 ? "מצוין!" : score >= 4 ? "כל הכבוד!" : "המשך להתאמן!"}
          </h2>
          <div style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 28 }}>ענית נכון על {score} מתוך {QUIZ_QUESTIONS.length} שאלות</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 28 }}>
            {[{ label: "ציון", value: `${Math.round((score / QUIZ_QUESTIONS.length) * 100)}%`, color: "var(--purple)" },
              { label: "XP שנצבר", value: `${totalXP} ✨`, color: "var(--teal)" }].map(s => (
              <div key={s.label} style={{ padding: "16px 24px", background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button onClick={resetQuiz} style={{ background: "var(--gradient-primary)", border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "12px 28px", fontFamily: "Heebo, sans-serif" }}>
            🔄 נסה שוב
          </button>
        </div>
      )}

      {/* ══ ACHIEVEMENTS ══ */}
      {activeTab === "achievements" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {ACHIEVEMENTS.map(ach => {
            const unlocked = ach.condition(progress);
            return (
              <div key={ach.id} className="glass-card" style={{ padding: 20, borderColor: unlocked ? "rgba(107,70,193,0.3)" : "var(--border)", background: unlocked ? "linear-gradient(135deg, rgba(107,70,193,0.04), rgba(20,184,166,0.02))" : "var(--bg-card)" }}>
                <div style={{ fontSize: 36, marginBottom: 10, filter: unlocked ? "none" : "grayscale(1)", opacity: unlocked ? 1 : 0.5 }}>{ach.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: unlocked ? "var(--purple)" : "var(--text-secondary)", marginBottom: 4 }}>{ach.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{ach.desc}</div>
                {unlocked
                  ? <div style={{ marginTop: 10, fontSize: 11, color: "#059669", fontWeight: 700 }}>✅ הושג!</div>
                  : <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-muted)" }}>🔒 עוד לא</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
