import Image from "next/image";
import styles from "./page.module.css";

const services = [
  "品牌網站與內容架構",
  "UI / UX 與互動系統",
  "前端、後端與客製化開發",
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" className={diagonal ? styles.arrowDiagonal : styles.arrow} fill="none" viewBox="0 0 18 18">
      <path d="M2 9h13M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ConceptCanvas() {
  return (
    <div className={styles.conceptCanvas} aria-label="AI CORE 的抽象概念構圖" role="img">
      <div aria-hidden="true" className={styles.canvasGrid} />
      <span className={`${styles.marker} ${styles.markerTop}`}>01 / CONCEPT</span>
      <span className={`${styles.marker} ${styles.markerBottom}`}>36° 25′ / TPE</span>
      <span className={`${styles.marker} ${styles.markerSide}`}>AI CORE / 001</span>
      <div aria-hidden="true" className={styles.conceptC}>C</div>
      <div aria-hidden="true" className={styles.structureLineOne} />
      <div aria-hidden="true" className={styles.structureLineTwo} />
      <div aria-hidden="true" className={styles.structureArc} />
      <div aria-hidden="true" className={styles.yellowBlock} />
      <div className={styles.photoFrame}>
        <Image alt="AI 生成的黑白紙雕概念素材" fill priority sizes="(max-width: 767px) 80vw, (max-width: 1279px) 43vw, 32vw" src="/images/hero-paper-fold-c.png" />
      </div>
      <div aria-hidden="true" className={styles.rectangleOne} />
      <div aria-hidden="true" className={styles.rectangleTwo} />
      <p className={styles.canvasCaption}><span>FORM</span><span>FUNCTION</span></p>
    </div>
  );
}

function FinalInterface() {
  return (
    <div className={styles.interfaceWrap}>
      <div className={styles.interfaceEyebrow}><span>03</span> / INTERFACE ASSEMBLY</div>
      <div className={styles.interfaceWindow}>
        <div className={styles.interfaceNav}>
          <p><span>AI</span> CORE</p><div><span>Services</span><span>About</span><span>Contact</span></div><i aria-hidden="true" />
        </div>
        <div className={styles.interfaceBody}>
          <div className={styles.interfaceCopy}>
            <p>DESIGN THAT<br />MAKES SENSE.</p><span>品牌策略 · 數位體驗 · 系統實作</span>
            <button type="button">Start a project <Arrow /></button>
          </div>
          <div className={styles.interfaceVisual}>
            <span className={styles.interfaceC}>C</span>
            <Image alt="AI 生成的黑白紙雕概念素材" fill sizes="(max-width: 767px) 73vw, 44vw" src="/images/hero-paper-fold-c.png" />
            <span className={styles.interfaceBlock} />
          </div>
        </div>
        <div className={styles.interfaceFoot}><span>AI CORE / STUDIO</span><span>CONCEPT DEMO — 2026</span></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className={styles.nav}>
        <a className={styles.brand} href="#top" aria-label="AI CORE 首頁"><b>AI</b> CORE <em>艾構</em></a>
        <nav aria-label="主要導覽"><a href="#services">Services</a><a href="#contact">Contact</a></nav>
        <a className={styles.navProject} href="#contact">START A PROJECT <Arrow diagonal /></a>
      </header>
      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>AI CORE / 艾構 <span>·</span> DESIGN &amp; DEVELOPMENT</p>
          <h1>讓好的想法，<br />成為真正<span>好用</span>的網站。</h1>
          <p className={styles.intro}>我們結合設計與開發，為中小企業與個人品牌打造品牌網站、數位體驗與客製化系統。</p>
          <div className={styles.actions}><a className={styles.primaryAction} href="#contact">開始你的專案 <Arrow /></a><a className={styles.secondaryAction} href="#services">探索我們的服務 <Arrow /></a></div>
          <p className={styles.phaseNote}>PHASE 01 <span>—</span> CONCEPT COMPOSITION</p>
        </div>
        <ConceptCanvas />
      </section>
      <section className={styles.assembly} aria-labelledby="assembly-title">
        <div className={styles.assemblyIntro}>
          <p className={styles.eyebrow}>SCROLL TO BUILD <span>·</span> STATIC PHASE</p>
          <h2 id="assembly-title">從構圖，<br />走向<span>可用</span>的體驗。</h2>
          <p>同一組元素在後續階段將隨捲動持續對位、收束與組裝。此刻先保留兩端：想法的張力，與介面的秩序。</p>
        </div>
        <FinalInterface />
      </section>
      <section className={styles.services} id="services" aria-labelledby="services-title">
        <p className={styles.sectionIndex}>02 / WHAT WE BUILD</p>
        <div><h2 id="services-title">設計與開發，<br />在同一個核心裡。</h2><ul>{services.map((service, index) => <li key={service}><span>0{index + 1}</span>{service}</li>)}</ul></div>
      </section>
      <section className={styles.contact} id="contact" aria-labelledby="contact-title">
        <p className={styles.eyebrow}>NEXT / START WITH A CONVERSATION</p>
        <h2 id="contact-title">有一個想法<br />正在等待<span>成形？</span></h2>
        <a href="mailto:hello@ai-core.si">hello@ai-core.si <Arrow /></a><p className={styles.demoLabel}>CONCEPT DEMO — NOT A LIVE CONTACT FORM</p>
      </section>
    </main>
  );
}
