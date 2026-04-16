// ============================================================
// LESSON TYPES
// ============================================================
export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: number; // minutes
  difficulty: "מתחיל" | "בינוני" | "מתקדם";
  steps: LessonStep[];
  xp: number;
}

export interface LessonStep {
  id: string;
  type: "explanation" | "code" | "exercise" | "sandbox";
  title: string;
  content: string;
  code?: string;
  language?: string;
  hint?: string;
  expectedOutput?: string;
  explanation?: string; // Hebrew explanation for the code
}

export interface LessonProgress {
  lessonId: string;
  completedSteps: string[];
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

// ============================================================
// TERMINAL TYPES
// ============================================================
export interface TerminalFile {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: Record<string, TerminalFile>;
}

export interface TerminalState {
  currentPath: string[];
  fileSystem: TerminalFile;
  history: TerminalCommand[];
  gitState: GitState;
}

export interface TerminalCommand {
  input: string;
  output: string;
  type: "success" | "error" | "info";
  timestamp: Date;
}

// ============================================================
// GIT TYPES
// ============================================================
export interface GitCommit {
  hash: string;
  message: string;
  branch: string;
  parent?: string;
  timestamp: Date;
  author: string;
}

export interface GitBranch {
  name: string;
  head: string; // commit hash
  isActive: boolean;
}

export interface GitState {
  commits: GitCommit[];
  branches: GitBranch[];
  currentBranch: string;
  stagedFiles: string[];
  modifiedFiles: string[];
  untrackedFiles: string[];
  remoteUrl?: string;
}

// ============================================================
// CHALLENGES TYPES
// ============================================================
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "coding" | "terminal" | "git";
  difficulty: "קל" | "בינוני" | "קשה";
  xp: number;
  timeLimit?: number; // seconds
  questions?: QuizQuestion[];
  codeChallenge?: CodeChallenge;
  dailyChallenge?: boolean;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeChallenge {
  starterCode: string;
  solution: string;
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

// ============================================================
// USER / PROGRESS TYPES
// ============================================================
export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate?: string;
  completedLessons: string[];
  completedChallenges: string[];
  achievements: Achievement[];
  journalEntries: JournalEntry[];
  lessonProgress: Record<string, LessonProgress>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  condition: string;
}

// ============================================================
// JOURNAL TYPES
// ============================================================
export interface JournalEntry {
  id: string;
  date: string; // ISO date string
  title: string;
  content: string;
  tags: string[];
  til?: string; // Today I Learned
  mood?: "😊" | "🤔" | "😤" | "🎉" | "😴";
}

// ============================================================
// APP TYPES
// ============================================================
export type Theme = "dark" | "light";

export interface AppState {
  theme: Theme;
  activeModule: "lessons" | "terminal" | "git" | "challenges" | "journal";
  userProgress: UserProgress;
}
