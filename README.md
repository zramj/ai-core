# AI CORE／艾構

AI CORE Studio Website 的本機開發專案。

## 技術

- Next.js 16（App Router）
- React 19
- TypeScript（strict mode）
- CSS Modules
- ESLint

## V2 還原狀態

首頁目前以 `reference/v2-original.html` 為唯一基準重建為 React 元件。已保留其 Header、Hero、品牌宣言、三段式 Sticky 敘事、服務、概念作品、流程、聯絡區、配色切換、手機選單、彈窗與表單摘要複製互動。

Hero V3 不是目前首頁的一部分；V3 改造會待 V2 還原確認後再進行。

## 需求

- Node.js 22.11.0 或較新 LTS 版本
- npm 10.9.0 或相容版本

## 本機啟動

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

其他常用指令：

```bash
npm run lint
npm run build
npm run start
```

## 圖片與授權

本次 V2 視覺僅使用原型內已有的 CSS 幾何與介面示意，不使用第三方商業圖片。先前 Hero V3 的專案素材仍保留於 `public/images/`，但不會被目前首頁載入。
