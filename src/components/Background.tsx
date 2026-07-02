import { useEffect, useRef } from "react";
import { useTheme } from "../context/theme";

interface Star { x: number; y: number; r: number; a: number; tw: number; teal: boolean; }
interface Shoot { x: number; y: number; vx: number; vy: number; life: number; }

export default function Background() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(theme);
  modeRef.current = theme;

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let shoot: Shoot[] = [];
    let w = 0;
    let h = 0;
    let lastShoot = 0;
    let raf = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth || window.innerWidth;
      h = cv.clientHeight || window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const N = Math.round((w * h) / 9000);
      stars = [];
      for (let i = 0; i < N; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 6.28,
          tw: Math.random() * 0.02 + 0.004,
          teal: Math.random() < 0.16,
        });
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const isNight = modeRef.current === "dark";
      for (const s of stars) {
        s.a += s.tw;
        const al = 0.32 + 0.46 * Math.abs(Math.sin(s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.2832);
        ctx.fillStyle = s.teal
          ? `rgba(45,212,191,${al})`
          : `rgba(220,230,242,${al})`;
        ctx.fill();
      }
      if (isNight && now - lastShoot > 2600 && Math.random() < 0.04) {
        lastShoot = now;
        const fromLeft = Math.random() < 0.5;
        shoot.push({
          x: fromLeft ? Math.random() * w * 0.4 : w * (0.6 + Math.random() * 0.4),
          y: Math.random() * h * 0.45,
          vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 4),
          vy: 3 + Math.random() * 2,
          life: 1,
        });
      }
      for (let i = shoot.length - 1; i >= 0; i--) {
        const sh = shoot[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        if (sh.life <= 0 || sh.x < -60 || sh.x > w + 60) {
          shoot.splice(i, 1);
          continue;
        }
        const len = 22;
        const mag = Math.hypot(sh.vx, sh.vy);
        const ex = sh.x - (sh.vx / mag) * len * 4;
        const ey = sh.y - (sh.vy / mag) * len * 4;
        const g = ctx.createLinearGradient(sh.x, sh.y, ex, ey);
        g.addColorStop(0, `rgba(45,212,191,${(0.9 * sh.life).toFixed(2)})`);
        g.addColorStop(1, "rgba(45,212,191,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="bg-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-stars" />
      <div className="bg-sun" />
      <div className="bg-sun-disc" />
      <div className="bg-vignette" />
    </div>
  );
}
