"use client";
/**
 * Journal - יומן למידה אישי
 * כולל: כתיבת TIL, חיפוש, תגים, ומצב רוח
 */

import { useState, useMemo } from "react";
import { useApp } from "@/store/AppStore";
import { JournalEntry } from "@/types";

const MOODS = ["😊", "🤔", "😤", "🎉", "😴"] as const;
const MOOD_LABELS: Record<string, string> = {
  "😊": "טוב", "🤔": "מבלבל", "😤": "מתסכל", "🎉": "מדהים!", "😴": "עייף",
};

const TAG_OPTIONS = ["Terminal", "Git", "Node.js", "Claude Code", "JavaScript", "TypeScript", "React", "CSS", "כללי"];

const SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: "sample-1",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    title: "למדתי את פקודת pwd",
    content: "היום הבנתי שpwd = Print Working Directory. תמיד הבלבלתי אותה עם cd.",
    tags: ["Terminal"],
    til: "pwd מציג את הנתיב המלא של התיקייה שאתה נמצא בה כרגע",
    mood: "😊",
  },
];

export default function JournalPage() {
  const { state, dispatch } = useApp();
  const allEntries = [...SAMPLE_ENTRIES, ...state.userProgress.journalEntries];

  const [view, setView] = useState<"list" | "write">("list");
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    content: "",
    til: "",
    tags: [] as string[],
    mood: "😊" as typeof MOODS[number],
  });

  const filtered = useMemo(() => {
    return allEntries.filter(e => {
      const matchSearch = !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.content.toLowerCase().includes(search.toLowerCase()) ||
        e.til?.toLowerCase().includes(search.toLowerCase());
      const matchTag = !filterTag || e.tags.includes(filterTag);
      return matchSearch && matchTag;
    });
  }, [allEntries, search, filterTag]);

  const saveEntry = () => {
    if (!form.title.trim()) return;
    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      ...form,
    };
    if (editingId) {
      dispatch({ type: "UPDATE_JOURNAL_ENTRY", payload: entry });
    } else {
      dispatch({ type: "ADD_JOURNAL_ENTRY", payload: entry });
    }
    setForm({ title: "", content: "", til: "", tags: [], mood: "😊" });
    setEditingId(null);
    setView("list");
  };

  const startEdit = (entry: JournalEntry) => {
    setForm({ title: entry.title, content: entry.content, til: entry.til || "", tags: entry.tags, mood: entry.mood || "😊" });
    setEditingId(entry.id);
    setView("write");
  };

  const toggleTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag] }));
  };

  const allTags = Array.from(new Set(allEntries.flatMap(e => e.tags)));

  return (
    <div style={{ padding: "28px", maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>📓 יומן למידה</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            {allEntries.length} רשומות • תעד את המסע שלך
          </p>
        </div>
        <button onClick={() => { setView(v => v === "write" ? "list" : "write"); setEditingId(null); setForm({ title: "", content: "", til: "", tags: [], mood: "😊" }); }}
          style={{ background: view === "write" ? "var(--bg-card-hover)" : "var(--gradient-primary)", border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "12px 20px", fontFamily: "Heebo, sans-serif" }}>
          {view === "write" ? "← חזור ליומן" : "+ רשומה חדשה"}
        </button>
      </div>

      {/* ══ WRITE VIEW ══ */}
      {view === "write" && (
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
            {editingId ? "✏️ עריכת רשומה" : "✍️ רשומה חדשה"}
          </h2>

          {/* Mood */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
              מצב רוח היום:
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {MOODS.map(mood => (
                <button key={mood} onClick={() => setForm(f => ({ ...f, mood }))}
                  style={{
                    background: form.mood === mood ? "rgba(107,70,193,0.2)" : "var(--bg-card-hover)",
                    border: `2px solid ${form.mood === mood ? "rgba(107,70,193,0.5)" : "var(--border)"}`,
                    borderRadius: 10, cursor: "pointer", fontSize: 22,
                    padding: "8px 12px", transition: "all 0.2s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  }}>
                  <span>{mood}</span>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{MOOD_LABELS[mood]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              כותרת:
            </label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="מה למדת היום?"
              style={{ width: "100%", background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 15, fontFamily: "Heebo, sans-serif", fontWeight: 600, padding: "12px 14px", outline: "none", boxSizing: "border-box" }} />
          </div>

          {/* TIL */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--teal-light)", display: "block", marginBottom: 6 }}>
              💡 Today I Learned (TIL) - משפט קצר:
            </label>
            <input value={form.til} onChange={e => setForm(f => ({ ...f, til: e.target.value }))}
              placeholder="למשל: pwd מציג את הנתיב הנוכחי"
              style={{ width: "100%", background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "Heebo, sans-serif", padding: "10px 14px", outline: "none", boxSizing: "border-box" }} />
          </div>

          {/* Content */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              פרטים (אופציונלי):
            </label>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="מה עוד קרה? מה היה קשה? מה רצית לזכור?"
              rows={5}
              style={{ width: "100%", background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "Heebo, sans-serif", padding: "12px 14px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
              תגים:
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TAG_OPTIONS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  style={{
                    background: form.tags.includes(tag) ? "rgba(107,70,193,0.2)" : "transparent",
                    border: `1px solid ${form.tags.includes(tag) ? "rgba(107,70,193,0.5)" : "var(--border)"}`,
                    borderRadius: 999, color: form.tags.includes(tag) ? "var(--purple-light)" : "var(--text-muted)",
                    cursor: "pointer", fontSize: 12, padding: "4px 12px",
                    fontFamily: "Heebo, sans-serif", transition: "all 0.2s",
                  }}>
                  {form.tags.includes(tag) ? "✓ " : ""}{tag}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => { setView("list"); setEditingId(null); }}
              style={{ flex: 1, background: "var(--bg-card-hover)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-secondary)", cursor: "pointer", fontSize: 14, fontWeight: 600, padding: "12px", fontFamily: "Heebo, sans-serif" }}>
              ביטול
            </button>
            <button onClick={saveEntry} disabled={!form.title.trim()}
              style={{ flex: 2, background: form.title.trim() ? "var(--gradient-primary)" : "rgba(107,70,193,0.3)", border: "none", borderRadius: 10, color: "white", cursor: form.title.trim() ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 700, padding: "12px", fontFamily: "Heebo, sans-serif" }}>
              {editingId ? "💾 שמור שינויים" : "✅ שמור רשומה"}
            </button>
          </div>
        </div>
      )}

      {/* ══ LIST VIEW ══ */}
      {view === "list" && (
        <div>
          {/* Search + Filter */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="חפש ברשומות..."
                style={{ width: "100%", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "Heebo, sans-serif", padding: "10px 40px 10px 14px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => setFilterTag(null)}
                style={{ background: !filterTag ? "rgba(107,70,193,0.2)" : "transparent", border: `1px solid ${!filterTag ? "rgba(107,70,193,0.4)" : "var(--border)"}`, borderRadius: 999, color: !filterTag ? "var(--purple-light)" : "var(--text-muted)", cursor: "pointer", fontSize: 12, padding: "6px 14px", fontFamily: "Heebo, sans-serif" }}>
                הכל
              </button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                  style={{ background: filterTag === tag ? "rgba(107,70,193,0.2)" : "transparent", border: `1px solid ${filterTag === tag ? "rgba(107,70,193,0.4)" : "var(--border)"}`, borderRadius: 999, color: filterTag === tag ? "var(--purple-light)" : "var(--text-muted)", cursor: "pointer", fontSize: 12, padding: "6px 14px", fontFamily: "Heebo, sans-serif" }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "סה\"כ רשומות", value: allEntries.length, icon: "📝" },
              { label: "תגים שונים", value: allTags.length, icon: "🏷️" },
              { label: "הרצף שלך", value: `${state.userProgress.streak} ימים`, icon: "🔥" },
            ].map(stat => (
              <div key={stat.label} className="glass-card" style={{ padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text-primary)" }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Entries */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <div style={{ fontSize: 16 }}>אין רשומות {search ? "שתואמות לחיפוש" : "עדיין"}</div>
              {!search && <div style={{ fontSize: 13, marginTop: 8 }}>לחץ "+ רשומה חדשה" להתחיל!</div>}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filtered.map(entry => (
                <div key={entry.id} className="glass-card" style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 22 }}>{entry.mood || "😊"}</span>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{entry.title}</h3>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        📅 {new Date(entry.date).toLocaleDateString("he-IL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {!entry.id.startsWith("sample") && (
                        <>
                          <button onClick={() => startEdit(entry)}
                            style={{ background: "rgba(107,70,193,0.1)", border: "1px solid rgba(107,70,193,0.2)", borderRadius: 6, color: "var(--purple-light)", cursor: "pointer", fontSize: 12, padding: "4px 10px", fontFamily: "Heebo, sans-serif" }}>
                            ✏️ ערוך
                          </button>
                          <button onClick={() => dispatch({ type: "DELETE_JOURNAL_ENTRY", payload: entry.id })}
                            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, color: "#EF4444", cursor: "pointer", fontSize: 12, padding: "4px 10px", fontFamily: "Heebo, sans-serif" }}>
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {entry.til && (
                    <div style={{ marginBottom: 10, padding: "10px 14px", background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--teal-light)", display: "block", marginBottom: 3 }}>💡 TIL</span>
                      <span style={{ fontSize: 14, color: "var(--text-primary)" }}>{entry.til}</span>
                    </div>
                  )}

                  {entry.content && (
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 12 }}>
                      {entry.content.length > 200 ? entry.content.slice(0, 200) + "..." : entry.content}
                    </p>
                  )}

                  {entry.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {entry.tags.map(tag => (
                        <span key={tag} style={{ background: "rgba(107,70,193,0.1)", border: "1px solid rgba(107,70,193,0.2)", borderRadius: 999, color: "var(--purple-light)", fontSize: 11, padding: "2px 10px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
