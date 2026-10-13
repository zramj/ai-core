"use client";

import { PointerEvent, useEffect, useId, useRef } from "react";
import styles from "./hero-logo.module.css";

export default function HeroLogo() {
  const id = useId();
  const visualRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<number | null>(null);

  const reset = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    const visual = visualRef.current;
    visual?.style.setProperty("--mx", "0px");
    visual?.style.setProperty("--my", "0px");
    visual?.style.setProperty("--gather", "0");
  };

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const visual = visualRef.current;
    let inView = true;
    const updateVisibility = () => {
      if (visual) visual.dataset.motionPaused = String(!inView || document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    });
    if (visual) observer.observe(visual);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    motion.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      motion.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const visual = visualRef.current;
    const art = artRef.current;
    if (!visual || !art) return;
    const bounds = visual.getBoundingClientRect();
    const artBounds = art.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    // Proximity to the chevron controls assembly; the outer visual only adds depth.
    const artX = (event.clientX - artBounds.left) / artBounds.width * 680;
    const artY = (event.clientY - artBounds.top) / artBounds.height * 720;
    const distance = Math.hypot((artX - 358) / 175, (artY - 330) / 165);
    const gather = Math.max(0, 1 - distance);
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      visual.style.setProperty("--mx", `${x * 14}px`);
      visual.style.setProperty("--my", `${y * 14}px`);
      visual.style.setProperty("--gather", gather.toFixed(3));
      frameRef.current = null;
    });
  };

  return <div className={`hero-visual ${styles.visual}`} ref={visualRef} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <svg className={styles.art} ref={artRef} viewBox="0 0 680 720" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>AI CORE：圓弧、斜角結構與圓點交織的品牌幾何構圖</title>
      <defs>
        <linearGradient id={`${id}-arc`} x1="0" y1="110" x2="0" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1b1b1d" /><stop offset=".48" stopColor="#363638" /><stop offset=".8" stopColor="#9c9c9e" stopOpacity=".65" /><stop offset="1" stopColor="#d8d8da" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-rise`} x1="110" y1="490" x2="354" y2="305" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a2a2a5" stopOpacity=".12" /><stop offset=".48" stopColor="#58585a" /><stop offset="1" stopColor="#1b1b1d" />
        </linearGradient>
        <linearGradient id={`${id}-fall`} x1="358" y1="310" x2="627" y2="516" gradientUnits="userSpaceOnUse">
          <stop stopColor="#464648" stopOpacity=".75" /><stop offset=".5" stopColor="#9e9ea0" stopOpacity=".28" /><stop offset="1" stopColor="#c4c4c6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-plane`} x1="100" y1="565" x2="294" y2="590" gradientUnits="userSpaceOnUse">
          <stop stopColor="#939396" stopOpacity=".26" /><stop offset="1" stopColor="#bcbcbf" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id={`${id}-threads`} x1="370" y1="335" x2="645" y2="545" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f6f73" stopOpacity=".6" /><stop offset="1" stopColor="#96969a" stopOpacity=".12" />
        </linearGradient>
        <mask id={`${id}-arc-mask`} maskUnits="userSpaceOnUse" x="60" y="80" width="320" height="450">
          <path className={styles.arcReveal} d="M358 112 A260 260 0 0 0 132 502" fill="none" stroke="white" strokeWidth="30" pathLength="1" />
        </mask>
      </defs>

      <g className={styles.guidesLayer}>
        <g className={styles.guides} fill="none" stroke="#939398" strokeWidth=".65">
          <path d="M98 50V652 M358 80V650 M542 80V665 M555 80V675" />
          <path d="M22 344H649 M98 560H555 M358 112H617 M358 628H555" />
          <path d="M212 221V626 M98 448H650" opacity=".22" />
          <path d="M98 344 A175 175 0 0 1 273 169" strokeDasharray="1 3" />
          <path className={styles.lineBreath} d="M358 282H510 M98 560H196" stroke="#626266" />
          <path d="M94 112H102 M538 560H546 M354 344H362 M358 340V348" />
          <g fill="#39393b" stroke="none"><circle cx="98" cy="50" r="1.2" /><circle cx="98" cy="652" r="1.2" /><circle cx="22" cy="344" r="1.2" /><circle cx="98" cy="344" r="1.5" /><circle cx="372" cy="282" r="1.7" /></g>
          <text x="588" y="328" stroke="none" fill="#77777c" className={styles.label}>AI CORE</text>
        </g>
      </g>

      <g className={styles.planesLayer}>
        <g className={styles.planes}>
          <path d="M98 560 286 425V638H98Z" fill={`url(#${id}-plane)`} />
          <path d="M358 282 555 132V433Z" fill="#a6a6a9" opacity=".1" />
          <path d="M510 541H534V620H510Z" fill="#313133" opacity=".82" />
          <path d="M534 541H622V683H534Z" fill="#a3a3a6" opacity=".12" />
          <path d="M286 425V638 M534 541H622" fill="none" stroke="#a9a9ac" strokeWidth=".5" opacity=".45" />
        </g>
      </g>

      <g className={styles.arcLayer}>
        <g className={styles.arcDrift}>
          <g className={styles.arcLines} fill="none" stroke="#9b9b9f" strokeWidth=".7">
            <path d="M358 102 A270 270 0 0 1 561 550" />
            <path d="M358 112 A260 260 0 0 1 358 632" />
            <path d="M425 122 A255 255 0 0 1 358 632" opacity=".55" />
            <path d="M98 372 A260 260 0 0 0 358 632" stroke="#414145" />
            <path d="M358 576 A158 158 0 0 0 504 444" stroke="#4b4b50" strokeDasharray="2 4" />
          </g>
          <path d="M358 112 A260 260 0 0 0 132 502" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="18" mask={`url(#${id}-arc-mask)`} />
        </g>
      </g>

      <g className={styles.riseLayer}>
        <g className={styles.riseDrift}>
          <g className={styles.rise}>
            <path d="M45 534 358 299V343L78 553Z" fill={`url(#${id}-rise)`} />
            <path d="M40 513 358 274" fill="none" stroke="#86868b" strokeWidth=".7" opacity=".65" />
            <path d="M98 490 358 294" fill="none" stroke="#8a8a8e" strokeWidth=".65" opacity=".38" />
            <path d="M12 627 242 454" fill="none" stroke="#aaaab0" strokeWidth=".5" opacity=".3" />
          </g>
        </g>
      </g>
      <g className={styles.fallLayer}>
        <g className={styles.fallDrift}>
          <g className={styles.fall}>
            <path d="M358 299 649 517V560L358 343Z" fill={`url(#${id}-fall)`} />
            <g fill="none" stroke={`url(#${id}-threads)`} strokeWidth=".65">
              {Array.from({length: 8}, (_, index) => <path key={index} d={`M358 ${274 + index * 8} 655 ${497 + index * 8}`} />)}
              {Array.from({length: 13}, (_, index) => {
                const x = 403 + index * 9;
                const y = 333 + index * 6.75;
                return <path key={index} d={`M${x} ${y}V${y + 49}`} opacity=".5" />;
              })}
            </g>
          </g>
        </g>
      </g>

      <g className={styles.dotLayer}>
        <g className={styles.dotFloat}><circle className={styles.dot} cx="432" cy="469" r="16" /></g>
      </g>
    </svg>
  </div>;
}
