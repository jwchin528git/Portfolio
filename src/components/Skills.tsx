import Reveal from "./Reveal";

interface Group { cat: string; no: string; chips: string[]; }

const GROUPS: Group[] = [
  { cat: "Frontend", no: "/01", chips: ["React", "TypeScript", "Tailwind", "Blade", "Vite"] },
  { cat: "Backend", no: "/02", chips: ["Laravel", "PHP", "Python", "Sanctum", "REST API"] },
  { cat: "Mobile & Apps", no: "/03", chips: ["Flutter", "Dart", "Java", "C# .NET", "Objective-C"] },
  { cat: "Data & Tools", no: "/04", chips: ["PostgreSQL", "Git", "Docker"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal className="sec-head">
        <div>
          <div className="sec-index">01 — Toolkit</div>
          <h2 className="sec-title">The stack I build with</h2>
        </div>
        <div className="sec-note">
          Chosen for shipping reliable software.
        </div>
      </Reveal>
      <div className="skills-grid">
        {GROUPS.map((g) => (
          <Reveal key={g.cat} className="skill-card">
            <div className="skill-head">
              <span className="skill-cat">{g.cat}</span>
              <span className="skill-no">{g.no}</span>
            </div>
            <div className="skill-chips">
              {g.chips.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
