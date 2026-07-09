# Architecture Overview

## Tổng quan
Dự án này là một **Single Page Application (SPA) tĩnh** được xây dựng với React 19, Vite, và TypeScript. Ứng dụng giao tiếp trực tiếp với API backend của ClawQuest Miner (chạy tại `localhost:4021` hoặc VPS) thông qua HTTP calls từ phía client.

---

## Sơ đồ Kiến trúc

```
┌─────────────────────────────────────────────┐
│              React SPA (Frontend)           │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Pages  │  │Components│  │  UI (shadcn│  │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘  │
│       │            │              │         │
│       └────────────┴──────────────┘         │
│                    │                        │
│  ┌─────────────────▼──────────────────────┐ │
│  │           Custom Hooks (Logic Layer)   │ │
│  │  useMinerStatus, useFetch, useConfig   │ │
│  └─────────────────┬──────────────────────┘ │
│                    │                        │
│  ┌─────────────────▼──────────────────────┐ │
│  │            Services (API Layer)        │ │
│  │  minerService.ts, configService.ts     │ │
│  └─────────────────┬──────────────────────┘ │
└────────────────────┼────────────────────────┘
                     │ HTTP (fetch)
                     ▼
┌─────────────────────────────────────────────┐
│    ClawQuest Miner Backend (Node/Express)   │
│            localhost:4021 / VPS             │
└─────────────────────────────────────────────┘
```

---

## Các Tầng Kiến trúc (Layers)

| Tầng | Thư mục | Trách nhiệm |
|------|---------|-------------|
| **UI Layer** | `src/components/ui/` | Shadcn UI primitives. Không chứa business logic. |
| **Feature Components** | `src/components/` | Components tổ hợp cho từng tính năng cụ thể. |
| **Logic Layer** | `src/hooks/` | Custom hooks quản lý state và side effects. |
| **Data Layer** | `src/services/` | Hàm gọi API, xử lý request/response. |
| **Type Layer** | `src/types/` | Toàn bộ TypeScript types/interfaces dùng chung. |
| **Config Layer** | `src/config/` | Hằng số cấu hình (API URL, default values). |
| **Utils Layer** | `src/utils/` | Hàm tiện ích thuần túy (pure functions), không có side effects. |

---

## Luồng Dữ liệu (Data Flow)
```
User Interaction
      │
      ▼
  Component (renders UI, calls hook)
      │
      ▼
  Custom Hook (manages state, calls service)
      │
      ▼
  Service (HTTP request to API)
      │
      ▼
  ClawQuest Miner Backend API
      │
      ▼
  Service (parses response, throws typed errors)
      │
      ▼
  Custom Hook (updates state: data/loading/error)
      │
      ▼
  Component (re-renders with new data)
```

---

## Quyết định Kiến trúc Quan trọng
- **No Global State Manager**: Dự án dùng React Context (`useContext`) kết hợp `useReducer` cho state chia sẻ. Chưa cần Zustand/Redux ở giai đoạn này.
- **Static Deployment**: Không có server-side rendering. App được build thành file HTML/CSS/JS tĩnh và host trên GitHub Pages.
- **API Communication**: Dùng native `fetch` API với các wrapper trong `services/`. Cân nhắc `react-query` khi cần caching và background refresh phức tạp hơn.
