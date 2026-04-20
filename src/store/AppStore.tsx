"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AppState, Theme, UserProgress, JournalEntry } from "@/types";

const initialUserProgress: UserProgress = {
  xp: 0, level: 1, streak: 0,
  completedLessons: [], completedChallenges: [],
  achievements: [], journalEntries: [], lessonProgress: {},
};

const initialState: AppState = {
  theme: "light",
  activeModule: "lessons",
  userProgress: initialUserProgress,
};

type Action =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_MODULE"; payload: AppState["activeModule"] }
  | { type: "ADD_XP"; payload: number }
  | { type: "COMPLETE_LESSON"; payload: string }
  | { type: "COMPLETE_CHALLENGE"; payload: string }
  | { type: "COMPLETE_LESSON_STEP"; payload: { lessonId: string; stepId: string } }
  | { type: "ADD_JOURNAL_ENTRY"; payload: JournalEntry }
  | { type: "UPDATE_JOURNAL_ENTRY"; payload: JournalEntry }
  | { type: "DELETE_JOURNAL_ENTRY"; payload: string }
  | { type: "LOAD_STATE"; payload: AppState };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOAD_STATE": return action.payload;
    case "SET_THEME": return { ...state, theme: action.payload };
    case "SET_MODULE": return { ...state, activeModule: action.payload };
    case "ADD_XP": {
      const newXP = state.userProgress.xp + action.payload;
      return { ...state, userProgress: { ...state.userProgress, xp: newXP, level: Math.floor(newXP / 100) + 1 } };
    }
    case "COMPLETE_LESSON":
      if (state.userProgress.completedLessons.includes(action.payload)) return state;
      return { ...state, userProgress: { ...state.userProgress, completedLessons: [...state.userProgress.completedLessons, action.payload] } };
    case "COMPLETE_CHALLENGE":
      if (state.userProgress.completedChallenges.includes(action.payload)) return state;
      return { ...state, userProgress: { ...state.userProgress, completedChallenges: [...state.userProgress.completedChallenges, action.payload] } };
    case "COMPLETE_LESSON_STEP": {
      const { lessonId, stepId } = action.payload;
      const current = state.userProgress.lessonProgress[lessonId];
      const completedSteps = current ? [...new Set([...current.completedSteps, stepId])] : [stepId];
      return { ...state, userProgress: { ...state.userProgress, lessonProgress: { ...state.userProgress.lessonProgress, [lessonId]: { lessonId, completedSteps, completed: false, startedAt: current?.startedAt || new Date() } } } };
    }
    case "ADD_JOURNAL_ENTRY": return { ...state, userProgress: { ...state.userProgress, journalEntries: [action.payload, ...state.userProgress.journalEntries] } };
    case "UPDATE_JOURNAL_ENTRY": return { ...state, userProgress: { ...state.userProgress, journalEntries: state.userProgress.journalEntries.map(e => e.id === action.payload.id ? action.payload : e) } };
    case "DELETE_JOURNAL_ENTRY": return { ...state, userProgress: { ...state.userProgress, journalEntries: state.userProgress.journalEntries.filter(e => e.id !== action.payload) } };
    default: return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("claude-academy-state");
      if (saved) dispatch({ type: "LOAD_STATE", payload: { ...initialState, ...JSON.parse(saved) } });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("claude-academy-state", JSON.stringify(state)); } catch {}
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
export function useUserProgress() { return useApp().state.userProgress; }
export function xpForLevel(level: number) { return level * 100; }
