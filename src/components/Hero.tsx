import { Fragment, useEffect, useRef } from "react";
import portfolioImage from "../../assets/portfolio image.jpeg";
import ImageSlot from "./ImageSlot";

interface Stat { value: number; suffix?: string; label: string; }

const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years shipping" },
  { value: 4, label: "Apps, one backend" },
  { value: 10, suffix: "+", label: "Technologies" },
];

const MARQUEE = [
  "React", "TypeScript", "Flutter", "Dart", "Laravel", "PHP",
  "Python", "Java", "C# .NET", "PostgreSQL", "Git",
];

export default function Hero() {
  const year = new Date().getFullYear();
  const rootRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>(".intro")];

    const timers: number[] = [];
    items.forEach((el, i) => {
      timers.push(window.setTimeout(() => el.classList.add("in"), 120 + i * 130));
    });

    // count-up after intro finishes
    timers.push(
      window.setTimeout(() => {
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const target = parseInt(el.dataset.count || "0", 10) || 0;
          const suffix = el.dataset.suffix || "";
          const dur = 1100;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, 120 + items.length * 130)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    if (!window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
    el.style.transition = "transform .25s ease-out";
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.transform = `translate(${(dx * 18).toFixed(1)}px,${(dy * 18).toFixed(1)}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <header ref={rootRef} className="section hero">
      <span id="top" />
      <div className="hero-grid">
        <div>
          <div className="intro hero-status">
            <span className="status-dot" />
            {year}
          </div>
          <div className="intro hero-role">Full-stack developer</div>
          <h1 className="intro hero-title">
            Jia Wen<br />Chin<span className="dot">.</span>
          </h1>
          <p className="intro hero-copy">
            I build production web &amp; mobile software — from the database to
            the screen in your hand. A practical toolkit chosen for shipping
            reliable software.
          </p>
          <div className="intro hero-actions">
            <a href="#work" className="btn btn-primary">View work →</a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </div>
          <div className="intro hero-stats">
            {STATS.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="stat-div" />}
                <div>
                  <div className="stat-num" data-count={s.value} data-suffix={s.suffix}>
                    {s.value}{s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div ref={parallaxRef} className="intro orbit-wrap">
          <div className="orbit">
            <div className="orbit-glow" />
            <div className="orbit-ring r1">
              <div className="orbit-node cc1" style={{ left: "50%", top: 0 }}>
                <span className="orbit-chip">React</span>
              </div>
              <div className="orbit-node cc1" style={{ left: "100%", top: "50%" }}>
                <span className="orbit-chip">Laravel</span>
              </div>
              <div className="orbit-node cc1" style={{ left: "14%", top: "86%" }}>
                <span className="orbit-chip">PostgreSQL</span>
              </div>
            </div>
            <div className="orbit-ring r2">
              <div className="orbit-node cc2" style={{ left: "50%", top: "100%" }}>
                <span className="orbit-chip accent">Flutter</span>
              </div>
              <div className="orbit-node cc2" style={{ left: 0, top: "42%" }}>
                <span className="orbit-chip">Python</span>
              </div>
            </div>
            <div className="orbit-ring r3" />
            <div className="orbit-core">
              <ImageSlot
                shape="circle"
                src={portfolioImage}
                alt="Jia Wen Chin"
                style={
                  {
                    "--image-scale": 1.25,
                    "--image-position": "50% 32%",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((dup) =>
            MARQUEE.map((t, i) => (
              <Fragment key={`${dup}-${i}`}>
                <span>{t}</span>
                <span className="dot">·</span>
              </Fragment>
            ))
          )}
        </div>
      </div>
    </header>
  );
}
