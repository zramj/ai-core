"use client";

import { useCallback, FormEvent, RefObject, useEffect, useRef, useState, useSyncExternalStore } from "react";

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

type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  type: string;
  detail: string;
};
type ContactStatus = "idle" | "submitting" | "success" | "error";
// Future API boundary: supply this only after a real receiving service is connected.
// Resolve with received: true only when the service confirms receipt; reject on failure.
type SubmitContactRequest = (request: ContactRequest) => Promise<{ received: true }>;
type ContactField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Read browser URL only after hydration; production always receives null.
function getContactPreview(): ContactStatus | null {
  if (process.env.NODE_ENV !== "development") return null;
  const preview = new URLSearchParams(window.location.search).get("contactPreview");
  if (preview === "loading") return "submitting";
  return preview === "success" || preview === "error" ? preview : null;
}

function subscribeContactPreview(onChange: () => void) {
  if (process.env.NODE_ENV !== "development") return () => {};
  window.addEventListener("popstate", onChange);
  window.addEventListener("contact-preview-change", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("contact-preview-change", onChange);
  };
}

function getServerContactPreview() { return null; }

// Replace null only after the corresponding account and official URL are ready.
const contactLinks: Record<"line" | "instagram" | "facebook" | "threads", string | null> = {
  line: null,
  instagram: null,
  facebook: null,
  threads: null,
};

function ContactLink({ href, className, label, children }: { href: string | null; className: string; label?: string; children: React.ReactNode }) {
  return href
    ? <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>
    : <span className={className} role="link" aria-disabled="true" aria-label={label}>{children}</span>;
}

function contactFormFields(form: HTMLFormElement) {
  return Array.from(form.elements).filter((field): field is ContactField => field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement);
}

const contactTypes = [
  "企業／品牌形象官網",
  "一頁式網站／活動頁面",
  "既有網站改版／優化",
  "網站功能／客製化開發",
  "還不確定，想先聊聊",
] as const;

function contactFieldError(field: ContactField) {
  const value = field.value.trim();
  if (!value) return "此欄位為必填，請填寫或選擇。";
  if (field.name === "email" && (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) return "請輸入有效的 Email，例如 hello@example.com。";
  if (field.name === "phone") {
    const digits = value.replace(/\D/g, "");
    if (!/^\+?[0-9 ()-]+$/.test(value) || digits.length < 7 || digits.length > 15) return "請輸入有效的電話，例如 0912 345 678、02-2345-6789 或 +886 912 345 678。";
  }
  if (field.name === "type" && !contactTypes.some((type) => type === value)) return "請選擇最接近的需求。";
  return "";
}

function Contact({ submitRequest, submissionEnabled = false }: { submitRequest?: SubmitContactRequest; submissionEnabled?: boolean }) {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactRequest, string>>>({});
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultTitleRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);
  const previewStatus = useSyncExternalStore(subscribeContactPreview, getContactPreview, getServerContactPreview);
  const displayStatus = previewStatus ?? status;
  const showResult = displayStatus === "success" || displayStatus === "error";
  // A real receiving API and an explicit feature switch are both required.
  const isApiReady = Boolean(submitRequest) && submissionEnabled;
  const canSubmit = isApiReady && isFormValid && status === "idle" && previewStatus === null;
  useEffect(() => {
    if (showResult) resultTitleRef.current?.focus({ preventScroll: true });
  }, [showResult, displayStatus]);
  const returnToForm = () => {
    if (process.env.NODE_ENV === "development" && previewStatus !== null) {
      const url = new URL(window.location.href);
      url.searchParams.delete("contactPreview");
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event("contact-preview-change"));
    }
    setStatus("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("#name")?.focus({ preventScroll: true }));
  };
  const updateFormValidity = (form: HTMLFormElement | null) => {
    if (form) setIsFormValid(contactFormFields(form).every((field) => !contactFieldError(field)));
  };
  const validateField = (field: ContactField) => {
    setErrors((current) => ({ ...current, [field.name]: contactFieldError(field) }));
    updateFormValidity(field.form);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isApiReady || !submitRequest || status !== "idle" || submittingRef.current || previewStatus !== null) return;
    const form = event.currentTarget;
    const fields = contactFormFields(form);
    const nextErrors = Object.fromEntries(fields.map((field) => [field.name, contactFieldError(field)]));
    setErrors(nextErrors);
    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    setIsFormValid(!firstInvalid);
    if (firstInvalid) { firstInvalid.focus(); return; }
    const data = new FormData(form);
    const request: ContactRequest = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      type: String(data.get("type") || ""),
      detail: String(data.get("detail") || "").trim(),
    };
    submittingRef.current = true;
    setStatus("submitting");
    try {
      const result = await submitRequest(request);
      if (result.received !== true) throw new Error("Receipt not confirmed");
      setStatus("success");
      form.reset();
      setIsFormValid(false);
    } catch { setStatus("error"); }
    finally { submittingRef.current = false; }
  };
  const fieldProps = (name: keyof ContactRequest) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onBlur: (event: React.FocusEvent<ContactField>) => validateField(event.currentTarget),
    onChange: (event: React.ChangeEvent<ContactField>) => {
      updateFormValidity(event.currentTarget.form);
      if (errors[name]) validateField(event.currentTarget);
      if (status === "success" || status === "error") setStatus("idle");
    },
  });
  const errorMessage = (name: keyof ContactRequest) => errors[name] && <p className="field-error" id={`${name}-error`} aria-live="polite">{errors[name]}</p>;

  return <section className="contact" id="contact"><div className="container"><div className="contact-grid">
    <div className="reveal"><span className="eyebrow">04 — LET&apos;S START A CONVERSATION</span><h2>你的想法，<br /><span>一起完成。</span></h2><p className="contact-info">正在規劃新網站、想改善既有體驗，或有需要客製化的功能？先留下初步需求，就從這裡開始。</p>
      <div className="contact-details">
        <a className="contact-email" href="mailto:mmcome9999@gmail.com"><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg></span><span>mmcome9999@gmail.com</span></a>
        <ContactLink href={contactLinks.line} className="contact-line"><span className="contact-icon" aria-hidden="true">{/* LINE brand path: https://github.com/simple-icons/simple-icons/blob/develop/icons/line.svg (CC0). */}<svg className="contact-line-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg></span><span>加入 LINE 帳號</span><span className="contact-line-arrow" aria-hidden="true">↗</span></ContactLink>
        <div className="contact-socials">
          <ContactLink href={contactLinks.instagram} className="contact-social" label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></ContactLink>
          <ContactLink href={contactLinks.facebook} className="contact-social" label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M14 22v-9h3l.5-4H14V6.5c0-1.1.3-1.5 1.5-1.5H18V1.3A27 27 0 0 0 14.8 1C11.6 1 10 2.8 10 6v3H7v4h3v9Z" /></svg></ContactLink>
          {/* Threads brand path: https://github.com/simple-icons/simple-icons/blob/develop/icons/threads.svg (CC0). */}
          <ContactLink href={contactLinks.threads} className="contact-social" label="Threads"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" /></svg></ContactLink>
        </div>
      </div>
    </div>
    <form ref={formRef} className="contact-form reveal" onSubmit={handleSubmit} noValidate aria-busy={displayStatus === "submitting"}>
      {/* Keep fields mounted so returning from an error preserves every value. */}
      <div className="contact-form-fields" hidden={showResult}>
      <div className="form-title"><strong>聊聊你的專案</strong></div>
      <div className="field"><label htmlFor="name">怎麼稱呼你？ *</label><input id="name" name="name" placeholder="姓名或品牌名稱" autoComplete="name" required maxLength={80} {...fieldProps("name")} />{errorMessage("name")}</div>
      <div className="field"><label htmlFor="phone">聯絡電話 *</label><input id="phone" name="phone" type="tel" placeholder="0912 345 678" autoComplete="tel" required maxLength={40} {...fieldProps("phone")} />{errorMessage("phone")}</div>
      <div className="field"><label htmlFor="email">聯絡 Email *</label><input id="email" name="email" type="email" placeholder="hello@example.com" autoComplete="email" required maxLength={254} {...fieldProps("email")} />{errorMessage("email")}</div>
      <div className="field"><label htmlFor="type">這次想做什麼？ *</label><select id="type" name="type" required defaultValue="" {...fieldProps("type")}><option value="" disabled>請選擇最接近的需求</option>{contactTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>{errorMessage("type")}</div>
      <div className="field field-wide"><label htmlFor="detail">簡單說說你的想法 *</label><textarea id="detail" name="detail" placeholder="想解決什麼問題？目前有哪些想法？" required maxLength={1800} {...fieldProps("detail")} />{errorMessage("detail")}</div>
      <button type="submit" className="form-send" disabled={!canSubmit} aria-describedby="contact-status">{displayStatus === "submitting" ? "傳送中…" : "送出合作需求"} <span aria-hidden="true">↗</span></button>
      <p className="form-notice" id="contact-status" role="status" aria-live="polite">{previewStatus !== null ? "本機狀態預覽，未傳送任何資料。" : displayStatus === "submitting" ? "正在送出，請稍候。" : !isApiReady ? "線上表單尚未開放，目前無法送出資料。" : "＊為必填欄位。"}</p>
      {previewStatus === "submitting" && <button type="button" className="contact-preview-return" onClick={returnToForm}>結束預覽，返回表單</button>}
      </div>
      {showResult && <div className="contact-result" role="status" aria-live="polite">
        <svg className="contact-result-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          {displayStatus === "success" ? <><circle cx="24" cy="24" r="19" /><path d="m15 24 6 6 12-12" /></> : <><path d="M21 7 4 36a3.5 3.5 0 0 0 3 5h34a3.5 3.5 0 0 0 3-5L27 7a3.5 3.5 0 0 0-6 0Z" /><path d="M24 17v11m0 6h.01" /></>}
        </svg>
        <h3 ref={resultTitleRef} tabIndex={-1}>{displayStatus === "success" ? "合作需求已成功送出" : "需求尚未成功送出"}</h3>
        <p>{displayStatus === "success" ? "我們已收到你的合作需求，將盡快透過 Email 與你聯繫。" : "傳送時發生問題，請稍後再試一次，或透過 Email 聯絡我們。"}</p>
        {previewStatus !== null && <p className="form-notice">本機狀態預覽，未傳送任何資料。</p>}
        {displayStatus === "error" ? <button type="button" className="contact-result-return" onClick={returnToForm}>保留資料，返回表單</button> : previewStatus !== null && <button type="button" className="contact-result-return" onClick={returnToForm}>結束預覽，返回表單</button>}
      </div>}
    </form>
  </div><footer className="footer"><div><strong>AI CORE / 艾構</strong><br /><br />DESIGN &amp; DEVELOPMENT STUDIO</div><div>WEB CONCEPT V2 · 2026<br />ai-core.si（預定品牌網址）</div><div>© AI CORE · MADE WITH INTENT.</div></footer></div></section>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalProject, setModalProject] = useState<{ key: ProjectKey; trigger: HTMLButtonElement } | null>(null);
  const storyRef = useRef<HTMLElement>(null);

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

  return <main id="top">
    <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} onCloseMenu={() => setMenuOpen(false)} />
    <section className="hero" aria-labelledby="heroTitle"><div className="container hero-main"><div className="hero-copy"><div className="hero-kicker eyebrow"><span className="line" /><span>DESIGN &amp; DEVELOPMENT STUDIO</span></div><h1 id="heroTitle"><span className="hero-title-line">好的網站，</span><span className="hero-title-line indent">不只好看<span className="hero-dot">。</span></span></h1><p className="lead">從品牌形象網站、UI／UX 到客製化數位工具。<br />艾構結合設計思考與開發實作，讓想法不只被看見，更能真正運作。</p><div className="hero-buttons"><a className="btn-dark" href="#story">探索艾構的方式 <span aria-hidden="true">↗</span></a><a className="btn-text" href="#services">我們提供哪些服務 <span aria-hidden="true">↘</span></a></div></div><HeroLogo /></div><div className="container hero-baseline mono"><span>01 / AI CORE — INDEPENDENT DIGITAL STUDIO</span><span className="scroll-prompt">SCROLL TO EXPLORE <span className="down-arrow" aria-hidden="true">↓</span></span></div></section>
    <aside className="manifesto"><div className="container manifesto-inner"><div className="manifesto-title">有設計的感受，也有實作的底氣。<br />讓每個細節，都回到使用者與品牌本身。</div><div className="manifesto-side mono">DESIGN THINKING <span aria-hidden="true">×</span> DEVELOPMENT<br />FOR BRANDS WHO WANT TO MOVE FORWARD.</div></div></aside>
    <Story scene={scene} progress={progress} storyRef={storyRef} />
    <Services /><Works onProject={(project, trigger) => { setModalProject({ key: project, trigger }); }} /><Process /><Contact />
    {modalProject && <ProjectModal project={projectContent[modalProject.key]} trigger={modalProject.trigger} onClosed={closeProject} />}
  </main>;
}
