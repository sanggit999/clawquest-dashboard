# 📊 ClawQuest Miner Dashboard

Bảng điều khiển web tĩnh để giám sát và quản lý **ClawQuest Automated Miner**. Xây dựng với React 19, Vite, TypeScript, và Shadcn UI.

> Xem **`PROJECT.md`** để biết chi tiết về mục tiêu và tính năng.
> Xem **`AGENTS.md`** nếu bạn là AI Agent.

---

## 🚀 Hướng dẫn Cài đặt & Phát triển

### Yêu cầu Môi trường
- **Node.js**: v22 hoặc mới hơn
- **npm**: v10 hoặc mới hơn

### Bước 1: Cài đặt thư viện
```bash
npm install
```

### Bước 2: Cấu hình môi trường
```bash
cp .env.example .env.local
```
Mở `.env.local` và điền:
```
VITE_API_BASE_URL=http://localhost:4021
```

### Bước 3: Chạy Local Dev Server
```bash
npm run dev
```
Ứng dụng sẽ chạy tại **`http://localhost:5173`**.

---

## 📦 Scripts

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Khởi động dev server với HMR |
| `npm run build` | Build production bundle vào `dist/` |
| `npm run preview` | Preview production build tại local |
| `npm run lint` | Chạy Oxlint để kiểm tra code quality |

---

## 📁 Cấu trúc Dự án
Xem chi tiết tại **[`docs/folder-structure.md`](./docs/folder-structure.md)**.

```
src/
├── components/     # UI Components (Feature + Shadcn UI)
├── config/         # Hằng số cấu hình
├── hooks/          # Custom React Hooks
├── services/       # API service functions
├── types/          # TypeScript Types & Interfaces
└── utils/          # Utility/helper functions
```

---

## 🏷️ Coding Convention
Xem chi tiết tại **[`docs/coding-convention.md`](./docs/coding-convention.md)** và **[`docs/best-practices.md`](./docs/best-practices.md)**.

Tóm tắt nhanh:
- **Components**: `PascalCase` (e.g. `MinerCard.tsx`)
- **Hooks**: `camelCase` + prefix `use` (e.g. `useMinerStatus.ts`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g. `MAX_RETRY_COUNT`)
- **Types/Interfaces**: `PascalCase`, không prefix `I`

---

## 🔄 CI/CD Pipeline

Pipeline tự động tích hợp trong một file duy nhất qua **GitHub Actions** (`.github/workflows/production.yml`):

```
Push / PR / Merge to main 
  └── job: code-quality (Lint)
        └── job: build (Build production bundle & Upload artifact)
              └── job: deploy (Deploy to GitHub Pages - only on main branch)
```

Để bật GitHub Pages: vào **Settings → Pages → Source: GitHub Actions**.

---

## 📚 Tài liệu

| Tài liệu | Mô tả |
|----------|-------|
| [`docs/architecture.md`](./docs/architecture.md) | Kiến trúc hệ thống và data flow |
| [`docs/folder-structure.md`](./docs/folder-structure.md) | Cấu trúc thư mục chi tiết |
| [`docs/coding-convention.md`](./docs/coding-convention.md) | Quy ước đặt tên và coding style |
| [`docs/best-practices.md`](./docs/best-practices.md) | Best practices và anti-patterns |
| [`AGENTS.md`](./AGENTS.md) | Hướng dẫn cho AI Agents |
| [`SKILL.md`](./SKILL.md) | OpenClaw Skill definition |
