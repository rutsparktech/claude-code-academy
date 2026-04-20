import { Lesson } from "@/types";

export const LESSONS: Lesson[] = [
  {
    id: "terminal-basics",
    title: "יסודות ה-Terminal",
    description: "לומדים לנווט ולנהל קבצים בשורת הפקודה",
    icon: "⌨️", duration: 20, difficulty: "מתחיל", xp: 100,
    steps: [
      {
        id: "what-is-terminal", type: "explanation", title: "מה זה Terminal?",
        content: "Terminal הוא ממשק טקסטואלי שמאפשר לתקשר עם המחשב ישירות דרך פקודות.\n\nלמה כדאי ללמוד Terminal?\n- **מהיר יותר** מממשק גרפי לפעולות רבות\n- **אוטומציה** — כותבים סקריפטים שמבצעים פעולות אוטומטית\n- **כלים מקצועיים** — רוב כלי הפיתוח עובדים דרך Terminal\n- **שרתים** — כשמתחברים לשרת מרוחק, זה הכלי היחיד שיש\n\nמיקום Terminal:\n- Mac: Applications > Utilities > Terminal\n- Windows: PowerShell או Windows Terminal\n- Linux: Ctrl+Alt+T\n- VS Code: Ctrl+` (backtick)",
        explanation: "Terminal הוא כלי בסיסי שכל מפתח חייב לדעת.",
      },
      {
        id: "first-commands", type: "code", title: "הפקודות הראשונות",
        content: "מתחילים עם הפקודות הבסיסיות ביותר — אלה שמשתמשים בהן כל יום!",
        code: "# היכן אנחנו נמצאים?\npwd\n# Output: /home/username\n\n# הצגת קבצים בתיקייה הנוכחית\nls\n# Output: Documents  Downloads  Desktop\n\n# הצגה עם פרטים נוספים\nls -la\n\n# ניקוי המסך\nclear",
        language: "bash",
        explanation: "**pwd** = Print Working Directory — מציג את הנתיב הנוכחי\n**ls** = List — מציג קבצים ותיקיות\n**ls -la** = מציג הכל כולל נסתרים עם פרטים\n**clear** = מנקה את המסך (Ctrl+L גם עובד)",
      },
      {
        id: "navigation", type: "code", title: "ניווט בין תיקיות",
        content: "**cd** = Change Directory — הפקודה הכי חשובה לניווט!",
        code: "# כניסה לתיקייה\ncd Documents\n\n# חזרה תיקייה אחת למעלה\ncd ..\n\n# חזרה לתיקיית הבית\ncd ~\n\n# ניווט לנתיב מלא\ncd /home/user/projects/my-app\n\n# חזרה לתיקייה הקודמת\ncd -",
        language: "bash",
        explanation: "**..** = התיקייה שמעל\n**.** = התיקייה הנוכחית\n**~** = תיקיית הבית\n**/** = תיקיית השורש",
      },
      {
        id: "create-files", type: "code", title: "יצירת קבצים ותיקיות",
        content: "יוצרים תיקיות וקבצים חדשים:",
        code: "# יצירת תיקייה חדשה\nmkdir my-project\n\n# יצירת כמה תיקיות בבת אחת\nmkdir src tests docs\n\n# יצירת תיקיות מקוננות\nmkdir -p src/components/ui\n\n# יצירת קובץ ריק\ntouch index.js\n\n# יצירת קובץ עם תוכן\necho \"console.log('שלום!')\" > hello.js\n\n# הצגת תוכן קובץ\ncat hello.js",
        language: "bash",
        explanation: "**mkdir** = Make Directory — יצירת תיקייה\n**touch** = יצירת קובץ ריק\n**echo** = הדפסת טקסט\n**>** = שמירת פלט לקובץ\n**cat** = הצגת תוכן קובץ",
      },
      {
        id: "copy-move-delete", type: "code", title: "העתקה, העברה ומחיקה",
        content: "שלוש הפעולות הבסיסיות: העתקה, הזזה, מחיקה",
        code: "# העתקת קובץ\ncp hello.js hello-copy.js\n\n# העתקת תיקייה\ncp -r my-project backup\n\n# העברה / שינוי שם\nmv hello.js hello-world.js\n\n# מחיקת קובץ\nrm file.js\n\n# מחיקת תיקייה\nrm -rf folder-name",
        language: "bash",
        explanation: "**cp** = Copy — העתקה\n**mv** = Move — הזזה/שינוי שם\n**rm** = Remove — מחיקה\n**-r** = Recursive — כולל תוכן פנימי\n⚠️ **אזהרה**: אין Recycle Bin! מחיקה היא סופית.",
      },
      {
        id: "exercise-terminal", type: "exercise", title: "תרגיל: בניית מבנה פרויקט",
        content: "בונים את המבנה הבא:\n\nmy-app/\n  src/\n    index.js\n    utils.js\n  tests/\n    index.test.js\n  README.md",
        hint: "1. mkdir my-app\n2. cd my-app\n3. mkdir src tests\n4. touch src/index.js src/utils.js\n5. touch tests/index.test.js README.md",
        expectedOutput: "my-app/src/index.js",
      },
      {
        id: "sandbox-terminal", type: "sandbox", title: "מתרגלים כאן!",
        content: "מתרגלים את כל הפקודות בסנדבוקס הבטוח.\nאי אפשר לשבור כלום — הכל מדומה בזיכרון.\n\nמה לנסות:\n- ls, pwd, mkdir\n- cd להיכנס לתיקיות\n- touch ליצור קבצים\n- cat לראות תוכן",
      },
    ],
  },
  {
    id: "git-basics",
    title: "Git - בקרת גרסאות",
    description: "שומרים היסטוריה של הקוד ועובדים בצוות",
    icon: "🌿", duration: 30, difficulty: "מתחיל", xp: 150,
    steps: [
      {
        id: "what-is-git", type: "explanation", title: "מה זה Git?",
        content: "Git היא מערכת בקרת גרסאות שמאפשרת:\n- **שמירת snapshots** של הקוד בנקודות זמן\n- **חזרה** לגרסאות ישנות בכל עת\n- **עבודה בצוות** — כמה אנשים על אותו פרויקט\n- **פיתוח מקביל** — עבודה על כמה פיצ'רים בו-זמנית\n\nדמיון טוב: Git הוא כמו מכונת זמן לקוד.\n\n**GitHub** הוא שירות אינטרנטי שמאחסן את ה-Git בענן ומאפשר שיתוף.",
      },
      {
        id: "git-setup", type: "code", title: "הגדרת Git",
        content: "הגדרות ראשוניות — פעם אחת בלבד:",
        code: "# בדיקה שGit מותקן\ngit --version\n\n# הגדרת שם (יופיע בכל commit)\ngit config --global user.name \"השם שלנו\"\n\n# הגדרת אימייל\ngit config --global user.email \"email@example.com\"\n\n# הצגת ההגדרות\ngit config --list",
        language: "bash",
        explanation: "הגדרות אלו נשמרות גלובלית ומופיעות בכל commit שניצור.",
      },
      {
        id: "git-workflow", type: "code", title: "ה-Workflow של Git",
        content: "שלושת השלבים של עבודה עם Git:",
        code: "# שלב 1: בודקים מה השתנה\ngit status\n\n# שלב 2: מוסיפים לStaging Area\ngit add README.md\n# או הכל:\ngit add .\n\n# שלב 3: Commit — שמירת snapshot\ngit commit -m \"הוספת README\"\n\n# הצגת היסטוריה\ngit log --oneline",
        language: "bash",
        explanation: "Working Directory → Staging Area → Repository\n**git add** = מעביר לStaging\n**git commit** = שומר snapshot לצמיתות",
      },
      {
        id: "git-branches", type: "code", title: "Branches — ענפים",
        content: "Branch מאפשר לעבוד על פיצ'ר חדש בלי לשבור את הקוד הקיים:",
        code: "# הצגת branches קיימים\ngit branch\n\n# יצירת branch חדש\ngit branch my-feature\n\n# מעבר לbranch\ngit checkout my-feature\n\n# יצירה ומעבר בפקודה אחת\ngit checkout -b another-feature\n\n# מיזוג חזרה למain\ngit checkout main\ngit merge my-feature",
        language: "bash",
        explanation: "**Branch** = קו פיתוח עצמאי\n**main** = הbranch הראשי\n**merge** = איחוד שינויים משני branches",
      },
      {
        id: "git-github", type: "code", title: "GitHub — שיתוף הקוד",
        content: "שליחה וקבלה של קוד מ-GitHub:",
        code: "# חיבור repository מקומי לGitHub\ngit remote add origin https://github.com/username/repo.git\n\n# שליחת קוד לGitHub\ngit push origin main\n\n# קבלת עדכונים מGitHub\ngit pull origin main\n\n# שכפול repository קיים\ngit clone https://github.com/username/repo.git",
        language: "bash",
        explanation: "**origin** = שם ברירת המחדל לשרת המרוחק\n**push** = שליחה לGitHub\n**pull** = קבלה מGitHub\n**clone** = הורדת עותק שלם",
      },
      {
        id: "sandbox-git", type: "sandbox", title: "מתרגלים Git!",
        content: "מתרגלים פקודות Git בסנדבוקס:\n\n1. git init — אתחול repository\n2. git status — בדיקת מצב\n3. git add . — הוספת קבצים\n4. git commit -m 'הודעה' — שמירה\n5. git log — הצגת היסטוריה",
      },
    ],
  },
  {
    id: "nodejs-basics",
    title: "Node.js - JavaScript בשרת",
    description: "מריצים JavaScript מחוץ לדפדפן",
    icon: "💚", duration: 25, difficulty: "בינוני", xp: 200,
    steps: [
      {
        id: "what-is-nodejs", type: "explanation", title: "מה זה Node.js?",
        content: "Node.js מאפשר להריץ JavaScript מחוץ לדפדפן.\n\nלפני Node.js: JavaScript רק בדפדפן\nאחרי Node.js: JavaScript בכל מקום!\n\nשימושים:\n- **Web APIs ושרתים**\n- **כלי פיתוח** (npm, webpack, Next.js)\n- **אפליקציות command line**\n- **Claude Code עצמו** בנוי עם Node.js!",
      },
      {
        id: "npm-basics", type: "code", title: "npm — מנהל החבילות",
        content: "npm = Node Package Manager — מאגר של מיליוני ספריות מוכנות:",
        code: "# בדיקת גרסת Node\nnode --version\n\n# בדיקת גרסת npm\nnpm --version\n\n# יצירת פרויקט חדש\nnpm init -y\n\n# התקנת ספרייה\nnpm install express\n\n# הרצת script מpackage.json\nnpm run start",
        language: "bash",
        explanation: "**npm init** = יוצר package.json\n**package.json** = תעודת זהות של הפרויקט\n**node_modules** = תיקיית הספריות (לא נוגעים בה!)\n**-y** = yes לכל השאלות",
      },
      {
        id: "first-server", type: "code", title: "שרת ראשון!",
        content: "בונים שרת Web פשוט בNode.js:",
        code: "// server.js\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('שלום מהשרת!');\n});\n\nserver.listen(3000, () => {\n  console.log('השרת רץ על http://localhost:3000');\n});\n\n// הרצה בטרמינל:\n// node server.js",
        language: "javascript",
        explanation: "**http.createServer** = יוצר שרת\n**req** = הבקשה שהגיעה מהדפדפן\n**res** = התגובה שנשלח חזרה\n**listen(3000)** = מאזין לחיבורים על פורט 3000",
      },
      {
        id: "package-json", type: "code", title: "package.json",
        content: "קובץ ההגדרות של כל פרויקט Node.js:",
        code: "{\n  \"name\": \"my-project\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"start\": \"node server.js\",\n    \"dev\": \"nodemon server.js\",\n    \"build\": \"next build\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.0\"\n  },\n  \"devDependencies\": {\n    \"nodemon\": \"^3.0.0\"\n  }\n}",
        language: "json",
        explanation: "**scripts** = פקודות מוכנות עם npm run\n**dependencies** = ספריות נדרשות בפרודקשן\n**devDependencies** = ספריות לפיתוח בלבד",
      },
    ],
  },
  {
    id: "claude-code-intro",
    title: "Claude Code — AI לקידוד",
    description: "לומדים לעבוד עם Claude Code — ה-AI שכותב קוד",
    icon: "🤖", duration: 35, difficulty: "בינוני", xp: 250,
    steps: [
      {
        id: "what-is-claude-code", type: "explanation", title: "מה זה Claude Code?",
        content: "Claude Code הוא כלי AI של Anthropic שרץ ב-Terminal.\n\nמה הוא יכול לעשות:\n- **כתיבת קוד** על פי הוראות בעברית\n- **תיקון באגים** אוטומטי\n- **הסבר קוד** קיים שורה שורה\n- **בניית פרויקטים** שלמים מאפס\n- **קריאה ועריכה** של קבצים אמיתיים במחשב\n\n**ההבדל מ-Claude רגיל:**\nClaude Code יכול לגשת לקבצים במחשב ולהריץ פקודות — Claude רגיל מגיב רק בטקסט.",
      },
      {
        id: "install-claude", type: "code", title: "התקנת Claude Code",
        content: "התקנה דרך PowerShell (Windows):",
        code: "# התקנה מהירה ב-Windows\nirm https://claude.ai/install.ps1 | iex\n\n# בדיקה שהותקן\nclaude --version\n\n# הפעלה\nclaude\n\n# או עם שאלה ישירה\nclaude \"הסברי לי מה הקוד בקובץ הזה עושה\"",
        language: "bash",
        explanation: "לאחר ההתקנה נפתח חלון התחברות לחשבון Anthropic\nנדרש מנוי Claude Pro ($20/חודש) או API key",
      },
      {
        id: "first-conversation", type: "code", title: "שיחה ראשונה עם Claude Code",
        content: "כך מדברים עם Claude Code בצורה יעילה:",
        code: "# פותחים פרויקט קיים\ncd my-project\nclaude\n\n# דוגמאות לבקשות טובות:\n> צור קובץ index.js עם שרת express בסיסי\n> הסבר מה הקוד בקובץ app.tsx עושה\n> תקן את הבאג בשורה 45\n> הוסף validation לטופס ההרשמה\n> כתוב tests ל-UserService",
        language: "bash",
        explanation: "Claude Code רואה את כל הקבצים בתיקייה!\nאפשר לדבר איתו בעברית — מבין מצוין\nככל שמתארים יותר בפירוט — התוצאה טובה יותר",
      },
      {
        id: "claude-tips", type: "explanation", title: "טיפים לעבודה עם Claude Code",
        content: "איך מקבלים את התוצאות הטובות ביותר:\n\n**1. ספציפיות:**\nבמקום: 'תעזור לנו'\nכותבים: 'צור קומפוננט React לטופס התחברות עם email וסיסמה'\n\n**2. הקשר:**\n'אנחנו בונים אפליקציית Next.js עם TypeScript, הוסיפו...'\n\n**3. בקשת הסברים:**\n'תעשו X ותסבירו לנו מה כל שורה עושה'\n\n**4. עבודה בצעדים קטנים:**\nבמקום לבקש הכל בבת אחת — עובדים שלב אחר שלב\n\n**5. בדיקת הקוד:**\nתמיד קוראים מה Claude כותב לפני הרצה!",
      },
      {
        id: "sandbox-claude", type: "sandbox", title: "מתרגלים!",
        content: "פותחים Terminal ומנסים:\n\n1. npm install -g @anthropic-ai/claude-code\n2. cd לתיקיית הפרויקט\n3. claude\n4. שואלים אותו על הפרויקט!",
      },
    ],
  },
  {
    id: "advanced-prompts",
    title: "Prompts מתקדמים",
    description: "לומדים לתאר מה רוצים בצורה מדויקת",
    icon: "✍️", duration: 30, difficulty: "בינוני", xp: 200,
    steps: [
      {
        id: "what-is-prompt", type: "explanation", title: "מה זה Prompt?",
        content: "Prompt הוא ההוראה שנותנים ל-AI.\n\nאיכות ה-Prompt קובעת את איכות התוצאה!\n\nכמו מתכון בישול:\n- **מתכון מדויק** = תבשיל טוב\n- **מתכון מעורפל** = תבשיל לא צפוי\n\nאותו עיקרון עם AI:\n- **Prompt מדויק** = קוד מושלם\n- **Prompt מעורפל** = קוד שלא עושה מה שרצינו",
      },
      {
        id: "prompt-structure", type: "code", title: "מבנה Prompt מנצח",
        content: "כל Prompt טוב מכיל 4 חלקים:",
        code: "# 1. CONTEXT - הקשר\n\"אנחנו בונים אפליקציית React עם TypeScript ו-Next.js 14\"\n\n# 2. TASK - המשימה\n\"צרו קומפוננט לטופס התחברות\"\n\n# 3. REQUIREMENTS - דרישות\n\"עם:\n- שדות email וסיסמה עם validation\n- כפתור Submit\n- הצגת שגיאות\n- עיצוב עם Tailwind\"\n\n# 4. FORMAT - פורמט\n\"הסבירו כל חלק בתגובות בעברית\"",
        language: "text",
        explanation: "ככל שנתאר יותר הקשר — התוצאה תהיה מדויקת יותר!\nאל תניחו שה-AI יודע מה רציתם — אמרו הכל במפורש",
      },
      {
        id: "prompt-examples", type: "code", title: "לפני ואחרי",
        content: "השוואה בין Prompts חלשים לחזקים:",
        code: "# BEFORE - חלש:\n\"עשו לנו אפליקציה\"\n\n# AFTER - חזק:\n\"בנו אפליקציית Next.js 14 ללמידת שפות.\nהיא צריכה:\n- דף בית עם רשימת שיעורים\n- כל שיעור עם הסבר, דוגמה ותרגיל\n- מעקב התקדמות בlocalStorage\n- עיצוב RTL בעברית עם Tailwind\n- צבעים: כחול #3B82F6 וירוק #10B981\"\n\n# BEFORE - חלש:\n\"תקנו את הבאג\"\n\n# AFTER - חזק:\n\"יש לנו שגיאה:\nTypeError: Cannot read property 'map' of undefined\nבשורה 23 בקובץ UserList.tsx.\nהנה הקוד: [קוד]\nמה הבעיה ואיך לתקן?\"",
        language: "text",
        explanation: "ספציפיות = תוצאות טובות יותר\nתמיד כוללים: מה, למה, איך, ובאיזה טכנולוגיה",
      },
      {
        id: "iterative-prompting", type: "explanation", title: "עבודה איטרטיבית",
        content: "הדרך הטובה ביותר לעבוד עם Claude Code:\n\n**שלב 1 — תכנון:**\n'עזרו לנו לתכנן אפליקציה לניהול משימות. מה המבנה המומלץ?'\n\n**שלב 2 — בנייה ראשונית:**\n'צרו את מבנה הפרויקט הבסיסי עם הקבצים הנדרשים'\n\n**שלב 3 — הוספת פיצ'רים:**\n'עכשיו הוסיפו מסך להוספת משימה חדשה'\n\n**שלב 4 — שיפור:**\n'הוסיפו אנימציה כשמשימה נמחקת'\n\n**שלב 5 — בדיקות:**\n'כתבו tests לפונקציית addTask'\n\nכל שלב בנוי על הקודם!",
      },
      {
        id: "exercise-prompts", type: "exercise", title: "תרגיל: כתיבת Prompt מנצח",
        content: "כותבים Prompt מלא לאחת מהמשימות הבאות:\n\n1. קומפוננט תפריט ניווט\n2. דף פרופיל משתמש\n3. טופס יצירת קשר\n\nזוכרים: Context + Task + Requirements + Format",
        hint: "מתחילים עם: 'אנחנו בונים [סוג אפליקציה] עם [טכנולוגיות]. צרו [מה] שכולל [פרטים]...'",
      },
    ],
  },
  {
    id: "security-basics",
    title: "אבטחה בסיסית",
    description: "מה לא לשים בקוד, שמירה על סודות ובנייה מאובטחת",
    icon: "🔒", duration: 40, difficulty: "מתקדם", xp: 300,
    steps: [
      {
        id: "why-security", type: "explanation", title: "למה אבטחה חשובה?",
        content: "טעויות אבטחה נפוצות שמפתחים מתחילים עושים:\n\n**1. שמים API keys בקוד ומעלים לGitHub**\n= כל אחד יכול להשתמש בהם ואנחנו משלמים!\n\n**2. מאחסנים סיסמאות כטקסט רגיל**\n= אם הDB נפרץ — כל הסיסמאות חשופות\n\n**3. מאמינים ל-Input של המשתמש**\n= SQL Injection, XSS attacks\n\n**4. לא מעדכנים dependencies**\n= פרצות אבטחה ידועות\n\nנלמד איך להימנע מכל אלה!",
      },
      {
        id: "env-files", type: "code", title: ".env — קבצי סביבה",
        content: ".env הוא הקובץ שמאחסן את כל הסודות — ולא עולה לGitHub!",
        code: "# קובץ .env (לא מועלה לGitHub!)\nDATABASE_URL=postgresql://user:password@localhost/mydb\nANTHROPIC_API_KEY=sk-ant-...\nJWT_SECRET=my-super-secret-key-123\n\n# קובץ .env.example (כן מועלה — בלי ערכים!)\nDATABASE_URL=\nANTHROPIC_API_KEY=\nJWT_SECRET=\n\n# קובץ .gitignore — מונע העלאה\n.env\n.env.local\n.env.production",
        language: "bash",
        explanation: "**.env** = קובץ משתנו סביבה\n**NEXT_PUBLIC_** = משתנה שנחשף לצד הלקוח (זהירות!)\nבלי NEXT_PUBLIC_ = רק בצד השרת\n**.gitignore** = רשימת קבצים שGit מתעלם מהם",
      },
      {
        id: "use-env", type: "code", title: "שימוש במשתנו סביבה",
        content: "איך משתמשים ב-.env בקוד:",
        code: "// WRONG - מסוכן!\nconst apiKey = 'sk-ant-api03-...';\n\n// RIGHT - תמיד משתנו סביבה\nconst apiKey = process.env.ANTHROPIC_API_KEY;\n\n// בNext.js — צד שרת\nexport async function POST(req: Request) {\n  const key = process.env.ANTHROPIC_API_KEY;\n  if (!key) throw new Error('API key missing!');\n  // ...\n}\n\n// בNext.js — צד לקוח (רק NEXT_PUBLIC_)\nconst url = process.env.NEXT_PUBLIC_API_URL;",
        language: "typescript",
        explanation: "**process.env** = גישה למשתנו הסביבה\nתמיד בודקים שהמשתנה קיים לפני שימוש\nמשתנים ללא NEXT_PUBLIC_ נגישים רק בשרת — הרבה יותר בטוח!",
      },
      {
        id: "gitignore", type: "code", title: ".gitignore — הגנה על סודות",
        content: "קובץ .gitignore אומר ל-Git אילו קבצים לא להעלות:",
        code: "# .gitignore\n\n# משתנו סביבה — חובה!\n.env\n.env.local\n.env.development\n.env.production\n\n# תלויות — גדולות מדי\nnode_modules/\n\n# בנייה\n.next/\nbuild/\ndist/\n\n# מערכת\n.DS_Store\nThumbs.db",
        language: "text",
        explanation: "כל .gitignore חייב לכלול .env!\nnode_modules לא מועלה כי npm install מוריד אותו\n***** = כל קובץ עם הסיומת הזו",
      },
      {
        id: "input-validation", type: "code", title: "Validation — לא מאמינים למשתמש",
        content: "כל input מהמשתמש עלול להיות מסוכן!",
        code: "// WRONG - מסוכן!\nasync function getUser(id: string) {\n  const user = await db.query(\n    `SELECT * FROM users WHERE id = ${id}`\n  );\n  // SQL Injection!\n}\n\n// RIGHT - Parameterized query\nasync function getUser(id: string) {\n  const user = await db.query(\n    'SELECT * FROM users WHERE id = $1',\n    [id]\n  );\n}\n\n// Validation עם Zod\nimport { z } from 'zod';\nconst UserSchema = z.object({\n  email: z.string().email(),\n  age: z.number().min(18).max(120),\n});\nconst result = UserSchema.safeParse(userInput);",
        language: "typescript",
        explanation: "**SQL Injection** = התקפה שמזריקה קוד SQL דרך input\n**Parameterized queries** = הגנה מ-SQL Injection\n**Zod** = ספריית validation פופולרית לTypeScript",
      },
      {
        id: "security-checklist", type: "exercise", title: "צ'קליסט אבטחה",
        content: "לפני כל deploy — בודקים:\n\n1. האם .env נמצא ב-.gitignore?\n2. האם אין API keys בקוד?\n3. האם כל input מ-validated?\n4. האם הספריות מעודכנות?\n\nמריצים:\nnpm audit\n\nולתיקון:\nnpm audit fix",
        hint: "מריצים 'git log --all -p | grep -i secret' כדי לוודא שאין סודות בhistory!",
      },
    ],
  },
  {
    id: "deploy-vercel",
    title: "Deploy לVercel",
    description: "מהקוד המקומי לאתר חי באינטרנט",
    icon: "🚀", duration: 35, difficulty: "מתקדם", xp: 300,
    steps: [
      {
        id: "what-is-deploy", type: "explanation", title: "מה זה Deploy?",
        content: "Deploy = פרסום האפליקציה לאינטרנט\n\nהתהליך:\nקוד מקומי → GitHub → Vercel → אתר חי\n\n**Vercel** הוא פלטפורמת hosting מיועדת ל-Next.js:\n- **Deploy אוטומטי** בכל push לGitHub\n- **HTTPS** חינמי\n- **CDN** גלובלי\n- **Analytics** מובנה\n- **חינמי** לפרויקטים אישיים!\n\n**המשמעות:** כל פעם שדוחפים קוד לGitHub — האתר מתעדכן אוטומטית תוך דקות!",
      },
      {
        id: "prepare-deploy", type: "code", title: "הכנה ל-Deploy",
        content: "לפני Deploy — מוודאים שהכל תקין:",
        code: "# בדיקה שהבנייה עובדת\nnpm run build\n\n# בדיקת TypeScript\nnpx tsc --noEmit\n\n# שמירה ב-GitHub\ngit add .\ngit commit -m \"מוכן לdeploy\"\ngit push origin main",
        language: "bash",
        explanation: "**npm run build** = בודק שהקוד יכול להיבנות לפרודקשן\nאם יש שגיאות כאן — הן יופיעו גם בVercel\n**tsc --noEmit** = בדיקת TypeScript בלי ייצור קבצים",
      },
      {
        id: "env-vercel", type: "explanation", title: "משתנו סביבה בVercel",
        content: "בVercel צריך להגדיר משתנו סביבה ידנית!\n\nאיך עושים:\n1. נכנסים ל-dashboard של הפרויקט בVercel\n2. Settings > Environment Variables\n3. מוסיפים כל משתנה מה-.env\n4. Redeploy כדי שהשינויים ייכנסו לתוקף\n\n**חשוב!**\n- משתנים ב-.env לא עולים אוטומטית\n- צריך להוסיף אותם ידנית לVercel\n- שמות המשתנים חייבים להיות זהים!",
      },
      {
        id: "auto-deploy", type: "explanation", title: "Auto Deploy",
        content: "זה מה שהופך את Vercel למדהים:\n\n**התהליך האוטומטי:**\n1. עורכים קוד במחשב\n2. git push לGitHub\n3. Vercel מזהה את ה-Push אוטומטית\n4. Vercel מריץ npm run build\n5. האתר מתעדכן תוך 1-2 דקות!\n\n**Preview Deployments:**\nכל branch מקבל URL משלו לבדיקה לפני שמגיעים ל-main!",
      },
      {
        id: "sandbox-deploy", type: "sandbox", title: "תרגול: תהליך Deploy מלא",
        content: "מנסים את התהליך המלא:\n\n1. עורכים משהו קטן בקוד (למשל כותרת)\n2. git add .\n3. git commit -m \"עדכון קטן\"\n4. git push origin master\n5. פותחים Vercel ורואים את ה-deploy קורה בזמן אמת!\n\nזמן משוער: 2-3 דקות",
      },
    ],
  },
  {
    id: "system-architecture",
    title: "מערכות מורכבות",
    description: "ארכיטקטורה, תכנון נכון ובניית מערכות גדולות",
    icon: "🏗️", duration: 50, difficulty: "מתקדם", xp: 400,
    steps: [
      {
        id: "what-is-architecture", type: "explanation", title: "מה זה ארכיטקטורה?",
        content: "ארכיטקטורה = תכנון המערכת לפני שכותבים קוד\n\nכמו תכנון בית:\n- קודם מתכננים על נייר\n- אחר כך בונים\n\n**למה חשוב?**\n- קוד מאורגן קל לתחזוקה\n- קל להוסיף פיצ'רים חדשים\n- קל לעבוד בצוות\n- מונע בעיות ב-scale\n\nמערכת גרועה = כל שינוי קטן שובר דברים אחרים",
      },
      {
        id: "folder-structure", type: "code", title: "מבנה תיקיות נכון",
        content: "מבנה מומלץ לפרויקט Next.js גדול:",
        code: "src/\n  app/              # דפים (Next.js App Router)\n    (auth)/         # דפים עם layout משותף\n      login/\n      register/\n    dashboard/\n    api/            # API routes\n  \n  components/       # רכיבים לשימוש חוזר\n    ui/             # רכיבים בסיסיים\n    layout/         # Header, Footer, Sidebar\n    features/       # רכיבים לפיצ'רים ספציפיים\n  \n  lib/              # לוגיקה ועזרים\n    db/             # חיבור למסד נתונים\n    auth/           # פונקציות אימות\n    utils/          # פונקציות עזר כלליות\n  \n  hooks/            # Custom React hooks\n  store/            # State management\n  types/            # TypeScript types",
        language: "text",
        explanation: "**Separation of Concerns** = כל תיקייה אחראית על דבר אחד\n**Colocation** = קוד קשור נמצא קרוב זה לזה\n**Reusability** = components ניתנים לשימוש חוזר",
      },
      {
        id: "claude-for-architecture", type: "explanation", title: "Claude Code לתכנון מערכות",
        content: "Claude Code מצוין לתכנון!\n\nדוגמאות לבקשות טובות:\n\n'אנחנו בונים מערכת הזמנות למסעדה עם Next.js.\nמה המבנה המומלץ? אילו טבלאות DB אנחנו צריכים?\nאיזה API routes נדרשים?'\n\n'עזרו לנו לתכנן את flow ההרשמה:\nמ-form הרשמה ועד אימות email'\n\n'הקוד שלנו הפך למבוכה — איך לעשות refactor?'\n\nClaude Code יכול לקרוא את כל הפרויקט ולתת עצות מותאמות לקוד האמיתי!",
      },
      {
        id: "final-exercise", type: "exercise", title: "פרויקט מסכם!",
        content: "מתכננים מערכת שלמה:\n\nבוחרים אחת:\n1. אפליקציית ניהול משימות\n2. חנות אונליין קטנה\n3. פלטפורמת בלוג\n\nמתכננים:\n- מבנה תיקיות\n- טבלאות DB\n- API routes\n- רכיבים ראשיים\n\nואחר כך — מבקשים מ-Claude Code לבנות אותה!",
        hint: "מתחילים עם Prompt: 'אנחנו רוצים לבנות [X] עם Next.js 14, TypeScript ו-Tailwind. עזרו לנו לתכנן את המבנה המלא לפני שמתחילים לכתוב קוד'",
      },
    ],
  },
];

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find((l) => l.id === id);
