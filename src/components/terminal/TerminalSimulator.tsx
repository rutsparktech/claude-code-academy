"use client";
/**
 * TerminalSimulator - סימולטור Terminal מלא
 * מערכת קבצים מדומה - לא יכול לשבור כלום!
 * תומך: cd, ls, mkdir, touch, rm, cat, echo, git commands
 */

import { useState, useRef, useEffect, KeyboardEvent } from "react";

// ════════════════════════════════════
// VIRTUAL FILESYSTEM
// ════════════════════════════════════
interface VFile {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, VFile>;
}

const createInitialFS = (): VFile => ({
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        user: {
          type: "dir",
          children: {
            Documents: { type: "dir", children: {} },
            Downloads: { type: "dir", children: {} },
            Desktop: { type: "dir", children: {} },
            "welcome.txt": { type: "file", content: "ברוך הבא לסימולטור! 🎉\nנסה פקודות Terminal ותלמד תוך כדי!" },
            "readme.md": { type: "file", content: "# מדריך Terminal\n\nכתב פקודות ולמד!\n\nפקודות מומלצות:\n- ls\n- cd\n- mkdir\n- touch" },
          },
        },
      },
    },
  },
});

// ════════════════════════════════════
// COMMAND DESCRIPTIONS (Hebrew)
// ════════════════════════════════════
const COMMAND_HELP: Record<string, string> = {
  ls: "📋 מציג רשימת קבצים ותיקיות בתיקייה הנוכחית",
  cd: "📁 מחליף תיקייה נוכחית (Change Directory)",
  pwd: "📍 מציג את הנתיב הנוכחי (Print Working Directory)",
  mkdir: "📂 יוצר תיקייה חדשה (Make Directory)",
  touch: "📄 יוצר קובץ ריק חדש",
  cat: "👁️ מציג תוכן קובץ",
  echo: "📢 מדפיס טקסט לmסך",
  rm: "🗑️ מוחק קובץ או תיקייה",
  clear: "🧹 מנקה את המסך",
  help: "❓ מציג רשימת פקודות",
  "git init": "🌱 מאתחל repository חדש",
  "git status": "📊 מציג מצב הrepository",
  "git add": "➕ מוסיף קבצים לStaging Area",
  "git commit": "💾 שומר snapshot של השינויים",
  "git log": "📜 מציג היסטוריית commits",
  "git branch": "🌿 מציג או יוצר branches",
};

interface HistoryItem {
  input: string;
  output: string;
  type: "success" | "error" | "info";
}

// ════════════════════════════════════
// GIT STATE
// ════════════════════════════════════
interface GitRepo {
  initialized: boolean;
  staged: string[];
  commits: { hash: string; message: string }[];
  branch: string;
  modified: string[];
}

export default function TerminalSimulator() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      input: "",
      output: `ברוך הבא לסימולטור Terminal! 🎉
════════════════════════════════════
כאן תוכל לתרגל פקודות בסביבה בטוחה לחלוטין.
לא יכול לקרות שום נזק - מערכת הקבצים היא מדומה.

הקלד 'help' לרשימת פקודות זמינות.
════════════════════════════════════`,
      type: "info",
    },
  ]);
  const [input, setInput] = useState("");
  const [fs, setFs] = useState<VFile>(createInitialFS());
  const [cwd, setCwd] = useState(["home", "user"]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [gitState, setGitState] = useState<GitRepo>({
    initialized: false, staged: [], commits: [], branch: "main", modified: [],
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  // ════════════════════════════════════
  // FILESYSTEM HELPERS
  // ════════════════════════════════════
  const getNode = (path: string[], fsRoot: VFile): VFile | null => {
    let cur: VFile = fsRoot;
    for (const seg of path) {
      if (cur.type !== "dir" || !cur.children?.[seg]) return null;
      cur = cur.children[seg];
    }
    return cur;
  };

  const setNode = (path: string[], node: VFile, fsRoot: VFile): VFile => {
    if (path.length === 0) return node;
    const [head, ...rest] = path;
    const cur = fsRoot as VFile & { children: Record<string, VFile> };
    return {
      ...cur,
      children: {
        ...(cur.children || {}),
        [head]: rest.length === 0 ? node : setNode(rest, node, cur.children?.[head] || { type: "dir", children: {} }),
      },
    };
  };

  const deleteNode = (path: string[], fsRoot: VFile): VFile => {
    if (path.length === 1) {
      const newChildren = { ...(fsRoot as any).children };
      delete newChildren[path[0]];
      return { ...fsRoot, children: newChildren };
    }
    const [head, ...rest] = path;
    return {
      ...fsRoot,
      children: {
        ...(fsRoot as any).children,
        [head]: deleteNode(rest, (fsRoot as any).children[head]),
      },
    };
  };

  const cwdString = () => "/" + cwd.join("/");
  const prompt = () => `user@academy:${cwdString()}$`;

  // ════════════════════════════════════
  // COMMAND PROCESSOR
  // ════════════════════════════════════
  const runCommand = (cmd: string): HistoryItem => {
    const parts = cmd.trim().split(/\s+/);
    const [main, ...args] = parts;
    const arg0 = args[0] || "";

    switch (main) {
      // ── pwd ──
      case "pwd":
        return { input: cmd, output: cwdString(), type: "success" };

      // ── ls ──
      case "ls": {
        const node = getNode(cwd, fs);
        if (!node || node.type !== "dir") return { input: cmd, output: "שגיאה: לא תיקייה", type: "error" };
        const children = node.children || {};
        const names = Object.keys(children);
        if (names.length === 0) return { input: cmd, output: "(תיקייה ריקה)", type: "info" };
        if (args.includes("-la") || args.includes("-l")) {
          return {
            input: cmd, type: "success",
            output: names.map(n => {
              const isDir = children[n].type === "dir";
              return `${isDir ? "d" : "-"}rw-r--r--  1 user  ${isDir ? "<dir>" : `${(children[n].content?.length || 0)} bytes`}  ${n}`;
            }).join("\n"),
          };
        }
        return { input: cmd, output: names.map(n => children[n].type === "dir" ? `📁 ${n}/` : `📄 ${n}`).join("   "), type: "success" };
      }

      // ── cd ──
      case "cd": {
        if (!arg0 || arg0 === "~") { setCwd(["home", "user"]); return { input: cmd, output: "", type: "success" }; }
        if (arg0 === "-") { return { input: cmd, output: "cd -: לא נתמך בסימולטור", type: "info" }; }
        
        let newPath: string[];
        if (arg0 === "..") {
          if (cwd.length <= 1) return { input: cmd, output: "כבר בתיקיית השורש", type: "error" };
          newPath = cwd.slice(0, -1);
        } else if (arg0.startsWith("/")) {
          newPath = arg0.split("/").filter(Boolean);
        } else {
          newPath = [...cwd, arg0];
        }
        
        const node = getNode(newPath, fs);
        if (!node) return { input: cmd, output: `cd: ${arg0}: תיקייה לא קיימת`, type: "error" };
        if (node.type !== "dir") return { input: cmd, output: `cd: ${arg0}: לא תיקייה`, type: "error" };
        setCwd(newPath);
        return { input: cmd, output: "", type: "success" };
      }

      // ── mkdir ──
      case "mkdir": {
        if (!arg0) return { input: cmd, output: "שימוש: mkdir <שם_תיקייה>", type: "error" };
        const names = args.filter(a => !a.startsWith("-"));
        let newFs = fs;
        for (const name of names) {
          const path = [...cwd, name];
          if (getNode(path, newFs)) return { input: cmd, output: `mkdir: ${name}: כבר קיים`, type: "error" };
          newFs = setNode(path, { type: "dir", children: {} }, newFs);
        }
        setFs(newFs);
        return { input: cmd, output: `✅ נוצרה/ו: ${names.join(", ")}`, type: "success" };
      }

      // ── touch ──
      case "touch": {
        if (!arg0) return { input: cmd, output: "שימוש: touch <שם_קובץ>", type: "error" };
        const newFs = setNode([...cwd, arg0], { type: "file", content: "" }, fs);
        setFs(newFs);
        return { input: cmd, output: `✅ נוצר: ${arg0}`, type: "success" };
      }

      // ── cat ──
      case "cat": {
        if (!arg0) return { input: cmd, output: "שימוש: cat <שם_קובץ>", type: "error" };
        const node = getNode([...cwd, arg0], fs);
        if (!node) return { input: cmd, output: `cat: ${arg0}: קובץ לא קיים`, type: "error" };
        if (node.type !== "file") return { input: cmd, output: `cat: ${arg0}: זו תיקייה`, type: "error" };
        return { input: cmd, output: node.content || "(קובץ ריק)", type: "success" };
      }

      // ── echo ──
      case "echo": {
        const text = args.join(" ");
        if (text.includes(">")) {
          const [content, , filename] = text.split(/\s*(>)\s*/);
          if (filename) {
            const newFs = setNode([...cwd, filename.trim()], { type: "file", content: content.replace(/['"]/g, "").trim() }, fs);
            setFs(newFs);
            return { input: cmd, output: `✅ נכתב לקובץ: ${filename.trim()}`, type: "success" };
          }
        }
        return { input: cmd, output: text.replace(/['"]/g, ""), type: "success" };
      }

      // ── rm ──
      case "rm": {
        if (!arg0) return { input: cmd, output: "שימוש: rm <קובץ>", type: "error" };
        const target = args.find(a => !a.startsWith("-")) || "";
        const node = getNode([...cwd, target], fs);
        if (!node) return { input: cmd, output: `rm: ${target}: לא קיים`, type: "error" };
        if (node.type === "dir" && !args.includes("-r") && !args.includes("-rf")) {
          return { input: cmd, output: `rm: ${target}: תיקייה - השתמש ב-rm -r`, type: "error" };
        }
        setFs(deleteNode([...cwd, target], fs));
        return { input: cmd, output: `🗑️ נמחק: ${target}`, type: "success" };
      }

      // ── clear ──
      case "clear":
        setHistory([]);
        return { input: "", output: "", type: "success" };

      // ── help ──
      case "help":
        return {
          input: cmd, type: "info",
          output: `
📚 פקודות זמינות:
═══════════════════════════════════
${Object.entries(COMMAND_HELP).map(([k, v]) => `  ${k.padEnd(15)} ${v}`).join("\n")}
═══════════════════════════════════
💡 טיפ: השתמש בחצים ↑↓ לגישה להיסטוריה
          `.trim(),
        };

      // ── GIT COMMANDS ──
      case "git": {
        switch (arg0) {
          case "init":
            setGitState(g => ({ ...g, initialized: true }));
            return { input: cmd, output: `🌱 Initialized empty Git repository in ${cwdString()}/.git/\n✅ כעת יש לך repository!`, type: "success" };

          case "status":
            if (!gitState.initialized) return { input: cmd, output: "שגיאה: לא נמצא git repository\nהרץ 'git init' תחילה", type: "error" };
            return {
              input: cmd, type: "success",
              output: `On branch ${gitState.branch}\n${gitState.commits.length === 0 ? "No commits yet\n" : ""}${gitState.staged.length > 0 ? `\nChanges to be committed:\n${gitState.staged.map(f => `  📗 new file: ${f}`).join("\n")}` : ""}\n${gitState.modified.length > 0 ? `\nModified:\n${gitState.modified.map(f => `  📝 ${f}`).join("\n")}` : ""}\n${gitState.staged.length === 0 && gitState.modified.length === 0 ? "nothing to commit, working tree clean" : ""}`,
            };

          case "add": {
            if (!gitState.initialized) return { input: cmd, output: "שגיאה: git init תחילה", type: "error" };
            const files = args.slice(1);
            if (files[0] === ".") {
              const node = getNode(cwd, fs);
              const all = Object.keys(node?.children || {}).filter(n => (node?.children?.[n]?.type === "file"));
              setGitState(g => ({ ...g, staged: [...new Set([...g.staged, ...all])] }));
              return { input: cmd, output: `➕ נוסף לStaging Area:\n${all.map(f => `  📗 ${f}`).join("\n") || "אין קבצים"}`, type: "success" };
            }
            setGitState(g => ({ ...g, staged: [...new Set([...g.staged, ...files])] }));
            return { input: cmd, output: `➕ נוסף: ${files.join(", ")}`, type: "success" };
          }

          case "commit": {
            if (!gitState.initialized) return { input: cmd, output: "שגיאה: git init תחילה", type: "error" };
            if (gitState.staged.length === 0) return { input: cmd, output: "אין שינויים בStaging Area\nהשתמש ב-git add תחילה", type: "error" };
            const msgIdx = args.indexOf("-m");
            const message = msgIdx >= 0 ? args.slice(msgIdx + 1).join(" ").replace(/['"]/g, "") : "commit ללא הודעה";
            const hash = Math.random().toString(36).slice(2, 9);
            setGitState(g => ({
              ...g,
              commits: [...g.commits, { hash, message }],
              staged: [],
            }));
            return { input: cmd, output: `[${gitState.branch} ${hash}] ${message}\n${gitState.staged.length} files changed\n✅ Commit נוצר!`, type: "success" };
          }

          case "log":
            if (!gitState.initialized) return { input: cmd, output: "שגיאה: git init תחילה", type: "error" };
            if (gitState.commits.length === 0) return { input: cmd, output: "אין commits עדיין\nהשתמש ב-git add + git commit", type: "info" };
            return {
              input: cmd, type: "success",
              output: [...gitState.commits].reverse().map((c, i) => 
                `commit ${c.hash}\nDate: ${new Date().toLocaleDateString("he-IL")}\n\n    ${c.message}\n${i < gitState.commits.length - 1 ? "\n─────────────────" : ""}`
              ).join("\n"),
            };

          case "branch":
            if (!gitState.initialized) return { input: cmd, output: "שגיאה: git init תחילה", type: "error" };
            return { input: cmd, output: `* ${gitState.branch} (HEAD)`, type: "success" };

          default:
            return { input: cmd, output: `git: '${arg0}' לא פקודה מוכרת\nנסה: git init, status, add, commit, log, branch`, type: "error" };
        }
      }

      // ── Unknown ──
      default:
        if (!main) return { input: cmd, output: "", type: "success" };
        return {
          input: cmd,
          output: `${main}: פקודה לא מוכרת 🤔\nהקלד 'help' לרשימת פקודות זמינות`,
          type: "error",
        };
    }
  };

  // ════════════════════════════════════
  // EVENT HANDLERS
  // ════════════════════════════════════
  const handleSubmit = () => {
    if (!input.trim()) return;
    const result = runCommand(input);
    setHistory(h => [...h, result]);
    setCmdHistory(h => [input, ...h]);
    setHistIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { handleSubmit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx] || "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
    }
    if (e.key === "l" && e.ctrlKey) { setHistory([]); }
    if (e.key === "c" && e.ctrlKey) { setInput(""); }
  };

  // ════════════════════════════════════
  // RENDER
  // ════════════════════════════════════
  return (
    <div onClick={() => inputRef.current?.focus()} style={{
      display: "flex", flexDirection: "column",
      height: "100%", fontFamily: "'JetBrains Mono', monospace",
      background: "#0A0A12", borderRadius: 12,
      border: "1px solid rgba(20,184,166,0.2)",
      overflow: "hidden", cursor: "text",
    }}>
      {/* Terminal Header */}
      <div style={{
        padding: "10px 16px", background: "#111118",
        borderBottom: "1px solid rgba(20,184,166,0.15)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ fontSize: 12, color: "#6B7280", marginRight: "auto" }}>
          סימולטור Terminal — {cwdString()}
        </span>
        <button onClick={() => { setHistory([]); setFs(createInitialFS()); setCwd(["home", "user"]); setGitState({ initialized: false, staged: [], commits: [], branch: "main", modified: [] }); }}
          style={{ background: "none", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 6, color: "var(--purple-light)", cursor: "pointer", fontSize: 11, padding: "3px 8px" }}>
          🔄 אפס
        </button>
      </div>

      {/* Output Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            {h.input && (
              <div style={{ marginBottom: 4 }}>
                <span style={{ color: "#14B8A6", fontSize: 12 }}>{prompt()} </span>
                <span style={{ color: "#93C5FD", fontSize: 13 }}>{h.input}</span>
              </div>
            )}
            {h.output && (
              <pre style={{
                fontSize: 12, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word",
                color: h.type === "error" ? "#F87171" : h.type === "info" ? "#FCD34D" : "#D1FAE5",
              }}>
                {h.output}
              </pre>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(20,184,166,0.15)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#14B8A6", fontSize: 12, whiteSpace: "nowrap", flexShrink: 0 }}>{prompt()} </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: "#93C5FD", fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
            caretColor: "#14B8A6",
          }}
          placeholder="הקלד פקודה..."
          autoComplete="off"
          spellCheck={false}
          dir="ltr"
        />
      </div>
    </div>
  );
}
