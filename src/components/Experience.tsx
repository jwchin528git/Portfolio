import Reveal from "./Reveal";

interface Entry {
  role: string;
  period: string;
  org: string;
  desc: string;
  node: "solid" | "ring" | "dim";
  last?: boolean;
}

const ENTRIES: Entry[] = [
  {
    role: "Analyst Programmer",
    period: "DEC 2022 — PRESENT",
    org: "E-Genting Sdn Bhd · Kuala Lumpur",
    desc: "Building and maintaining third-party production web applications with system integrations. Build tools for business users to manage member data, points, and redemptions, etc.",
    node: "solid",
  },
  {
    role: "Software Engineer Intern",
    period: "MAY — OCT 2022",
    org: "Integro Technologies Sdn Bhd",
    desc: "First professional engineering role — shipping features alongside a senior team and learning how production software is built, reviewed, and deployed.",
    node: "ring",
  },
  {
    role: "Part-Time Piano Teacher",
    period: "DEC 2017 — PRESENT",
    org: "Tick-Tock Beats Music & Movement",
    desc: "Teaching piano keeps the other half of my brain sharp — the same patience, structure, and quiet joy in explaining hard things simply.",
    node: "dim",
    last: true,
  },
];

export default function Experience() {
  return (
    <section id="log" className="section">
      <Reveal className="sec-head" style={{ marginBottom: 48 }}>
        <div>
          <div className="sec-index">03 — Flight log</div>
          <h2 className="sec-title">Where I've been</h2>
        </div>
        <div className="sec-note">Software by day. Piano on the side — same patience.</div>
      </Reveal>

      <div className="log">
        <div className="log-spine" />
        {ENTRIES.map((e) => (
          <Reveal key={e.role} className={`log-item${e.last ? " last" : ""}`}>
            <div className={`log-node ${e.node}`} />
            <div className="log-top">
              <h3 className="log-role">{e.role}</h3>
              <span className="log-period">{e.period}</span>
            </div>
            <div className="log-org">{e.org}</div>
            <p className="log-desc">{e.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
