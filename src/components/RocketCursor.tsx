import { useEffect, useRef } from "react";

interface Particle { el: HTMLDivElement; x: number; y: number; vx: number; vy: number; life: number; }

const ROCKET_SVG =
  '<svg width="30" height="30" viewBox="0 0 24 24" style="display:block; transform:translate(-50%,-50%);">' +
  '<path d="M12 1.4c2.9 2.7 4.1 6.6 4.1 10.5 0 1.6-.4 3-1.1 4.3H9c-.7-1.3-1.1-2.7-1.1-4.3 0-3.9 1.2-7.8 4.1-10.5z" fill="currentColor"/>' +
  '<circle cx="12" cy="8.4" r="1.8" style="fill:var(--bg)"/>' +
  '<path d="M8 12.6l-3.4 4.3 3.6-1.4z" fill="currentColor" opacity="0.82"/>' +
  '<path d="M16 12.6l3.4 4.3-3.6-1.4z" fill="currentColor" opacity="0.82"/>' +
  "</svg>";

export default function RocketCursor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
    const layer = layerRef.current;
    if (!layer) return;

    document.body.classList.add("cursor-on");

    const rocket = document.createElement("div");
    rocket.style.cssText =
      "position:absolute; left:0; top:0; will-change:transform; filter:drop-shadow(0 0 6px var(--glow));";
    rocket.innerHTML = ROCKET_SVG;
    layer.appendChild(rocket);

    let mx = 0, my = 0;
    let rx: number | null = null, ry = 0;
    let angle = 0;
    let on = false;
    let hot = false;
    const exhaust: Particle[] = [];

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (rx == null) { rx = e.clientX; ry = e.clientY; }
      if (!on) { on = true; layer.style.opacity = "1"; }
      const t = e.target as Element | null;
      hot = !!(t && t.closest && t.closest("a,button,.toggle,.chip,.skill-card,.work-img,.image-slot"));
    };
    const leave = () => { layer.style.opacity = "0"; on = false; };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    let raf = 0;
    const loop = () => {
      if (rx != null) {
        const px = rx, py = ry;
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
        const vx = rx - px, vy = ry - py;
        const sp = Math.hypot(vx, vy);
        if (sp > 0.6) {
          const target = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
          const da = ((target - angle + 540) % 360) - 180;
          angle += da * 0.25;
        }
        const sc = hot ? 1.5 : 1;
        rocket.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px) rotate(${angle.toFixed(1)}deg) scale(${sc})`;

        if (sp > 1.4) {
          const rad = ((angle - 90) * Math.PI) / 180;
          const tx = rx - Math.cos(rad) * 12, ty = ry - Math.sin(rad) * 12;
          const d = document.createElement("div");
          const s = 3 + Math.random() * 3;
          d.style.cssText =
            `position:absolute; left:0; top:0; width:${s.toFixed(1)}px; height:${s.toFixed(1)}px; margin:${(-s / 2).toFixed(1)}px 0 0 ${(-s / 2).toFixed(1)}px; border-radius:50%; background:var(--accent); will-change:transform,opacity;`;
          layer.appendChild(d);
          exhaust.push({
            el: d, x: tx, y: ty,
            vx: -Math.cos(rad) * 1.1 + (Math.random() - 0.5) * 0.8,
            vy: -Math.sin(rad) * 1.1 + (Math.random() - 0.5) * 0.8,
            life: 1,
          });
          if (exhaust.length > 44) { const old = exhaust.shift(); old?.el.remove(); }
        }
        for (let i = exhaust.length - 1; i >= 0; i--) {
          const p = exhaust[i];
          p.x += p.vx; p.y += p.vy; p.life -= 0.045;
          if (p.life <= 0) { p.el.remove(); exhaust.splice(i, 1); continue; }
          p.el.style.opacity = p.life.toFixed(2);
          p.el.style.transform = `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px) scale(${(p.life * 1.2).toFixed(2)})`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("cursor-on");
      exhaust.forEach((p) => p.el.remove());
      rocket.remove();
    };
  }, []);

  return <div ref={layerRef} className="cursor-layer" aria-hidden="true" />;
}
