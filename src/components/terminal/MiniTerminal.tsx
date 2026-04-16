"use client";
/**
 * MiniTerminal - גרסה קטנה של הטרמינל לשימוש בתוך שיעורים
 */

import { useState, useRef, KeyboardEvent } from "react";

interface Line {
  text: string;
  type: "prompt" | "output" | "error" | "info";
}

const MINI_RESPONSES: Record<string, string> = {
  "ls": "📄 index.js   📁 src/   📄 README.md",
  "pwd": "/home/user/my-project",
  "help": "פקודות: ls, pwd, cd, mkdir, touch, echo, git status, git init",
  "git status": "On branch main\nnothing to commit",
  "git init": "🌱 Initialized empty Git repository",
  "clear": "__clear__",
};

export default function MiniTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { text: "סנדבוקס מוכן! הקלד 'help' לרשימת פקודות 🚀", type: "info" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const run = () => {
    if (!input.trim()) return;
    const cmd = input.trim().toLowerCase();
    const response = MINI_RESPONSES[cmd] || `פקודה לא מוכרת: ${input}\nנסה 'help'`;
    
    if (response === "__clear__") { setLines([]); setInput(""); return; }
    
    setLines(l => [
      ...l,
      { text: `$ ${input}`, type: "prompt" },
      { text: response, type: response.includes("שגיאה") || response.includes("לא מוכרת") ? "error" : "output" },
    ]);
    setInput("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run();
  };

  return (
    <div style={{
      background: "#0A0A12", border: "1px solid rgba(20,184,166,0.25)",
      borderRadius: 10, overflow: "hidden", fontFamily: "'JetBrains Mono', monospace",
    }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ padding: "8px 14px", background: "#111118", borderBottom: "1px solid rgba(20,184,166,0.15)", display: "flex", gap: 6 }}>
        {["#FF5F57","#FFBD2E","#28C840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <span style={{ fontSize: 11, color: "#6B7280", marginRight: "auto" }}>⚡ סנדבוקס</span>
      </div>
      <div style={{ minHeight: 120, maxHeight: 200, overflowY: "auto", padding: "12px 14px" }}>
        {lines.map((l, i) => (
          <pre key={i} style={{ margin: "2px 0", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap",
            color: l.type === "prompt" ? "#14B8A6" : l.type === "error" ? "#F87171" : l.type === "info" ? "#FCD34D" : "#D1FAE5",
          }}>
            {l.text}
          </pre>
        ))}
      </div>
      <div style={{ padding: "8px 14px", borderTop: "1px solid rgba(20,184,166,0.1)", display: "flex", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#14B8A6" }}>$</span>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#93C5FD", fontSize: 12, fontFamily: "inherit" }}
          placeholder="הקלד פקודה..." dir="ltr" autoComplete="off" spellCheck={false}
        />
      </div>
    </div>
  );
}
