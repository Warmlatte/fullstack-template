# 🚀 Fullstack Vue 3 + Express + Prisma Template

這是一個 **Vue 3 + Tailwind CSS** (前端) 與 **Express + Prisma** (後端) 的全端開發模板，旨在快速啟動專案，並保留彈性供不同專案設定資料庫連線。

---

## 📋 專案內容

- **前端**：Vue 3 + Vite + Tailwind CSS
- **後端**：Express.js + Prisma ORM (未初始化)
- **資料庫**：MySQL (可依需求自訂)
- **環境變數**：使用 dotenv 管理
- **API 測試**：已包含基本的 `/api/ping` 測試端點

---

## 🏗️ 專案結構
```
fullstack-template/ 
├── client/ # 前端 (Vue 3 + Vite) 
│ ├── public/ 
│ ├── src/ 
│ │ ├── assets/ 
│ │ ├── components/ 
│ │ ├── views/ 
│ │ ├── App.vue 
│ │ └── main.js 
│ ├── index.html 
│ └── tailwind.config.js 
│ ├── server/ # 後端 (Express + Prisma) 
│ ├── prisma/ # Prisma 設定 (未初始化) 
│ ├── src/ 
│ │ ├── controllers/ 
│ │ ├── routes/ 
│ │ ├── app.js 
│ │ └── server.js 
│ └── .env.example # 環境變數範例 
│ ├── package.json # Monorepo 管理 (可選)
└── README.md
```
---

## ⚙️ 環境安裝

### 1️⃣ 克隆專案

```bash
git clone https://github.com/your-username/fullstack-template.git
cd fullstack-template
```

### 2️⃣ 安裝前端依賴
```bash
cd client
npm install
```

### 3️⃣ 安裝後端依賴
```bash
cd ../server
npm install
```
## 🌐 環境變數設定
### 在 server/ 目錄下建立 .env 檔案：
```bash
cp .env.example .env
```

### .env 範例：
*前端*
```env
VITE_API_BASE_URL=http://localhost:3000/
```

*後端*
```env
PORT=3000
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```
>💡 注意：DATABASE_URL 尚未初始化 Prisma，請根據專案需求調整資料庫連線字串。

## 💾 初始化 Prisma (依專案需求)
專案已預設 未初始化 Prisma，以保持資料庫設定彈性。當你準備好時，可使用以下指令進行初始化：

```bash
cd server
npx prisma init
```
接著，編輯 `prisma/schema.prisma`，設定你的資料表結構，並執行：

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🚀 開發指令

### 前端開發
```bash
cd client
npm run dev    # 啟動開發伺服器 (http://localhost:5173)
npm run build  # 建構生產版本
npm test       # 執行測試
```

### 後端開發
```bash
cd server
npm run dev    # 啟動開發伺服器 (http://localhost:3000)
npm start      # 啟動生產伺服器
```

## 🎯 開始開發

1. 啟動後端：`cd server && npm run dev`
2. 啟動前端：`cd client && npm run dev`
3. 打開瀏覽器訪問 `http://localhost:5173`

---

**✨ 使用 Claude Code 管理和開發 - https://claude.ai/code**
