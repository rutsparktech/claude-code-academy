"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, useUserProgress } from "@/store/AppStore";
import { Home, BookOpen, Terminal, GitBranch, Trophy, NotebookPen, Zap, Award, Flame, Sun, Moon, Menu, X } from "lucide-react";

const NAV = [
  { href: "/",           Icon: Home,       label: "בית" },
  { href: "/lessons",    Icon: BookOpen,    label: "שיעורים" },
  { href: "/terminal",   Icon: Terminal,    label: "טרמינל" },
  { href: "/git",        Icon: GitBranch,   label: "Git" },
  { href: "/challenges", Icon: Trophy,      label: "אתגרים" },
  { href: "/journal",    Icon: NotebookPen, label: "יומן" },
];

const WA = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const LI = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { state, dispatch } = useApp();
  const progress = useUserProgress();
  const pathname = usePathname();
  const xpPct = progress.xp % 100;

  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setMobile(m);
      if (m) setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const isDark = state.theme === "dark";
  const toggleTheme = () => dispatch({ type: "SET_THEME", payload: isDark ? "light" : "dark" });

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const Logo = ({ size = 44 }: { size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: "2px solid rgba(13,92,85,0.18)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(13,92,85,0.12)" }}>
      <img src="/sparktech-logo.jpg" alt="SparkTech" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );

  const ContactButtons = () => (
    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
      {[
        { href: "https://api.whatsapp.com/send?phone=972533178665&text=הי+רות,+הגעתי+מclaude+code+academy", bg: "#25D366", shadow: "rgba(37,211,102,0.4)", Icon: WA },
        { href: "https://www.linkedin.com/in/rut-pachter-8a74b9343", bg: "#0077B5", shadow: "rgba(0,119,181,0.35)", Icon: LI },
      ].map((b, i) => (
        <a key={i} href={b.href} target="_blank" rel="noopener noreferrer"
          style={{ width: 46, height: 46, borderRadius: "50%", background: b.bg, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: `0 4px 12px ${b.shadow}`, transition: "transform 0.2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}>
          <b.Icon />
        </a>
      ))}
    </div>
  );

  const NavItem = ({ href, Icon, label, compact = false }: { href: string; Icon: any; label: string; compact?: boolean }) => {
    const active = isActive(href);
    return (
      <Link href={href} style={{
        display: "flex", alignItems: "center", gap: compact ? 0 : 12,
        padding: compact ? "11px" : "11px 13px",
        borderRadius: 11, marginBottom: 2, textDecoration: "none",
        justifyContent: compact ? "center" : "flex-start",
        background: active ? "linear-gradient(135deg,rgba(13,92,85,0.1),rgba(20,184,166,0.05))" : "transparent",
        border: `1.5px solid ${active ? "rgba(13,92,85,0.2)" : "transparent"}`,
        transition: "all 0.2s", position: "relative",
      }}>
        {active && !compact && <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "60%", borderRadius: "3px 0 0 3px", background: "var(--gradient-primary)" }} />}
        <Icon size={19} strokeWidth={1.75} color={active ? "var(--primary)" : "var(--text-muted)"} />
        {!compact && <span style={{ fontSize: 13.5, fontWeight: active ? 700 : 500, color: active ? "var(--primary)" : "var(--text-secondary)", whiteSpace: "nowrap" }}>{label}</span>}
      </Link>
    );
  };

  const XPBlock = () => (
    <div style={{ padding: 14, background: "linear-gradient(135deg,rgba(13,92,85,0.06),rgba(20,184,166,0.03))", border: "1.5px solid rgba(13,92,85,0.13)", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: "var(--primary)", display: "flex", alignItems: "center", gap: 5 }}><Award size={14} color="var(--primary)" strokeWidth={1.75} />רמה {progress.level}</span>
        <span style={{ color: "var(--text-muted)" }}>{xpPct}/100</span>
      </div>
      <div style={{ height: 6, background: "rgba(13,92,85,0.1)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${xpPct}%`, height: "100%", background: "var(--gradient-primary)", borderRadius: 999, transition: "width 0.6s ease" }} />
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 14, fontSize: 11.5, color: "var(--text-muted)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Zap size={12} color="#14B8A6" strokeWidth={2} />{progress.xp} XP</span>
        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Flame size={12} color="#F97316" strokeWidth={2} />{progress.streak} ימים</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)" }}>

      {/* ═══ DESKTOP SIDEBAR ═══ */}
      {!mobile && (
        <aside style={{
          width: sidebarOpen ? 264 : 72, flexShrink: 0,
          background: "var(--bg-sidebar)", borderLeft: "1.5px solid var(--border)",
          display: "flex", flexDirection: "column",
          position: "fixed", right: 0, top: 0, bottom: 0,
          zIndex: 100, overflow: "hidden", transition: "width 0.3s ease",
          boxShadow: "3px 0 20px rgba(13,92,85,0.07)",
        }}>
          {/* Brand */}
          <div style={{ padding: sidebarOpen ? "20px 16px" : "16px 10px", borderBottom: "1.5px solid var(--border)", display: "flex", alignItems: "center", gap: 12, minHeight: 80, transition: "padding 0.3s" }}>
            <Logo size={sidebarOpen ? 52 : 44} />
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: 900, fontSize: 14, color: "var(--primary)", lineHeight: 1.3 }}>Claude Code Academy</div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 }}>by Rut Pachter</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
            {NAV.map(item => <NavItem key={item.href} {...item} compact={!sidebarOpen} />)}
          </nav>

          {/* XP */}
          {sidebarOpen && <div style={{ margin: "0 10px 10px" }}><XPBlock /></div>}

          {/* Contact */}
          <div style={{ margin: "0 10px 10px", padding: sidebarOpen ? "14px" : "10px 6px", border: "1.5px solid var(--border)", borderRadius: 12, background: "var(--bg-card)" }}>
            {sidebarOpen && <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 12, textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>Contact Us</div>}
            {sidebarOpen ? <ContactButtons /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <a href="https://api.whatsapp.com/send?phone=972533178665&text=הי+רות,+הגעתי+מclaude+code+academy" target="_blank" rel="noopener noreferrer" style={{ width: 38, height: 38, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 3px 8px rgba(37,211,102,0.35)" }}><WA /></a>
                <a href="https://www.linkedin.com/in/rut-pachter-8a74b9343" target="_blank" rel="noopener noreferrer" style={{ width: 38, height: 38, borderRadius: "50%", background: "#0077B5", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 3px 8px rgba(0,119,181,0.35)" }}><LI /></a>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ padding: "10px 8px", borderTop: "1.5px solid var(--border)", display: "flex", gap: 6 }}>
            <button onClick={toggleTheme} style={{ flex: 1, background: "var(--bg-card-hover)", border: "1.5px solid var(--border)", borderRadius: 9, cursor: "pointer", padding: "9px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {isDark ? <Sun size={16} color="var(--text-muted)" strokeWidth={1.75} /> : <Moon size={16} color="var(--text-muted)" strokeWidth={1.75} />}
              {sidebarOpen && <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "Heebo, sans-serif" }}>{isDark ? "בהיר" : "כהה"}</span>}
            </button>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "var(--bg-card-hover)", border: "1.5px solid var(--border)", borderRadius: 9, cursor: "pointer", padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{sidebarOpen ? "◀" : "▶"}</span>
            </button>
          </div>
        </aside>
      )}

      {/* ═══ MOBILE DRAWER ═══ */}
      {mobile && drawerOpen && (
        <>
          <div onClick={() => setDrawerOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 150, backdropFilter: "blur(3px)" }} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(85vw, 300px)", background: "var(--bg-sidebar)", zIndex: 200, display: "flex", flexDirection: "column", boxShadow: "-4px 0 30px rgba(0,0,0,0.2)", borderLeft: "1.5px solid var(--border)", animation: "slideIn 0.25s ease" }}>
            <div style={{ padding: "18px 16px", borderBottom: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Logo size={44} />
                <div>
                  <div style={{ fontWeight: 900, fontSize: 13.5, color: "var(--primary)" }}>Claude Code Academy</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>by Rut Pachter</div>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
                <X size={22} color="var(--text-muted)" />
              </button>
            </div>
            <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
              {NAV.map(item => <NavItem key={item.href} {...item} />)}
            </nav>
            <div style={{ margin: "0 12px 12px" }}><XPBlock /></div>
            <div style={{ margin: "0 12px 12px", padding: "14px", border: "1.5px solid var(--border)", borderRadius: 12, background: "var(--bg-card)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 12, textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>Contact Us</div>
              <ContactButtons />
            </div>
            <div style={{ padding: "10px 12px", borderTop: "1.5px solid var(--border)" }}>
              <button onClick={toggleTheme} style={{ width: "100%", background: "var(--bg-card-hover)", border: "1.5px solid var(--border)", borderRadius: 9, cursor: "pointer", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "Heebo, sans-serif", color: "var(--text-secondary)", fontSize: 13 }}>
                {isDark ? <><Sun size={16} color="var(--text-muted)" strokeWidth={1.75} />מצב בהיר</> : <><Moon size={16} color="var(--text-muted)" strokeWidth={1.75} />מצב כהה</>}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ═══ MAIN ═══ */}
      <main style={{ flex: 1, marginRight: mobile ? 0 : (sidebarOpen ? 264 : 72), transition: "margin-right 0.3s ease", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <header style={{ padding: mobile ? "11px 14px" : "13px 28px", borderBottom: "1.5px solid var(--border)", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(13,92,85,0.05)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {mobile && (
              <button onClick={() => setDrawerOpen(true)} style={{ background: "var(--bg-card-hover)", border: "1.5px solid var(--border)", borderRadius: 9, cursor: "pointer", padding: "7px 9px", display: "flex", alignItems: "center" }}>
                <Menu size={20} color="var(--primary)" />
              </button>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(13,92,85,0.07)", border: "1.5px solid rgba(13,92,85,0.18)", borderRadius: 8, padding: "5px 11px" }}>
              <Zap size={13} color="var(--primary)" strokeWidth={2} />
              <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700 }}>{progress.xp} XP</span>
            </div>
            {!mobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(20,184,166,0.07)", border: "1.5px solid rgba(20,184,166,0.2)", borderRadius: 8, padding: "5px 11px" }}>
                <Award size={13} color="var(--primary-light)" strokeWidth={2} />
                <span style={{ fontSize: 13, color: "var(--primary-light)", fontWeight: 700 }}>רמה {progress.level}</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!mobile && (
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, color: "var(--text-muted)" }}>
                <Flame size={13} color="#F97316" strokeWidth={2} />{progress.streak} ימים
              </span>
            )}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
              {!mobile && <span style={{ fontSize: 10.5, color: "var(--text-muted)" }}>by Rut Pachter</span>}
              <img src="/sparktech-logo.jpg" alt="SparkTech" style={{ width: mobile ? 30 : 32, height: mobile ? 30 : 32, borderRadius: 8, objectFit: "contain", border: "1.5px solid var(--border)", background: "white" }} />
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, paddingBottom: mobile ? 72 : 0 }}>{children}</div>

        {/* ═══ MOBILE BOTTOM NAV ═══ */}
        {mobile && (
          <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "var(--bg-card)", borderTop: "1.5px solid var(--border)", display: "flex", boxShadow: "0 -4px 20px rgba(13,92,85,0.08)" }}>
            {NAV.map(({ href, Icon, label }) => {
              const active = isActive(href);
              return (
                <Link key={href} href={href} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 2px 8px", textDecoration: "none", gap: 4, position: "relative", minWidth: 0 }}>
                  {active && <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 2.5, borderRadius: "0 0 3px 3px", background: "var(--gradient-primary)" }} />}
                  <Icon size={21} strokeWidth={1.75} color={active ? "var(--primary)" : "var(--text-muted)"} />
                  <span style={{ fontSize: 9.5, fontWeight: active ? 700 : 500, color: active ? "var(--primary)" : "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </main>

      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}
