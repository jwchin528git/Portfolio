import { useEffect, useState } from "react";
import { useTheme } from "../context/theme";

const LINKS = [
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "log", label: "Log" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "light";
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav">
      <a className="nav-brand" href="#top">
        <div className="nav-logo">J</div>
        <span className="nav-name">Jia Wen Chin</span>
      </a>
      <div className="nav-right">
        <div className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link${active === l.id ? " is-active" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="toggle"
          onClick={toggleTheme}
          title="Toggle day / night"
          aria-label="Toggle day / night"
        >
          <span
            className="toggle-knob"
            style={{ transform: isDay ? "translateX(var(--toggle-shift, 54px))" : "translateX(0)" }}
          />
          <span
            className="toggle-seg"
            style={{ color: isDay ? "var(--dim)" : "var(--accentInk)" }}
          >
            NT
          </span>
          <span
            className="toggle-seg"
            style={{ color: isDay ? "var(--accentInk)" : "var(--dim)" }}
          >
            DAY
          </span>
        </button>
      </div>
    </nav>
  );
}
