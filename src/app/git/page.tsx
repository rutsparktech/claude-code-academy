"use client";
/**
 * Git Visualizer - ויזואליזציה אינטראקטיבית של Git
 * מציג: commits, branches, staging area, ו"מכונת זמן"
 */

import { useState, useRef, useEffect } from "react";

interface Commit {
  hash: string;
  message: string;
  branch: string;
  parent?: string;
  x?: number;
  y?: number;
  color?: string;
}

interface Branch {
  name: string;
  head: string;
  color: string;
}

const BRANCH_COLORS: Record<string, string> = {
  main: "#6B46C1",
  develop: "#14B8A6",
  feature: "#F59E0B",
  hotfix: "#EF4444",
  release: "#10B981",
};

const BRANCH_COLOR_LIST = ["#6B46C1", "#14B8A6", "#F59E0B", "#EC4899", "#10B981", "#F97316"];

const SCENARIOS = [
  {
    id: "basic",
    name: "📚 בסיסי - commit רגיל",
    description: "כיצד commits בונים היסטוריה",
    commits: [
      { hash: "a1b2c3", message: "התחלת פרויקט", branch: "main", parent: undefined },
      { hash: "d4e5f6", message: "הוספת README", branch: "main", parent: "a1b2c3" },
      { hash: "g7h8i9", message: "סגנון ראשוני", branch: "main", parent: "d4e5f6" },
    ],
    branches: [{ name: "main", head: "g7h8i9", color: "#6B46C1" }],
    staged: [],
    modified: ["index.js"],
  },
  {
    id: "branching",
    name: "🌿 branches - עבודה מקבילה",
    description: "כיצד branches מאפשרים עבודה מקבילה",
    commits: [
      { hash: "a1b2c3", message: "התחלת פרויקט", branch: "main", parent: undefined },
      { hash: "d4e5f6", message: "הוספת בסיס", branch: "main", parent: "a1b2c3" },
      { hash: "g7h8i9", message: "פיצ'ר: כפתורים", branch: "feature", parent: "d4e5f6" },
      { hash: "j1k2l3", message: "פיצ'ר: אנימציה", branch: "feature", parent: "g7h8i9" },
      { hash: "m4n5o6", message: "תיקון באג קריטי", branch: "main", parent: "d4e5f6" },
    ],
    branches: [
      { name: "main", head: "m4n5o6", color: "#6B46C1" },
      { name: "feature", head: "j1k2l3", color: "#14B8A6" },
    ],
    staged: ["Button.jsx"],
    modified: [],
  },
  {
    id: "merge",
    name: "🔀 merge - מיזוג branches",
    description: "כיצד branches מתמזגים חזרה",
    commits: [
      { hash: "a1b2c3", message: "התחלת פרויקט", branch: "main", parent: undefined },
      { hash: "d4e5f6", message: "הוספת בסיס", branch: "main", parent: "a1b2c3" },
      { hash: "g7h8i9", message: "פיצ'ר: כפתורים", branch: "feature", parent: "d4e5f6" },
      { hash: "m4n5o6", message: "עדכון main", branch: "main", parent: "d4e5f6" },
      { hash: "x9y8z7", message: "Merge: feature → main", branch: "main", parent: "m4n5o6" },
    ],
    branches: [{ name: "main", head: "x9y8z7", color: "#6B46C1" }],
    staged: [],
    modified: [],
  },
];

export default function GitVisualizer() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [timeTravel, setTimeTravel] = useState<number | null>(null);
  const [inputCmd, setInputCmd] = useState("");
  const [cmdOutput, setCmdOutput] = useState<string[]>([]);
  const [localCommits, setLocalCommits] = useState<Commit[]>(scenario.commits);
  const [localBranches, setLocalBranches] = useState<Branch[]>(scenario.branches);
  const [staged, setStaged] = useState<string[]>(scenario.staged);
  const [modified, setModified] = useState<string[]>(scenario.modified);
  const [newCommitMsg, setNewCommitMsg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeCommits = timeTravel !== null
    ? localCommits.slice(0, timeTravel + 1)
    : localCommits;

  // Load scenario
  const loadScenario = (s: typeof SCENARIOS[0]) => {
    setScenario(s);
    setLocalCommits(s.commits);
    setLocalBranches(s.branches as Branch[]);
    setStaged(s.staged);
    setModified(s.modified);
    setSelectedCommit(null);
    setTimeTravel(null);
    setCmdOutput([]);
  };

  // Run git command
  const runCmd = () => {
    const parts = inputCmd.trim().split(/\s+/);
    const [, sub, ...rest] = parts;
    let output = "";

    if (parts[0] !== "git") { setCmdOutput(o => [...o, `❌ הרץ פקודות git בלבד`]); setInputCmd(""); return; }

    switch (sub) {
      case "add":
        const file = rest[0] === "." ? modified.join(", ") : rest[0];
        const toAdd = rest[0] === "." ? modified : [rest[0]];
        setStaged(s => Array.from(new Set([...s, ...toAdd])));
        setModified(m => rest[0] === "." ? [] : m.filter(f => f !== rest[0]));
        output = `➕ הוסף לStaging Area: ${file}`;
        break;
      case "commit":
        const msgIdx = rest.indexOf("-m");
        const msg = msgIdx >= 0 ? rest.slice(msgIdx + 1).join(" ").replace(/['"]/g, "") : "commit";
        if (staged.length === 0) { output = "❌ אין שינויים בStaging Area\nהשתמש ב-git add תחילה"; break; }
        const hash = Math.random().toString(36).slice(2, 8);
        const head = localBranches[0]?.head;
        const newCommit: Commit = { hash, message: msg, branch: localBranches[0]?.name || "main", parent: head };
        setLocalCommits(c => [...c, newCommit]);
        setLocalBranches(b => b.map((br, i) => i === 0 ? { ...br, head: hash } : br));
        setStaged([]);
        output = `[${localBranches[0]?.name} ${hash}] ${msg}\n✅ Commit נוצר!`;
        break;
      case "branch":
        if (rest[0]) {
          const newBranch: Branch = { name: rest[0], head: localBranches[0]?.head || "", color: BRANCH_COLOR_LIST[localBranches.length % BRANCH_COLOR_LIST.length] };
          setLocalBranches(b => [...b, newBranch]);
          output = `🌿 Branch נוצר: ${rest[0]}`;
        } else {
          output = localBranches.map(b => `  ${b.name}`).join("\n");
        }
        break;
      case "status":
        output = `On branch ${localBranches[0]?.name || "main"}\n${staged.length > 0 ? `Staged:\n${staged.map(f => `  ✅ ${f}`).join("\n")}\n` : ""}${modified.length > 0 ? `Modified:\n${modified.map(f => `  📝 ${f}`).join("\n")}` : staged.length === 0 ? "nothing to commit" : ""}`;
        break;
      case "log":
        output = [...localCommits].reverse().map(c => `${c.hash} - ${c.message} [${c.branch}]`).join("\n");
        break;
      default:
        output = `git ${sub}: לא מוכר. נסה: add, commit, branch, status, log`;
    }

    setCmdOutput(o => [...o, `$ git ${sub} ${rest.join(" ")}`, output, "─"]);
    setInputCmd("");
  };

  // Layout commits for drawing
  const getLayout = () => {
    const branchYMap: Record<string, number> = {};
    let yCounter = 0;
    const positioned: (Commit & { x: number; y: number; color: string })[] = [];

    activeCommits.forEach((c, i) => {
      if (!(c.branch in branchYMap)) {
        branchYMap[c.branch] = yCounter++;
      }
      const branchColor = localBranches.find(b => b.name === c.branch)?.color || "#6B46C1";
      positioned.push({
        ...c,
        x: 80 + i * 140,
        y: 80 + branchYMap[c.branch] * 80,
        color: branchColor,
      });
    });

    return positioned;
  };

  const layout = getLayout();
  const canvasW = Math.max(600, 80 + activeCommits.length * 140 + 80);
  const canvasH = Math.max(200, 80 + Object.keys(layout.reduce((a, c) => ({ ...a, [c.branch]: 1 }), {})).length * 80 + 60);

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>🌿 Git Visualizer</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>הבן Git עם גרפים אינטראקטיביים</p>
      </div>

      {/* Scenarios */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {SCENARIOS.map(s => (
          <button key={s.id} onClick={() => loadScenario(s)}
            style={{
              background: scenario.id === s.id ? "var(--gradient-primary)" : "var(--bg-card)",
              border: `1px solid ${scenario.id === s.id ? "transparent" : "var(--border)"}`,
              borderRadius: 10, color: scenario.id === s.id ? "white" : "var(--text-secondary)",
              cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "10px 18px",
              fontFamily: "Heebo, sans-serif", transition: "all 0.2s",
            }}>
            {s.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Main Graph Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Graph */}
          <div className="glass-card" style={{ padding: 20, overflow: "auto" }}>
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>גרף Commits</h3>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>לחץ על commit לפרטים</div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <svg width={canvasW} height={canvasH} style={{ display: "block" }}>
                {/* Draw connections */}
                {layout.map(commit => {
                  if (!commit.parent) return null;
                  const parent = layout.find(c => c.hash === commit.parent);
                  if (!parent) return null;
                  const isMerge = commit.branch !== parent.branch;
                  return (
                    <line key={`line-${commit.hash}`}
                      x1={parent.x} y1={parent.y}
                      x2={commit.x} y2={commit.y}
                      stroke={isMerge ? "#6B7280" : commit.color}
                      strokeWidth={isMerge ? 1.5 : 2.5}
                      strokeDasharray={isMerge ? "4 3" : "none"}
                      opacity={0.7}
                    />
                  );
                })}

                {/* Draw commits */}
                {layout.map((commit, i) => {
                  const isSelected = selectedCommit?.hash === commit.hash;
                  const isTimeTraveled = timeTravel !== null && i > timeTravel;
                  const branchHead = localBranches.find(b => b.head === commit.hash);
                  return (
                    <g key={commit.hash} onClick={() => setSelectedCommit(commit)}
                      style={{ cursor: "pointer" }} opacity={isTimeTraveled ? 0.3 : 1}>
                      {/* Glow */}
                      {isSelected && (
                        <circle cx={commit.x} cy={commit.y} r={22}
                          fill={commit.color} opacity={0.2} />
                      )}
                      {/* Circle */}
                      <circle cx={commit.x} cy={commit.y} r={16}
                        fill={isSelected ? commit.color : "#1A1A26"}
                        stroke={commit.color}
                        strokeWidth={isSelected ? 3 : 2} />
                      {/* Hash label */}
                      <text x={commit.x} y={commit.y + 1} textAnchor="middle"
                        dominantBaseline="middle" fontSize={9}
                        fill={isSelected ? "white" : commit.color}
                        fontFamily="JetBrains Mono">
                        {commit.hash.slice(0, 4)}
                      </text>
                      {/* Message */}
                      <text x={commit.x} y={commit.y + 32} textAnchor="middle"
                        fontSize={10} fill="#A0A0C0"
                        style={{ maxWidth: 100 }}>
                        {commit.message.length > 18 ? commit.message.slice(0, 18) + "…" : commit.message}
                      </text>
                      {/* Branch label */}
                      {branchHead && (
                        <g>
                          <rect x={commit.x - 28} y={commit.y - 38} width={56} height={18}
                            rx={9} fill={commit.color} opacity={0.9} />
                          <text x={commit.x} y={commit.y - 26} textAnchor="middle"
                            fontSize={9} fill="white" fontFamily="Heebo, sans-serif" fontWeight="700">
                            {branchHead.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Time Travel cursor */}
                {timeTravel !== null && layout[timeTravel] && (
                  <line x1={layout[timeTravel].x + 28} y1={20}
                    x2={layout[timeTravel].x + 28} y2={canvasH - 20}
                    stroke="#F59E0B" strokeWidth={2} strokeDasharray="6 3" opacity={0.6} />
                )}
              </svg>
            </div>

            {/* Time Travel Slider */}
            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>⏰</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>מכונת זמן</span>
                <button onClick={() => setTimeTravel(null)}
                  style={{ background: "rgba(107,70,193,0.1)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 6, color: "var(--purple-light)", cursor: "pointer", fontSize: 11, padding: "2px 8px", marginRight: "auto", fontFamily: "Heebo, sans-serif" }}>
                  חזור להווה
                </button>
              </div>
              <input type="range" min={0} max={localCommits.length - 1}
                value={timeTravel ?? localCommits.length - 1}
                onChange={e => setTimeTravel(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F59E0B" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                <span>commit ראשון</span>
                {timeTravel !== null && <span style={{ color: "#F59E0B" }}>
                  מציג: {localCommits[timeTravel]?.message}
                </span>}
                <span>עכשיו</span>
              </div>
            </div>
          </div>

          {/* Staging Area Visualization */}
          <div className="glass-card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              🎭 אזורי Git
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { title: "Working Directory", emoji: "📁", items: modified, color: "#F59E0B", desc: "קבצים שעבדת עליהם" },
                { title: "Staging Area", emoji: "🎯", items: staged, color: "#14B8A6", desc: "מוכן לcommit" },
                { title: "Repository", emoji: "💾", items: localCommits.slice(-3).map(c => c.message), color: "#6B46C1", desc: "היסטוריה שמורה" },
              ].map(zone => (
                <div key={zone.title} style={{
                  padding: 14, background: `rgba(${zone.color === "#F59E0B" ? "245,158,11" : zone.color === "#14B8A6" ? "20,184,166" : "107,70,193"},0.05)`,
                  border: `1px solid ${zone.color}30`, borderRadius: 10,
                }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{zone.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: zone.color, marginBottom: 4 }}>{zone.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>{zone.desc}</div>
                  {zone.items.length === 0
                    ? <div style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic" }}>ריק</div>
                    : zone.items.map((item, i) => (
                      <div key={i} style={{ fontSize: 11, padding: "3px 6px", background: `${zone.color}15`, borderRadius: 4, marginBottom: 4, color: zone.color, direction: "ltr", textAlign: "left" }}>
                        {item.length > 22 ? item.slice(0, 22) + "…" : item}
                      </div>
                    ))
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Commit Details */}
          {selectedCommit && (
            <div className="glass-card" style={{ padding: 18, borderColor: selectedCommit.color + "40" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                💾 פרטי Commit
              </h3>
              {[
                { label: "Hash", value: selectedCommit.hash, mono: true },
                { label: "הודעה", value: selectedCommit.message, mono: false },
                { label: "Branch", value: selectedCommit.branch, mono: true },
                { label: "Parent", value: selectedCommit.parent || "ראשון", mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: mono ? "var(--teal-light)" : "var(--text-primary)", fontFamily: mono ? "JetBrains Mono" : "Heebo", direction: "ltr", textAlign: "left" }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Git Command Box */}
          <div className="glass-card" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
              🖥️ נסה פקודות
            </h3>
            <div style={{ background: "#0A0A12", borderRadius: 8, padding: 12, marginBottom: 10, maxHeight: 160, overflowY: "auto" }}>
              {cmdOutput.length === 0
                ? <div style={{ fontSize: 11, color: "#6B7280" }}>הרץ פקודה git כדי לראות שינויים...</div>
                : cmdOutput.map((line, i) => (
                  <div key={i} style={{ fontSize: 11, lineHeight: 1.6, color: line.startsWith("$") ? "#14B8A6" : line.startsWith("❌") ? "#F87171" : "#D1FAE5", fontFamily: "JetBrains Mono", direction: "ltr", whiteSpace: "pre-wrap" }}>
                    {line}
                  </div>
                ))
              }
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <input value={inputCmd} onChange={e => setInputCmd(e.target.value)}
                onKeyDown={e => e.key === "Enter" && runCmd()}
                placeholder="git status / git add . / git commit -m '...'"
                style={{ flex: 1, background: "#0A0A12", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 6, color: "#93C5FD", fontSize: 12, fontFamily: "JetBrains Mono", padding: "8px 10px", outline: "none", direction: "ltr" }}
              />
              <button onClick={runCmd}
                style={{ background: "var(--gradient-primary)", border: "none", borderRadius: 6, color: "white", cursor: "pointer", fontSize: 13, padding: "8px 12px" }}>
                ▶
              </button>
            </div>

            {/* Quick commands */}
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
              {["git status", "git add .", "git log", "git branch"].map(cmd => (
                <button key={cmd} onClick={() => setInputCmd(cmd)}
                  style={{ background: "rgba(107,70,193,0.06)", border: "1px solid rgba(107,70,193,0.15)", borderRadius: 6, color: "var(--text-muted)", cursor: "pointer", fontSize: 11, padding: "5px 8px", textAlign: "left", fontFamily: "JetBrains Mono", direction: "ltr" }}>
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Branch Legend */}
          <div className="glass-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>
              🌿 Branches
            </h3>
            {localBranches.map(b => {
              const headCommit = localCommits.find(c => c.hash === b.head);
              return (
                <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: b.color }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{headCommit?.message || "—"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
