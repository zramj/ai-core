"use client";

import { CSSProperties, useState } from "react";
import styles from "./approach-visuals.module.css";

const delay = (ms: number) => ({ "--delay": `${ms}ms` } as CSSProperties);

// All artwork is vector geometry. Shared finishes keep the three compositions related.
function Finishes({ id }: { id: string }) {
  return <defs>
    <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2=".8"><stop stopColor="#242628" /><stop offset=".48" stopColor="#72736e" /><stop offset=".72" stopColor="#b8b8ad" /><stop offset="1" stopColor="#363938" /></linearGradient>
    <linearGradient id={`${id}-dark`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5b5d58" /><stop offset=".48" stopColor="#282b2a" /><stop offset="1" stopColor="#17191a" /></linearGradient>
    <linearGradient id={`${id}-paper`} x1="0" y1="0" x2=".9" y2="1"><stop stopColor="#cfcec3" /><stop offset=".4" stopColor="#8b8d85" /><stop offset="1" stopColor="#383b39" /></linearGradient>
    <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#545751" stopOpacity=".3" /><stop offset="1" stopColor="#1b1d1d" stopOpacity=".8" /></linearGradient>
    <pattern id={`${id}-grain`} width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="#eeeede" opacity=".14" /></pattern>
  </defs>;
}

function Grid({ perspective = false }: { perspective?: boolean }) {
  return <g className={styles.grid} fill="none" stroke="currentColor" strokeWidth=".6">
    {[100, 220, 340, 460, 580].map(x => <path key={x} d={`M${x} 35V490`} />)}
    {[100, 220, 340, 460].map(y => <path key={y} d={perspective ? `M30 ${y - 55}L650 ${y + 25}` : `M30 ${y}H650`} />)}
    <path d={perspective ? "M45 470L650 375M45 150L650 55" : "M45 55H635V485H45Z"} />
  </g>;
}

function Idea() {
  return <svg viewBox="0 0 680 540" aria-hidden="true">
    <Finishes id="idea" /><Grid />
    <g className={`${styles.part} ${styles.orbits}`} style={delay(30)} fill="none" stroke="#8d9085" strokeWidth=".6">
      <circle cx="354" cy="250" r="178" /><circle cx="354" cy="250" r="106" strokeDasharray="1 5" />
      <path d="M143 388A256 256 0 0 1 589 105M165 93A246 246 0 0 1 535 440" strokeDasharray="1 4" />
    </g>
    <g className={styles.part} style={delay(80)}>
      <circle cx="172" cy="145" r="63" fill="url(#idea-metal)" stroke="#aaa99c" strokeWidth=".7" />
      <circle cx="172" cy="145" r="63" fill="url(#idea-grain)" />
      <path d="M172 82V208M109 145H235" stroke="#d4d3c7" strokeOpacity=".2" strokeWidth=".6" />
      <text x="74" y="245" className={styles.label}>BRAND</text><text x="74" y="265" className={styles.note}>IDENTITY / VALUES</text>
    </g>
    <g className={styles.part} style={delay(160)}>
      <path d="M538 111L589 160L538 209L487 160Z" fill="url(#idea-dark)" stroke="#777c72" strokeWidth=".7" />
      <path d="M538 111V209M487 160H589" stroke="#c2c4b7" strokeOpacity=".18" strokeWidth=".6" />
      <text x="550" y="245" className={styles.label}>USER</text><text x="550" y="265" className={styles.note}>NEEDS / CONTEXT</text>
    </g>
    <g className={styles.part} style={delay(240)}>
      <path d="M401 322L492 348L468 445L376 419Z" fill="url(#idea-metal)" stroke="#9b9d90" strokeWidth=".7" />
      <path d="M401 322L468 445L376 419Z" fill="url(#idea-dark)" /><path d="M401 322L468 445M376 419L492 348" stroke="#babcae" strokeOpacity=".4" strokeWidth=".6" />
      <path d="M401 322L492 348L468 445L376 419Z" fill="url(#idea-grain)" />
      <text x="522" y="392" className={styles.label}>GOAL</text><text x="522" y="412" className={styles.note}>PURPOSE / IMPACT</text>
    </g>
    <g fill="none" stroke="#aaa991" strokeWidth=".8">
      <path className={styles.relation} pathLength="1" d="M172 145L354 250L538 160M354 250L435 385" />
      <path className={styles.relation} pathLength="1" d="M74 82H172V145M538 160V100H625M435 385V460H572" opacity=".45" />
    </g>
    <g className={styles.part} style={delay(320)}>
      <circle cx="354" cy="250" r="13" fill="var(--accent)" /><circle cx="354" cy="250" r="20" fill="none" stroke="var(--accent)" strokeOpacity=".3" strokeWidth=".6" />
      <path d="M343 250H365M354 239V261" stroke="#766d53" strokeWidth=".6" />
      <text x="354" y="292" textAnchor="middle" className={styles.note}>THE CORE</text>
      {[[74,82],[172,145],[538,160],[435,385],[572,460]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#cfcec1" />)}
    </g>
    <text x="45" y="517" className={styles.caption}>BRAND × USER × GOAL</text><text x="635" y="517" textAnchor="end" className={styles.note}>FIG. 01</text>
  </svg>;
}

// An abstract folded surface, drawn locally without photographs or external textures.
function Fold({ id }: { id: string }) {
  return <g>
    <path d="M0 0H220V260H0Z" fill={`url(#${id}-paper)`} />
    <path d="M0 214L46 87L165 32L107 166L220 260H0Z" fill={`url(#${id}-dark)`} />
    <path d="M46 87L165 32L107 166Z" fill="#c1c2b7" opacity=".7" />
    <path d="M0 214L107 166L220 260Z" fill="#61665e" />
    <path d="M0 214L46 87L107 166L165 32M107 166L220 260" fill="none" stroke="#e0e0d2" strokeOpacity=".35" strokeWidth=".8" />
    <path d="M0 0H220V260H0Z" fill={`url(#${id}-grain)`} />
  </g>;
}

function Design() {
  return <svg viewBox="0 0 680 540" aria-hidden="true">
    <Finishes id="design" /><Grid />
    <g className={styles.part} style={delay(30)}>
      <circle cx="55" cy="127" r="4" fill="var(--accent)" /><text x="52" y="156" className={styles.note}>CLARITY</text><text x="52" y="174" className={styles.note}>HIERARCHY</text><text x="52" y="192" className={styles.note}>RHYTHM</text><text x="52" y="210" className={styles.note}>BALANCE</text>
      <path d="M169 98H231V262H169Z" fill="var(--accent)" fillOpacity=".7" stroke="#d8cdaa" strokeWidth=".7" />
    </g>
    <g className={styles.part} style={delay(100)}>
      <path d="M199 132L526 81V370L199 335Z" fill="url(#design-glass)" stroke="#6c7067" strokeWidth=".7" />
      <path d="M231 119L460 93V401L231 377Z" fill="#151717" stroke="#8f9386" strokeWidth=".7" />
      <g transform="translate(272 105) skewY(-6) scale(.85 1.1)"><Fold id="design" /></g>
      <path d="M231 119L460 93V401L231 377Z" fill="none" stroke="#b8bbac" strokeWidth=".7" />
    </g>
    <g className={styles.part} style={delay(180)}>
      <text x="67" y="423" className={styles.type}>Aa</text><text x="74" y="447" className={styles.note}>TYPE / FORM / SPACE</text>
      <path d="M480 213H603V322H480Z" fill="url(#design-metal)" fillOpacity=".45" stroke="#b4b7a8" strokeWidth=".7" />
      <text x="510" y="266" className={styles.folio}>01</text><text x="555" y="268" className={styles.note}>/03</text>
      <path d="M488 330H539V414H488Z" fill="url(#design-paper)" fillOpacity=".5" />
    </g>
    <g className={`${styles.part} ${styles.guides}`} style={delay(240)} fill="none" stroke="#b8bbaa" strokeWidth=".6">
      <path d="M117 126H637M142 321H637M199 73V456M488 73V456M637 126V414H178" />
      <path d="M199 266H567" strokeDasharray="1 3" />
      {[[199,126],[488,126],[637,126],[199,321],[488,321],[637,414]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill="#d5d5c8" stroke="none" />)}
    </g>
    <text x="45" y="517" className={styles.caption}>TYPOGRAPHY × GRID × COMPOSITION</text><text x="635" y="517" textAnchor="end" className={styles.note}>FIG. 02</text>
  </svg>;
}

const buildModes = [
  { name: "Website", title: ["From ideas", "to impact."], tag: "BRAND EXPERIENCE", component: "BrandWebsite" },
  { name: "Web App", title: ["A place", "for clarity."], tag: "PRODUCT EXPERIENCE", component: "Workspace" },
  { name: "Digital Tool", title: ["Make room", "for progress."], tag: "PURPOSEFUL TOOLS", component: "DigitalTool" },
];

function Build({ active }: { active: boolean }) {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState(false);
  const mode = buildModes[selected];
  return <>
    <svg viewBox="0 0 680 540" aria-hidden="true">
      <Finishes id="build" /><Grid perspective />
      <g className={`${styles.part} ${styles.guides}`} style={delay(20)} fill="none" stroke="#9b9f8d" strokeWidth=".6"><path d="M98 88V471M614 119V464M98 125L614 189M98 459L614 402" />{[[98,88],[98,459],[614,119],[614,402]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#c4c6b6" />)}</g>
      <g className={styles.part} style={delay(100)}>
        <path d="M84 162L251 180V419L84 455Z" fill="url(#build-glass)" stroke="#696f63" strokeWidth=".7" />
        <text x="103" y="186" className={styles.note}>SELECT A FORMAT</text>
        <path d="M478 222L646 202V397L478 421Z" fill="url(#build-glass)" stroke="#979c8d" strokeWidth=".7" /><path d="M487 237L637 218" stroke="#737b69" strokeWidth=".6" />
        <g className={styles.code}><text x="503" y="262">&lt;{mode.component}&gt;</text><text x="517" y="287">design: &apos;clear&apos;</text><text x="517" y="312">state: &apos;{preview ? "active" : "ready"}&apos;</text><text x="517" y="337">build: &apos;with purpose&apos;</text><text x="503" y="362">&lt;/{mode.component}&gt;</text></g>
      </g>
      <g className={styles.part} style={delay(170)}>
        <path d="M224 76L500 120V461L224 436Z" fill="#1c1f1d" stroke="#b7bbac" strokeWidth=".8" /><path d="M224 111L500 155" stroke="#61695b" strokeWidth=".6" />
        <circle cx="245" cy="99" r="4.5" fill="none" stroke="#b4b8a8" strokeWidth=".7" /><text x="256" y="105" className={styles.note}>AI CORE</text><text x="390" y="127" className={styles.micro}>WORK / ABOUT / CONTACT</text>
        <g transform="translate(304 169) scale(.72 .94)"><Fold id="build" /></g>
        <path d="M250 275L366 261V399L250 405Z" fill="#181c18" fillOpacity=".87" />
        <g key={selected} className={styles.response}>
          <text x="252" y="303" className={styles.interfaceTitle}>{mode.title[0]}</text><text x="252" y="337" className={styles.interfaceTitle}>{mode.title[1]}</text>
          <text x="252" y="358" className={styles.micro}>{mode.tag}</text>
          {selected === 1 && <g stroke="#bfc5b4" strokeOpacity=".45"><path d="M317 185H439V213H317ZM317 228H439V256H317ZM317 271H439V299H317Z" fill="#303a31" /><path d="M329 199H393M329 242H415M329 285H377" /></g>}
          {selected === 2 && <g fill="var(--accent)" fillOpacity=".6"><path d="M324 253H347V291H324ZM358 220H381V291H358ZM392 184H415V291H392Z" /></g>}
        </g>
        <path d="M402 339L476 348V439L402 429Z" fill="url(#build-paper)" fillOpacity=".3" stroke="#a3ad97" strokeWidth=".6" />
        <path d="M411 420L441 360L468 424M410 372L470 410" fill="none" stroke="#c6cdb9" strokeOpacity=".5" strokeWidth=".6" />
        <circle cx="482" cy="446" r="2.4" fill="var(--accent)" />
      </g>
      <g className={styles.part} style={delay(260)}><circle cx="61" cy="113" r="4" fill="var(--accent)" /><text x="35" y="140" className={styles.note}>INTERACTION</text><text x="35" y="158" className={styles.note}>PERFORMANCE</text></g>
      <text x="45" y="517" className={styles.caption}>INTERFACE × INTERACTION × DEVELOPMENT</text><text x="635" y="517" textAnchor="end" className={styles.note}>FIG. 03</text>
    </svg>
    <div className={`${styles.selector} ${styles.part}`} style={delay(100)} role="group" aria-label="切換介面示意類型">
      {buildModes.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} tabIndex={active ? 0 : -1} onClick={() => { setSelected(index); setPreview(false); }}><span>0{index + 1}</span>{item.name}<span className={styles.selectionDot} /></button>)}
    </div>
    <button className={`${styles.preview} ${styles.part}`} style={delay(220)} type="button" tabIndex={active ? 0 : -1} aria-label="切換介面互動預覽" aria-pressed={preview} onClick={() => setPreview(value => !value)}><span>{preview ? "ACTIVE" : "TRY IT"}</span><i aria-hidden="true">{preview ? "✓" : "↗"}</i></button>
    <span className={styles.srOnly} role="status">目前選擇：{mode.name}，{preview ? "互動已啟用" : "準備就緒"}</span>
  </>;
}

export default function ApproachVisuals({ scene }: { scene: number }) {
  return <div className={`story-visual ${styles.visual}`}>
    <div className={`${styles.scene}${scene === 0 ? ` ${styles.active}` : ""}`} aria-hidden="true"><Idea /></div>
    <div className={`${styles.scene}${scene === 1 ? ` ${styles.active}` : ""}`} aria-hidden="true"><Design /></div>
    <div className={`${styles.scene}${scene === 2 ? ` ${styles.active}` : ""}`} aria-hidden={scene !== 2} inert={scene !== 2} role="group" aria-label="設計與開發的互動介面示意"><Build active={scene === 2} /></div>
  </div>;
}
