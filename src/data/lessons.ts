import { Lesson } from "@/types";

export const LESSONS: Lesson[] = [

  // ════════════════════════════════════
  // 1: TERMINAL BASICS
  // ════════════════════════════════════
  {
    id: "terminal-basics",
    title: "יסודות ה-Terminal",
    description: "הכלי הראשון שכל מפתח חייב לדעת — לפני GitHub, לפני Vercel, לפני הכל",
    icon: "⌨️",
    duration: 25,
    difficulty: "מתחיל",
    xp: 100,
    steps: [
      {
        id: "why-terminal",
        type: "explanation",
        title: "למה Terminal לפני הכל?",
        content: `## לפני שמתחילים — למה Terminal?

כשנפתח חשבון GitHub ונעלה קוד לאינטרנט, נעשה את כל זה דרך Terminal.
כשנתקין Claude Code — נעשה את זה דרך Terminal.
כשנפרוס אפליקציה ל-Vercel — Terminal.

Terminal הוא הגשר בין המחשב שלנו לכל שאר הכלים.

## מה זה בעצם?

Terminal הוא חלון שמאפשר לתת פקודות למחשב בטקסט, במקום ללחוץ על כפתורים.

**לדוגמה:** במקום לגרור קובץ בסייר הקבצים, כותבים: mv myfile.txt documents/

## איך פותחים?
- **Windows:** לחצו על חיפוש → כתבו "PowerShell" → Enter
- **Mac:** Cmd+Space → כתבו "Terminal" → Enter
- **VS Code (מומלץ!):** Ctrl+\` (backtick)

> 💡 בהמשך נעבוד הרבה עם VS Code. אם עוד לא התקנתם, כנסו ל: code.visualstudio.com`,
        explanation: "Terminal הוא הבסיס לכל מה שנלמד בהמשך.",
      },
      {
        id: "first-commands",
        type: "code",
        title: "הפקודות הבסיסיות",
        content: `## 3 הפקודות שנשתמש בהן כל יום

פתחו Terminal ונסו אחת אחת:`,
        code: `# 1. איפה אנחנו נמצאים?
pwd
# תוצאה לדוגמה: C:/Users/rutsh  או  /home/user

# 2. מה יש בתיקייה הנוכחית?
ls
# תוצאה: רשימת הקבצים והתיקיות

# 3. כניסה לתיקייה
cd Downloads
# עכשיו אנחנו בתוך Downloads

# חזרה תיקייה אחת למעלה
cd ..`,
        language: "bash",
        explanation: `pwd = Print Working Directory — הצג היכן אנחנו
ls = List — הצג תוכן תיקייה
cd = Change Directory — כנסו לתיקייה`,
      },
      {
        id: "create-structure",
        type: "code",
        title: "יצירת תיקיות וקבצים",
        content: `## בואו ניצור מבנה פרויקט אמיתי

זה בדיוק מה שנעשה כשנתחיל פרויקט חדש:`,
        code: `# צרו תיקייה לפרויקט
mkdir my-first-project

# כנסו אליה
cd my-first-project

# צרו קבצים
touch index.html
touch style.css
touch script.js

# ראו מה יצרנו
ls
# תוצאה: index.html  style.css  script.js

# הציגו תוכן קובץ
cat index.html
# (ריק כרגע)

# כתבו לקובץ
echo "שלום עולם" > index.html
cat index.html
# תוצאה: שלום עולם`,
        language: "bash",
        explanation: `mkdir = Make Directory — צרו תיקייה
touch = צרו קובץ ריק
echo "טקסט" > קובץ = כתבו טקסט לקובץ
cat = הציגו תוכן קובץ`,
      },
      {
        id: "practical-connection",
        type: "explanation",
        title: "מה עשינו ולמה זה חשוב?",
        content: `## החיבור לשיעור הבא

עכשיו שאנחנו יודעים לנווט ולצור קבצים, נוכל:

1. **Git** — יעקוב אחרי השינויים בקבצים האלה
2. **GitHub** — יאחסן את הקבצים האלה בענן
3. **Vercel** — ייקח את הקבצים מGitHub ויפרוס אותם לאינטרנט

זה המסלול המלא:
**Terminal → Git → GitHub → Vercel → אתר חי!**

## תרגיל לפני המשך:
פתחו Terminal וצרו תיקייה בשם projects בתיקיית הבית שלכם:`,
        explanation: "כל שיעור מהווה בסיס לשיעור הבא.",
      },
      {
        id: "terminal-sandbox",
        type: "sandbox",
        title: "תרגלו בחופשיות",
        content: `## סנדבוקס בטוח

נסו כאן את כל מה שלמדנו — אי אפשר לשבור כלום!

פקודות לתרגול:
- ls, pwd, cd
- mkdir, touch, cat
- echo "טקסט" > קובץ`,
      },
    ],
  },

  // ════════════════════════════════════
  // 2: GIT BASICS
  // ════════════════════════════════════
  {
    id: "git-basics",
    title: "Git — מכונת הזמן של הקוד",
    description: "שמרו כל שינוי, חיזרו לכל גרסה, עבדו בצוות — Git הוא הכלי שמאפשר את כל זה",
    icon: "🌿",
    duration: 30,
    difficulty: "מתחיל",
    xp: 150,
    steps: [
      {
        id: "what-is-git",
        type: "explanation",
        title: "מה זה Git ולמה חייבים אותו?",
        content: `## הבעיה שGit פותר

דמיינו שעבדתם שעה על קוד, משהו השתבש, ואתם לא זוכרים מה שיניתם.
או שאתם עובדים עם שותף ושניכם שיניתם את אותו קובץ.

**Git הוא מערכת שמצלמת snapshots של הקוד שלנו בכל שלב.**

## הדמיה פשוטה:
- כל פעם שאנחנו שמחים מהמצב של הקוד — אנחנו "מצלמים" אותו (commit)
- אנחנו יכולים לחזור לכל "תמונה" בכל עת
- GitHub הוא הכאן אנחנו שומרים את כל התמונות בענן

## התקנה:
אם Git לא מותקן, הורידו מ: **git-scm.com/downloads**

לאחר התקנה, פתחו Terminal ובדקו:`,
        explanation: "Git = מכונת זמן לקוד. GitHub = הענן שמאחסן את מכונת הזמן.",
      },
      {
        id: "git-setup",
        type: "code",
        title: "הגדרת Git — פעם אחת בחיים",
        content: `## הגדרות ראשוניות

לפני שמשתמשים בGit, צריך להציג את עצמנו.
הרצו את הפקודות האלה ב-Terminal (החליפו עם הפרטים שלכם):`,
        code: `# הציגו את עצמכם לGit
git config --global user.name "השם שלכם"
git config --global user.email "האימייל שלכם"

# בדקו שנשמר
git config --global user.name
# תוצאה: השם שלכם

git config --global user.email
# תוצאה: האימייל שלכם

# בדקו שGit מותקן
git --version
# תוצאה: git version 2.x.x`,
        language: "bash",
        explanation: "פרטים אלו יופיעו בכל commit שתיצרו ב-GitHub.",
      },
      {
        id: "first-repo",
        type: "code",
        title: "Repository ראשון — צעד אחר צעד",
        content: `## בואו ניצור Repository אמיתי

Repository = תיקייה שGit עוקב אחריה.`,
        code: `# 1. כנסו לתיקיית הפרויקט שיצרנו קודם
cd my-first-project

# 2. אתחלו Git (פעולה חד-פעמית לכל פרויקט)
git init
# תוצאה: Initialized empty Git repository

# 3. ראו מה המצב
git status
# תוצאה: Untracked files: index.html, style.css, script.js

# 4. הוסיפו קבצים לתור השמירה
git add .
# הנקודה = הוסיפו הכל

# 5. ראו שהקבצים בתור
git status
# תוצאה: Changes to be committed...

# 6. שמרו snapshot (commit)
git commit -m "commit ראשון - יצירת הפרויקט"
# תוצאה: [main abc1234] commit ראשון

# 7. ראו את ההיסטוריה
git log --oneline
# תוצאה: abc1234 commit ראשון - יצירת הפרויקט`,
        language: "bash",
        explanation: `git init = אתחול — עשו פעם אחת בכל פרויקט
git add . = הוסיפו הכל לתור
git commit -m "..." = שמרו snapshot
git log = ראו היסטוריה`,
      },
      {
        id: "daily-workflow",
        type: "code",
        title: "ה-Workflow היומי",
        content: `## זה מה שתעשו כל יום

כשעובדים על פרויקט, חוזרים על הסדר הזה:`,
        code: `# 1. ראו מה השתנה
git status

# 2. ראו בדיוק מה שיניתם
git diff

# 3. הוסיפו לתור
git add .

# 4. שמרו עם הודעה מסבירה
git commit -m "תיאור קצר של מה שיניתם"

# טיפ: הודעות commit טובות:
# "הוספת כפתור כניסה"
# "תיקון באג בטופס הרשמה"
# "שינוי צבע הרקע לכחול"

# הודעות commit גרועות:
# "שינויים"
# "עדכון"
# "asdfjkl"`,
        language: "bash",
        explanation: "Commit טוב = הודעה שאחרי שנה תבינו מה עשיתם.",
      },
      {
        id: "git-connection",
        type: "explanation",
        title: "Git ✓ — עכשיו GitHub",
        content: `## מה עשינו וצעד הבא

עכשיו יש לנו Repository מקומי על המחשב עם היסטוריה של שינויים.

**הבעיה:** זה רק על המחשב שלנו. אם המחשב נשבר — הכל אבוד.

**הפתרון:** GitHub = שמירה בענן + שיתוף עם אחרים.

זה מה שנעשה בשיעור הבא:
1. נפתח חשבון GitHub (חינמי!)
2. ניצור Repository בענן
3. נחבר את הפרויקט המקומי לענן
4. נעלה את הקוד

**הפרויקט שיצרנו זה עתה יעלה לאינטרנט!**`,
        explanation: "Git = מקומי. GitHub = ענן. ביחד = מקצועי.",
      },
    ],
  },

  // ════════════════════════════════════
  // 3: GITHUB
  // ════════════════════════════════════
  {
    id: "github-basics",
    title: "GitHub — הקוד בענן",
    description: "פתחו חשבון, העלו את הפרויקט שלכם לאינטרנט, והתחברו לקהילת המפתחים הגדולה בעולם",
    icon: "🐙",
    duration: 30,
    difficulty: "מתחיל",
    xp: 200,
    steps: [
      {
        id: "open-account",
        type: "explanation",
        title: "שלב 1: פתיחת חשבון GitHub",
        content: `## פתחו חשבון עכשיו — חינמי לגמרי!

**לחצו על הקישור:** github.com/signup

### איך להירשם:
1. הכניסו **אימייל** (אותו אימייל שהגדרתם בGit!)
2. בחרו **סיסמה** חזקה
3. בחרו **שם משתמש** — זה יהיה חלק מהכתובת שלכם (github.com/שם-המשתמש)
4. אמתו את האימייל
5. בשאלות הגדרה — לחצו "Skip personalization"

> 💡 **טיפ לשם משתמש:** בחרו שם מקצועי כי הוא יופיע בפרופיל הציבורי שלכם. למשל: rutpachter, rut-dev

### מה GitHub נותן בחינם?
- אחסון ל-Repositories ציבוריים וגם פרטיים
- GitHub Pages — אירוח אתרים חינם
- שיתוף פעולה עם צוות`,
        explanation: "GitHub = LinkedIn של המפתחים. כל מפתח חייב חשבון.",
      },
      {
        id: "create-repo",
        type: "explanation",
        title: "שלב 2: יצירת Repository בGitHub",
        content: `## ניצור מקום בענן לפרויקט שלנו

לאחר הכניסה לחשבון:

### צעדים:
1. לחצו על **"+"** בפינה השמאלית העליונה
2. בחרו **"New repository"**
3. מלאו:
   - **Repository name:** my-first-project (אותו שם כמו התיקייה)
   - **Description:** הפרויקט הראשון שלי (אופציונלי)
   - **Public** (כדי שVercel יוכל לגשת אליו)
   - **אל תסמנו** שום checkbox אחר
4. לחצו **"Create repository"**

### מה יופיע?
דף עם הוראות חיבור — נשתמש בהן בצעד הבא.

> ⚠️ **חשוב:** אל תסמנו "Add README file" — זה יגרום לבעיות בחיבור.`,
        explanation: "Repository בGitHub = הבית של הפרויקט בענן.",
      },
      {
        id: "connect-push",
        type: "code",
        title: "שלב 3: חיבור ועלייה לGitHub",
        content: `## מחברים את המחשב לGitHub

החליפו את YOUR-USERNAME ו-YOUR-REPO בפרטים שלכם:`,
        code: `# 1. חיברו את הפרויקט המקומי לGitHub
# (הדבקו את הכתובת מהדף שנפתח ב-GitHub)
git remote add origin https://github.com/YOUR-USERNAME/my-first-project.git

# 2. קבעו שהסניף הראשי יקרא "main"
git branch -M main

# 3. העלו לGitHub!
git push -u origin main
# יבקש שם משתמש וסיסמה של GitHub

# 4. רעננו את דף GitHub — תראו את הקבצים שלכם!`,
        language: "bash",
        hint: `אם מבקש סיסמה ולא עובד:
1. כנסו ל: github.com/settings/tokens
2. לחצו "Generate new token (classic)"
3. סמנו "repo"
4. העתיקו את ה-token
5. השתמשו בו כסיסמה`,
        explanation: `git remote add = חיברו לGitHub
git push = העלו את הקוד`,
      },
      {
        id: "github-workflow",
        type: "code",
        title: "ה-Workflow מעכשיו",
        content: `## כך תעבדו על כל פרויקט מעכשיו

אחרי שחיברתם פעם אחת, כל עדכון עתידי יהיה פשוט:`,
        code: `# עשיתם שינוי בקוד? הרצו את 3 הפקודות האלה:

# 1. הוסיפו הכל לתור
git add .

# 2. שמרו עם הודעה
git commit -m "תיאור השינוי"

# 3. העלו לGitHub
git push

# זהו! השינויים בGitHub תוך שניות.
# ואם חיברתם Vercel (שיעור הבא) — האתר מתעדכן אוטומטית!`,
        language: "bash",
        explanation: "3 פקודות = הקוד בענן. אוטומציה מלאה אחרי חיבור Vercel.",
      },
      {
        id: "github-connection",
        type: "explanation",
        title: "GitHub ✓ — עכשיו Vercel!",
        content: `## מה יש לנו עד עכשיו?

✅ Terminal — יודעים לנווט ולנהל קבצים
✅ Git — שומרים היסטוריה של שינויים
✅ GitHub — הקוד שמור בענן ומגובה

**מה חסר?** שאנשים יוכלו לראות את האתר שלנו!

כרגע הקוד נמצא בGitHub, אבל זה לא אתר — זה רק קוד.

Vercel ייקח את הקוד מGitHub ויהפוך אותו לאתר אמיתי עם כתובת.

**השיעור הבא = האתר שלכם באינטרנט!**`,
        explanation: "GitHub → Vercel → אתר חי עם כתובת!",
      },
    ],
  },

  // ════════════════════════════════════
  // 4: VERCEL DEPLOY
  // ════════════════════════════════════
  {
    id: "deploy-vercel",
    title: "Vercel — האתר שלכם באינטרנט",
    description: "מהקוד בGitHub לאתר חי עם כתובת — תוך 5 דקות, בחינם",
    icon: "🚀",
    duration: 25,
    difficulty: "מתחיל",
    xp: 250,
    steps: [
      {
        id: "what-is-vercel",
        type: "explanation",
        title: "מה זה Vercel ולמה זה מדהים?",
        content: `## Vercel = אירוח אתרים חכם

Vercel לוקח את הקוד מGitHub ומפרוס אותו לאינטרנט **אוטומטית**.

### הקסם האמיתי:
כל פעם שאתם עושים git push — **האתר מתעדכן לבד!**
לא צריך להעלות שוב ידנית. לא צריך שרת. Vercel עושה הכל.

### מה Vercel נותן בחינם?
- ✅ אירוח ל-100 פרויקטים
- ✅ HTTPS אוטומטי (כתובת https://)
- ✅ עדכון אוטומטי בכל push
- ✅ כתובת: yourproject.vercel.app

### מי משתמש בVercel?
- חברות כמו TikTok, Twitch, Notion
- מיליוני מפתחים עצמאיים`,
        explanation: "Vercel = git push → אתר מתעדכן. כל כך פשוט.",
      },
      {
        id: "vercel-signup",
        type: "explanation",
        title: "שלב 1: פתיחת חשבון Vercel",
        content: `## הירשמו בחינם

**לחצו:** vercel.com/signup

### צעדים:
1. לחצו על **"Continue with GitHub"**
   (חשוב! כך Vercel יוכל לגשת לפרויקטים שלכם)
2. הסכימו לחבר את GitHub לVercel
3. בחרו **"Hobby"** (חינמי)
4. ענו על השאלות או לחצו Skip

### מה קרה?
Vercel עכשיו מחובר לחשבון GitHub שלכם ויכול לראות את כל הפרויקטים.`,
        explanation: "הכניסה דרך GitHub חוסכת הגדרות מסובכות.",
      },
      {
        id: "first-deploy",
        type: "explanation",
        title: "שלב 2: פרסום הפרויקט הראשון",
        content: `## 5 לחיצות ויש אתר!

### בDashboard של Vercel:
1. לחצו **"Add New Project"**
2. ראו את רשימת הפרויקטים מGitHub
3. מצאו את **my-first-project** ולחצו **"Import"**
4. אל תשנו שום הגדרה — לחצו **"Deploy"**
5. חכו 1-2 דקות...

### מה יקרה?
- Vercel יוריד את הקוד מGitHub
- יבנה את הפרויקט
- יפרוס לאינטרנט
- תקבלו כתובת: my-first-project.vercel.app

**ברוכים הבאים לאינטרנט!** 🎉`,
        explanation: "Import → Deploy → האתר חי. זה הכל.",
      },
      {
        id: "auto-deploy",
        type: "explanation",
        title: "שלב 3: הניסוי המדהים",
        content: `## תראו את הקסם בפעולה

עכשיו נוכיח שהחיבור עובד:

### צעד 1: שנו משהו בקוד
פתחו את index.html ושנו את הטקסט.

### צעד 2: העלו לGitHub
\`\`\`bash
git add .
git commit -m "שיניתי את הכותרת"
git push
\`\`\`

### צעד 3: עברו לVercel
אחרי 1-2 דקות — האתר שלכם מעודכן!

**זה ה-Workflow שתשתמשו בו לכל פרויקט מעכשיו:**
שנו קוד → git push → האתר מתעדכן אוטומטית

### איפה לראות?
בDashboard של Vercel תוכלו לראות את כל ה-Deployments בזמן אמת.`,
        explanation: "push = deploy. לא צריך שום פעולה נוספת.",
      },
      {
        id: "custom-domain",
        type: "explanation",
        title: "בונוס: כתובת מותאמת אישית",
        content: `## רוצים yourname.co.il במקום vercel.app?

### אפשרויות:
1. **כתובת Vercel בחינם:** yourproject.vercel.app
2. **כתובת אישית בתשלום:** yoursite.co.il (כ-30-50 ש"ח לשנה)

### איך לקנות דומיין:
- **namecheap.com** — זול ופשוט
- **domains.google.com** — של גוגל, אמין
- **godaddy.com** — הכי גדול

### חיבור לVercel:
1. בVercel: Settings → Domains
2. הכניסו את הכתובת שקניתם
3. עקבו אחרי ההוראות לעדכון DNS
4. חכו עד 24 שעות — הכתובת פעילה!

> 💡 לתחילת הדרך כתובת vercel.app מושלמת לחלוטין.`,
        explanation: "לא חייבים דומיין — vercel.app מספיק מעולה.",
      },
      {
        id: "deploy-connection",
        type: "explanation",
        title: "פרסתם! עכשיו Claude Code",
        content: `## מה השגנו?

✅ Terminal — ניווט ועבודה עם קבצים
✅ Git — שמירת היסטוריה
✅ GitHub — הקוד בענן
✅ Vercel — **האתר חי באינטרנט!**

## מה הלאה?

עד עכשיו עשינו הכל ידנית.
**Claude Code יכול לעשות את הכל הזה בשבילנו!**

Claude Code הוא AI שרץ ב-Terminal, יכול לקרוא את הקבצים שלנו, לכתוב קוד, לתקן בעיות — ולבסוף לעשות git push ו-deploy.

**השיעור הבא = מתחילים לעבוד עם AI!**`,
        explanation: "כעת יש לנו את הבסיס — Terminal + Git + GitHub + Vercel. הכל מוכן ל-Claude Code.",
      },
    ],
  },

  // ════════════════════════════════════
  // 5: CLAUDE CODE
  // ════════════════════════════════════
  {
    id: "claude-code-intro",
    title: "Claude Code — ה-AI שכותב קוד",
    description: "התקינו והשתמשו ב-AI שיכול לבנות, לתקן ולפרוס פרויקטים שלמים",
    icon: "🤖",
    duration: 35,
    difficulty: "בינוני",
    xp: 300,
    steps: [
      {
        id: "what-is-claude-code",
        type: "explanation",
        title: "מה Claude Code יכול לעשות?",
        content: `## לא עוד AI בצ'אט — AI שפועל!

Claude Code שונה מהותית מ-Claude הרגיל:

| Claude.ai (צ'אט) | Claude Code |
|---|---|
| עונה בטקסט | כותב קבצים אמיתיים |
| לא יכול לגשת לקבצים | קורא את כל הפרויקט |
| לא מריץ קוד | מריץ פקודות Terminal |
| לא יכול לעשות push | יכול לעשות git push |

### מה Claude Code יכול לעשות:
- לבנות אפליקציה מאפס לפי תיאור
- לקרוא קוד קיים ולהסביר אותו
- למצוא ולתקן באגים
- לעדכן עיצוב לפי הוראות
- לעשות git add, commit, push
- לפרוס ל-Vercel`,
        explanation: "Claude Code = מפתח AI שיושב לידכם ועובד.",
      },
      {
        id: "install-claude-code",
        type: "code",
        title: "התקנת Claude Code",
        content: `## התקנה פשוטה

**דרישות מוקדמות:**
- Node.js מותקן (בדקו: node --version)
- חשבון Claude Pro ($20/חודש) או API Key

**אם אין Node.js:** הורידו מ: nodejs.org/en/download`,
        code: `# בדקו שNode.js מותקן
node --version
# אמור להראות v18 ומעלה

# התקינו Claude Code
npm install -g @anthropic-ai/claude-code

# בדקו שהותקן
claude --version

# הפעילו לראשונה
claude
# יפתח תהליך הכניסה לחשבון`,
        language: "bash",
        explanation: `-g = התקנה גלובלית — זמינה מכל תיקייה
לאחר ההתקנה, הפעילו claude בכל תיקיית פרויקט`,
      },
      {
        id: "first-conversation",
        type: "code",
        title: "השיחה הראשונה עם Claude Code",
        content: `## ככה עובדים עם Claude Code

נכנסים לתיקיית הפרויקט ומתחילים לדבר:`,
        code: `# כנסו לתיקיית הפרויקט
cd my-first-project

# הפעילו Claude Code
claude

# עכשיו אפשר לדבר!
# לדוגמה, כתבו לו:

> הוסף לקובץ index.html כותרת H1 שכתוב בה "הפרויקט שלי" בעברית

# Claude Code יקרא את הקובץ, יעדכן אותו, ויראה מה שינה

> עשה git add, commit ו-push עם הודעה מתאימה

# Claude Code יריץ את כל הפקודות בשבילנו!`,
        language: "bash",
        explanation: "מדברים בעברית, Claude Code עושה. פשוט ככה.",
      },
      {
        id: "real-project",
        type: "exercise",
        title: "פרויקט אמיתי עם Claude Code",
        content: `## תרגיל: בנו דף אישי עם Claude Code

### המשימה:
בקשו מClaude Code לבנות דף אישי (Portfolio) פשוט.

### הצעד אחר צעד:
1. פתחו Terminal בתיקיית הפרויקט
2. הפעילו: claude
3. כתבו לו:

**"בנה לי דף HTML פשוט עם CSS. הדף יכיל:
- שם ותמונה (placeholder)
- פסקת הכרות קצרה
- רשימת כישורים
- פרטי קשר
עיצוב נקי ומקצועי בעברית"**

4. לאחר שבנה — בקשו:
"עשה git add, commit ו-push לGitHub"

5. ראו שVercel מעדכן אוטומטית!`,
        hint: "אם Claude Code לא יכול לעשות push, בדקו שהגדרתם remote origin בשיעור Git.",
        expectedOutput: "דף HTML מלא עם CSS ו-push לGitHub",
      },
      {
        id: "claude-tips",
        type: "explanation",
        title: "טיפים לעבודה יעילה עם Claude Code",
        content: `## איך לקבל את התוצאות הטובות ביותר

### היו ספציפיים:
**במקום:** "תשפר את הדף"
**כתבו:** "שנה את צבע הרקע ל-#F4F6F8, הגדל את הכותרת ל-2.5rem, הוסף margin של 20px בין הסעיפים"

### תנו הקשר:
**"אני בונה אתר לעסק קטן שמוכר עוגות. יש לי קובץ index.html. הוסף קטלוג מוצרים עם 4 עוגות ומחיר לכל אחת"**

### בקשו הסברים:
**"עשה את השינוי ותסביר לי מה כל שורה עושה"**

### עבדו בצעדים:
לא "בנה לי אתר שלם" — אלא שלב שלב, כל פעם דבר אחד.

### שמרו תמיד:
לאחר כל שינוי טוב — בקשו מClaude Code לעשות commit.`,
        explanation: "Claude Code = שותף. ספרו לו הכל, הוא לא מנחש.",
      },
    ],
  },

  // ════════════════════════════════════
  // 6: PROMPTS
  // ════════════════════════════════════
  {
    id: "advanced-prompts",
    title: "Prompts מדויקים",
    description: "הכישרות שמבדיל בין מי שמקבל תוצאות בינוניות למי שמקבל תוצאות מדהימות",
    icon: "✍️",
    duration: 30,
    difficulty: "בינוני",
    xp: 200,
    steps: [
      {
        id: "what-is-prompt",
        type: "explanation",
        title: "מה זה Prompt ולמה זה חשוב?",
        content: `## Prompt = ההוראה שנותנים ל-AI

תחשבו על Claude Code כמקצוען שעובד בשבילכם.
אם תגידו "תשפר את האתר" — הוא לא יודע מה אתם רוצים.
אם תגידו "הוסף כפתור ירוק עם הטקסט 'צור קשר' שנפתח WhatsApp" — הוא יעשה בדיוק מה שרצתם.

## הנוסחה של Prompt טוב:
**הקשר + משימה + דרישות + פורמט**`,
        explanation: "Prompt טוב = תוצאה טובה. Prompt מעורפל = תוצאה מאכזבת.",
      },
      {
        id: "prompt-formula",
        type: "code",
        title: "הנוסחה בפועל",
        content: `## לפני ואחרי — השוואה אמיתית`,
        code: `# ❌ Prompt גרוע:
"תשפר את הדף שלי"

# ✅ Prompt טוב:
"אני בונה דף נחיתה לקורס אונליין בנושא בישול.
יש לי כרגע index.html עם כותרת ופסקה.

הוסף:
1. כפתור CTA ירוק עם הטקסט 'הצטרפו עכשיו'
2. 3 כרטיסיות יתרונות עם אייקון, כותרת ותיאור
3. טופס הרשמה עם שדות שם ואימייל

עיצוב: נקי, מודרני, RTL עברית.
לאחר השינויים — עשה commit עם הודעה מתאימה."

# ❌ Prompt גרוע לתיקון באג:
"יש לי בעיה בקוד"

# ✅ Prompt טוב לתיקון באג:
"בדף שלי יש כפתור שלא עושה כלום כשלוחצים עליו.
הכפתור אמור לשלוח טופס.
הנה קובץ script.js — מצא ותקן את הבעיה."`,
        language: "text",
        explanation: "הפרט יותר = Claude Code מבין יותר = תוצאה טובה יותר.",
      },
      {
        id: "iterative-prompting",
        type: "explanation",
        title: "עבודה איטרטיבית — הסוד האמיתי",
        content: `## לא בבת אחת — שלב אחר שלב

הטעות הנפוצה: לבקש הכל בבת אחת.
הדרך הנכונה: לבנות שלב אחר שלב.

### דוגמה — בניית דף נחיתה:

**שיחה 1:**
"בנה מבנה HTML בסיסי לדף נחיתה — header, main, footer"

**שיחה 2:**
"הוסף ל-header לוגו בצד שמאל ותפריט ניווט"

**שיחה 3:**
"עצב את ה-header — רקע כהה, טקסט לבן, גובה 80px"

**שיחה 4:**
"הוסף לmain סקציה hero עם כותרת גדולה וכפתור"

**כל שלב = commit = שינוי ב-Vercel**

### למה זה יותר טוב?
- אפשר לבדוק כל שלב
- קל לתקן אם משהו לא נראה טוב
- לא מאבדים עבודה גדולה אם משהו משתבש`,
        explanation: "פיתוח איטרטיבי = מקצועי. הכל בבת אחת = בעיות.",
      },
      {
        id: "prompt-templates",
        type: "code",
        title: "תבניות Prompt שתשתמשו בהן",
        content: `## שמרו אותן!`,
        code: `# תבנית לפיצ'ר חדש:
"אני בונה [תיאור הפרויקט].
יש לי כבר [מה שכבר קיים].
הוסף [מה שרוצים].
הדרישות: [פרטים ספציפיים].
לאחר הסיום — עשה commit."

# תבנית לתיקון באג:
"יש בעיה: [תיאור הבעיה].
מה שאמור לקרות: [התנהגות צפויה].
מה שקורה בפועל: [התנהגות בפועל].
הנה הקוד הרלוונטי: [הקובץ].
מצא ותקן."

# תבנית לשיפור עיצוב:
"עיין בקבצי ה-CSS הנוכחיים.
שפר את העיצוב כך:
- [שינוי 1]
- [שינוי 2]
- [שינוי 3]
שמור על העיצוב הכללי אך שפר את [הנקודה הספציפית]."

# תבנית לrefactor (שיפור קוד):
"קרא את [קובץ].
הקוד עובד אבל הוא לא מאורגן.
ארגן אותו מחדש — שיהיה קריא, מחולק לפונקציות קטנות, עם תגובות בעברית."`,
        language: "text",
        explanation: "תבניות = עקביות = תוצאות טובות.",
      },
      {
        id: "prompts-exercise",
        type: "exercise",
        title: "תרגיל: כתבו Prompt מנצח",
        content: `## כתבו Prompt לאחת מהמשימות:

**אפשרות א:**
אתם רוצים להוסיף לדף הנחיתה שלכם קטע המלצות — 3 לקוחות עם תמונה, שם ומשפט המלצה.

**אפשרות ב:**
הכפתור "צור קשר" לא פועל. אתם רוצים שהוא יפתח WhatsApp עם הודעה מוכנה.

**אפשרות ג:**
אתם רוצים להוסיף סרגל ניווט עם 4 קישורים שנדבק למעלה כשגוללים.

כתבו Prompt מלא לפי הנוסחה: הקשר + משימה + דרישות + פורמט`,
        hint: "זכרו: ספרו לClaude Code מה הפרויקט, מה כבר קיים, מה רוצים, ובקשו commit בסוף.",
      },
    ],
  },

  // ════════════════════════════════════
  // 7: SECURITY
  // ════════════════════════════════════
  {
    id: "security-basics",
    title: "אבטחה — מה לא לשים בקוד",
    description: "שגיאה אחת יכולה לעלות כסף רב או לחשוף מידע. למדו להגן על הפרויקטים שלכם",
    icon: "🔒",
    duration: 35,
    difficulty: "מתקדם",
    xp: 300,
    steps: [
      {
        id: "why-security",
        type: "explanation",
        title: "מה יכול לקרות?",
        content: `## סיפורים אמיתיים שקרו למפתחים

### סיפור 1 — API Key בGitHub:
מפתח שם API Key של OpenAI ישירות בקוד → העלה לGitHub → בוט מצא תוך 2 דקות → שימש בKey ← חיוב של $2,000 בלילה אחד.

### סיפור 2 — סיסמאות בקוד:
קוד עם סיסמת מסד נתונים הועלה לGitHub Public → האתר נפרץ → כל נתוני הלקוחות נגנבו.

### הכלל הבסיסי:
**שום סוד לא עולה לGitHub — לעולם!**

### מה נחשב "סוד"?
- API Keys (OpenAI, Anthropic, Stripe...)
- סיסמאות מסד נתונים
- JWT Secrets
- מפתחות הצפנה`,
        explanation: "סוד בGitHub = פרצה ציבורית. GitHub הוא ציבורי!",
      },
      {
        id: "env-files",
        type: "code",
        title: "קבצי .env — הפתרון",
        content: `## .env = קובץ סודות

במקום לשים סודות בקוד — שמים אותם בקובץ .env שלא עולה לGitHub:`,
        code: `# 1. צרו קובץ .env בתיקיית הפרויקט
touch .env

# 2. הוסיפו את הסודות שלכם (לא בקוד!)
# בתוך הקובץ .env כתבו:
ANTHROPIC_API_KEY=sk-ant-api03-...
DATABASE_URL=postgresql://user:pass@localhost/mydb
JWT_SECRET=my-super-secret-key

# 3. ודאו שGit מתעלם מקובץ זה
# הוסיפו לקובץ .gitignore:
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# 4. בדקו שהGitignore עובד
git status
# .env לא אמור להופיע!

# 5. צרו .env.example עם שמות השדות (ללא ערכים)
# בתוך הקובץ .env.example:
ANTHROPIC_API_KEY=
DATABASE_URL=
JWT_SECRET=

# את .env.example כן מעלים לGitHub
git add .env.example
git commit -m "הוספת .env.example"`,
        language: "bash",
        explanation: `.env = הסודות שלכם (לא ל-GitHub!)
.env.example = תבנית ריקה (כן ל-GitHub)
.gitignore = רשימת קבצים שGit מתעלם מהם`,
      },
      {
        id: "use-env",
        type: "code",
        title: "שימוש במשתני סביבה בקוד",
        content: `## כך משתמשים בסודות בבטחה`,
        code: `// ❌ לעולם לא ככה:
const apiKey = "sk-ant-api03-abc123...";

// ✅ תמיד ככה:
const apiKey = process.env.ANTHROPIC_API_KEY;

// בNext.js — בצד שרת בלבד:
// app/api/chat/route.ts
export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ error: "API key missing" }, { status: 500 });
  }
  // השתמשו ב-key...
}

// בNext.js — אם חייבים בצד לקוח:
// (רק עבור ערכים שאינם סודיים!)
const publicUrl = process.env.NEXT_PUBLIC_API_URL;
// NEXT_PUBLIC_ = גלוי לכולם, לא לסודות!`,
        language: "typescript",
        explanation: `process.env = גישה למשתני סביבה
NEXT_PUBLIC_ = גלוי לדפדפן (לא לסודות!)
ללא NEXT_PUBLIC_ = רק בשרת (בטוח לסודות)`,
      },
      {
        id: "vercel-env",
        type: "explanation",
        title: "הגדרת Env Variables בVercel",
        content: `## Vercel צריך לדעת את הסודות

כשVercel פורס את האפליקציה, הוא צריך גישה למשתני הסביבה.
**לא עולים לGitHub — מוכנסים ישירות בVercel.**

### איך מגדירים:
1. כנסו ל: vercel.com → הפרויקט שלכם
2. לחצו **Settings**
3. לחצו **Environment Variables**
4. הוסיפו כל משתנה:
   - Name: ANTHROPIC_API_KEY
   - Value: הערך האמיתי
   - Environment: Production, Preview, Development
5. לחצו **Save**
6. עשו **Redeploy** כדי שהשינויים ייכנסו לתוקף

### בדיקה:
אם האפליקציה עובדת אחרי Redeploy — הכל בסדר!`,
        explanation: "Env Variables בVercel = בטוח. בGitHub = מסוכן.",
      },
      {
        id: "security-checklist",
        type: "exercise",
        title: "Checklist לפני כל Push",
        content: `## לפני כל git push — בדקו:

**חייב לעבור:**

⬜ קובץ .env נמצא ב-.gitignore?
⬜ אין API Keys בשום קובץ קוד?
⬜ אין סיסמאות בשום קובץ?
⬜ אין נתיבי שרת פרטיים בקוד?
⬜ קובץ .env.example קיים עם שמות השדות?

**הרצו בTerminal לבדיקה:**`,
        hint: `# בדיקת קצרה לסודות
git diff --cached | grep -i "api_key\\|secret\\|password\\|token"
# אם מוצא משהו — עצרו! אל תעשו commit.

# בדיקת .gitignore
cat .gitignore | grep ".env"
# אמור להראות .env`,
      },
    ],
  },

  // ════════════════════════════════════
  // 8: FULL PROJECT
  // ════════════════════════════════════
  {
    id: "system-architecture",
    title: "פרויקט מלא מאפס עד Vercel",
    description: "הכל ביחד — בנו אפליקציה אמיתית עם Claude Code ופרסו אותה לאינטרנט",
    icon: "🏗️",
    duration: 60,
    difficulty: "מתקדם",
    xp: 500,
    steps: [
      {
        id: "plan",
        type: "explanation",
        title: "שלב 1: תכנון הפרויקט",
        content: `## לפני שכותבים שורת קוד — מתכננים!

### הפרויקט שנבנה:
**דף נחיתה לעסק או שירות אישי**
(אפשר לבחור: קורס, עסק, שירות, פורטפוליו)

### מה יכיל:
1. **Header** — לוגו + ניווט
2. **Hero** — כותרת + תיאור + כפתור
3. **יתרונות** — 3 כרטיסיות
4. **אודות** — טקסט + תמונה
5. **יצירת קשר** — טופס / WhatsApp
6. **Footer**

### הכלים:
- HTML + CSS + JavaScript פשוט
- Claude Code לבנייה
- GitHub לגיבוי
- Vercel לפרסום

### הכינו מראש:
- שם הפרויקט
- תיאור קצר (2-3 משפטים)
- 3 יתרונות/שירותים
- פרטי קשר`,
        explanation: "תכנון = מחצית העבודה. אל תדלגו על זה.",
      },
      {
        id: "setup",
        type: "code",
        title: "שלב 2: הקמת הפרויקט",
        content: `## בואו נתחיל!`,
        code: `# 1. פתחו Terminal
# 2. כנסו לתיקיית הפרויקטים שלכם
cd ~/projects

# 3. צרו תיקייה חדשה
mkdir my-landing-page
cd my-landing-page

# 4. אתחלו Git
git init

# 5. צרו קבצים בסיסיים
touch index.html style.css script.js

# 6. צרו .gitignore
echo ".env" > .gitignore
echo "node_modules" >> .gitignore
echo ".DS_Store" >> .gitignore

# 7. Commit ראשון
git add .
git commit -m "הקמת מבנה הפרויקט"

# 8. צרו Repository בGitHub
# (לכו ל-github.com/new)

# 9. חיברו ל-GitHub
git remote add origin https://github.com/YOUR-USERNAME/my-landing-page.git
git branch -M main
git push -u origin main`,
        language: "bash",
        explanation: "הקמה נכונה = בסיס יציב לכל מה שיבוא.",
      },
      {
        id: "build-with-claude",
        type: "exercise",
        title: "שלב 3: בנייה עם Claude Code",
        content: `## עכשיו Claude Code עושה את הקסם

### פתחו Claude Code:
\`\`\`bash
claude
\`\`\`

### הPrompt הראשון:
\`\`\`
אני בונה דף נחיתה עבור [תיאור העסק/שירות שלכם].

בנה דף HTML+CSS מלא עם:
1. Header עם לוגו טקסט ותפריט ניווט (בית, אודות, שירותים, קשר)
2. Hero section עם כותרת גדולה, תת-כותרת ושני כפתורים
3. סקציית 3 יתרונות עם אייקון SVG, כותרת ותיאור לכל אחד
4. Footer עם זכויות יוצרים

דרישות עיצוב:
- RTL עברית
- צבעים: [הצבעים שלכם]
- פונט: מהגוגל פונטס
- רספונסיבי למובייל

לאחר הסיום — עשה commit.
\`\`\`

### המשיכו שלב אחר שלב:
אחרי כל חלק — בדקו בדפדפן ובקשו שינויים.`,
        hint: "אל תבקשו הכל בבת אחת. בנו Hero קודם, בדקו, תקנו — ואז המשיכו.",
      },
      {
        id: "iterate",
        type: "explanation",
        title: "שלב 4: שיפור איטרטיבי",
        content: `## ככה עובד תהליך פיתוח אמיתי

### הסדר:
1. Claude Code בונה חלק
2. פותחים בדפדפן ובודקים
3. אוהבים? → commit
4. רוצים שינוי? → אומרים לClaude Code
5. חוזרים ל-1

### שאלות לשאול את עצמכם בבדיקה:
- האם זה נראה כמו שדמיינתי?
- האם זה עובד במובייל?
- האם הטקסט קריא?
- האם הכפתורים גלויים?

### אחרי כל שינוי שאהבתם:
\`\`\`bash
git add .
git commit -m "תיאור השינוי"
git push
\`\`\`

Vercel יעדכן את האתר תוך 2-3 דקות!`,
        explanation: "פיתוח = לולאה של בנה-בדוק-שפר. אין מקצוען שמבנה הכל נכון בפעם הראשונה.",
      },
      {
        id: "deploy-final",
        type: "explanation",
        title: "שלב 5: פרסום ב-Vercel",
        content: `## האתר שלכם לאוויר העולם!

### אם עוד לא חיברתם Vercel:
1. כנסו: vercel.com/new
2. בחרו את הפרויקט מGitHub
3. לחצו Deploy
4. קבלו כתובת!

### טיפים לPro:
- **שם הכתובת:** אפשר לשנות בSettings → Domains
- **עדכון עתידי:** רק git push — הכל אוטומטי
- **Analytics:** Vercel מראה כמה אנשים נכנסו
- **לוגים:** אם יש שגיאה — ראו ב-Functions → Logs

### שתפו!
כתובת vercel.app שלכם = לינק שאפשר לשלוח לכולם.
שלחו ל-WhatsApp, LinkedIn, בCV...

**ברוכים הבאים לעולם הפיתוח!** 🎉`,
        explanation: "מכאן כל פרויקט חדש יהיה קל יותר. יש לכם את כל הכלים.",
      },
    ],
  },
];

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find((l) => l.id === id);
