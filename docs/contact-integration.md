# CONTACT 前後端串接規格

Patch 07A.3。前端依據：`app/page.tsx` 的 `Contact`、`ContactRequest`、`contactTypes`、`contactFieldError` 與 `SubmitContactRequest`；樣式在 `app/v2.css`。

目前完成表單驗證及 Idle／Loading／Success／Error UI，**尚未建立 `/api/contact`、API 呼叫或寄信功能**。首頁仍使用 `<Contact />`，未傳入 API adapter，也未開啟 `submissionEnabled`，因此一般表單按鈕維持 Disabled。

## A. 現有表單資料

沿用現有 `ContactRequest`，不要另外建立不同欄位名稱的 DTO：

```ts
type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  type: string;
  detail: string;
};
```

所有欄位皆為必填；輸入值先 `trim()`，空白字串視為未填。畫面排列維持姓名／品牌、電話、Email、服務需求、需求描述。

| 欄位 | 名稱／型別 | 現有驗證規則 | HTML 輸入長度上限 |
| --- | --- | --- | --- |
| 姓名／品牌名稱 | `name: string` | 去除前後空白後不可為空 | 80 |
| Email | `email: string` | 不可為空；`type="email"` 的 `validity.typeMismatch` 檢查，以及 `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | 254 |
| 聯絡電話 | `phone: string` | 不可為空；符合 `/^\+?[0-9 ()-]+$/`，去除非數字後須為 7–15 位 | 40 |
| 服務需求類型 | `type: string` | 必須為下列 `contactTypes` 選項之一；空值 placeholder 不可提交 | 不適用 |
| 需求描述 | `detail: string` | 去除前後空白後不可為空 | 1800 |

長度上限目前透過欄位 `maxLength` 限制，`contactFieldError` 未另外檢查長度。後端仍須獨立檢查型別、必填、長度、格式及選項，不可只依賴前端。

送出組裝資料時，`name`、`email`、`phone`、`detail` 會 `trim()`；`type` 使用選單原值。電話保持字串，保留前導零、`+` 與分隔符號。

服務需求標籤與實際 `value` 完全相同，沒有數字 ID 或英文代碼：

| 畫面選項 | Request 的 `type` 值 |
| --- | --- |
| 企業／品牌形象官網 | `企業／品牌形象官網` |
| 一頁式網站／活動頁面 | `一頁式網站／活動頁面` |
| 既有網站改版／優化 | `既有網站改版／優化` |
| 網站功能／客製化開發 | `網站功能／客製化開發` |
| 還不確定，想先聊聊 | `還不確定，想先聊聊` |

## B. 建議 API Contract（待後端確認）

- Method：`POST`
- Endpoint：`/api/contact`
- Request Content-Type：`application/json`
- Response Content-Type：`application/json`

Request 範例（虛構測試資料）：

```json
{
  "name": "範例品牌",
  "email": "hello@example.com",
  "phone": "0912 345 678",
  "type": "企業／品牌形象官網",
  "detail": "希望建立品牌網站，包含品牌介紹、服務資訊與聯絡表單。"
}
```

成功 Response，HTTP `200` 或 `201`：

```json
{ "received": true }
```

`received: true` 應表示後端已驗證資料、成功接收並完成雙方約定的收件服務流程。若採佇列，必須先確認需求已可靠保存並可追蹤；不要在服務尚未接收、寄送已失敗或只做前端模擬時回傳成功。是否表示郵件服務接受寄送或其他可靠收件方式，須在實作前確認；不等同保證郵件已抵達收件匣。

失敗 Response，例如 HTTP `422`：

```json
{
  "received": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "請檢查填寫資料。",
    "fields": { "email": "請輸入有效的 Email。" }
  }
}
```

`error.fields` 為選用，key 沿用 `ContactRequest` 欄位名。其餘失敗沿用此格式，替換 `code` 與安全的 `message`；不得回傳 API Key、服務商原始錯誤或內部堆疊。目前前端尚未解析此錯誤物件，失敗統一顯示 Error Card。

| HTTP Status | 意義 | 建議 `error.code`／前端處理 |
| --- | --- | --- |
| 200／201 | 已確認成功接收 | JSON `received === true` 才可顯示 Success |
| 400 | JSON 無法解析、請求結構錯誤 | `INVALID_REQUEST`，Error |
| 422 | 欄位驗證失敗 | `VALIDATION_ERROR`，Error，保留資料 |
| 429 | 提交過於頻繁 | `RATE_LIMITED`，Error；後端可回傳 `Retry-After` |
| 500 | 伺服器內部異常 | `INTERNAL_ERROR`，Error |
| 503 | 收件服務暫時不可用 | `SERVICE_UNAVAILABLE`，Error |

上述 Endpoint、回應及錯誤代碼為建議契約，**不代表 API 已實作**。`202`、空回應、HTML、無法解析的 JSON 或任何缺少明確 `received: true` 的回應，均不可當成正式成功。

## C. 前端串接與狀態

現有 API 邊界：

```ts
type SubmitContactRequest =
  (request: ContactRequest) => Promise<{ received: true }>;
```

未來在 Client Component 中建立真正呼叫 Endpoint 的 adapter，傳入 `Contact` 的 `submitRequest`。adapter 必須同時確認 HTTP 為雙方約定的成功狀態（建議 `200`／`201`）以及 JSON `received === true`，才 resolve `{ received: true }`；其餘情況 reject。不可只用 `response.ok`、HTTP `2xx`、truthy 值或前端計時器判定成功。

| UI | 條件與行為 |
| --- | --- |
| Idle | 初始畫面或返回表單。缺少 API adapter／未開啟開關時，Submit 保持灰黃色 Disabled。 |
| Loading（內部值 `submitting`） | 通過 API 就緒檢查、重複提交防護及所有既有驗證後，在呼叫 adapter 前進入。按鈕顯示「傳送中…」並 Disabled。 |
| Success | adapter 依正式 API 的明確結果 resolve，且元件再次確認 `received === true`。在原 Card 顯示成功訊息，不跳頁、不 Alert；此時才執行既有的 `form.reset()`。 |
| Error | 網路中斷、逾時、HTTP 錯誤、回應解析失敗、缺少成功確認或 adapter reject。顯示錯誤 Card；不得清除欄位。 |

- 避免重複提交：按鈕 Disabled、handler 狀態檢查，以及同步 `submittingRef` 鎖共同阻擋同一時間的多次請求；`finally` 釋放鎖。後端仍須處理跨分頁、重試及其他重複請求。
- 保留資料：結果畫面只隱藏表單內容，欄位不卸載。Error 不呼叫 `reset()`；「保留資料，返回表單」切回 Idle，原值與欄位錯誤保留，焦點回到姓名欄位。資料僅保留在當前頁面，重新整理／離開頁面不保證保留。
- Enabled Submit：須同時有真正的 `submitRequest`、明確開啟 `submissionEnabled`、所有欄位通過既有驗證、實際狀態為 Idle，且不在本機預覽。不得只因 UI 已完成就開啟開關。
- 此次不加入 fetch、逾時或自動重試。未來 adapter 須設定合理逾時並 reject；不要在不確定後端是否收件時盲目重送。

## D. 後端交接責任

- 實作並確認 `/api/contact` 的 API Contract 與收件成功定義。
- Server-side Validation：檢查 JSON、所有欄位型別、必填、長度、Email／電話格式與服務選項白名單。
- 接入 Email 收件服務，設定實際收件信箱、已驗證寄件網域與 Reply-To；避免使用訪客輸入直接拼接郵件 header 或未跳脫的 HTML。
- 垃圾訊息防護、Rate Limiting 與必要的重複提交處理。
- 錯誤處理：寄送／收件失敗不得回報 `received: true`；保留可追蹤且避免洩漏個資的伺服器紀錄。
- 正式安全設定：HTTPS、請求大小限制、來源／CORS 政策及服務商權限，依部署環境確認。
- 環境變數：例如 `CONTACT_EMAIL_API_KEY`、`CONTACT_EMAIL_FROM`、`CONTACT_EMAIL_TO`，以及使用外部限流儲存時所需的連線設定。名稱待服務商及後端架構確定，目前不新增設定。
- API Key、SMTP 密碼及儲存服務憑證僅能在 server 使用；不可置於 `NEXT_PUBLIC_*`、前端原始碼、回應或版控。Email 收件服務亦須僅由後端呼叫。
- 完成寄送功能端對端測試，確認真實收件與錯誤流程。

## E. 正式串接檢查清單

- [ ] 確認最終 API 規格及 `received: true` 的收件定義。
- [ ] 建立並連接正式 Endpoint，adapter 嚴格檢查 HTTP 與 JSON。
- [ ] 正確處理 Loading／Success／Error，不跳頁、不 Alert。
- [ ] API 接通且表單驗證通過後才開放 Submit。
- [ ] 驗證實際收件流程與正式環境變數。
- [ ] 測試驗證錯誤、429、500／503、網路失敗、逾時、錯誤回應及重複提交；確認失敗返回後資料完整。
- [ ] 執行 lint 與 Production Build；以 Production server 測試所有預覽參數，確認沒有假成功模式。

## 本機狀態預覽

以 `npm run dev` 啟動，首頁路由為 `/`；預設連接埠 `3000`：

- Loading：`http://localhost:3000/?contactPreview=loading#contact`
- Success：`http://localhost:3000/?contactPreview=success#contact`
- Error：`http://localhost:3000/?contactPreview=error#contact`
- 正常表單：`http://localhost:3000/#contact`

實際連接埠若被占用，依開發伺服器輸出調整。只有 `NODE_ENV === 'development'` 會讀取預覽參數；Production 與 test 均忽略，未知值回到一般畫面。預覽只覆蓋顯示狀態，不執行 adapter、API 呼叫、資料傳送或成功後的表單清除。

預覽畫面會標示「本機狀態預覽，未傳送任何資料。」；Loading／Success 可按「結束預覽，返回表單」，Error 使用「保留資料，返回表單」。返回時只移除 `contactPreview` 並切回 Idle，保留其他網址參數、錨點與已填資料。也可直接開啟不含此參數的網址。正式環境不顯示預覽標示或預覽返回按鈕。
