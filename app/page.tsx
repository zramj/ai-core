"use client";

import { useCallback, FormEvent, RefObject, useEffect, useRef, useState } from "react";

import Image from "next/image";

import HeroLogo from "./hero-logo";
import ApproachVisuals from "./approach-visuals";

const services = [
  ["01 / 04", "品牌形象網站", "把品牌的特色、內容與價值整理清楚，建立兼具美感和辨識度的網站。", "BRAND WEBSITES"],
  ["02 / 04", "一頁式與活動網站", "聚焦關鍵訊息與行動目標，打造俐落、引導明確的閱讀與互動體驗。", "LANDING PAGES"],
  ["03 / 04", "UI／UX 介面設計", "從使用流程與資訊架構出發，設計容易理解、操作順暢的數位產品介面。", "PRODUCT DESIGN"],
  ["04 / 04", "網站與系統開發", "將設計落實為可使用的功能，包含前後端開發與客製化需求評估。", "WEB DEVELOPMENT"],
] as const;

const processItems = [
  ["了解想法與需求", "先認識你的品牌、目標、預算範圍與期望完成的事。"],
  ["釐清方向與規劃", "討論內容架構、功能範圍、工作方式與專案時程。"],
  ["設計與實作", "在關鍵階段確認方向，讓視覺、體驗與功能同步成形。"],
  ["上線與後續調整", "驗收與上線後，依需要討論維護或持續優化。"],
] as const;

const projectContent = {
  yijia: {
    label: "01 · BRAND WEBSITE",
    name: "翊佳室內設計",
    subtitle: "空間美學 × 品牌形象",
    image: "/images/works/yijia-interior.jpg",
    title: "翊佳室內設計",
    text: "以空間作品為主角，搭配清楚的導覽與服務資訊，呈現室內設計品牌的專業形象，讓訪客更容易認識品牌風格。",
    tags: ["空間作品展示", "服務介紹", "線上預約"],
    url: "https://www.yijia-interior.com/",
  },
  jinyan: {
    label: "02 · DIGITAL E-BOOK",
    name: "靜妍美學電子書",
    subtitle: "美容服務 × 數位閱讀",
    image: "/images/works/jinyan-ebook.jpg",
    title: "靜妍美學電子書",
    text: "將美容服務與產品資訊整理成直覺易讀的數位電子書，方便顧客透過平板或手機瀏覽，讓店內的服務介紹更加清晰。",
    tags: ["療程資訊", "產品介紹", "跨裝置閱讀"],
    url: "https://jinyanbeauty.github.io/jin-yan-ebook/",
  },
  letsStudy: {
    label: "03 · COMMUNITY PLATFORM",
    name: "Let's Study",
    subtitle: "讀書會媒合 × 閱讀交流",
    image: "/images/works/lets-study.jpg",
    title: "Let's Study｜讀書會媒合平台",
    text: "以興趣分類、活動搜尋與時間地點資訊為核心，構想一個讓讀者更容易探索讀書會、找到合適交流活動的平台。",
    tags: ["讀書會探索", "興趣分類", "活動資訊"],
    url: "https://leststudymu-lq6xv.kinsta.page/index.html",
  },
} as const;

type ProjectKey = keyof typeof projectContent;

function Header({ menuOpen, onMenuToggle, onCloseMenu }: { menuOpen: boolean; onMenuToggle: () => void; onCloseMenu: () => void }) {
  return <>
    <header className="site-header" id="header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="AI CORE 艾構，回到首頁"><span className="brand-emblem" aria-hidden="true" /><span className="brand-main">AI CORE</span><span className="brand-chinese">艾構</span></a>
        <nav className="nav-links" aria-label="主導覽"><a href="#story">理念</a><a href="#services">服務項目</a><a href="#works">風格示意</a><a href="#approach">合作流程</a></nav>
        <a className="nav-cta" href="#contact"><span>聊聊你的專案</span><span aria-hidden="true">↗</span></a>
        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={onMenuToggle} aria-label={menuOpen ? "關閉選單" : "展開選單"} aria-expanded={menuOpen}><span /><span /></button>
      </div>
    </header>
    <nav className={`mobile-nav${menuOpen ? " open" : ""}`} aria-label="手機版導覽">
      <a onClick={onCloseMenu} href="#story">我們的理念</a><a onClick={onCloseMenu} href="#services">服務項目</a><a onClick={onCloseMenu} href="#works">風格示意</a><a onClick={onCloseMenu} href="#approach">合作流程</a><a onClick={onCloseMenu} href="#contact">開始合作 ↗</a>
    </nav>
  </>;
}

function Story({ scene, progress, storyRef }: { scene: number; progress: number; storyRef: RefObject<HTMLElement | null> }) {
  const copy = [
    ["01 / THE IDEA", <>每個好作品，<br />都從一個<em>想法</em>開始。</>, "不是先套模板，而是先理解品牌、目標與使用情境，找到真正值得被解決的問題。"],
    ["02 / THE DESIGN", <>把複雜整理好，<br />讓體驗<em>自然發生</em>。</>, "從內容結構、介面設計到視覺節奏，讓每個畫面都有清楚的目的。"],
    ["03 / THE BUILD", <>好設計，<br />也要<em>真正能用</em>。</>, "將畫面轉化為穩定、易用的網站與功能，讓品牌想做的事能持續向前。"],
  ] as const;
  return <section className="story" id="story" ref={storyRef} aria-label="從想法到上線的互動敘事">
    <div className="story-sticky">
      <div className="story-head eyebrow">OUR APPROACH <span>捲動探索</span></div>
      <div className="story-copy">{copy.map(([count, title, description], index) => <div className={`scene-copy${scene === index ? " active" : ""}`} key={count}><span className="scene-count mono">{count}</span><h2>{title}</h2><p>{description}</p></div>)}</div>
      <ApproachVisuals scene={scene} />
      <div className="story-progress"><span className="mono progress-label">0{scene + 1} / 03</span><div className="track"><span className="fill" style={{ width: `${progress * 100}%` }} /></div><span className="mono progress-label">SCROLL ↓</span></div>
    </div>
  </section>;
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <div className="section-header reveal"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><p className="section-desc">{description}</p></div>;
}

function Services() {
  return <section className="section" id="services"><div className="container"><SectionHeader eyebrow="01 — WHAT WE DO" title={<>從第一印象，<br />到每一次使用。</>} description="我們在乎好看，也在乎好用。從小品牌官網到需要特別規劃的數位服務，都可以一起討論。" /><div className="services-grid">{services.map(([number, title, text, english]) => <article className="service reveal" key={number}><div className="service-top"><span className="service-num mono">{number}</span><span className="service-arrow" aria-hidden="true">↗</span></div><h3>{title}</h3><p>{text}</p><span className="service-english mono">{english}</span></article>)}</div></div></section>;
}

function ProjectArt({ variant }: { variant: ProjectKey }) {
  const project = projectContent[variant];
  return <div className="project-view"><div className="project-screenshot"><Image src={project.image} alt={`${project.name}網站畫面`} fill sizes="(max-width: 560px) 88vw, (max-width: 1100px) 44vw, 30vw" /></div></div>;
}

function Works({ onProject }: { onProject: (project: ProjectKey, trigger: HTMLButtonElement) => void }) {
  return <section className="selected" id="works"><div className="container"><SectionHeader eyebrow="02 — VISUAL EXPLORATION" title={<>不套公式，<br />找到自己的樣子。</>} description="從品牌網站到數位服務，探索清晰、實用的線上體驗。" /><div className="project-grid">{(Object.keys(projectContent) as ProjectKey[]).map((project) => {
    const content = projectContent[project];
    return <button className="project reveal" key={project} onClick={(event) => onProject(project, event.currentTarget)} aria-label={`查看${content.name}作品介紹`}><ProjectArt variant={project} /><div className="project-meta"><div><span className="eyebrow muted">{content.label}</span><h3>{content.name}</h3><p>{content.subtitle}</p></div><span className="circle-arrow" aria-hidden="true">↗</span></div></button>;
  })}</div></div></section>;
}

function ProjectModal({ project, trigger, onClosed }: {
  project: (typeof projectContent)[ProjectKey];
  trigger: HTMLButtonElement | null;
  onClosed: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const background = Array.from(document.querySelector("main")?.children ?? [])
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(dialog))
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setClosing(true); }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>("button, a[href]"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first?.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) closeRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      trigger?.focus({ preventScroll: true });
    };
  }, [trigger]);

  useEffect(() => {
    if (!closing) return;
    // Fallback for interrupted animations; normal removal follows animationend.
    const timeout = setTimeout(onClosed, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300);
    return () => clearTimeout(timeout);
  }, [closing, onClosed]);

  return <div className={`modal-backdrop open${closing ? " closing" : ""}`} role="presentation"
    onClick={(event) => { if (event.target === event.currentTarget) setClosing(true); }}
    onAnimationEnd={(event) => { if (closing && event.target === event.currentTarget && event.animationName === "portfolio-backdrop-out") onClosed(); }}>
    <div className="modal-shell" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDescription" tabIndex={-1}>
      <button className="modal-close" ref={closeRef} onClick={() => setClosing(true)} aria-label="關閉視窗"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
      <div className="modal">
        <span className="tag eyebrow">{project.label}</span>
        <h3 id="modalTitle">{project.title}</h3>
        <p id="modalDescription">{project.text}</p>
        <div className="modal-footer">
          <div className="modal-tags">{project.tags.map((tag) => <span className="modal-pill" key={tag}>{tag}</span>)}</div>
          <a className="modal-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`開啟${project.name}網站（新分頁）`}>LINK <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  </div>;
}

function Process() {
  return <><section className="process" id="approach"><div className="container process-wrap"><div className="reveal"><span className="eyebrow">03 — HOW WE WORK</span><h2 className="process-title">好好溝通，<br />把事情<br />做好。</h2><p className="process-intro">不需要一開始就有完整規格。先說說你的想法，我們再一起找出合適的做法。</p></div><div className="process-items reveal">{processItems.map(([title, text], index) => <div className="process-item" key={title}><span className="idx mono">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><span className="plus">↗</span></div>)}</div></div></section><section className="why"><div className="container why-inner"><div className="reveal"><span className="eyebrow">A SMALL STUDIO, ONE CLEAR IDEA</span><h2 className="why-quote">好的合作，<br />是讓複雜的事<br />變得更清楚。</h2></div><div className="why-right reveal"><p>艾構是結合設計與技術的獨立工作室。我們希望每一個決策都能回應真實需求，而不是為了追求流行或堆疊不必要的功能。</p><p className="mono why-signoff">DESIGN WITH CLARITY. BUILD WITH PURPOSE.</p></div></div></section></>;
}

function Contact({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <section className="contact" id="contact"><div className="container"><div className="contact-grid"><div className="reveal"><span className="eyebrow">04 — LET&apos;S START A CONVERSATION</span><h2>你的想法，<br /><span>一起完成。</span></h2><p className="contact-info">正在規劃新網站、想改善既有體驗，或有需要客製化的功能？先留下初步需求，就從這裡開始。</p></div><form className="contact-form reveal" onSubmit={onSubmit}><div className="form-title"><strong>專案需求整理</strong><small className="mono">/ PROTOTYPE</small></div><div className="field"><label htmlFor="name">怎麼稱呼你？ *</label><input id="name" name="name" placeholder="姓名或品牌名稱" required maxLength={80} /></div><div className="field"><label htmlFor="type">這次想做什麼？</label><select id="type" name="type"><option>品牌形象網站</option><option>一頁式／活動網站</option><option>UI／UX 介面設計</option><option>網站與客製化系統</option><option>還不太確定，想先聊聊</option></select></div><div className="field"><label htmlFor="detail">簡單說說你的想法 *</label><textarea id="detail" name="detail" placeholder="想解決什麼問題？目前有哪些想法？" required maxLength={1800} /></div><button type="submit" className="form-send">複製需求摘要 <span>↗</span></button><p className="form-notice">此為可操作的網站原型，表單尚未連接正式收件服務。按鈕會將需求整理成文字並複製，不會傳送你的資料。</p></form></div><footer className="footer"><div><strong>AI CORE / 艾構</strong><br /><br />DESIGN &amp; DEVELOPMENT STUDIO</div><div>WEB CONCEPT V2 · 2026<br />ai-core.si（預定品牌網址）</div><div>© AI CORE · MADE WITH INTENT.</div></footer></div></section>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalProject, setModalProject] = useState<{ key: ProjectKey; trigger: HTMLButtonElement } | null>(null);
  const [toast, setToast] = useState("");
  const storyRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); revealObserver.unobserve(entry.target); } }), { threshold: 0.13 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const updateScroll = () => {
      document.querySelector("#header")?.classList.toggle("scrolled", window.scrollY > 20);
      const story = storyRef.current;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / distance));
      setProgress(nextProgress);
      setScene(nextProgress < 0.33 ? 0 : nextProgress < 0.67 ? 1 : 2);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll); updateScroll();
    return () => { revealObserver.disconnect(); window.removeEventListener("scroll", updateScroll); window.removeEventListener("resize", updateScroll); };
  }, []);

  const closeProject = useCallback(() => setModalProject(null), []);

  const showToast = (message: string) => { setToast(message); if (toastTimer.current) clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(""), 3100); };
  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get("name") || "").trim(); const type = String(data.get("type") || ""); const detail = String(data.get("detail") || "").trim();
    if (!name || !detail) { showToast("請先填寫稱呼與需求內容"); return; }
    const text = `AI CORE 艾構｜初步需求摘要\n稱呼：${name}\n需求類型：${type}\n需求說明：\n${detail}`;
    try { await navigator.clipboard.writeText(text); showToast("需求摘要已複製，可貼到訊息中！"); }
    catch {
      const temporary = document.createElement("textarea");
      temporary.value = text;
      document.body.appendChild(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      showToast(copied ? "需求摘要已複製！" : "瀏覽器限制複製，請手動選取文字");
    }
  };

  return <main id="top">
    <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} onCloseMenu={() => setMenuOpen(false)} />
    <section className="hero" aria-labelledby="heroTitle"><div className="container hero-main"><div className="hero-copy"><div className="hero-kicker eyebrow"><span className="line" /><span>DESIGN &amp; DEVELOPMENT STUDIO</span></div><h1 id="heroTitle"><span className="hero-title-line">好的網站，</span><span className="hero-title-line indent">不只好看<span className="hero-dot">。</span></span></h1><p className="lead">從品牌形象網站、UI／UX 到客製化數位工具。<br />艾構結合設計思考與開發實作，讓想法不只被看見，更能真正運作。</p><div className="hero-buttons"><a className="btn-dark" href="#story">探索艾構的方式 <span aria-hidden="true">↗</span></a><a className="btn-text" href="#services">我們提供哪些服務 <span aria-hidden="true">↘</span></a></div></div><HeroLogo /></div><div className="container hero-baseline mono"><span>01 / AI CORE — INDEPENDENT DIGITAL STUDIO</span><span className="scroll-prompt">SCROLL TO EXPLORE <span className="down-arrow" aria-hidden="true">↓</span></span></div></section>
    <aside className="manifesto"><div className="container manifesto-inner"><div className="manifesto-title">有設計的感受，也有實作的底氣。<br />讓每個細節，都回到使用者與品牌本身。</div><div className="manifesto-side mono">DESIGN THINKING <span aria-hidden="true">×</span> DEVELOPMENT<br />FOR BRANDS WHO WANT TO MOVE FORWARD.</div></div></aside>
    <Story scene={scene} progress={progress} storyRef={storyRef} />
    <Services /><Works onProject={(project, trigger) => { setModalProject({ key: project, trigger }); }} /><Process /><Contact onSubmit={handleForm} />
    {modalProject && <ProjectModal project={projectContent[modalProject.key]} trigger={modalProject.trigger} onClosed={closeProject} />}
    <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast}</div>
  </main>;
}
