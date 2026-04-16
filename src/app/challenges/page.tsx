"use client";
/**
 * Challenges - אתגרים ובחנים
 * כולל: אתגר יומי, בחני quiz, מערכת XP, ולוח תוצאות
 */

import { useState } from "react";
import { useApp } from "@/store/AppStore";

// ════════════════════════════════════
// DATA
// ════════════════════════════════════
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xp: number;
  category: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1", category: "Terminal", xp: 20,
    question: "איזו פקודה מציגה את התיקייה הנוכחית?",
    options: ["ls", "pwd", "cd", "mkdir"],
    correctIndex: 1,
    explanation: "pwd = Print Working Directory - מציג את הנתיב המלא של התיקייה הנוכחית",
  },
  {
    id: "q2", category: "Terminal", xp: 20,
    question: "מה עושה הפקודה 'ls -la'?",
    options: ["יוצר תיקייה חדשה", "מוחק קבצים", "מציג כל הקבצים כולל נסתרים עם פרטים מלאים", "מחליף תיקייה"],
    correctIndex: 2,
    explanation: "-l = פרטים ארוכים, -a = all (כולל נסתרים שמתחילים בנקודה)",
  },
  {
    id: "q3", category: "Git", xp: 30,
    question: "מה ההבדל בין 'git add' ל-'git commit'?",
    options: [
      "אין הבדל, הן אותה פקודה",
      "git add שומר לStagging Area, git commit שומר snapshot",
      "git add שולח לGitHub, git commit שומר מקומית",
      "git commit מוחק קבצים, git add מוסיף",
    ],
    correctIndex: 1,
    explanation: "Workflow: עבוד על קבצים → git add (Staging) → git commit (snapshot) → git push (שרת)",
  },
  {
    id: "q4", category: "Git", xp: 30,
    question: "מה זה 'branch' ב-Git?",
    options: [
      "סוג של commit מיוחד",
      "כלי לשינוי הודעת commit",
      "קו פיתוח עצמאי המאפשר עבודה מקבילה",
      "שיטה למחיקת commits",
    ],
    correctIndex: 2,
    explanation: "Branch הוא מצביע לcommit מסוים. יצירת branch מאפשרת לפתח פיצ'ר בלי להשפיע על main",
  },
  {
    id: "q5", category: "Node.js", xp: 25,
    question: "מה הפקודה ליצירת פרויקט Node.js חדש?",
    options: ["node new", "npm init", "npx create", "nodejs start"],
    correctIndex: 1,
    explanation: "npm init יוצר package.json - קובץ ההגדרות של פרויקט Node.js. npm init -y ייצור עם ברירות מחדל",
  },
  {
    id: "q6", category: "Claude Code", xp: 40,
    question: "מהי הדרך הנכונה להתקין Claude Code?",
    options: [
      "pip install claude-code",
      "npm install -g @anthropic-ai/claude-code",
      "brew install claude",
      "apt-get install claude",
    ],
    correctIndex: 1,
    explanation: "Claude Code מותקן דרך npm כpackage גלובלי. לאחר ההתקנה הרץ 'claude' בterminal",
  },
  {
    id: "q7", category: "Terminal", xp: 15,
    question: "מה עושה 'cd ..'?",
    options: ["נכנס לתיקיית Documents", "חוזר לתיקייה הקודמת", "עולה תיקייה אחת למעלה", "מציג תיקיות"],
    correctIndex: 2,
    explanation: ".. מייצג את התיקייה שמעל הנוכחית. cd .. = עלה תיקייה. cd ../.. = עלה שתי תיקיות",
  },
  {
    id: "q8", category: "Git", xp: 35,
    question: "מה עושה 'git merge'?",
    options: [
      "מוחק branch",
      "מאחד שינויים משני branches",
      "יוצר branch חדש",
      "מעתיק repository",
    ],
    correctIndex: 1,
    explanation: "git merge מאחד שינויים מbranch אחד לאחר. לדוגמה: git merge feature מוסיף שינויי feature לbranch הנוכחי",
  },
];

const DAILY_CHALLENGE = {
  title: "🏗️ בנה מבנה פרויקט",
  description: "בנה את מבנה התיקיות הבא בעזרת פקודות Terminal:",
  structure: `my-app/
  ├── src/
  │   ├── index.js
  │   └── utils/
  │       └── helpers.js
  ├── tests/
  └── README.md`,
  commands: [
    "mkdir my-app && cd my-app",
    "mkdir src tests",
    "mkdir src/utils",
    "touch src/index.js src/utils/helpers.js",
    "touch tests/README.md",
  ],
  xp: 75,
  difficulty: "בינוני",
};

const ACHIEVEMENTS = [
  { id: "first-lesson", icon: "🎓", title: "תלמיד ראשון", desc: "השלם שיעור ראשון", unlocked: false },
  { id: "terminal-pro", icon: "⌨️", title: "מאסטר Terminal", desc: "הרץ 50 פקודות", unlocked: false },
  { id: "git-hero", icon: "🌿", title: "גיבור Git", desc: "צור 10 commits", unlocked: false },
  { id: "quiz-streak", icon: "🔥", title: "רצף בחנים", desc: "ענה נכון על 5 שאלות ברצף", unlocked: false },
  { id: "100-xp", icon: "⭐", title: "מאה XP!", desc: "צבור 100 XP", unlocked: false },
  { id: "daily-3", icon: "📅", title: "עקבי", desc: "השלם אתגר יומי 3 ימים ברצף", unlocked: false },
];

const LEADERBOARD = [
  { rank: 1, name: "אבי כ.", xp: 2450, level: 25, badge: "🥇" },
  { rank: 2, name: "רחל מ.", xp: 2100, level: 22, badge: "🥈" },
  { rank: 3, name: "יוסי ל.", xp: 1890, level: 19, badge: "🥉" },
  { rank: 4, name: "מיכל ש.", xp: 1560, level: 16, badge: "🏅" },
  { rank: 5, name: "דניאל ב.", xp: 1200, level: 13, badge: "🏅" },
];

// ════════════════════════════════════
// COMPONENT
// ════════════════════════════════════
export default function ChallengesPage() {
  const { dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<"quiz" | "daily" | "achievements" | "leaderboard">("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [dailyDone, setDailyDone] = useState(false);
  const [showDailyAnswer, setShowDailyAnswer] = useState(false);

  const q = QUIZ_QUESTIONS[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctIndex) {
      setScore(s => s + 1);
      setTotalXP(x => x + q.xp);
      setStreak(s => s + 1);
      dispatch({ type: "ADD_XP", payload: q.xp });
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0); setSelected(null);
    setAnswered(false); setScore(0);
    setTotalXP(0); setQuizDone(false); setStreak(0);
  };

  const TABS = [
    { id: "quiz", label: "❓ בחן", },
    { id: "daily", label: "📅 אתגר יומי" },
    { id: "achievements", label: "🏆 הישגים" },
    { id: "leaderboard", label: "📊 טבלת ניקוד" },
  ] as const;

  return (
    <div style={{ padding: "28px 28px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>🏆 אתגרים</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>בחנים, אתגרים ומשחקיות - צבור XP והפוך למקצוען!</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none", border: "none", borderBottom: activeTab === tab.id ? "2px solid var(--purple)" : "2px solid transparent",
              color: activeTab === tab.id ? "var(--purple-light)" : "var(--text-muted)",
              cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400,
              padding: "8px 16px", transition: "all 0.2s", fontFamily: "Heebo, sans-serif",
              marginBottom: -1,
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══ QUIZ ══ */}
      {activeTab === "quiz" && (
        <div>
          {!quizDone ? (
            <div>
              {/* Progress */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 13 }}>
                <span style={{ color: "var(--text-muted)" }}>שאלה {currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "#10B981" }}>✅ {score} נכון</span>
                  {streak > 1 && <span style={{ color: "#F59E0B" }}>🔥 רצף {streak}</span>}
                  <span style={{ color: "var(--purple-light)" }}>✨ {totalXP} XP</span>
                </div>
              </div>
              <div style={{ height: 6, background: "rgba(107,70,193,0.2)", borderRadius: 999, marginBottom: 28, overflow: "hidden" }}>
                <div style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.4s ease" }} />
              </div>

              {/* Question Card */}
              <div className="glass-card" style={{ padding: 28, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  <span style={{ background: "rgba(107,70,193,0.1)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 999, padding: "2px 10px", fontSize: 11, color: "var(--purple-light)" }}>
                    {q.category}
                  </span>
                  <span style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 999, padding: "2px 10px", fontSize: 11, color: "var(--teal-light)" }}>
                    +{q.xp} XP
                  </span>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.5, marginBottom: 24 }}>
                  {q.question}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correctIndex;
                    const isSelected = i === selected;
                    let bg = "var(--bg-card-hover)";
                    let border = "var(--border)";
                    let color = "var(--text-primary)";
                    if (answered) {
                      if (isCorrect) { bg = "rgba(16,185,129,0.1)"; border = "rgba(16,185,129,0.4)"; color = "#10B981"; }
                      else if (isSelected) { bg = "rgba(239,68,68,0.1)"; border = "rgba(239,68,68,0.4)"; color = "#EF4444"; }
                    } else if (isSelected) {
                      bg = "rgba(107,70,193,0.1)"; border = "rgba(107,70,193,0.4)";
                    }
                    return (
                      <button key={i} onClick={() => handleAnswer(i)}
                        style={{
                          background: bg, border: `1px solid ${border}`,
                          borderRadius: 10, color, cursor: answered ? "default" : "pointer",
                          fontSize: 14, fontWeight: 500, padding: "14px 18px",
                          textAlign: "right", transition: "all 0.2s",
                          display: "flex", alignItems: "center", gap: 10,
                          fontFamily: "Heebo, sans-serif",
                        }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: "50%",
                          background: answered && isCorrect ? "#10B981" : answered && isSelected && !isCorrect ? "#EF4444" : "rgba(107,70,193,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700, flexShrink: 0, color: answered ? "white" : "var(--purple-light)",
                        }}>
                          {answered ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              {answered && (
                <div style={{
                  padding: 16, marginBottom: 16,
                  background: selected === q.correctIndex ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)",
                  border: `1px solid ${selected === q.correctIndex ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                  borderRadius: 10,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14, color: selected === q.correctIndex ? "#10B981" : "#EF4444" }}>
                    {selected === q.correctIndex ? "✅ נכון! כל הכבוד!" : "❌ לא נכון"}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{q.explanation}</div>
                </div>
              )}

              {answered && (
                <button onClick={nextQuestion}
                  style={{ width: "100%", background: "var(--gradient-primary)", border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "14px", fontFamily: "Heebo, sans-serif" }}>
                  {currentQ < QUIZ_QUESTIONS.length - 1 ? "שאלה הבאה →" : "סיים בחן 🎉"}
                </button>
              )}
            </div>
          ) : (
            /* Quiz Results */
            <div className="glass-card" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>
                {score >= QUIZ_QUESTIONS.length * 0.8 ? "🏆" : score >= QUIZ_QUESTIONS.length * 0.5 ? "🎉" : "💪"}
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8, color: "var(--text-primary)" }}>
                {score >= QUIZ_QUESTIONS.length * 0.8 ? "מצויין!" : score >= QUIZ_QUESTIONS.length * 0.5 ? "כל הכבוד!" : "המשך להתאמן!"}
              </h2>
              <div style={{ fontSize: 18, color: "var(--text-secondary)", marginBottom: 24 }}>
                ענית נכון על {score} מתוך {QUIZ_QUESTIONS.length} שאלות
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 32 }}>
                {[
                  { label: "ציון", value: `${Math.round((score / QUIZ_QUESTIONS.length) * 100)}%`, color: "#6B46C1" },
                  { label: "XP שנצבר", value: `${totalXP} ✨`, color: "#14B8A6" },
                  { label: "רצף מקסימלי", value: `🔥 ${streak}`, color: "#F59E0B" },
                ].map(stat => (
                  <div key={stat.label} style={{ padding: "16px 24px", background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={resetQuiz}
                style={{ background: "var(--gradient-primary)", border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "14px 32px", fontFamily: "Heebo, sans-serif" }}>
                🔄 נסה שוב
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══ DAILY CHALLENGE ══ */}
      {activeTab === "daily" && (
        <div>
          <div className="glass-card" style={{ padding: 28, marginBottom: 20, borderColor: "rgba(107,70,193,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ background: "rgba(107,70,193,0.1)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 999, padding: "3px 12px", fontSize: 12, color: "var(--purple-light)" }}>
                    📅 אתגר היום
                  </span>
                  <span style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 999, padding: "3px 12px", fontSize: 12, color: "#F59E0B" }}>
                    {DAILY_CHALLENGE.difficulty}
                  </span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{DAILY_CHALLENGE.title}</h2>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "var(--teal-light)" }}>+{DAILY_CHALLENGE.xp}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>XP</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
              {DAILY_CHALLENGE.description}
            </p>
            <pre style={{ background: "#0A0A12", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 10, padding: 16, fontSize: 13, color: "#D1FAE5", fontFamily: "JetBrains Mono", lineHeight: 1.8, direction: "ltr", textAlign: "left", overflow: "auto" }}>
              {DAILY_CHALLENGE.structure}
            </pre>
          </div>

          {showDailyAnswer && (
            <div className="glass-card" style={{ padding: 24, marginBottom: 20, borderColor: "rgba(20,184,166,0.3)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--teal-light)", marginBottom: 14 }}>
                ✅ פתרון:
              </h3>
              {DAILY_CHALLENGE.commands.map((cmd, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ background: "rgba(107,70,193,0.2)", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--purple-light)", flexShrink: 0, fontWeight: 700 }}>{i + 1}</span>
                  <code style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 6, padding: "5px 10px", fontSize: 13, color: "var(--teal-light)", direction: "ltr", flex: 1 }}>
                    {cmd}
                  </code>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            {!dailyDone ? (
              <>
                <button onClick={() => setShowDailyAnswer(a => !a)}
                  style={{ background: "rgba(107,70,193,0.1)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 10, color: "var(--purple-light)", cursor: "pointer", fontSize: 14, fontWeight: 600, padding: "12px 20px", fontFamily: "Heebo, sans-serif" }}>
                  {showDailyAnswer ? "🙈 הסתר פתרון" : "💡 ראה פתרון"}
                </button>
                <button onClick={() => { setDailyDone(true); dispatch({ type: "ADD_XP", payload: DAILY_CHALLENGE.xp }); dispatch({ type: "COMPLETE_CHALLENGE", payload: "daily-today" }); }}
                  style={{ flex: 1, background: "var(--gradient-primary)", border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "12px", fontFamily: "Heebo, sans-serif" }}>
                  ✅ השלמתי את האתגר! (+{DAILY_CHALLENGE.xp} XP)
                </button>
              </>
            ) : (
              <div style={{ width: "100%", padding: 20, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#10B981" }}>כל הכבוד! השלמת את אתגר היום!</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>+{DAILY_CHALLENGE.xp} XP נוספו לחשבונך</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ ACHIEVEMENTS ══ */}
      {activeTab === "achievements" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {ACHIEVEMENTS.map(ach => (
            <div key={ach.id} className="glass-card" style={{
              padding: 20, opacity: ach.unlocked ? 1 : 0.5,
              borderColor: ach.unlocked ? "rgba(107,70,193,0.4)" : "var(--border)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 12, filter: ach.unlocked ? "none" : "grayscale(1)" }}>
                {ach.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>
                {ach.title}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{ach.desc}</div>
              {!ach.unlocked && (
                <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-muted)" }}>
                  🔒 לא נפתח עדיין
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ══ LEADERBOARD ══ */}
      {activeTab === "leaderboard" && (
        <div>
          <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "rgba(107,70,193,0.05)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>🏆 לוח המובילים</h3>
            </div>
            {LEADERBOARD.map((entry, i) => (
              <div key={entry.rank} style={{
                padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
                borderBottom: i < LEADERBOARD.length - 1 ? "1px solid var(--border)" : "none",
                background: i === 0 ? "rgba(245,158,11,0.03)" : "transparent",
              }}>
                <span style={{ fontSize: 24, width: 32, textAlign: "center" }}>{entry.badge}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{entry.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>רמה {entry.level}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: i === 0 ? "#F59E0B" : i === 1 ? "#9CA3AF" : i === 2 ? "#CD7C39" : "var(--purple-light)" }}>
                    {entry.xp.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>XP</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: 16, background: "rgba(107,70,193,0.05)", border: "1px solid rgba(107,70,193,0.15)", borderRadius: 10, fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>
            💡 השלם שיעורים ואתגרים כדי לעלות בדירוג!
          </div>
        </div>
      )}
    </div>
  );
}
